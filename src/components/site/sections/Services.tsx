import React from 'react'

import type { Service, ServicesBlock } from '@/payload-types'

import { ServiceIcon } from '../Icons'
import { SectionHeading } from './SectionHeading'

export function Services({ block, services }: { block: ServicesBlock; services: Service[] }) {
  if (!services.length) return null
  return (
    <section className="section container services" id={block.anchor || undefined}>
      <SectionHeading
        eyebrow={block.eyebrow}
        title={block.title}
        aside={block.intro ? <p className="section-head__aside">{block.intro}</p> : null}
      />
      <ul className="services__grid">
        {services.map((s) => (
          <li key={s.id} className={s.highlighted ? 'service-card service-card--dark' : 'service-card'}>
            <span className="service-card__icon">
              <ServiceIcon name={s.icon} />
            </span>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__text">{s.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
