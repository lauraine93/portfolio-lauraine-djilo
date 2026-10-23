import type { Endpoint, Payload } from 'payload'

import { seedContent } from '../seed/content'

/** Le site est « vide » tant que la page d'accueil n'a aucune section. */
export async function isSiteEmpty(payload: Payload): Promise<boolean> {
  const home = await payload.findGlobal({ slug: 'home-page', depth: 0, draft: true })
  return !home.sections?.length
}

/**
 * POST /api/setup/seed — installe le contenu de départ depuis le back-office.
 * Réservé à une personne connectée, et seulement tant que le site est vide :
 * il ne peut jamais écraser un contenu déjà saisi.
 */
export const setupSeedEndpoint: Endpoint = {
  path: '/setup/seed',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Connexion requise.' }, { status: 401 })
    if (!(await isSiteEmpty(req.payload))) {
      return Response.json({ error: 'Le site contient déjà du contenu : installation annulée.' }, { status: 409 })
    }
    try {
      await seedContent(req.payload)
      return Response.json({ ok: true })
    } catch (err) {
      req.payload.logger.error({ err, msg: '[installation] échec du contenu de départ' })
      return Response.json({ error: 'L’installation a échoué. Consultez les journaux de Vercel.' }, { status: 500 })
    }
  },
}

/**
 * Au démarrage : crée le compte administratrice à partir des variables ADMIN_EMAIL et ADMIN_PASSWORD,
 * uniquement s'il n'existe encore aucun compte. Sans effet ensuite.
 */
export async function createFirstAdmin(payload: Payload) {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return
  const { totalDocs } = await payload.count({ collection: 'users', overrideAccess: true })
  if (totalDocs > 0) return
  await payload.create({ collection: 'users', overrideAccess: true, data: { email, password, name: 'Lauraine Djilo' } })
  payload.logger.info(`Compte administratrice créé : ${email}`)
}
