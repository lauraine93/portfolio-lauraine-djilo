import React from 'react'

import type { Media } from '@/payload-types'

/** Image issue de la médiathèque, avec variantes responsives générées par Payload. */
export function MediaImage({
  media,
  className,
  sizes = '(max-width: 768px) 90vw, 480px',
  priority = false,
  altOverride,
}: {
  media: Media | null
  className?: string
  sizes?: string
  priority?: boolean
  altOverride?: string
}) {
  if (!media?.url) return null
  const candidates = [media.sizes?.thumbnail, media.sizes?.medium, media.sizes?.large]
    .filter((s): s is NonNullable<typeof s> => Boolean(s?.url && s?.width))
    .map((s) => `${s.url} ${s.width}w`)
  if (media.width) candidates.push(`${media.url} ${media.width}w`)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.url}
      srcSet={candidates.length ? candidates.join(', ') : undefined}
      sizes={candidates.length ? sizes : undefined}
      width={media.width ?? undefined}
      height={media.height ?? undefined}
      alt={altOverride ?? media.alt ?? ''}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  )
}
