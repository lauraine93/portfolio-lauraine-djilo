import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { CtaBand } from '@/components/site/CtaBand'
import { PageHeader } from '@/components/site/PageHeader'
import { ProjectCard } from '@/components/site/ProjectCard'
import type { Project } from '@/payload-types'
import { getAllProjects, getPagesContent, getSettings } from '@/lib/data'
import { isLocale, ui } from '@/lib/locales'
import { pageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ type?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [pages, settings] = await Promise.all([getPagesContent(locale), getSettings(locale)])
  const p = pages.projects
  return pageMetadata({
    locale,
    path: '/projets',
    title: p?.seo?.title || p?.title?.replace(/\*/g, ''),
    description: p?.seo?.description || p?.intro,
    siteName: settings.fullName,
  })
}

const disciplines: Project['discipline'][] = ['mobile', 'web', 'system', 'other']

export default async function ProjectsPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { type } = await searchParams
  const [pages, settings, projects] = await Promise.all([getPagesContent(locale), getSettings(locale), getAllProjects(locale)])
  const p = pages.projects

  const present = disciplines.filter((d) => projects.some((pr) => pr.discipline === d))
  const active = present.includes(type as Project['discipline']) ? (type as Project['discipline']) : null
  const shown = active ? projects.filter((pr) => pr.discipline === active) : projects
  const labels = p?.filterLabels ?? {}

  return (
    <>
      <PageHeader eyebrow={p?.eyebrow} title={p?.title || 'Projets'} intro={p?.intro} />

      <section className="container section section--page">
        {present.length > 1 ? (
          <nav className="filters" aria-label={p?.allLabel ?? undefined}>
            <Link href={`/${locale}/projets`} className={active ? 'filter' : 'filter filter--active'} aria-current={active ? undefined : 'page'} scroll={false}>
              {p?.allLabel || '—'}
              <span className="filter__count">{projects.length}</span>
            </Link>
            {present.map((d) => (
              <Link
                key={d}
                href={`/${locale}/projets?type=${d}`}
                className={active === d ? 'filter filter--active' : 'filter'}
                aria-current={active === d ? 'page' : undefined}
                scroll={false}
              >
                {labels[d] || d}
                <span className="filter__count">{projects.filter((pr) => pr.discipline === d).length}</span>
              </Link>
            ))}
          </nav>
        ) : null}

        {shown.length ? (
          <ul className="projects__grid">
            {shown.map((pr) => (
              <li key={pr.id}>
                <ProjectCard project={pr} locale={locale} exampleLabel={ui[locale].exampleBadge} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">{p?.emptyText}</p>
        )}
      </section>

      <CtaBand cta={p?.cta} locale={locale} email={settings.email} />
    </>
  )
}
