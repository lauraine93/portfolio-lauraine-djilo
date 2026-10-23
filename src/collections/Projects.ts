import { APIError, type CollectionConfig } from 'payload'

import { caseStudyBlocks } from '../blocks/caseStudy'
import { orderField, publicContentAccess } from '../fields/shared'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projet', plural: 'Projets' },
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
    defaultColumns: ['title', 'discipline', 'year', 'featured', 'isExample', '_status'],
    description:
      'Vos projets et études de cas. Les projets marqués « Exemple » servent pendant le développement et ne peuvent pas être publiés.',
  },
  access: publicContentAccess,
  versions: { drafts: true, maxPerDoc: 25 },
  defaultSort: 'order',
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.isExample && data?._status === 'published') {
          throw new APIError(
            'Ce projet est un contenu d’exemple : remplacez-le par un vrai projet (et décochez « Exemple ») avant de le publier.',
            400,
            undefined,
            true,
          )
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Titre', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Adresse de la page',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Par exemple : tontina. Lettres minuscules, chiffres et tirets.' },
      validate: (value: unknown) =>
        typeof value === 'string' && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)
          ? true
          : 'Utilisez uniquement des lettres minuscules, des chiffres et des tirets.',
    },
    {
      name: 'isExample',
      type: 'checkbox',
      label: 'Contenu d’exemple',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Affiche le badge « Exemple » et empêche la publication.' },
    },
    { name: 'featured', type: 'checkbox', label: 'Mettre en avant sur l’accueil', defaultValue: true, admin: { position: 'sidebar' } },
    orderField,
    {
      type: 'row',
      fields: [
        {
          name: 'discipline',
          type: 'select',
          label: 'Type de projet',
          required: true,
          defaultValue: 'mobile',
          options: [
            { label: 'Application mobile', value: 'mobile' },
            { label: 'Site ou application web', value: 'web' },
            { label: 'Design system', value: 'system' },
            { label: 'Autre', value: 'other' },
          ],
        },
        { name: 'year', type: 'number', label: 'Année', min: 2000, max: 2100 },
      ],
    },
    {
      name: 'frameLabel',
      type: 'text',
      label: 'Étiquette de cadre (style Figma)',
      localized: true,
      admin: { description: 'Affichée au-dessus de la vignette, par exemple : # Tontina — Mobile' },
    },
    { name: 'summary', type: 'textarea', label: 'Résumé', required: true, localized: true },
    { name: 'tags', type: 'text', label: 'Disciplines', localized: true, admin: { description: 'Par exemple : Recherche · UX · UI mobile' } },
    {
      type: 'row',
      fields: [
        { name: 'cover', type: 'upload', relationTo: 'media', label: 'Image de couverture' },
        {
          name: 'coverTone',
          type: 'select',
          label: 'Fond de la vignette',
          defaultValue: 'accent',
          options: [
            { label: 'Couleur d’accent', value: 'accent' },
            { label: 'Couleur principale', value: 'primary' },
            { label: 'Fond doux', value: 'soft' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Fiche du projet (en tête de l’étude de cas)',
      fields: [
        { name: 'intro', type: 'textarea', label: 'Chapeau', localized: true, admin: { description: 'Deux ou trois phrases qui résument le défi et la réponse.' } },
        {
          name: 'facts',
          type: 'group',
          label: 'Informations clés',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'client', type: 'text', label: 'Client ou contexte', localized: true },
                { name: 'role', type: 'text', label: 'Mon rôle', localized: true },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'duration', type: 'text', label: 'Durée', localized: true },
                { name: 'team', type: 'text', label: 'Équipe', localized: true },
              ],
            },
            { name: 'tools', type: 'text', label: 'Outils', admin: { description: 'Par exemple : Figma, FigJam, Maze' } },
          ],
        },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Étude de cas',
      admin: {
        description:
          'Construisez le récit bloc par bloc : contexte, problème, recherche, décisions, collaboration avec l’équipe technique, résultat, apprentissages.',
      },
      blocks: caseStudyBlocks,
    },
    {
      name: 'links',
      type: 'array',
      label: 'Liens (prototype, site, Behance…)',
      fields: [
        { name: 'label', type: 'text', label: 'Texte', localized: true, required: true },
        { name: 'url', type: 'text', label: 'Adresse', required: true },
      ],
    },
  ],
}
