import React from 'react'

import type { HeroBlock } from '@/payload-types'
import { asMedia, localizeHref } from '@/lib/data'
import type { Locale } from '@/lib/locales'
import { RichTitle } from '@/lib/richTitle'

import { ArrowButton, OutlineButton } from '../Buttons'
import { Cursor } from '../Icons'
import { MediaImage } from '../MediaImage'

export function Hero({ block, locale, cv }: { block: HeroBlock; locale: Locale; cv: string | null }) {
  const portrait = asMedia(block.portrait)
  const secondaryHref = block.secondaryCta?.action === 'link' ? localizeHref(block.secondaryCta?.href, locale) : cv
  const clamp = (n: number) => Math.min(100, Math.max(0, n))

  return (
    <section className="hero container" id={block.anchor || undefined}>
      <div className="hero__text">
        {block.greeting ? (
          <div className="hero__greeting-wrap">
            <p className="hero__greeting">
              <span className="handle handle--tl" aria-hidden="true" />
              <span className="handle handle--tr" aria-hidden="true" />
              <span className="handle handle--bl" aria-hidden="true" />
              <span className="handle handle--br" aria-hidden="true" />
              {block.greeting}
            </p>
            {block.sizeTag ? (
              <span className="hero__size-tag" aria-hidden="true">
                {block.sizeTag}
              </span>
            ) : null}
          </div>
        ) : null}

        <h1 className="hero__title">
          <RichTitle text={block.title} highlightClass="hl" />
        </h1>
        {block.intro ? <p className="hero__intro">{block.intro}</p> : null}

        <div className="hero__ctas">
          {block.primaryCta?.label ? (
            <ArrowButton href={localizeHref(block.primaryCta.href, locale)} size="lg">
              {block.primaryCta.label}
            </ArrowButton>
          ) : null}
          {block.secondaryCta?.label && secondaryHref ? (
            <OutlineButton href={secondaryHref} download={block.secondaryCta.action === 'cv'}>
              {block.secondaryCta.label}
            </OutlineButton>
          ) : null}
        </div>

        {block.badges?.length ? (
          <ul className="hero__badges">
            {block.badges.map((b) => (
              <li key={b.id ?? b.text} className="badge">
                {b.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="hero__visual">
        <div className="hero__stage">
          <div className="hero__circle" aria-hidden="true" />
          {portrait ? (
            <MediaImage media={portrait} className="hero__portrait" priority sizes="(max-width: 768px) 70vw, 346px" />
          ) : null}
          {block.cursors?.map((c) => (
            <div
              key={c.id ?? `${c.x}-${c.y}`}
              className={`cursor cursor--${c.kind ?? 'tag'} cursor--${c.tone ?? 'primary'}`}
              style={{ left: `${clamp(c.x)}%`, top: `${clamp(c.y)}%` }}
            >
              <Cursor className="cursor__arrow" />
              {c.kind === 'bubble' ? (
                <div className="cursor__bubble">
                  {c.name ? <span className="cursor__name">{c.name}</span> : null}
                  {c.text ? <span className="cursor__text">{c.text}</span> : null}
                </div>
              ) : (
                <span className="cursor__tag">{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
