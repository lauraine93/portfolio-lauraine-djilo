import type { Payload } from 'payload'

import { sourceLabel } from './analytics'

export type Period = 7 | 30 | 90 | 365
export const periods: { value: Period; label: string }[] = [
  { value: 7, label: '7 jours' },
  { value: 30, label: '30 jours' },
  { value: 90, label: '3 mois' },
  { value: 365, label: '12 mois' },
]

export function parsePeriod(value: unknown): Period {
  const n = Number(Array.isArray(value) ? value[0] : value)
  return (periods.some((p) => p.value === n) ? n : 30) as Period
}

type Row = { label: string; value: number }

export type Stats = {
  period: Period
  totals: { visits: number; pageviews: number; cvDownloads: number; messages: number; outbound: number }
  previous: { visits: number; pageviews: number; cvDownloads: number; messages: number }
  series: { date: string; visits: number; pageviews: number }[]
  pages: Row[]
  sources: Row[]
  devices: Row[]
  countries: Row[]
  languages: Row[]
  browsers: Row[]
  outbound: Row[]
  newMessages: number
  hasData: boolean
}

type Event = {
  type: string
  path?: string | null
  locale?: string | null
  visitor?: string | null
  referrer?: string | null
  device?: string | null
  browser?: string | null
  country?: string | null
  target?: string | null
  createdAt: string
}

const dayKey = (iso: string) => iso.slice(0, 10)

function count(rows: (string | null | undefined)[], top = 8, fallback = 'Inconnu'): Row[] {
  const map = new Map<string, number>()
  for (const r of rows) map.set(r || fallback, (map.get(r || fallback) ?? 0) + 1)
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, top)
}

/** Une « visite » = un visiteur anonyme sur une journée (l'identifiant change chaque jour). */
function visitKey(e: Event) {
  return `${e.visitor}|${dayKey(e.createdAt)}`
}

const deviceLabels: Record<string, string> = { mobile: 'Mobile', tablet: 'Tablette', desktop: 'Ordinateur' }
const languageLabels: Record<string, string> = { fr: 'Français', en: 'Anglais' }

export async function getStats(payload: Payload, period: Period): Promise<Stats> {
  const now = new Date()
  // Journées comptées en UTC, comme les dates enregistrées, quel que soit le fuseau du serveur.
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - (period - 1)))
  const prevStart = new Date(start.getTime() - period * 86_400_000)

  const res = await payload.find({
    collection: 'analytics-events',
    pagination: false,
    depth: 0,
    overrideAccess: true,
    where: { createdAt: { greater_than_equal: prevStart.toISOString() } },
    select: { type: true, path: true, locale: true, visitor: true, referrer: true, device: true, browser: true, country: true, target: true, createdAt: true },
  })
  const all = res.docs as unknown as Event[]
  const current = all.filter((e) => e.createdAt >= start.toISOString())
  const before = all.filter((e) => e.createdAt < start.toISOString())

  const summarize = (events: Event[]) => {
    const views = events.filter((e) => e.type === 'pageview')
    return {
      visits: new Set(views.map(visitKey)).size,
      pageviews: views.length,
      cvDownloads: events.filter((e) => e.type === 'cv_download').length,
      messages: events.filter((e) => e.type === 'contact_submit').length,
    }
  }

  const views = current.filter((e) => e.type === 'pageview')

  // Série quotidienne
  const series: Stats['series'] = []
  for (let i = 0; i < period; i++) {
    const key = new Date(start.getTime() + i * 86_400_000).toISOString().slice(0, 10)
    const dayViews = views.filter((e) => dayKey(e.createdAt) === key)
    series.push({ date: key, visits: new Set(dayViews.map(visitKey)).size, pageviews: dayViews.length })
  }

  // Une seule provenance par visite : celle de sa première page.
  const firstOfVisit = new Map<string, Event>()
  for (const e of [...views].sort((a, b) => a.createdAt.localeCompare(b.createdAt))) {
    if (!firstOfVisit.has(visitKey(e))) firstOfVisit.set(visitKey(e), e)
  }
  const visitsFirst = [...firstOfVisit.values()]

  const regionNames = new Intl.DisplayNames(['fr'], { type: 'region' })
  const countryName = (code: string | null | undefined) => {
    if (!code) return null
    try {
      return regionNames.of(code) ?? code
    } catch {
      return code
    }
  }

  const newMessages = await payload.count({ collection: 'messages', where: { status: { equals: 'new' } }, overrideAccess: true })

  return {
    period,
    totals: { ...summarize(current), outbound: current.filter((e) => e.type === 'outbound').length },
    previous: summarize(before),
    series,
    pages: count(views.map((e) => e.path), 10),
    sources: count(visitsFirst.map((e) => sourceLabel(e.referrer)), 8),
    devices: count(visitsFirst.map((e) => deviceLabels[e.device ?? ''] ?? null), 3),
    countries: count(visitsFirst.map((e) => countryName(e.country)), 8, 'Non déterminé'),
    languages: count(visitsFirst.map((e) => languageLabels[e.locale ?? ''] ?? e.locale), 4),
    browsers: count(visitsFirst.map((e) => e.browser), 6),
    outbound: count(current.filter((e) => e.type === 'outbound').map((e) => e.target), 6),
    newMessages: newMessages.totalDocs,
    hasData: current.length > 0,
  }
}

/** Libellé lisible d'une adresse de page. */
export function pageLabel(path: string): string {
  const clean = path.replace(/^\/(fr|en)(?=\/|$)/, '') || '/'
  const lang = path.match(/^\/(fr|en)/)?.[1]?.toUpperCase()
  const names: Record<string, string> = {
    '/': 'Accueil',
    '/projets': 'Projets',
    '/services': 'Services',
    '/a-propos': 'À propos',
    '/contact': 'Contact',
    '/mentions-legales': 'Mentions légales',
    '/confidentialite': 'Confidentialité',
  }
  let label = names[clean]
  if (!label && clean.startsWith('/projets/')) label = `Projet · ${clean.split('/')[2]}`
  return `${label ?? clean}${lang ? ` (${lang})` : ''}`
}
