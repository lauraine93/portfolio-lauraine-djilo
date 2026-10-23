import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { ArrowButton } from '@/components/site/Buttons'
import { CtaBand } from '@/components/site/CtaBand'
import { MediaImage } from '@/components/site/MediaImage'
import { RichText } from '@/components/site/RichText'
import { asMedia, cvUrl, getCareer, getPagesContent, getSettings, getTools } from '@/lib/data'
import { isLocale, type Locale } from '@/lib/locales'
import { RichTitle } from '@/lib/richTitle'
import { pageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [pages, settings] = await Promise.all([getPagesContent(locale), getSettings(locale)])
  const a = pages.about
  return pageMetadata({ locale, path: '/a-propos', title: a?.seo?.title || a?.title?.replace(/\*/g, ''), description: a?.seo?.description || a?.intro, siteName: settings.fullName })
}

function monthYear(iso: string | null | undefined, locale: Locale) {
  if (!iso) return ''
  const s = new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const [pages, settings, career, tools] = await Promise.all([getPagesContent(locale), getSettings(locale), getCareer(locale), getTools()])
  const a = pages.about
  const h = a?.headings ?? {}
  const photo = asMedia(a?.photo)
  const cv = cvUrl(settings, locale)

  return (
    <>
      <header className="container about-hero">
        <div className="about-hero__text">
          {a?.eyebrow ? <span className="eyebrow">— {a.eyebrow}</span> : null}
          <h1 className="page-header__title">
            <RichTitle text={a?.title || settings.fullName} highlightClass="hl" />
          </h1>
          {a?.intro ? <p className="page-header__intro">{a.intro}</p> : null}
          {cv && h.cv ? (
            <div>
              <ArrowButton href={cv} icon="down" download>
                {h.cv}
              </ArrowButton>
            </div>
          ) : null}
        </div>
        {photo ? (
          <div className="about-hero__visual">
            <div className="about-hero__arch">
              <MediaImage media={photo} className="about-hero__photo" priority sizes="(max-width: 768px) 80vw, 420px" />
            </div>
            <span className="about-hero__sticker" aria-hidden="true">
              {settings.brandName}
            </span>
          </div>
        ) : null}
      </header>

      {a?.story ? (
        <section className="container section section--page">
          <div className="text-column">
            <RichText data={a.story} className="prose prose--lg" />
          </div>
        </section>
      ) : null}

      {a?.values?.length ? (
        <section className="container section section--tight-top">
          {h.values ? <h2 className="h2">{h.values}</h2> : null}
          <ul className="values">
            {a.values.map((v, i) => (
              <li key={v.id ?? i} className={i === 1 ? 'value value--dark' : 'value'}>
                <span className="value__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{v.title}</h3>
                {v.text ? <p>{v.text}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="career">
        <div className="container career__inner">
          {career.experiences.length ? (
            <div className="career__col">
              <h2 className="career__title">{h.experience}</h2>
              <ol className="timeline">
                {career.experiences.map((e) => (
                  <li key={e.id} className="timeline__item">
                    <span className="timeline__date">
                      {monthYear(e.startDate, locale)} — {e.current ? h.present : monthYear(e.endDate, locale)}
                    </span>
                    <h3 className="timeline__role">{e.role}</h3>
                    <p className="timeline__place">
                      {e.company}
                      {e.location ? ` · ${e.location}` : ''}
                    </p>
                    {e.description ? <p className="timeline__desc">{e.description}</p> : null}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="career__col">
            {career.education.length ? (
              <>
                <h2 className="career__title">{h.education}</h2>
                <ol className="timeline">
                  {career.education.map((ed) => (
                    <li key={ed.id} className="timeline__item">
                      <span className="timeline__date">
                        {ed.startYear ?? ''}
                        {ed.endYear ? ` — ${ed.endYear}` : ''}
                      </span>
                      <h3 className="timeline__role">
                        {ed.degree}
                        {ed.field ? `, ${ed.field}` : ''}
                      </h3>
                      <p className="timeline__place">{ed.school}</p>
                    </li>
                  ))}
                </ol>
              </>
            ) : null}

            {career.certifications.length ? (
              <>
                <h2 className="career__title career__title--spaced">{h.certifications}</h2>
                <ul className="certs">
                  {career.certifications.map((c) => (
                    <li key={c.id} className="cert">
                      <div>
                        <h3 className="timeline__role">{c.name}</h3>
                        <p className="timeline__place">
                          {c.issuer}
                          {c.date ? ` · ${monthYear(c.date, locale)}` : ''}
                        </p>
                      </div>
                      {c.credentialUrl && h.verify ? (
                        <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert__link">
                          {h.verify} <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className="container section about-extras">
        {tools.length ? (
          <div>
            <h2 className="career__title career__title--ink">{h.tools}</h2>
            <ul className="tools__list tools__list--left">
              {tools.map((t) => (
                <li key={t.id} className={t.group === 'tech' ? 'tool tool--tech' : 'tool'}>
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {a?.languages?.length ? (
          <div>
            <h2 className="career__title career__title--ink">{h.languages}</h2>
            <ul className="languages">
              {a.languages.map((l) => (
                <li key={l.id ?? l.name}>
                  <strong>{l.name}</strong>
                  {l.level ? <span>{l.level}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <CtaBand cta={a?.cta} locale={locale} email={settings.email} />
    </>
  )
}
