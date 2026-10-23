import type { ServerProps } from 'payload'

import Link from 'next/link'
import React from 'react'

import { getStats } from '../../../lib/stats'
import { Kpi } from './StatsWidgets'

/** Résumé des 30 derniers jours, en tête du tableau de bord du back-office. */
export async function StatsSummary({ payload, user }: ServerProps) {
  if (!user || !payload) return null
  const [stats, theme] = await Promise.all([getStats(payload, 30), payload.findGlobal({ slug: 'theme', depth: 0 })])
  const primary = theme.palette?.primary ?? '#2B1E3F'
  const accent = theme.palette?.accent ?? '#F4A3C3'

  return (
    <section style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Bonjour {user.name || ''} — vos 30 derniers jours</h2>
        <Link href="/admin/statistiques" style={{ fontWeight: 600 }}>
          Voir toutes les statistiques →
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
        <Kpi label="Visites" value={stats.totals.visits} previous={stats.previous.visits} accent={primary} />
        <Kpi label="Pages vues" value={stats.totals.pageviews} previous={stats.previous.pageviews} accent={accent} />
        <Kpi label="CV téléchargés" value={stats.totals.cvDownloads} previous={stats.previous.cvDownloads} accent={primary} />
        <Kpi label="Messages non lus" value={stats.newMessages} hint="à traiter dans « Messages »" accent={accent} />
      </div>
    </section>
  )
}

export default StatsSummary
