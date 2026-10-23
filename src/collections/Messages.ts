import type { CollectionConfig } from 'payload'

import { authenticated } from '../fields/shared'

export const Messages: CollectionConfig = {
  slug: 'messages',
  labels: { singular: 'Message', plural: 'Messages' },
  admin: {
    group: 'Messages',
    useAsTitle: 'name',
    defaultColumns: ['name', 'subject', 'status', 'createdAt'],
    description: 'Demandes reçues par le formulaire de contact.',
  },
  // Les messages ne sont créés que par l'action serveur du formulaire (avec validation et anti-spam).
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Nom', required: true },
        { name: 'email', type: 'email', label: 'E-mail', required: true },
      ],
    },
    { name: 'subject', type: 'text', label: 'Objet' },
    { name: 'message', type: 'textarea', label: 'Message', required: true },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      defaultValue: 'new',
      options: [
        { label: 'Nouveau', value: 'new' },
        { label: 'Lu', value: 'read' },
        { label: 'Répondu', value: 'answered' },
        { label: 'Archivé', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'locale',
      type: 'text',
      label: 'Langue du visiteur',
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
}
