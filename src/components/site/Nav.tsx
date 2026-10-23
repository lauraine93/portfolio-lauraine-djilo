'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Locale } from '@/lib/locales'

type NavLink = { label: string; href: string }

export function Nav({
  locale,
  brandName,
  monogram,
  links,
  cta,
  showEnglish,
  labels,
}: {
  locale: Locale
  brandName: string
  monogram?: string | null
  links: NavLink[]
  cta?: NavLink | null
  showEnglish: boolean
  labels: { mainNav: string; language: string }
}) {
  const pathname = usePathname() || `/${locale}`
  const [hash, setHash] = React.useState('')

  React.useEffect(() => {
    const update = () => setHash(window.location.hash)
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  const switchTo = (target: Locale) => pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${target}`) || `/${target}`

  const isActive = (href: string) => {
    const [path, anchor] = href.split('#')
    if (anchor) return pathname === path && hash === `#${anchor}`
    if (path === `/${locale}`) return pathname === path && !hash
    return pathname.startsWith(path)
  }

  return (
    <header className="site-header">
      <nav aria-label={labels.mainNav} className="nav">
        <Link href={`/${locale}`} className="nav__brand">
          <span className="nav__monogram" aria-hidden="true">
            {monogram || brandName.charAt(0)}
          </span>
          <span className="nav__brand-name">
            {brandName}
            <span className="nav__dot">.</span>
          </span>
        </Link>

        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className={isActive(link.href) ? 'nav__link nav__link--active' : 'nav__link'}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          {showEnglish ? (
            <div role="group" aria-label={labels.language} className="lang">
              {(['fr', 'en'] as const).map((l) => (
                <Link
                  key={l}
                  href={switchTo(l)}
                  hrefLang={l}
                  lang={l}
                  className={l === locale ? 'lang__item lang__item--active' : 'lang__item'}
                  aria-current={l === locale ? 'true' : undefined}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          ) : null}
          {cta ? (
            <Link href={cta.href} className="nav__cta">
              {cta.label}
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
