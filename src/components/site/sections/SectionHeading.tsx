import React from 'react'

import { RichTitle } from '@/lib/richTitle'

export function SectionHeading({
  eyebrow,
  title,
  aside,
  center = false,
  dark = false,
}: {
  eyebrow?: string | null
  title: string
  aside?: React.ReactNode
  center?: boolean
  dark?: boolean
}) {
  return (
    <div className={center ? 'section-head section-head--center' : 'section-head'}>
      <div className="section-head__titles">
        {eyebrow ? <span className={dark ? 'eyebrow eyebrow--dark' : 'eyebrow'}>— {eyebrow}</span> : null}
        <h2 className="h2">
          <RichTitle text={title} highlightClass={dark ? 'hl-dark' : 'hl'} />
        </h2>
      </div>
      {aside}
    </div>
  )
}
