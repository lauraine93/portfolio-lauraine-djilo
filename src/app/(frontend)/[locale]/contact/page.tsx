import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { ContactForm } from '@/components/site/ContactForm'
import { getPagesContent, getSettings } from '@/lib/data'
import { isLocale, ui } from '@/lib/locales'
import { RichTitle } from '@/lib/richTitle'
import { pageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [pages, settings] = await Promise.all([getPagesContent(locale), getSettings(locale)])
  const c = pages.contact
  return pageMetadata({
    locale,
    path: '/contact',
    title: c?.seo?.title || c?.title?.replace(/\*/g, '') || ui[locale].contactTitle,
    description: c?.seo?.description || c?.intro,
    siteName: settings.fullName,
  })
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const [pages, settings] = await Promise.all([getPagesContent(locale), getSettings(locale)])
  const c = pages.contact
  const t = ui[locale]
  const subjects = (settings.opportunityTypes ?? []).filter((o) => o.active).map((o) => o.label)

  return (
    <section className="container contact-page">
      <div className="contact-page__intro">
        {c?.eyebrow ? <span className="cta__kicker">{c.eyebrow}</span> : null}
        <h1 className="page-header__title">
          <RichTitle text={c?.title || t.contactTitle} highlightClass="hl" />
        </h1>
        {c?.intro ? <p className="page-header__intro">{c.intro}</p> : null}
        <a href={`mailto:${settings.email}`} className="cta__email">
          {settings.email}
        </a>
        {c?.note ? <p className="contact-page__note">{c.note}</p> : null}
      </div>
      <ContactForm locale={locale} subjects={subjects} labels={t.form} />
    </section>
  )
}
