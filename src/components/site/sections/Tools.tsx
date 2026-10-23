import React from 'react'

import type { Tool, ToolsBlock } from '@/payload-types'

import { SectionHeading } from './SectionHeading'

export function Tools({ block, tools }: { block: ToolsBlock; tools: Tool[] }) {
  if (!tools.length) return null
  return (
    <section className="section container tools" id={block.anchor || undefined}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} center />
      <ul className="tools__list">
        {tools.map((t) => (
          <li key={t.id} className={t.group === 'tech' ? 'tool tool--tech' : 'tool'}>
            {t.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
