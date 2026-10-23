import type { Block, Field, GlobalConfig } from 'payload'

import { anyone, authenticated, highlightHelp, linkFields } from '../fields/shared'

const common: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'hidden',
        type: 'checkbox',
        label: 'Masquer cette section',
        admin: { description: 'La section reste configurée mais n’apparaît plus sur le site.' },
      },
      {
        name: 'anchor',
        type: 'text',
        label: 'Ancre',
        admin: { description: 'Identifiant pour les liens du menu, par exemple : projets (lien « #projets »).' },
      },
    ],
  },
]

const heading = (defaults?: { eyebrow?: boolean }): Field[] => [
  ...(defaults?.eyebrow === false ? [] : [{ name: 'eyebrow', type: 'text', label: 'Sur-titre', localized: true } as Field]),
  { name: 'title', type: 'text', label: 'Titre', localized: true, required: true, admin: { description: highlightHelp } },
]

const HeroBlock: Block = {
  interfaceName: 'HeroBlock',
  slug: 'hero',
  labels: { singular: 'Accueil (hero)', plural: 'Accueil (hero)' },
  fields: [
    ...common,
    {
      type: 'row',
      fields: [
        { name: 'greeting', type: 'text', label: 'Étiquette sélectionnée', localized: true, admin: { description: 'Le petit texte encadré comme dans Figma.' } },
        { name: 'sizeTag', type: 'text', label: 'Étiquette de dimension', admin: { description: 'Par exemple : Hug × Hug. Laisser vide pour la masquer.' } },
      ],
    },
    { name: 'title', type: 'text', label: 'Titre', localized: true, required: true, admin: { description: highlightHelp } },
    { name: 'intro', type: 'textarea', label: 'Texte d’introduction', localized: true },
    {
      type: 'row',
      fields: [
        { name: 'primaryCta', type: 'group', label: 'Bouton principal', fields: linkFields() },
        {
          name: 'secondaryCta',
          type: 'group',
          label: 'Bouton secondaire',
          fields: [
            { name: 'label', type: 'text', label: 'Texte du lien', localized: true },
            {
              name: 'action',
              type: 'select',
              label: 'Action',
              defaultValue: 'cv',
              options: [
                { label: 'Télécharger le CV (selon la langue)', value: 'cv' },
                { label: 'Lien personnalisé', value: 'link' },
              ],
            },
            { name: 'href', type: 'text', label: 'Destination', admin: { condition: (_, s) => s?.action === 'link' } },
          ],
        },
      ],
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Étiquettes de confiance',
      fields: [{ name: 'text', type: 'text', label: 'Texte', localized: true, required: true }],
    },
    { name: 'portrait', type: 'upload', relationTo: 'media', label: 'Portrait détouré (PNG ou WebP transparent)' },
    {
      name: 'cursors',
      type: 'array',
      label: 'Curseurs et bulles (style Figma)',
      admin: { description: 'Position en pourcentage de la zone photo : 0 = bord gauche ou haut, 100 = bord droit ou bas.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'kind',
              type: 'select',
              label: 'Forme',
              defaultValue: 'tag',
              options: [
                { label: 'Étiquette de nom', value: 'tag' },
                { label: 'Bulle de commentaire', value: 'bubble' },
              ],
            },
            {
              name: 'tone',
              type: 'select',
              label: 'Couleur',
              defaultValue: 'primary',
              options: [
                { label: 'Principale', value: 'primary' },
                { label: 'Claire', value: 'light' },
                { label: 'Accent', value: 'accent' },
              ],
            },
          ],
        },
        { name: 'name', type: 'text', label: 'Nom ou rôle', localized: true, admin: { description: 'Petit texte au-dessus de la bulle, ou contenu de l’étiquette.' } },
        { name: 'text', type: 'text', label: 'Texte de la bulle', localized: true, admin: { condition: (_, s) => s?.kind === 'bubble' } },
        {
          type: 'row',
          fields: [
            { name: 'x', type: 'number', label: 'Position horizontale (%)', min: 0, max: 100, defaultValue: 0, required: true },
            { name: 'y', type: 'number', label: 'Position verticale (%)', min: 0, max: 100, defaultValue: 50, required: true },
          ],
        },
      ],
    },
  ],
}

