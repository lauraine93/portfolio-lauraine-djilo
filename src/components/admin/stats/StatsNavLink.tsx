'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

/** Lien « Statistiques » dans le menu latéral du back-office. */
export function StatsNavLink() {
  const active = usePathname()?.startsWith('/admin/statistiques')
  return (
    <Link
      href="/admin/statistiques"
      className="nav__link"
      aria-current={active ? 'page' : undefined}
      style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: active ? 600 : 400, marginBottom: 12 }}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
      <span className="nav__link-label">Statistiques</span>
    </Link>
  )
}

export default StatsNavLink
