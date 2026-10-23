import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { CtaBand } from '@/components/site/CtaBand'
import { ServiceIcon } from '@/components/site/Icons'
import { PageHeader } from '@/components/site/PageHeader'
import { SectionHeading } from '@/components/site/sections/SectionHeading'
import { getPagesContent, getServices, getSettings } from '@/lib/data'
import { isLocale } from '@/lib/locales'
import { pageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

const workModes = {
  fr: { remote: 'Télétravail', hybrid: 'Hybride', onsite: 'Sur site' },
  en: { remote: 'Remote', hybrid: 'Hybrid', onsite: 'On site' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [pages, settings] = await Promise.all([getPagesContent(locale), getSettings(locale)])
  const s = pages.services
  return pageMetadata({ locale, path: '/services', title: s?.seo?.title || s?.title?.replace(/\*/g, ''), description: s?.seo?.description || s?.intro, siteName: settings.fullName })
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const [pages, settings, services] = await Promise.all([getPagesContent(locale), getSettings(locale), getServices(locale, 24)])
  const s = pages.services
  const opportunities = (settings.opportunityTypes ?? []).filter((o) => o.active)
  const mode = workModes[locale][settings.workMode ?? 'remote']

  return (
    <>
      <PageHeader eyebrow={s?.eyebrow} title={s?.title || 'Services'} intro={s?.intro} />

      <section className="container section section--page">
        <ol className="services-list">
          {services.map((svc, i) => (
            <li key={svc.id} className={svc.highlighted ? 'services-list__item services-list__item--dark' : 'services-list__item'}>
              <span className="services-list__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="service-card__icon">
                <ServiceIcon name={svc.icon} />
              </span>
              <div className="services-list__body">
                <h2 className="service-card__title">{svc.title}</h2>
                <p className="service-card__text">{svc.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {s?.process?.steps?.length ? (
        <section className="process">
          <div className="container process__inner">
            {s.process.title ? <SectionHeading eyebrow={s.process.eyebrow} title={s.process.title} dark /> : null}
            <ol className="process__steps">
              {s.process.steps.map((step, i) => (
                <li key={step.id ?? i} className="process__step">
                  <span className="process__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{step.title}</h3>
                  {step.text ? <p>{step.text}</p> : null}
                  {step.deliverables ? <p className="process__deliverables">{step.deliverables}</p> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {s?.opportunities?.show && opportunities.length ? (
        <section className="container section">
          <div className="opportunities">
            <div className="opportunities__text">
              {s.opportunities.title ? <h2 className="h2">{s.opportunities.title}</h2> : null}
              {s.opportunities.text ? <p className="section-head__aside">{s.opportunities.text}</p> : null}
            </div>
            <ul className="opportunities__list">
              {opportunities.map((o) => (
                <li key={o.id ?? o.label} className="badge badge--lg">
                  {o.label}
                </li>
              ))}
              <li className="badge badge--lg badge--dark">
                {mode}
                {settings.location ? ` · ${settings.location}` : ''}
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand cta={s?.cta} locale={locale} email={settings.email} />
    </>
  )
}
