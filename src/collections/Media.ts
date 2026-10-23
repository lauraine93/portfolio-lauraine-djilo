import type { CollectionConfig } from 'payload'

import { publicContentAccess } from '../fields/shared'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Média', plural: 'Médias' },
  admin: { group: 'Contenu', useAsTitle: 'alt' },
  access: publicContentAccess,
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
      localized: true,
      admin: {
        description:
          'Décrit l’image pour les personnes qui ne la voient pas (lecteurs d’écran, image non chargée). Obligatoire dans les deux langues.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'medium', width: 960 },
      { name: 'large', width: 1600 },
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    focalPoint: true,
  },
}
