import { NextResponse, type NextRequest } from 'next/server'

/**
 * « / » redirige vers la langue du visiteur (anglais si son navigateur le préfère, sinon français).
 * Les réglages « Activer l’anglais » et « Proposer la langue du navigateur » sont lus depuis le back-office.
 */
export async function proxy(request: NextRequest) {
  let target = 'fr'
  try {
    const res = await fetch(new URL('/api/globals/site-settings?depth=0', request.url), {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    })
    const settings = res.ok ? ((await res.json()) as { enableEnglish?: boolean; detectBrowserLanguage?: boolean }) : {}
    const accept = request.headers.get('accept-language') ?? ''
    const prefersEnglish = /^en\b/i.test(accept.trim())
    if (settings.enableEnglish !== false && settings.detectBrowserLanguage !== false && prefersEnglish) target = 'en'
  } catch {
    // En cas d'indisponibilité de l'API, on sert le français.
  }
  return NextResponse.redirect(new URL(`/${target}`, request.url))
}

export const config = { matcher: ['/'] }
