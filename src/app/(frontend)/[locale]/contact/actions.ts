'use server'

import { headers } from 'next/headers'

import { browserFromUA, countryFromHeaders, dailyVisitorId, deviceFromUA } from '@/lib/analytics'
import { getPayloadClient } from '@/lib/data'
import { isLocale } from '@/lib/locales'

export type ContactState = { status: 'idle' | 'success' | 'error'; fieldErrors?: Partial<Record<'name' | 'email' | 'message', true>> }

// Limitation simple en mémoire : 5 envois par adresse IP et par heure.
const attempts = new Map<string, number[]>()
const WINDOW = 60 * 60 * 1000
const MAX = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW)
  recent.push(now)
  attempts.set(ip, recent)
  return recent.length > MAX
}

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège invisible : rempli uniquement par les robots.
  if (String(formData.get('website') ?? '').trim()) return { status: 'success' }

  const name = String(formData.get('name') ?? '').trim().slice(0, 120)
  const email = String(formData.get('email') ?? '').trim().slice(0, 200)
  const subject = String(formData.get('subject') ?? '').trim().slice(0, 120)
  const message = String(formData.get('message') ?? '').trim().slice(0, 5000)
  const localeRaw = String(formData.get('locale') ?? 'fr')

  const fieldErrors: ContactState['fieldErrors'] = {}
  if (name.length < 2) fieldErrors.name = true
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = true
  if (message.length < 10) fieldErrors.message = true
  if (Object.keys(fieldErrors).length) return { status: 'error', fieldErrors }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) return { status: 'error' }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'messages',
      data: { name, email, subject, message, status: 'new', locale: isLocale(localeRaw) ? localeRaw : 'fr' },
      overrideAccess: true,
    })
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    if (settings.analyticsEnabled !== false) {
      const ua = h.get('user-agent') ?? ''
      await payload.create({
        collection: 'analytics-events',
        overrideAccess: true,
        data: {
          type: 'contact_submit',
          path: `/${isLocale(localeRaw) ? localeRaw : 'fr'}/contact`,
          locale: isLocale(localeRaw) ? localeRaw : 'fr',
          visitor: dailyVisitorId(ip, ua, process.env.PAYLOAD_SECRET ?? ''),
          device: deviceFromUA(ua),
          browser: browserFromUA(ua),
          country: countryFromHeaders(h),
          target: subject || null,
        },
      })
    }
    return { status: 'success' }
  } catch (err) {
    console.error('[contact] échec de l’enregistrement du message', err)
    return { status: 'error' }
  }
}
