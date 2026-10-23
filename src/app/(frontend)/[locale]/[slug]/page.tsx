import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageHeader } from '@/components/site/PageHeader'
import { RichText } from '@/components/site/RichText'
import { getLegalPage, getSettings } from '@/lib/data'
import { isLocale } from '@/lib/locales'
import { pageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [page, settings] = await Promise.all([getLegalPage(locale, slug), getSettings(locale)])
  if (!page) return {}
  return { ...pageMetadata({ locale, path: `/${slug}`, title: page.title, siteName: settings.fullName }), robots: { index: false } }
}

/** Pages simples gérées dans le back-office : mentions légales, confidentialité… */
export default async function SimplePage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const page = await getLegalPage(locale, slug)
  if (!page) notFound()
  const updated = new Date(page.updatedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      <PageHeader title={page.title} intro={locale === 'fr' ? `Mise à jour le ${updated}` : `Last updated ${updated}`} />
      <section className="container section section--page">
        <div className="text-column">
          <RichText data={page.content} className="prose" />
        </div>
      </section>
    </>
  )
}
