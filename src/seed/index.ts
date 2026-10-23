/**
 * Remplit le back-office avec le contenu de départ, en ligne de commande :
 *
 *   SEED_ADMIN_EMAIL=… SEED_ADMIN_PASSWORD=… npm run seed
 *
 * En production, le même contenu s’installe depuis le back-office (bouton sur le tableau de bord).
 */
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedContent } from './content'

const payload = await getPayload({ config })
try {
  await seedContent(payload, { email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD })
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
