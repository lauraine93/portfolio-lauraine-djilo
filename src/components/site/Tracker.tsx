'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

const ENDPOINT = '/api/analytics-events/collect'

function send(data: Record<string, string | undefined>) {
  try {
    const body = JSON.stringify(data)
    const blob = new Blob([body], { type: 'application/json' })
    if (!navigator.sendBeacon?.(ENDPOINT, blob)) {
      void fetch(ENDPOINT, { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true })
    }
  } catch {
    // La mesure d'audience ne doit jamais gêner la navigation.
  }
}

/** Envoie une « page vue » à chaque changement de page, et suit les téléchargements de CV et liens externes. */
export function Tracker({ locale, enabled }: { locale: string; enabled: boolean }) {
  const pathname = usePathname()
  const firstReferrer = React.useRef<string | undefined>(undefined)

  React.useEffect(() => {
    if (!enabled || !pathname) return
    // La provenance n'a de sens que pour la première page de la visite.
    const referrer = firstReferrer.current === undefined ? document.referrer : ''
    firstReferrer.current = referrer
    send({ type: 'pageview', path: pathname, locale, referrer })
  }, [pathname, locale, enabled])

  React.useEffect(() => {
    if (!enabled) return
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a')
      if (!link?.href) return
      const url = new URL(link.href, window.location.href)
      if (link.hasAttribute('download') || /\/api\/media\/file\/.+\.pdf$/i.test(url.pathname)) {
        send({ type: 'cv_download', path: window.location.pathname, locale, target: url.pathname.split('/').pop() })
      } else if (url.host !== window.location.host && /^https?:/.test(url.protocol)) {
        send({ type: 'outbound', path: window.location.pathname, locale, target: url.hostname.replace(/^www\./, '') })
      }
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [locale, enabled])

  return null
}
