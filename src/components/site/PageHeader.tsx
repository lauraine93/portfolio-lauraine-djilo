import React from 'react'

import { RichTitle } from '@/lib/richTitle'

/** En-tête commun des pages intérieures. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string | null
  title: string
  intro?: string | null
  children?: React.ReactNode
}) {
  return (
    <header className="page-header container">
      {eyebrow ? <span className="eyebrow">— {eyebrow}</span> : null}
      <h1 className="page-header__title">
        <RichTitle text={title} highlightClass="hl" />
      </h1>
      {intro ? <p className="page-header__intro">{intro}</p> : null}
      {children}
    </header>
  )
}
