import React from 'react'

import type { ContactCtaBlock } from '@/payload-types'
import { localizeHref } from '@/lib/data'
import type { Locale } from '@/lib/locales'

import { ArrowButton } from '../Buttons'

export function ContactCta({ block, locale, email }: { block: ContactCtaBlock; locale: Locale; email: string }) {
  return (
    <section className="container cta-wrap" id={block.anchor || undefined}>
      <div className="cta">
        <div className="cta__text">
          {block.kicker ? <span className="cta__kicker">{block.kicker}</span> : null}
          <h2 className="cta__title">{block.title}</h2>
          {block.showEmail ? (
            <a href={`mailto:${email}`} className="cta__email">
              {email}
            </a>
          ) : null}
        </div>
        {block.cta?.label ? (
          <ArrowButton href={localizeHref(block.cta.href, locale)} variant="primary" size="lg">
            {block.cta.label}
          </ArrowButton>
        ) : null}
      </div>
    </section>
  )
}
