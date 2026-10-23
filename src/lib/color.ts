/** Utilitaires couleur partagés entre le back-office (validation) et le site (thème). */

export const HEX_PATTERN = /^#([0-9a-f]{6})$/i

export function isHex(value: unknown): value is string {
  return typeof value === 'string' && HEX_PATTERN.test(value)
}

function channel(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

export function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** Rapport de contraste WCAG 2.x entre deux couleurs hexadécimales. */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

export type Palette = {
  primary: string
  accent: string
  background: string
  ink: string
  surface: string
}

export type ContrastCheck = {
  id: string
  label: string
  foreground: keyof Palette
  background: keyof Palette
  min: number
}

/**
 * Les associations réellement utilisées par le site.
 * 4,5:1 pour le texte courant, 3:1 pour les grands textes (titres, chiffres clés).
 */
export const contrastChecks: ContrastCheck[] = [
  { id: 'ink-bg', label: 'Texte sur le fond', foreground: 'ink', background: 'background', min: 4.5 },
  { id: 'primary-bg', label: 'Couleur principale sur le fond', foreground: 'primary', background: 'background', min: 4.5 },
  { id: 'bg-primary', label: 'Texte clair sur la couleur principale', foreground: 'background', background: 'primary', min: 4.5 },
  { id: 'ink-accent', label: "Texte sur la couleur d'accent", foreground: 'ink', background: 'accent', min: 4.5 },
  { id: 'accent-primary', label: 'Accent sur la couleur principale (grands textes)', foreground: 'accent', background: 'primary', min: 3 },
  { id: 'ink-surface', label: 'Texte sur les cartes', foreground: 'ink', background: 'surface', min: 4.5 },
]

export function evaluatePalette(p: Partial<Palette>) {
  return contrastChecks.map((check) => {
    const fg = p[check.foreground]
    const bg = p[check.background]
    if (!isHex(fg) || !isHex(bg)) return { ...check, ratio: null as number | null, pass: false }
    const ratio = contrastRatio(fg, bg)
    return { ...check, ratio, pass: ratio >= check.min }
  })
}

export const defaultPalette: Palette = {
  primary: '#2B1E3F',
  accent: '#F4A3C3',
  background: '#FCF5F3',
  ink: '#1D1428',
  surface: '#FFFFFF',
}
