import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { AnalyticsEvents } from './collections/AnalyticsEvents'
import { Certifications, Education, Experiences, Services, Tools } from './collections/Career'
import { LegalPages } from './collections/LegalPages'
import { Media } from './collections/Media'
import { Messages } from './collections/Messages'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { HomePage } from './globals/HomePage'
import { PagesContent } from './globals/PagesContent'
import { SiteSettings } from './globals/SiteSettings'
import { Theme } from './globals/Theme'
import { migrations } from './migrations'
import { createFirstAdmin, setupSeedEndpoint } from './endpoints/setup'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = process.env.DATABASE_URL || 'file:./portfolio.db'

// Adresse publique : celle fournie, sinon le domaine de production Vercel.
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')

// SQLite en local (aucune installation), PostgreSQL en production.
// En production, les tables sont créées et mises à jour par les migrations du dossier src/migrations.
const db = databaseUrl.startsWith('postgres')
  ? postgresAdapter({
      pool: { connectionString: databaseUrl },
      migrationDir: path.resolve(dirname, 'migrations'),
      prodMigrations: migrations,
      // Le schéma n'évolue que par migrations (npm run migrate:create), jamais automatiquement.
      push: false,
    })
  : sqliteAdapter({ client: { url: databaseUrl } })

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Back-office Lauraine Djilo' },
    components: {
      beforeDashboard: ['/components/admin/SetupBanner#SetupBanner', '/components/admin/stats/StatsSummary#StatsSummary'],
      afterNavLinks: ['/components/admin/stats/StatsNavLink#StatsNavLink'],
      views: {
        statistiques: {
          Component: '/components/admin/stats/StatsView#StatsView',
          path: '/statistiques',
          meta: { title: 'Statistiques' },
        },
      },
    },
  },
  i18n: {
    supportedLanguages: { fr, en },
    fallbackLanguage: 'fr',
  },
  localization: {
    locales: [
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  collections: [Projects, Services, Experiences, Education, Certifications, Tools, LegalPages, Media, Messages, AnalyticsEvents, Users],
  globals: [HomePage, PagesContent, Theme, SiteSettings],
  endpoints: [setupSeedEndpoint],
  onInit: async (payload) => {
    await createFirstAdmin(payload)
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db,
  sharp,
  plugins: [
    // Images et CV stockés sur Vercel Blob dès que le jeton est présent (sinon : dossier local « media »).
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      alwaysInsertFields: true,
      // Envoi direct du navigateur vers le stockage : pas de limite de taille de Vercel.
      clientUploads: true,
    }),
  ],
})
