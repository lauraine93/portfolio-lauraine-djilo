import type { Locale } from './locales'

/** Ajoute la langue aux liens internes : « /contact » devient « /fr/contact », « #projets » devient « /fr#projets ». */
export function localizeHref(href: string | null | undefined, locale: Locale): string {
  if (!href) return `/${locale}`
  if (/^(https?:|mailto:|tel:)/.test(href)) return href
  if (href.startsWith('#')) return `/${locale}${href}`
  if (/^\/(fr|en)(\/|$|#)/.test(href)) return href
  if (href.startsWith('/')) return `/${locale}${href === '/' ? '' : href}`
  return href
}
