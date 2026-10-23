import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = process.env.DATABASE_URL || 'file:./portfolio.db'

// SQLite en local (aucune installation), PostgreSQL en production.
const db = databaseUrl.startsWith('postgres')
  ? postgresAdapter({ pool: { connectionString: databaseUrl } })
  : sqliteAdapter({ client: { url: databaseUrl } })

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Back-office Lauraine Djilo' },
    components: {
      beforeDashboard: ['/components/admin/stats/StatsSummary#StatsSummary'],
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db,
  sharp,
  plugins: [],
})
