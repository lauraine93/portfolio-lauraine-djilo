import type { CollectionConfig } from 'payload'

import { publicContentAccess } from '../fields/shared'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  labels: { singular: 'Page simple', plural: 'Pages simples' },
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
    description: 'Mentions légales, politique de confidentialité ou toute autre page de texte.',
  },
  access: publicContentAccess,
  fields: [
    { name: 'title', type: 'text', label: 'Titre', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Adresse de la page',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'Par exemple : mentions-legales (accessible sur /fr/mentions-legales).' },
      validate: (value: unknown) =>
        typeof value === 'string' && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)
          ? ['projets', 'services', 'a-propos', 'contact'].includes(value)
            ? 'Cette adresse est déjà utilisée par une page du site.'
            : true
          : 'Utilisez uniquement des lettres minuscules, des chiffres et des tirets.',
    },
    { name: 'content', type: 'richText', label: 'Contenu', localized: true, required: true },
  ],
}
