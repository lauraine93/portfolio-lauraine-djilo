import crypto from 'crypto'

/**
 * Mesure d'audience respectueuse de la vie privée :
 * - aucun cookie, aucune adresse IP enregistrée ;
 * - un identifiant de visiteur anonyme, recalculé chaque jour à partir d'un sel secret
 *   (impossible de suivre une personne d'un jour à l'autre ni de retrouver son IP) ;
 * - seules des données agrégeables sont conservées : page, langue, provenance, type d'appareil, pays.
 */

export const eventTypes = [
  { label: 'Page vue', value: 'pageview' },
  { label: 'Téléchargement du CV', value: 'cv_download' },
  { label: 'Message envoyé', value: 'contact_submit' },
  { label: 'Lien externe', value: 'outbound' },
] as const

export type EventType = (typeof eventTypes)[number]['value']

const BOT_PATTERN = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|playwright|puppeteer/i

export function isBot(userAgent: string): boolean {
  return !userAgent || BOT_PATTERN.test(userAgent)
}

export function deviceFromUA(ua: string): 'mobile' | 'tablet' | 'desktop' {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return 'tablet'
  if (/mobi|iphone|android/i.test(ua)) return 'mobile'
  return 'desktop'
}

export function browserFromUA(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge'
  if (/opr\/|opera/i.test(ua)) return 'Opera'
  if (/samsungbrowser/i.test(ua)) return 'Samsung Internet'
  if (/chrome|crios/i.test(ua)) return 'Chrome'
  if (/firefox|fxios/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua)) return 'Safari'
  return 'Autre'
}

/** Identifiant anonyme du jour : empreinte non réversible, change toutes les 24 h. */
export function dailyVisitorId(ip: string, userAgent: string, secret: string, date = new Date()): string {
  const day = date.toISOString().slice(0, 10)
  const salt = crypto.createHmac('sha256', secret || 'portfolio').update(day).digest('hex')
  return crypto.createHash('sha256').update(`${salt}|${ip}|${userAgent}`).digest('hex').slice(0, 20)
}

/** Ne garde que le nom de domaine de provenance, jamais l'adresse complète. */
export function referrerHost(referrer: string | null | undefined, ownHost: string | null): string | null {
  if (!referrer) return null
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '')
    if (ownHost && host === ownHost.replace(/^www\./, '').split(':')[0]) return null
    return host || null
  } catch {
    return null
  }
}

/** Regroupe les sources les plus courantes sous un nom lisible. */
export function sourceLabel(host: string | null | undefined): string {
  if (!host) return 'Accès direct'
  if (/linkedin|lnkd\.in/.test(host)) return 'LinkedIn'
  if (/google\./.test(host)) return 'Google'
  if (/bing\.com/.test(host)) return 'Bing'
  if (/duckduckgo/.test(host)) return 'DuckDuckGo'
  if (/behance/.test(host)) return 'Behance'
  if (/dribbble/.test(host)) return 'Dribbble'
  if (/github/.test(host)) return 'GitHub'
  if (/facebook|fb\.com|l\.facebook/.test(host)) return 'Facebook'
  if (/instagram/.test(host)) return 'Instagram'
  if (/t\.co$|twitter|x\.com/.test(host)) return 'X (Twitter)'
  if (/whatsapp|wa\.me/.test(host)) return 'WhatsApp'
  return host
}

export function clientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

export function countryFromHeaders(headers: Headers): string | null {
  const c = headers.get('x-vercel-ip-country') || headers.get('cf-ipcountry') || headers.get('x-country-code')
  return c && /^[A-Z]{2}$/i.test(c) && c.toUpperCase() !== 'XX' ? c.toUpperCase() : null
}

export function normalizePath(path: unknown): string | null {
  if (typeof path !== 'string' || !path.startsWith('/') || path.length > 300) return null
  if (path.startsWith('/admin') || path.startsWith('/api')) return null
  return path.split('?')[0].split('#')[0] || '/'
}
