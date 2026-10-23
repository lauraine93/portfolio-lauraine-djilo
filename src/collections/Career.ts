import type { CollectionConfig } from 'payload'

import { iconOptions, orderField, publicContentAccess, visibleField } from '../fields/shared'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: { singular: 'Expérience', plural: 'Expériences' },
  admin: { group: 'Parcours', useAsTitle: 'role', defaultColumns: ['role', 'company', 'startDate', 'visible'] },
  access: publicContentAccess,
  defaultSort: '-startDate',
  fields: [
    { name: 'role', type: 'text', label: 'Poste', required: true, localized: true },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text', label: 'Structure', required: true },
        { name: 'location', type: 'text', label: 'Lieu', localized: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'startDate', type: 'date', label: 'Début', required: true, admin: { date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' } } },
        { name: 'endDate', type: 'date', label: 'Fin', admin: { date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' }, condition: (_, s) => !s?.current } },
        { name: 'current', type: 'checkbox', label: 'Poste actuel' },
      ],
    },
    { name: 'description', type: 'textarea', label: 'Missions et résultats', localized: true },
    visibleField,
    orderField,
  ],
}

export const Education: CollectionConfig = {
  slug: 'education',
  labels: { singular: 'Formation', plural: 'Formations' },
  admin: { group: 'Parcours', useAsTitle: 'degree' },
  access: publicContentAccess,
  defaultSort: '-endYear',
  fields: [
    { name: 'degree', type: 'text', label: 'Diplôme', required: true, localized: true },
    { name: 'field', type: 'text', label: 'Spécialité', localized: true },
    { name: 'school', type: 'text', label: 'Établissement', required: true },
    {
      type: 'row',
      fields: [
        { name: 'startYear', type: 'number', label: 'Année de début' },
        { name: 'endYear', type: 'number', label: 'Année de fin' },
      ],
    },
    visibleField,
    orderField,
  ],
}

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  labels: { singular: 'Certification', plural: 'Certifications' },
  admin: { group: 'Parcours', useAsTitle: 'name' },
  access: publicContentAccess,
  fields: [
    { name: 'name', type: 'text', label: 'Intitulé', required: true, localized: true },
    { name: 'issuer', type: 'text', label: 'Organisme', required: true },
    { name: 'date', type: 'date', label: 'Date d’obtention', admin: { date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' } } },
    {
      name: 'credentialUrl',
      type: 'text',
      label: 'Lien de vérification',
      admin: { description: 'Lien Coursera ou Credly : il permet à un recruteur de vérifier la certification.' },
    },
    visibleField,
    orderField,
  ],
}

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: { group: 'Contenu', useAsTitle: 'title', defaultColumns: ['title', 'highlighted', 'order', 'visible'] },
  access: publicContentAccess,
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', label: 'Titre', required: true, localized: true },
    { name: 'description', type: 'textarea', label: 'Description', required: true, localized: true },
    { name: 'icon', type: 'select', label: 'Icône', defaultValue: 'layout', options: iconOptions },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Carte mise en avant (fond foncé)',
      admin: { position: 'sidebar' },
    },
    visibleField,
    orderField,
  ],
}

export const Tools: CollectionConfig = {
  slug: 'tools',
  labels: { singular: 'Outil', plural: 'Outils' },
  admin: { group: 'Parcours', useAsTitle: 'name', defaultColumns: ['name', 'group', 'order', 'visible'] },
  access: publicContentAccess,
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', label: 'Nom', required: true },
    {
      name: 'group',
      type: 'select',
      label: 'Catégorie',
      defaultValue: 'design',
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Technique', value: 'tech' },
      ],
      admin: { description: 'Les outils techniques s’affichent sur fond foncé.' },
    },
    visibleField,
    orderField,
  ],
}
