import type { Block } from 'payload'

/** Blocs disponibles pour composer une étude de cas. */

const TextSection: Block = {
  slug: 'textSection',
  interfaceName: 'CaseTextBlock',
  labels: { singular: 'Texte', plural: 'Textes' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Étape', localized: true, admin: { description: 'Par exemple : 01 — Le problème' } },
        { name: 'heading', type: 'text', label: 'Titre', localized: true, required: true },
      ],
    },
    { name: 'body', type: 'richText', label: 'Texte', localized: true },
  ],
}

const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'CaseImageBlock',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', label: 'Image', required: true },
    { name: 'caption', type: 'text', label: 'Légende', localized: true },
    {
      name: 'size',
      type: 'select',
      label: 'Largeur',
      defaultValue: 'wide',
      options: [
        { label: 'Pleine largeur', value: 'wide' },
        { label: 'Largeur du texte', value: 'text' },
      ],
    },
    { name: 'framed', type: 'checkbox', label: 'Sur fond de couleur (pour les écrans mobiles)', defaultValue: false },
  ],
}

const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'CaseGalleryBlock',
  labels: { singular: 'Galerie', plural: 'Galeries' },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media', label: 'Image', required: true },
        { name: 'caption', type: 'text', label: 'Légende', localized: true },
      ],
    },
  ],
}

const QuoteBlock: Block = {
  slug: 'quote',
  interfaceName: 'CaseQuoteBlock',
  labels: { singular: 'Citation', plural: 'Citations' },
  fields: [
    { name: 'text', type: 'textarea', label: 'Citation', localized: true, required: true },
    { name: 'author', type: 'text', label: 'Auteur ou source', localized: true },
  ],
}

const CalloutBlock: Block = {
  slug: 'callout',
  interfaceName: 'CaseCalloutBlock',
  labels: { singular: 'Encadré', plural: 'Encadrés' },
  fields: [
    {
      name: 'kind',
      type: 'select',
      label: 'Type',
      defaultValue: 'collaboration',
      options: [
        { label: 'Collaboration avec l’équipe technique', value: 'collaboration' },
        { label: 'Décision de design', value: 'decision' },
        { label: 'Résultat', value: 'result' },
        { label: 'Apprentissage', value: 'learning' },
      ],
    },
    { name: 'title', type: 'text', label: 'Titre', localized: true, required: true },
    { name: 'text', type: 'textarea', label: 'Texte', localized: true, required: true },
  ],
}

const KeyPointsBlock: Block = {
  slug: 'keyPoints',
  interfaceName: 'CaseKeyPointsBlock',
  labels: { singular: 'Points clés', plural: 'Points clés' },
  fields: [
    { name: 'heading', type: 'text', label: 'Titre', localized: true, required: true },
    {
      name: 'items',
      type: 'array',
      label: 'Points',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', label: 'Titre', localized: true, required: true },
        { name: 'text', type: 'textarea', label: 'Texte', localized: true },
      ],
    },
  ],
}

const PrototypeBlock: Block = {
  slug: 'prototype',
  interfaceName: 'CasePrototypeBlock',
  labels: { singular: 'Prototype Figma', plural: 'Prototypes Figma' },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'Lien de partage Figma',
      required: true,
      validate: (v: unknown) =>
        typeof v === 'string' && /^https:\/\/(www\.)?figma\.com\//.test(v) ? true : 'Collez un lien commençant par https://www.figma.com/',
    },
    { name: 'title', type: 'text', label: 'Titre (accessibilité)', localized: true, required: true },
    {
      name: 'format',
      type: 'select',
      label: 'Format',
      defaultValue: 'desktop',
      options: [
        { label: 'Ordinateur (16:10)', value: 'desktop' },
        { label: 'Mobile (9:16)', value: 'mobile' },
      ],
    },
  ],
}

export const caseStudyBlocks = [TextSection, ImageBlock, GalleryBlock, QuoteBlock, CalloutBlock, KeyPointsBlock, PrototypeBlock]
