'use client'

import { useFormFields } from '@payloadcms/ui'
import React from 'react'

import { evaluatePalette, type Palette } from '../../lib/color'

/** Aperçu en direct de la palette et contrôle des contrastes WCAG, dans l'écran « Thème ». */
export const ThemePreview: React.FC = () => {
  const palette = useFormFields(([fields]) => ({
    primary: fields['palette.primary']?.value as string,
    accent: fields['palette.accent']?.value as string,
    background: fields['palette.background']?.value as string,
    ink: fields['palette.ink']?.value as string,
    surface: fields['palette.surface']?.value as string,
  })) as Partial<Palette>

  const checks = evaluatePalette(palette)
  const allPass = checks.every((c) => c.pass)
  const p = palette

  return (
    <div style={{ margin: '8px 0 32px', display: 'grid', gap: 16 }}>
      <div
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--theme-elevation-150)',
          background: p.background,
          color: p.ink,
          padding: 24,
          display: 'grid',
          gap: 16,
        }}
      >
        <div style={{ background: p.primary, color: p.background, borderRadius: 999, padding: '10px 18px', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
          <span>
            Lauraine<span style={{ color: p.accent }}>.</span>
          </span>
          <span style={{ color: p.accent }}>Accueil</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>
          Je suis{' '}
          <em style={{ color: p.primary, background: `linear-gradient(transparent 60%, ${p.accent} 60%, ${p.accent} 92%, transparent 92%)` }}>Lauraine Djilo</em>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ background: p.primary, color: p.background, borderRadius: 999, padding: '10px 18px', fontWeight: 700 }}>Voir mes projets</span>
          <span style={{ background: p.accent, color: p.ink, borderRadius: 999, padding: '10px 18px', fontWeight: 700 }}>Télécharger mon CV</span>
          <span style={{ background: p.surface, color: p.ink, borderRadius: 12, padding: '10px 18px', border: `1px solid ${p.primary}22` }}>Carte</span>
        </div>
      </div>

      <div role="status" style={{ display: 'grid', gap: 6 }}>
        <strong style={{ color: allPass ? 'var(--theme-success-500)' : 'var(--theme-error-500)' }}>
          {allPass
            ? 'Contrastes conformes : la palette peut être enregistrée.'
            : 'Certaines associations sont trop peu contrastées : l’enregistrement sera refusé.'}
        </strong>
        {checks.map((c) => (
          <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
            <span>{c.label}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', color: c.pass ? 'var(--theme-success-500)' : 'var(--theme-error-500)' }}>
              {c.ratio ? `${c.ratio.toFixed(2)}:1` : '—'} {c.pass ? '✓' : `✕ (min ${c.min}:1)`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThemePreview
