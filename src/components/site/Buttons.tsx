import Link from 'next/link'
import React from 'react'

import { ArrowDown, ArrowRight } from './Icons'

type Variant = 'primary' | 'accent' | 'outline' | 'light'

/** Bouton pilule avec rond fléché, comme dans la maquette. */
export function ArrowButton({
  href,
  children,
  variant = 'primary',
  icon = 'right',
  size = 'md',
  download,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  icon?: 'right' | 'down'
  size?: 'sm' | 'md' | 'lg'
  download?: boolean
}) {
  const external = /^https?:/.test(href) || download
  const className = `btn-arrow btn-arrow--${variant} btn-arrow--${size}`
  const content = (
    <>
      <span>{children}</span>
      <span className="btn-arrow__icon">{icon === 'down' ? <ArrowDown /> : <ArrowRight size={size === 'sm' ? 18 : 20} />}</span>
    </>
  )
  if (external) {
    return (
      <a href={href} className={className} download={download || undefined} target={download ? undefined : '_blank'} rel={download ? undefined : 'noopener noreferrer'}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}

export function OutlineButton({ href, children, download }: { href: string; children: React.ReactNode; download?: boolean }) {
  if (download || /^https?:/.test(href)) {
    return (
      <a href={href} className="btn-outline" download={download || undefined}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className="btn-outline">
      {children}
    </Link>
  )
}
