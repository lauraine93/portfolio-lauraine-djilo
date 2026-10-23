import type { Metadata } from 'next'

import type { Locale } from './locales'

/** Métadonnées d'une page intérieure, avec alternance de langue. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  siteName,
}: {
  locale: Locale
  path: string
  title?: string | null
  description?: string | null
  siteName: string
}): Metadata {
  const fullTitle = title ? `${title} — ${siteName}` : siteName
  return {
    title: fullTitle,
    description: description || undefined,
    alternates: { canonical: `/${locale}${path}`, languages: { fr: `/fr${path}`, en: `/en${path}` } },
    openGraph: { title: fullTitle, description: description || undefined, locale },
  }
}
