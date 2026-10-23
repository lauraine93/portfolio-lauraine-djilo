import React from 'react'

/** Briques visuelles des statistiques, rendues côté serveur (aucun script tiers). */

export function Trend({ current, previous }: { current: number; previous: number }) {
  if (!previous && !current) return <span style={{ color: 'var(--theme-elevation-500)' }}>—</span>
  if (!previous) return <span style={{ color: 'var(--theme-success-600)' }}>nouveau</span>
  const pct = Math.round(((current - previous) / previous) * 100)
  const color = pct > 0 ? 'var(--theme-success-600)' : pct < 0 ? 'var(--theme-error-600)' : 'var(--theme-elevation-600)'
  return (
    <span style={{ color }}>
      {pct > 0 ? '+' : ''}
      {pct} % vs période précédente
    </span>
  )
}

export function Kpi({
  label,
  value,
  previous,
  hint,
  accent,
}: {
  label: string
  value: number
  previous?: number
  hint?: string
  accent: string
}) {
  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 14,
        padding: '18px 20px',
        display: 'grid',
        gap: 6,
        background: 'var(--theme-elevation-0)',
        borderTop: `4px solid ${accent}`,
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--theme-elevation-650)' }}>{label}</span>
      <strong style={{ fontSize: 32, lineHeight: 1.1 }}>{value.toLocaleString('fr-FR')}</strong>
      <span style={{ fontSize: 12 }}>{previous !== undefined ? <Trend current={value} previous={previous} /> : hint}</span>
    </div>
  )
}

export function DailyChart({
  series,
  primary,
  accent,
}: {
  series: { date: string; visits: number; pageviews: number }[]
  primary: string
  accent: string
}) {
  const W = 960
  const H = 220
  const pad = { l: 36, r: 8, t: 12, b: 28 }
  const max = Math.max(1, ...series.map((s) => s.pageviews))
  const step = (W - pad.l - pad.r) / series.length
  const barW = Math.max(2, step * 0.7)
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max)
  const ticks = [0, Math.ceil(max / 2), max]
  const labelEvery = Math.ceil(series.length / 8)
  const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  const points = series.map((s, i) => `${pad.l + i * step + step / 2},${y(s.visits)}`).join(' ')

  return (
    <figure style={{ margin: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Pages vues et visites par jour" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--theme-elevation-150)" strokeWidth={1} />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill="var(--theme-elevation-600)">
              {t}
            </text>
          </g>
        ))}
        {series.map((s, i) => (
          <g key={s.date}>
            <rect x={pad.l + i * step + (step - barW) / 2} y={y(s.pageviews)} width={barW} height={y(0) - y(s.pageviews)} rx={Math.min(4, barW / 2)} fill={accent}>
              <title>{`${fmt(s.date)} : ${s.pageviews} pages vues, ${s.visits} visites`}</title>
            </rect>
            {i % labelEvery === 0 ? (
              <text x={pad.l + i * step + step / 2} y={H - 8} textAnchor="middle" fontSize={11} fill="var(--theme-elevation-600)">
                {fmt(s.date)}
              </text>
            ) : null}
          </g>
        ))}
        <polyline points={points} fill="none" stroke={primary} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <figcaption style={{ display: 'flex', gap: 20, fontSize: 12, marginTop: 8, color: 'var(--theme-elevation-700)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: accent }} /> Pages vues
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 3, background: primary }} /> Visites
        </span>
      </figcaption>
    </figure>
  )
}

export function RankTable({ title, rows, unit, accent }: { title: string; rows: { label: string; value: number }[]; unit: string; accent: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value))
  return (
    <section style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 14, padding: '18px 20px', display: 'grid', gap: 12, alignContent: 'start' }}>
      <h3 style={{ margin: 0, fontSize: 15 }}>{title}</h3>
      {rows.length ? (
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
          {rows.map((r) => (
            <li key={r.label} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 12, padding: '6px 10px', fontSize: 13, borderRadius: 8, overflow: 'hidden' }}>
              <span aria-hidden="true" style={{ position: 'absolute', inset: 0, width: `${(r.value / max) * 100}%`, background: accent, opacity: 0.22 }} />
              <span style={{ position: 'relative', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
              <strong style={{ position: 'relative' }}>
                {r.value.toLocaleString('fr-FR')} <span style={{ fontWeight: 400, color: 'var(--theme-elevation-600)' }}>{unit}</span>
              </strong>
            </li>
          ))}
        </ol>
      ) : (
        <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-elevation-600)' }}>Pas encore de données.</p>
      )}
    </section>
  )
}
