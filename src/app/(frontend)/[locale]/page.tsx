import { notFound } from 'next/navigation'
import React from 'react'

import { About } from '@/components/site/sections/About'
import { ContactCta } from '@/components/site/sections/ContactCta'
import { Hero } from '@/components/site/sections/Hero'
import { Marquee } from '@/components/site/sections/Marquee'
import { Projects } from '@/components/site/sections/Projects'
import { Services } from '@/components/site/sections/Services'
import { Tools } from '@/components/site/sections/Tools'
import { cvUrl, getFeaturedProjects, getHome, getServices, getSettings, getTools } from '@/lib/data'
import { isLocale, ui } from '@/lib/locales'

export const dynamic = 'force-dynamic'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [home, settings] = await Promise.all([getHome(locale), getSettings(locale)])
  const sections = (home.sections ?? []).filter((s) => !s.hidden)
  const cv = cvUrl(settings, locale)

  // Les données des collections ne sont chargées que si la section correspondante est affichée.
  const servicesBlock = sections.find((s) => s.blockType === 'services')
  const projectsBlock = sections.find((s) => s.blockType === 'projects')
  const [services, projects, tools] = await Promise.all([
    servicesBlock ? getServices(locale, servicesBlock.limit ?? 3) : [],
    projectsBlock ? getFeaturedProjects(locale, projectsBlock.limit ?? 3) : [],
    sections.some((s) => s.blockType === 'tools') ? getTools() : [],
  ])

  return (
    <>
      {sections.map((block) => {
        const key = block.id ?? block.blockType
        switch (block.blockType) {
          case 'hero':
            return <Hero key={key} block={block} locale={locale} cv={cv} />
          case 'marquee':
            return <Marquee key={key} block={block} />
          case 'services':
            return <Services key={key} block={block} services={services} />
          case 'projects':
            return <Projects key={key} block={block} projects={projects} locale={locale} exampleLabel={ui[locale].exampleBadge} />
          case 'about':
            return <About key={key} block={block} cv={cv} />
          case 'tools':
            return <Tools key={key} block={block} tools={tools} />
          case 'contactCta':
            return <ContactCta key={key} block={block} locale={locale} email={settings.email} />
          default:
            return null
        }
      })}
    </>
  )
}
