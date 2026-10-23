import React from 'react'

import type { AboutBlock } from '@/payload-types'
import { asMedia } from '@/lib/data'

import { ArrowButton } from '../Buttons'
import { MediaImage } from '../MediaImage'
import { SectionHeading } from './SectionHeading'

// Emplacements des étiquettes autour de la photo, dans l'ordre de saisie.
const chipSlots = ['about__chip--1', 'about__chip--2', 'about__chip--3', 'about__chip--4', 'about__chip--5', 'about__chip--6']

export function About({ block, cv }: { block: AboutBlock; cv: string | null }) {
  const photo = asMedia(block.photo)
  return (
    <section className="about" id={block.anchor || undefined}>
      <div className="about__inner container">
        <div className="about__visual">
          <div className="about__stage">
            <div className="about__circle" aria-hidden="true" />
            {photo ? <MediaImage media={photo} className="about__photo" sizes="(max-width: 768px) 70vw, 344px" /> : null}
            {block.chips?.map((chip, i) => (
              <span key={chip.id ?? chip.text} className={`about__chip ${chipSlots[i] ?? ''} chip--${chip.tone ?? 'light'}`}>
                {chip.text}
              </span>
            ))}
          </div>
        </div>
        <div className="about__text">
          <SectionHeading eyebrow={block.eyebrow} title={block.title} dark />
          {block.bio ? <p className="about__bio">{block.bio}</p> : null}
          {block.facts?.length ? (
            <dl className="about__facts">
              {block.facts.map((f) => (
                <div key={f.id ?? f.value} className="about__fact">
                  <dt className="about__fact-value">{f.value}</dt>
                  <dd className="about__fact-label">{f.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="about__actions">
            {cv && block.cvLabel ? (
              <ArrowButton href={cv} variant="accent" icon="down" download>
                {block.cvLabel}
              </ArrowButton>
            ) : null}
            {block.signature ? (
              <span className="about__signature" aria-hidden="true">
                {block.signature}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
