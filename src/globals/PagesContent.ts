import type { Field, GlobalConfig } from 'payload'

import { anyone, authenticated, highlightHelp, linkFields } from '../fields/shared'

const header = (titleDefault?: string): Field[] => [
  { name: 'eyebrow', type: 'text', label: 'Sur-titre', localized: true },
  { name: 'title', type: 'text', label: 'Titre', localized: true, required: true, defaultValue: titleDefault, admin: { description: highlightHelp } },
  { name: 'intro', type: 'textarea', label: 'Introduction', localized: true },
]

const seo: Field = {
  name: 'seo',
  type: 'group',
  label: 'Référencement',
  fields: [
    { name: 'title', type: 'text', label: 'Titre pour les moteurs de recherche', localized: true },
    { name: 'description', type: 'textarea', label: 'Description', localized: true, maxLength: 170 },
  ],
}

const cta: Field = {
  name: 'cta',
  type: 'group',
  label: 'Appel au contact en bas de page',
  fields: [
    { name: 'show', type: 'checkbox', label: 'Afficher', defaultValue: true },
    { name: 'kicker', type: 'text', label: 'Accroche manuscrite', localized: true },
    { name: 'title', type: 'text', label: 'Titre', localized: true },
    { type: 'row', fields: linkFields().map((f) => ({ ...f, required: false }) as Field) },
  ],
}

export const PagesContent: GlobalConfig = {
  slug: 'pages-content',
  label: 'Pages',
  admin: {
    group: 'Apparence',
    description: 'Textes, sections et référencement des pages Projets, Services, À propos et Contact.',
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 30 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'projects',
          label: 'Projets',
          fields: [
            ...header(),
            { name: 'allLabel', type: 'text', label: 'Libellé du filtre « Tous »', localized: true },
            {
              name: 'filterLabels',
              type: 'group',
              label: 'Libellés des filtres',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'mobile', type: 'text', label: 'Applications mobiles', localized: true },
                    { name: 'web', type: 'text', label: 'Web', localized: true },
                    { name: 'system', type: 'text', label: 'Design systems', localized: true },
                    { name: 'other', type: 'text', label: 'Autres', localized: true },
                  ],
                },
              ],
            },
            { name: 'emptyText', type: 'text', label: 'Texte quand aucun projet n’est publié', localized: true },
            {
              name: 'caseStudyLabels',
              type: 'group',
              label: 'Libellés des études de cas',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'client', type: 'text', label: '« Client »', localized: true },
                    { name: 'role', type: 'text', label: '« Rôle »', localized: true },
                    { name: 'duration', type: 'text', label: '« Durée »', localized: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'team', type: 'text', label: '« Équipe »', localized: true },
                    { name: 'tools', type: 'text', label: '« Outils »', localized: true },
                    { name: 'year', type: 'text', label: '« Année »', localized: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'back', type: 'text', label: '« Tous les projets »', localized: true },
                    { name: 'next', type: 'text', label: '« Projet suivant »', localized: true },
                  ],
                },
              ],
            },
            cta,
            seo,
          ],
        },
        {
          name: 'services',
          label: 'Services',
          fields: [
            ...header(),
            {
              name: 'process',
              type: 'group',
              label: 'Méthode de travail',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Sur-titre', localized: true },
                { name: 'title', type: 'text', label: 'Titre', localized: true, admin: { description: highlightHelp } },
                {
                  name: 'steps',
                  type: 'array',
                  label: 'Étapes',
                  fields: [
                    { name: 'title', type: 'text', label: 'Titre', localized: true, required: true },
                    { name: 'text', type: 'textarea', label: 'Texte', localized: true },
                    { name: 'deliverables', type: 'text', label: 'Livrables', localized: true },
                  ],
                },
              ],
            },
            {
              name: 'opportunities',
              type: 'group',
              label: 'Encadré « Opportunités recherchées »',
              fields: [
                { name: 'show', type: 'checkbox', label: 'Afficher', defaultValue: true },
                { name: 'title', type: 'text', label: 'Titre', localized: true },
                { name: 'text', type: 'textarea', label: 'Texte', localized: true },
              ],
            },
            cta,
            seo,
          ],
        },
        {
          name: 'about',
          label: 'À propos',
          fields: [
            ...header(),
            { name: 'photo', type: 'upload', relationTo: 'media', label: 'Photo' },
            { name: 'story', type: 'richText', label: 'Mon histoire', localized: true },
            {
              name: 'values',
              type: 'array',
              label: 'Ma façon de travailler',
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', label: 'Titre', localized: true, required: true },
                { name: 'text', type: 'textarea', label: 'Texte', localized: true },
              ],
            },
            {
              name: 'headings',
              type: 'group',
              label: 'Titres des sections',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'values', type: 'text', label: 'Façon de travailler', localized: true },
                    { name: 'experience', type: 'text', label: 'Expériences', localized: true },
                    { name: 'education', type: 'text', label: 'Formation', localized: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'certifications', type: 'text', label: 'Certifications', localized: true },
                    { name: 'tools', type: 'text', label: 'Outils', localized: true },
                    { name: 'languages', type: 'text', label: 'Langues', localized: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'present', type: 'text', label: '« Aujourd’hui »', localized: true },
                    { name: 'verify', type: 'text', label: '« Vérifier »', localized: true },
                    { name: 'cv', type: 'text', label: 'Bouton CV', localized: true },
                  ],
                },
              ],
            },
            {
              name: 'languages',
              type: 'array',
              label: 'Langues parlées',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', label: 'Langue', localized: true, required: true },
                    { name: 'level', type: 'text', label: 'Niveau', localized: true },
                  ],
                },
              ],
            },
            cta,
            seo,
          ],
        },
        {
          name: 'contact',
          label: 'Contact',
          fields: [...header(), { name: 'note', type: 'text', label: 'Note sous l’adresse e-mail', localized: true }, seo],
        },
      ],
    },
  ],
}
