import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Media, Project, Service, SiteSetting, Theme, Tool } from '@/payload-types'

import type { Locale } from './locales'

export const getPayloadClient = cache(async () => getPayload({ config }))

/** Les projets d'exemple ne sont visibles que si SHOW_EXAMPLE_CONTENT=true (développement). */
export const showExampleContent = process.env.SHOW_EXAMPLE_CONTENT === 'true'

export const getTheme = cache(async (): Promise<Theme> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'theme', depth: 0 })
})

export const getSettings = cache(async (locale: Locale): Promise<SiteSetting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', locale, depth: 1 })
})

export const getHome = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'home-page', locale, depth: 1 })
})

export const getServices = cache(async (locale: Locale, limit = 12): Promise<Service[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    locale,
    limit,
    sort: 'order',
    where: { visible: { equals: true } },
  })
  return res.docs
})

export const getFeaturedProjects = cache(async (locale: Locale, limit = 3): Promise<Project[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'projects',
    locale,
    limit,
    sort: 'order',
    depth: 1,
    draft: showExampleContent,
    where: showExampleContent
      ? { featured: { equals: true } }
      : { and: [{ featured: { equals: true } }, { _status: { equals: 'published' } }, { isExample: { not_equals: true } }] },
  })
  return res.docs
})

export const getTools = cache(async (): Promise<Tool[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'tools', limit: 50, sort: 'order', where: { visible: { equals: true } } })
  return res.docs
})

export function asMedia(value: number | Media | null | undefined): Media | null {
  return value && typeof value === 'object' ? value : null
}

export function cvUrl(settings: SiteSetting, locale: Locale): string | null {
  const preferred = asMedia(locale === 'en' ? settings.cvEn : settings.cvFr)
  const fallback = asMedia(locale === 'en' ? settings.cvFr : settings.cvEn)
  return (preferred ?? fallback)?.url ?? null
}

export { localizeHref } from './links'

export const getPagesContent = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'pages-content', locale, depth: 1 })
})

const projectVisibility = () =>
  showExampleContent ? {} : { and: [{ _status: { equals: 'published' } }, { isExample: { not_equals: true } }] }

export const getAllProjects = cache(async (locale: Locale): Promise<Project[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'projects',
    locale,
    limit: 100,
    sort: 'order',
    depth: 1,
    draft: showExampleContent,
    where: projectVisibility() as never,
  })
  return res.docs
})

export const getProject = cache(async (locale: Locale, slug: string): Promise<Project | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'projects',
    locale,
    limit: 1,
    depth: 2,
    draft: showExampleContent,
    where: { and: [{ slug: { equals: slug } }, ...(showExampleContent ? [] : (projectVisibility() as { and: object[] }).and)] } as never,
  })
  return res.docs[0] ?? null
})

export const getCareer = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const visible = { visible: { equals: true } }
  const [experiences, education, certifications] = await Promise.all([
    payload.find({ collection: 'experiences', locale, limit: 50, sort: '-startDate', where: visible }),
    payload.find({ collection: 'education', locale, limit: 20, sort: '-endYear', where: visible }),
    payload.find({ collection: 'certifications', locale, limit: 30, sort: 'order', where: visible }),
  ])
  return { experiences: experiences.docs, education: education.docs, certifications: certifications.docs }
})

export const getLegalPage = cache(async (locale: Locale, slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'legal-pages', locale, limit: 1, where: { slug: { equals: slug } } })
  return res.docs[0] ?? null
})
