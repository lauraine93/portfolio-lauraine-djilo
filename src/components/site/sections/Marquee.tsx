import React from 'react'

import type { MarqueeBlock } from '@/payload-types'

const durations = { slow: '60s', normal: '36s', fast: '20s' } as const

export function Marquee({ block }: { block: MarqueeBlock }) {
  const items = block.items?.map((i) => i.text).filter(Boolean) ?? []
  if (!items.length) return null
  const speed = block.speed ?? 'normal'
  const animated = speed !== 'static'

  const row = (hidden: boolean) => (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((text, i) => (
        <React.Fragment key={`${text}-${i}`}>
          <span>{text}</span>
          <span className="marquee__star" aria-hidden="true">
            ✱
          </span>
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div
      className={animated ? 'marquee marquee--animated' : 'marquee'}
      id={block.anchor || undefined}
      style={
        {
          '--marquee-tilt': `${block.tilt ?? -1.6}deg`,
          '--marquee-duration': animated ? durations[speed] : undefined,
        } as React.CSSProperties
      }
    >
      <div className="marquee__track">
        {row(false)}
        {animated ? row(true) : null}
      </div>
    </div>
  )
}