const MarqueeBlock: Block = {
  interfaceName: 'MarqueeBlock',
  slug: 'marquee',
  labels: { singular: 'Bandeau défilant', plural: 'Bandeaux défilants' },
  fields: [
    ...common,
    {
      name: 'items',
      type: 'array',
      label: 'Mots',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', label: 'Texte', localized: true, required: true }],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'speed',
          type: 'select',
          label: 'Vitesse',
          defaultValue: 'normal',
          options: [
            { label: 'Immobile', value: 'static' },
            { label: 'Lente', value: 'slow' },
            { label: 'Normale', value: 'normal' },
            { label: 'Rapide', value: 'fast' },
          ],
        },
        { name: 'tilt', type: 'number', label: 'Inclinaison (degrés)', defaultValue: -1.6, min: -5, max: 5 },
      ],
    },
  ],
}

const ServicesBlock: Block = {
  interfaceName: 'ServicesBlock',
  slug: 'services',
  labels: { singular: 'Services', plural: 'Services' },
  fields: [
    ...common,
    ...heading(),
    { name: 'intro', type: 'textarea', label: 'Texte d’accompagnement', localized: true },
    { name: 'limit', type: 'number', label: 'Nombre de services affichés', defaultValue: 3, min: 1, max: 12 },
  ],
}

const ProjectsBlock: Block = {
  interfaceName: 'ProjectsBlock',
  slug: 'projects',
  labels: { singular: 'Projets', plural: 'Projets' },
  fields: [
    ...common,
    ...heading(),
    { name: 'cta', type: 'group', label: 'Lien « Tous les projets »', fields: linkFields() },
    { name: 'limit', type: 'number', label: 'Nombre de projets affichés', defaultValue: 3, min: 1, max: 12 },
  ],
}

const AboutBlock: Block = {
  interfaceName: 'AboutBlock',
  slug: 'about',
  labels: { singular: 'À propos', plural: 'À propos' },
  fields: [
    ...common,
    ...heading(),
    { name: 'bio', type: 'textarea', label: 'Biographie', localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Photo (recadrée en cercle)' },
    {
      name: 'chips',
      type: 'array',
      label: 'Étiquettes autour de la photo',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'text', type: 'text', label: 'Texte', localized: true, required: true },
            {
              name: 'tone',
              type: 'select',
              label: 'Couleur',
              defaultValue: 'light',
              options: [
                { label: 'Claire', value: 'light' },
                { label: 'Foncée', value: 'dark' },
                { label: 'Accent', value: 'accent' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'facts',
      type: 'array',
      label: 'Faits clés',
      maxRows: 4,
      admin: { description: 'Uniquement des faits vérifiables : diplôme, certification, langues…' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', label: 'Valeur', localized: true, required: true },
            { name: 'label', type: 'text', label: 'Légende', localized: true, required: true },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'cvLabel', type: 'text', label: 'Texte du bouton CV', localized: true },
        { name: 'signature', type: 'text', label: 'Signature manuscrite' },
      ],
    },
  ],
}

const ToolsBlock: Block = {
  interfaceName: 'ToolsBlock',
  slug: 'tools',
  labels: { singular: 'Outils', plural: 'Outils' },
  fields: [...common, ...heading()],
}

const ContactBlock: Block = {
  interfaceName: 'ContactCtaBlock',
  slug: 'contactCta',
  labels: { singular: 'Appel au contact', plural: 'Appels au contact' },
  fields: [
    ...common,
    { name: 'kicker', type: 'text', label: 'Accroche manuscrite', localized: true },
    { name: 'title', type: 'text', label: 'Titre', localized: true, required: true },
    { name: 'showEmail', type: 'checkbox', label: 'Afficher l’adresse e-mail', defaultValue: true },
    { name: 'cta', type: 'group', label: 'Bouton', fields: linkFields() },
  ],
}

export const homeBlocks = [HeroBlock, MarqueeBlock, ServicesBlock, ProjectsBlock, AboutBlock, ToolsBlock, ContactBlock]

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Page d’accueil',
  admin: {
    group: 'Apparence',
    description: 'Ajoutez, masquez et réordonnez les sections de la page d’accueil par glisser-déposer.',
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 30, drafts: true },
  fields: [
    {
      name: 'sections',
      type: 'blocks',
      label: 'Sections',
      blocks: homeBlocks,
    },
  ],
}
