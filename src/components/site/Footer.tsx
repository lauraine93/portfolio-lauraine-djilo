import Link from 'next/link'
import React from 'react'

import type { SiteSetting } from '@/payload-types'
import { localizeHref } from '@/lib/data'
import type { Locale } from '@/lib/locales'

export function Footer({ settings, locale }: { settings: SiteSetting; locale: Locale }) {
  const year = new Date().getFullYear()
  const links = [
    ...(settings.socialLinks ?? []).map((l) => ({ label: l.label, href: l.url, external: true })),
    ...(settings.footerLinks ?? []).map((l) => ({ label: l.label, href: localizeHref(l.href, locale), external: false })),
  ]
  return (
    <footer className="footer container">
      <span>
        © {year} {settings.fullName}
        {settings.footerText ? ` — ${settings.footerText}` : ''}
      </span>
      {links.length ? (
        <ul className="footer__links">
          {links.map((l) => (
            <li key={l.href + l.label}>
              {l.external ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href}>{l.label}</Link>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </footer>
  )
}
