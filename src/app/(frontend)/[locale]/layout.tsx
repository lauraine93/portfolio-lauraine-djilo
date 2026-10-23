import '@fontsource-variable/plus-jakarta-sans/wght.css'
import '@fontsource-variable/plus-jakarta-sans/wght-italic.css'
import '@fontsource-variable/outfit/wght.css'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource-variable/dm-sans/wght-italic.css'
import '@fontsource-variable/manrope/wght.css'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/caveat/wght.css'
import '@fontsource-variable/dancing-script/wght.css'
import '../styles.css'

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

import { Footer } from '@/components/site/Footer'
import { Nav } from '@/components/site/Nav'
import { Tracker } from '@/components/site/Tracker'
import { asMedia, cvUrl, getSettings, getTheme, localizeHref } from '@/lib/data'
import { isLocale, ui, type Locale } from '@/lib/locales'
import { themeToCss } from '@/lib/theme'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const settings = await getSettings(locale)
  const share = asMedia(settings.shareImage)
  const title = settings.metaTitle || `${settings.fullName} — ${settings.jobTitle}`
  return {
    title,
    description: settings.metaDescription || undefined,
    alternates: { languages: { fr: '/fr', en: '/en' } },
    openGraph: { title, description: settings.metaDescription || undefined, images: share?.url ? [share.url] : undefined, locale },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw

  const [settings, theme] = await Promise.all([getSettings(locale), getTheme()])
  if (locale === 'en' && settings.enableEnglish === false) redirect('/fr')

  const t = ui[locale]
  const cv = cvUrl(settings, locale)
  // « cv » est une destination spéciale : le CV de la langue courante (lien masqué tant qu'aucun CV n'est déposé).
  const links = (settings.navItems ?? []).flatMap((l) =>
    l.href === 'cv' ? (cv ? [{ label: l.label, href: cv }] : []) : [{ label: l.label, href: localizeHref(l.href, locale) }],
  )
  const cta = settings.navCta?.label ? { label: settings.navCta.label, href: localizeHref(settings.navCta.href, locale) } : null

  return (
    <html lang={locale} data-motion={settings.animations ?? 'normal'}>
      <head>
        <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          {t.skipToContent}
        </a>
        <div className="page">
          <Nav
            locale={locale}
            brandName={settings.brandName}
            monogram={settings.monogram}
            links={links}
            cta={cta}
            showEnglish={settings.enableEnglish !== false}
            labels={{ mainNav: t.mainNav, language: t.language }}
          />
          <main id="contenu">{children}</main>
          <Footer settings={settings} locale={locale} />
        </div>
        <Tracker locale={locale} enabled={settings.analyticsEnabled !== false} />
      </body>
    </html>
  )
}
