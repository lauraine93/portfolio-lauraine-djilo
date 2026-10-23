import React from 'react'

import type { Project, ProjectsBlock } from '@/payload-types'
import { localizeHref } from '@/lib/links'
import type { Locale } from '@/lib/locales'

import { ArrowButton } from '../Buttons'
import { ProjectCard } from '../ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects({
  block,
  projects,
  locale,
  exampleLabel,
}: {
  block: ProjectsBlock
  projects: Project[]
  locale: Locale
  exampleLabel: string
}) {
  if (!projects.length) return null
  return (
    <section className="section section--tight-top container projects" id={block.anchor || undefined}>
      <SectionHeading
        eyebrow={block.eyebrow}
        title={block.title}
        aside={
          block.cta?.label ? (
            <ArrowButton href={localizeHref(block.cta.href, locale)} variant="outline" size="sm">
              {block.cta.label}
            </ArrowButton>
          ) : null
        }
      />
      <ul className="projects__grid">
        {projects.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} locale={locale} exampleLabel={exampleLabel} />
          </li>
        ))}
      </ul>
    </section>
  )
}
