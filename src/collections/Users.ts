import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Administratrice', plural: 'Administratrices' },
  admin: {
    useAsTitle: 'email',
    group: 'Réglages',
  },
  auth: {
    // Verrouillage après 5 essais ratés pendant 15 minutes.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    // Une seule personne administre le site : pas d'inscription publique.
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [{ name: 'name', type: 'text', label: 'Nom' }],
}
