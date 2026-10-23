import { describe, expect, it } from 'vitest'

import { contrastRatio, defaultPalette, evaluatePalette } from '@/lib/color'
import { fontFamily } from '@/lib/fonts'
import { localizeHref } from '@/lib/links'

describe('contrastes WCAG', () => {
  it('calcule les rapports de référence', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1)
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5)
  })

  it('valide la palette prune et rose par défaut', () => {
    expect(evaluatePalette(defaultPalette).every((c) => c.pass)).toBe(true)
  })

  it('refuse une palette illisible', () => {
    const checks = evaluatePalette({ ...defaultPalette, primary: '#F4A3C3' })
    expect(checks.some((c) => !c.pass)).toBe(true)
  })
})

describe('liens localisés', () => {
  it('ajoute la langue aux pages et aux ancres', () => {
    expect(localizeHref('/contact', 'fr')).toBe('/fr/contact')
    expect(localizeHref('#projets', 'en')).toBe('/en#projets')
    expect(localizeHref('/', 'en')).toBe('/en')
  })

  it('laisse intacts les liens externes et déjà localisés', () => {
    expect(localizeHref('https://linkedin.com', 'fr')).toBe('https://linkedin.com')
    expect(localizeHref('mailto:a@b.co', 'fr')).toBe('mailto:a@b.co')
    expect(localizeHref('/en/contact', 'fr')).toBe('/en/contact')
  })
})

describe('polices', () => {
  it('retombe sur la première police si la valeur est inconnue', () => {
    expect(fontFamily('inconnue', 'text')).toContain('Plus Jakarta Sans')
    expect(fontFamily('dancing-script', 'script')).toContain('Dancing Script')
  })
})
