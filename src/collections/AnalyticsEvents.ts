import type { CollectionConfig, PayloadRequest } from 'payload'

import {
  browserFromUA,
  clientIp,
  countryFromHeaders,
  dailyVisitorId,
  deviceFromUA,
  eventTypes,
  isBot,
  normalizePath,
  referrerHost,
} from '../lib/analytics'
import { authenticated } from '../fields/shared'

const allowedTypes = new Set(eventTypes.map((e) => e.value))

/** Purge les évènements plus anciens que la durée de conservation choisie dans les réglages. */
async function purgeOld(req: PayloadRequest) {
  const settings = await req.payload.findGlobal({ slug: 'site-settings', depth: 0, req })
  const months = settings.analyticsRetentionMonths ?? 13
  const limit = new Date()
  limit.setMonth(limit.getMonth() - months)
  await req.payload.delete({
    collection: 'analytics-events',
    where: { createdAt: { less_than: limit.toISOString() } },
    req,
    overrideAccess: true,
  })
}

export const AnalyticsEvents: CollectionConfig = {
  slug: 'analytics-events',
  labels: { singular: 'Évènement de statistiques', plural: 'Évènements de statistiques' },
  admin: {
    group: 'Statistiques',
    hidden: true,
    useAsTitle: 'path',
  },
  access: {
    read: authenticated,
    create: () => false,
    update: () => false,
    delete: authenticated,
  },
  timestamps: true,
  fields: [
    { name: 'type', type: 'select', options: [...eventTypes], required: true, index: true },
    { name: 'path', type: 'text', index: true },
    { name: 'locale', type: 'text' },
    { name: 'visitor', type: 'text', index: true },
    { name: 'referrer', type: 'text' },
    { name: 'device', type: 'text' },
    { name: 'browser', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'target', type: 'text' },
  ],
  indexes: [{ fields: ['createdAt', 'type'] }],
  endpoints: [
    {
      // POST /api/analytics-events/collect — appelé par le site public (navigator.sendBeacon).
      path: '/collect',
      method: 'post',
      handler: async (req) => {
        const ok = () => new Response(null, { status: 204 })
        try {
          const settings = await req.payload.findGlobal({ slug: 'site-settings', depth: 0, req })
          if (settings.analyticsEnabled === false) return ok()

          const headers = req.headers
          const ua = headers.get('user-agent') ?? ''
          // Ni robots, ni visites de l'administratrice connectée, ni « Do Not Track » si on choisit de le respecter.
          if (isBot(ua)) return ok()
          if (req.user) return ok()
          if (settings.analyticsRespectDNT !== false && (headers.get('dnt') === '1' || headers.get('sec-gpc') === '1')) return ok()

          const body = (await req.json?.().catch(() => null)) as Record<string, unknown> | null
          if (!body) return ok()
          const type = String(body.type ?? 'pageview')
          const path = normalizePath(body.path)
          if (!allowedTypes.has(type as never) || !path) return ok()

          const host = headers.get('host')
          await req.payload.create({
            collection: 'analytics-events',
            overrideAccess: true,
            req,
            data: {
              type: type as never,
              path,
              locale: typeof body.locale === 'string' ? body.locale.slice(0, 5) : null,
              visitor: dailyVisitorId(clientIp(headers), ua, process.env.PAYLOAD_SECRET ?? ''),
              referrer: referrerHost(typeof body.referrer === 'string' ? body.referrer : null, host),
              device: deviceFromUA(ua),
              browser: browserFromUA(ua),
              country: countryFromHeaders(headers),
              target: typeof body.target === 'string' ? body.target.slice(0, 200) : null,
            },
          })

          // Nettoyage occasionnel (1 fois sur 50) pour respecter la durée de conservation.
          if (Math.random() < 0.02) await purgeOld(req)
        } catch (err) {
          req.payload.logger.error({ err, msg: '[statistiques] évènement ignoré' })
        }
        return ok()
      },
    },
  ],
}
