import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'
import { asMedia } from '@/lib/data'
import type { Locale } from '@/lib/locales'

import { MediaImage } from './MediaImage'

/** Vignette de remplacement tant qu'aucune image de couverture n'est déposée. */
export function CoverPlaceholder({ discipline }: { discipline: Project['discipline'] }) {
  if (discipline === 'web') {
    return (
      <div className="mock-browser" aria-hidden="true">
        <div className="mock-browser__bar">
          <span />
          <span />
          <span />
        </div>
        <div className="mock-browser__body" />
      </div>
    )
  }
  if (discipline === 'system') {
    return (
      <div className="mock-system" aria-hidden="true">
        <div className="mock-system__a" />
        <div className="mock-system__b" />
        <div className="mock-system__c" />
        <div className="mock-system__c" />
        <div className="mock-system__d" />
        <div className="mock-system__e" />
      </div>
    )
  }
  return <div className="mock-phone" aria-hidden="true" />
}

export function ProjectCover({ project, exampleLabel, sizes, priority }: { project: Project; exampleLabel: string; sizes: string; priority?: boolean }) {
  const cover = asMedia(project.cover)
  return (
    <div
      className={`project-card__cover project-card__cover--${cover ? 'image' : project.coverTone ?? 'accent'} project-card__cover--${project.discipline}`}
    >
      {cover ? <MediaImage media={cover} className="project-card__img" sizes={sizes} priority={priority} /> : <CoverPlaceholder discipline={project.discipline} />}
      {project.isExample ? <span className="project-card__example">{exampleLabel}</span> : null}
    </div>
  )
}

export function ProjectCard({ project, locale, exampleLabel }: { project: Project; locale: Locale; exampleLabel: string }) {
  return (
    <Link href={`/${locale}/projets/${project.slug}`} className="project-card">
      {project.frameLabel ? (
        <span className="project-card__frame" aria-hidden="true">
          {project.frameLabel}
        </span>
      ) : null}
      <ProjectCover project={project} exampleLabel={exampleLabel} sizes="(max-width: 768px) 90vw, 400px" />
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__summary">{project.summary}</p>
      {project.tags ? <span className="project-card__tags">{project.tags}</span> : null}
    </Link>
  )
}
