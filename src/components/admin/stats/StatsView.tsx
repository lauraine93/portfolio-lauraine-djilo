import type { AdminViewServerProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import { getStats, pageLabel, parsePeriod, periods } from '../../../lib/stats'
import { DailyChart, Kpi, RankTable } from './StatsWidgets'

/** Écran « Statistiques » du back-office : /admin/statistiques */
export async function StatsView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, permissions, visibleEntities, locale } = initPageResult
  if (!req.user) redirect('/admin/login')

  const period = parsePeriod(searchParams?.periode)
  const [stats, theme, settings] = await Promise.all([
    getStats(req.payload, period),
    req.payload.findGlobal({ slug: 'theme', depth: 0 }),
    req.payload.findGlobal({ slug: 'site-settings', depth: 0 }),
  ])
  const primary = theme.palette?.primary ?? '#2B1E3F'
  const accent = theme.palette?.accent ?? '#F4A3C3'
  const conversion = stats.totals.visits ? ((stats.totals.messages / stats.totals.visits) * 100).toFixed(1) : '0'

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user}
      visibleEntities={visibleEntities}
      req={req}
    >
      <Gutter>
        <div style={{ display: 'grid', gap: 28, padding: '24px 0 64px' }}>
          <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 16 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <h1 style={{ margin: 0 }}>Statistiques</h1>
              <p style={{ margin: 0, color: 'var(--theme-elevation-650)', maxWidth: 680 }}>
                Mesure d’audience intégrée au site : sans cookie, sans adresse IP enregistrée. Vos propres visites, quand vous êtes
                connectée, ne sont pas comptées.
                {settings.analyticsEnabled === false ? ' La collecte est actuellement désactivée dans les réglages.' : ''}
              </p>
            </div>
            <nav aria-label="Période" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {periods.map((p) => (
                <Link
                  key={p.value}
                  href={`/admin/statistiques?periode=${p.value}`}
                  aria-current={p.value === period ? 'page' : undefined}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    border: '1px solid var(--theme-elevation-200)',
                    background: p.value === period ? primary : 'transparent',
                    color: p.value === period ? '#fff' : 'var(--theme-text)',
                  }}
                >
                  {p.label}
                </Link>
              ))}
            </nav>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <Kpi label="Visites" value={stats.totals.visits} previous={stats.previous.visits} accent={primary} />
            <Kpi label="Pages vues" value={stats.totals.pageviews} previous={stats.previous.pageviews} accent={accent} />
            <Kpi label="CV téléchargés" value={stats.totals.cvDownloads} previous={stats.previous.cvDownloads} accent={primary} />
            <Kpi label="Messages reçus" value={stats.totals.messages} previous={stats.previous.messages} accent={accent} />
            <Kpi
              label="Taux de contact"
              value={Number(conversion)}
              hint={`% des visites ont abouti à un message · ${stats.newMessages} message(s) non lu(s)`}
              accent={primary}
            />
          </div>

          <section style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 14, padding: '20px 20px 16px', display: 'grid', gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 17 }}>Fréquentation jour par jour</h2>
            {stats.hasData ? (
              <DailyChart series={stats.series} primary={primary} accent={accent} />
            ) : (
              <p style={{ margin: 0, color: 'var(--theme-elevation-650)' }}>
                Aucune visite enregistrée sur cette période. Les données apparaissent dès les premières visites du site en ligne.
              </p>
            )}
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            <RankTable title="Pages les plus vues" rows={stats.pages.map((r) => ({ ...r, label: pageLabel(r.label) }))} unit="vues" accent={accent} />
            <RankTable title="Provenance des visites" rows={stats.sources} unit="visites" accent={accent} />
            <RankTable title="Pays" rows={stats.countries} unit="visites" accent={accent} />
            <RankTable title="Appareils" rows={stats.devices} unit="visites" accent={accent} />
            <RankTable title="Langue choisie" rows={stats.languages} unit="visites" accent={accent} />
            <RankTable title="Navigateurs" rows={stats.browsers} unit="visites" accent={accent} />
            <RankTable title="Liens externes cliqués" rows={stats.outbound} unit="clics" accent={accent} />
          </div>

          <p style={{ margin: 0, fontSize: 12, color: 'var(--theme-elevation-600)' }}>
            Une « visite » correspond à un visiteur anonyme sur une journée. Le pays dépend de l’hébergeur (Vercel, Cloudflare…) ;
            il apparaît « Non déterminé » si l’hébergeur ne le fournit pas. Données conservées {settings.analyticsRetentionMonths ?? 13} mois.
          </p>
        </div>
      </Gutter>
    </DefaultTemplate>
  )
}

export default StatsView
