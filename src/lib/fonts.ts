/**
 * Polices proposées dans le back-office. Elles sont auto-hébergées (Fontsource) :
 * aucune requête vers un service tiers, et seules les polices utilisées sont téléchargées.
 */
export const textFonts = [
  { value: 'plus-jakarta-sans', label: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans Variable'" },
  { value: 'outfit', label: 'Outfit', family: "'Outfit Variable'" },
  { value: 'dm-sans', label: 'DM Sans', family: "'DM Sans Variable'" },
  { value: 'manrope', label: 'Manrope', family: "'Manrope Variable'" },
  { value: 'fraunces', label: 'Fraunces (serif)', family: "'Fraunces Variable'" },
] as const

export const scriptFonts = [
  { value: 'caveat', label: 'Caveat', family: "'Caveat Variable'" },
  { value: 'dancing-script', label: 'Dancing Script', family: "'Dancing Script Variable'" },
] as const

export type TextFont = (typeof textFonts)[number]['value']
export type ScriptFont = (typeof scriptFonts)[number]['value']

export function fontFamily(value: string | null | undefined, kind: 'text' | 'script'): string {
  const list: readonly { value: string; family: string }[] = kind === 'text' ? textFonts : scriptFonts
  const found = list.find((f) => f.value === value) ?? list[0]
  return `${found.family}, ${kind === 'text' ? 'system-ui, sans-serif' : 'cursive'}`
}
