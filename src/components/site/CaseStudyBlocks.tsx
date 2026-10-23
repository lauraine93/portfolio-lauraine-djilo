import React from 'react'

import type { Project } from '@/payload-types'
import { asMedia } from '@/lib/data'

import { MediaImage } from './MediaImage'
import { RichText } from './RichText'

type Block = NonNullable<Project['content']>[number]

const calloutIcons: Record<string, string> = {
  collaboration: '</>',
  decision: '◆',
  result: '✓',
  learning: '✱',
}

/** Rend les blocs d'une étude de cas, dans l'ordre choisi dans le back-office. */
export function CaseStudyBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="case">
      {blocks.map((block) => {
        const key = block.id ?? block.blockType
        switch (block.blockType) {
          case 'textSection':
            return (
              <section key={key} className="case__text">
                {block.eyebrow ? <span className="case__step">{block.eyebrow}</span> : null}
                <h2 className="case__heading">{block.heading}</h2>
                <RichText data={block.body} />
              </section>
            )
          case 'image': {
            const media = asMedia(block.media)
            if (!media) return null
            return (
              <figure key={key} className={`case__figure case__figure--${block.size ?? 'wide'}${block.framed ? ' case__figure--framed' : ''}`}>
                <MediaImage media={media} sizes={block.size === 'text' ? '(max-width: 800px) 92vw, 760px' : '(max-width: 1240px) 92vw, 1192px'} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            )
          }
          case 'gallery':
            return (
              <div key={key} className="case__gallery">
                {block.images?.map((img) => {
                  const media = asMedia(img.media)
                  return media ? (
                    <figure key={img.id ?? media.id} className="case__figure">
                      <MediaImage media={media} sizes="(max-width: 768px) 92vw, 590px" />
                      {img.caption ? <figcaption>{img.caption}</figcaption> : null}
                    </figure>
                  ) : null
                })}
              </div>
            )
          case 'quote':
            return (
              <figure key={key} className="case__quote">
                <blockquote>{block.text}</blockquote>
                {block.author ? <figcaption>— {block.author}</figcaption> : null}
              </figure>
            )
          case 'callout':
            return (
              <aside key={key} className={`case__callout case__callout--${block.kind ?? 'collaboration'}`}>
                <span className="case__callout-icon" aria-hidden="true">
                  {calloutIcons[block.kind ?? 'collaboration']}
                </span>
                <div>
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                </div>
              </aside>
            )
          case 'keyPoints':
            return (
              <section key={key} className="case__points">
                <h2 className="case__heading">{block.heading}</h2>
                <ol>
                  {block.items?.map((item, i) => (
                    <li key={item.id ?? i}>
                      <span className="case__point-num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3>{item.title}</h3>
                      {item.text ? <p>{item.text}</p> : null}
                    </li>
                  ))}
                </ol>
              </section>
            )
          case 'prototype':
            return (
              <figure key={key} className={`case__prototype case__prototype--${block.format ?? 'desktop'}`}>
                <iframe
                  title={block.title}
                  src={`https://www.figma.com/embed?embed_host=portfolio&url=${encodeURIComponent(block.url)}`}
                  loading="lazy"
                  allowFullScreen
                />
              </figure>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
