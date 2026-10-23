import React from 'react'

import { localizeHref } from '@/lib/links'
import type { Locale } from '@/lib/locales'

import { ArrowButton } from './Buttons'

type Cta = { show?: boolean | null; kicker?: string | null; title?: string | null; label?: string | null; href?: string | null } | null | undefined

/** Bandeau d'appel au contact en bas des pages intérieures. */
export function CtaBand({ cta, locale, email }: { cta: Cta; locale: Locale; email: string }) {
  if (!cta?.show || !cta.title) return null
  return (
    <section className="container cta-wrap">
      <div className="cta">
        <div className="cta__text">
          {cta.kicker ? <span className="cta__kicker">{cta.kicker}</span> : null}
          <h2 className="cta__title">{cta.title}</h2>
          <a href={`mailto:${email}`} className="cta__email">
            {email}
          </a>
        </div>
        {cta.label ? (
          <ArrowButton href={localizeHref(cta.href || '/contact', locale)} variant="primary" size="lg">
            {cta.label}
          </ArrowButton>
        ) : null}
      </div>
    </section>
  )
}
