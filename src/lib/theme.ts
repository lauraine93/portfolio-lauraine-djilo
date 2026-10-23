import type { Theme } from '@/payload-types'

import { defaultPalette, isHex } from './color'
import { fontFamily } from './fonts'

/** Transforme les réglages du thème en variables CSS, injectées sur <html>. */
export function themeToCss(theme: Theme | null | undefined): string {
  const p = theme?.palette
  const pick = (v: string | null | undefined, d: string) => (isHex(v) ? v : d)
  const primary = pick(p?.primary, defaultPalette.primary)
  const accent = pick(p?.accent, defaultPalette.accent)
  const background = pick(p?.background, defaultPalette.background)
  const ink = pick(p?.ink, defaultPalette.ink)
  const surface = pick(p?.surface, defaultPalette.surface)

  const buttonStyle = theme?.shape?.buttonStyle ?? 'pill'
  const btnRadius = buttonStyle === 'pill' ? '999px' : buttonStyle === 'rounded' ? '14px' : '4px'
  const cardRadius = Math.min(40, Math.max(0, theme?.shape?.cardRadius ?? 24))

  const vars: Record<string, string> = {
    '--c-primary': primary,
    '--c-accent': accent,
    '--c-bg': background,
    '--c-ink': ink,
    '--c-surface': surface,
    '--r-btn': btnRadius,
    '--r-card': `${cardRadius}px`,
    '--f-heading': fontFamily(theme?.typography?.headingFont, 'text'),
    '--f-body': fontFamily(theme?.typography?.bodyFont, 'text'),
    '--f-script': fontFamily(theme?.typography?.scriptFont, 'script'),
  }
  return `:root{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(';')}}`
}
