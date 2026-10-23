import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { ArrowButton } from '@/components/site/Buttons'
import { CaseStudyBlocks } from '@/components/site/CaseStudyBlocks'
import { CtaBand } from '@/components/site/CtaBand'
import { ProjectCover } from '@/components/site/ProjectCard'
import { getAllProjects, getPagesContent, getProject, getSettings } from '@/lib/data'
import { isLocale, ui } from '@/lib/locales'
import { pageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [project, settings] = await Promise.all([getProject(locale, slug), getSettings(locale)])
  if (!project) return {}
  return pageMetadata({ locale, path: `/projets/${slug}`, title: project.title, description: project.summary, siteName: settings.fullName })
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const [project, pages, settings, all] = await Promise.all([
    getProject(locale, slug),
    getPagesContent(locale),
    getSettings(locale),
    getAllProjects(locale),
  ])
  if (!project) notFound()

  const labels = pages.projects?.caseStudyLabels ?? {}
  const f = project.facts ?? {}
  const facts = [
    { label: labels.client, value: f.client },
    { label: labels.role, value: f.role },
    { label: labels.duration, value: f.duration },
    { label: labels.team, value: f.team },
    { label: labels.tools, value: f.tools },
    { label: labels.year, value: project.year ? String(project.year) : null },
  ].filter((x) => x.value && x.label)

  const index = all.findIndex((p) => p.id === project.id)
  const next = all.length > 1 ? all[(index + 1) % all.length] : null

  return (
    <article>
      <header className="case-header container">
        <Link href={`/${locale}/projets`} className="back-link">
          <span aria-hidden="true">←</span> {labels.back}
        </Link>
        {project.frameLabel ? <span className="project-card__frame">{project.frameLabel}</span> : null}
        <h1 className="page-header__title">{project.title}</h1>
        {project.intro || project.summary ? <p className="page-header__intro">{project.intro || project.summary}</p> : null}
        {project.tags ? <p className="case-header__tags">{project.tags}</p> : null}
        {facts.length ? (
          <dl className="case-facts">
            {facts.map((x) => (
              <div key={x.label} className="case-facts__item">
                <dt>{x.label}</dt>
                <dd>{x.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <div className="container case-cover">
        <ProjectCover project={project} exampleLabel={ui[locale].exampleBadge} sizes="(max-width: 1240px) 92vw, 1192px" priority />
      </div>

      {project.content?.length ? (
        <div className="container">
          <CaseStudyBlocks blocks={project.content} />
        </div>
      ) : null}

      {project.links?.length ? (
        <div className="container case-links">
          {project.links.map((l) => (
            <ArrowButton key={l.id ?? l.url} href={l.url} variant="outline" size="sm">
              {l.label}
            </ArrowButton>
          ))}
        </div>
      ) : null}

      {next && next.id !== project.id ? (
        <nav className="container next-project" aria-label={labels.next ?? undefined}>
          <Link href={`/${locale}/projets/${next.slug}`} className="next-project__link">
            <span className="eyebrow">{labels.next}</span>
            <span className="next-project__title">
              {next.title} <span aria-hidden="true">→</span>
            </span>
            <span className="project-card__summary">{next.summary}</span>
          </Link>
        </nav>
      ) : null}

      <CtaBand cta={pages.projects?.cta} locale={locale} email={settings.email} />
    </article>
  )
}
