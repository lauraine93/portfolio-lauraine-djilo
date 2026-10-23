import { describe, expect, it } from 'vitest'

import { dailyVisitorId, deviceFromUA, isBot, normalizePath, referrerHost, sourceLabel } from '@/lib/analytics'
import { pageLabel, parsePeriod } from '@/lib/stats'

const chrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36'
const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'

describe('mesure d’audience', () => {
  it('écarte les robots', () => {
    expect(isBot('Googlebot/2.1')).toBe(true)
    expect(isBot('')).toBe(true)
    expect(isBot(chrome)).toBe(false)
  })

  it('reconnaît le type d’appareil', () => {
    expect(deviceFromUA(chrome)).toBe('desktop')
    expect(deviceFromUA(iphone)).toBe('mobile')
  })

  it('produit un identifiant anonyme stable sur la journée, différent le lendemain', () => {
    const day1 = new Date('2026-10-23T08:00:00Z')
    const day1b = new Date('2026-10-23T20:00:00Z')
    const day2 = new Date('2026-10-24T08:00:00Z')
    const a = dailyVisitorId('1.2.3.4', chrome, 'secret', day1)
    expect(dailyVisitorId('1.2.3.4', chrome, 'secret', day1b)).toBe(a)
    expect(dailyVisitorId('1.2.3.4', chrome, 'secret', day2)).not.toBe(a)
    expect(a).not.toContain('1.2.3.4')
  })

  it('ne garde que le domaine de provenance, et ignore le site lui-même', () => {
    expect(referrerHost('https://www.linkedin.com/feed/?x=1', 'lauraine.dev')).toBe('linkedin.com')
    expect(referrerHost('https://lauraine.dev/fr', 'lauraine.dev')).toBeNull()
    expect(sourceLabel('lnkd.in')).toBe('LinkedIn')
    expect(sourceLabel(null)).toBe('Accès direct')
  })

  it('refuse les chemins du back-office et nettoie les paramètres', () => {
    expect(normalizePath('/admin/collections')).toBeNull()
    expect(normalizePath('/fr/projets?type=web#x')).toBe('/fr/projets')
    expect(normalizePath('https://evil.test')).toBeNull()
  })

  it('libellés et périodes', () => {
    expect(pageLabel('/fr/projets/tontina')).toBe('Projet · tontina (FR)')
    expect(pageLabel('/en')).toBe('Accueil (EN)')
    expect(parsePeriod('90')).toBe(90)
    expect(parsePeriod('12')).toBe(30)
  })
})
