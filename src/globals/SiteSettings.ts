import type { GlobalConfig } from 'payload'

import { anyone, authenticated, linkFields } from '../fields/shared'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Réglages du site',
  admin: {
    group: 'Réglages',
    description: 'Identité, navigation, disponibilité, opportunités, langues, CV et référencement.',
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 30 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identité',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'fullName', type: 'text', label: 'Nom complet', required: true, defaultValue: 'Lauraine Djilo' },
                { name: 'brandName', type: 'text', label: 'Nom affiché dans le logo', required: true, defaultValue: 'Lauraine' },
                { name: 'monogram', type: 'text', label: 'Monogramme', maxLength: 2, defaultValue: 'L' },
              ],
            },
            { name: 'jobTitle', type: 'text', label: 'Titre professionnel', localized: true, required: true },
            { name: 'email', type: 'email', label: 'E-mail de contact', required: true },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Liens professionnels',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', label: 'Nom', required: true },
                    { name: 'url', type: 'text', label: 'Adresse', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              label: 'Liens du menu',
              admin: { description: 'Glissez-déposez pour changer l’ordre.' },
              fields: [{ type: 'row', fields: linkFields() }],
            },
            { name: 'navCta', type: 'group', label: 'Bouton du menu', fields: [{ type: 'row', fields: linkFields('Texte du bouton') }] },
            { name: 'footerText', type: 'text', label: 'Texte du pied de page', localized: true },
            {
              name: 'footerLinks',
              type: 'array',
              label: 'Liens du pied de page',
              fields: [{ type: 'row', fields: linkFields() }],
            },
          ],
        },
        {
          label: 'Disponibilité et opportunités',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'availability',
                  type: 'select',
                  label: 'Disponibilité',
                  defaultValue: 'available',
                  options: [
                    { label: 'Disponible', value: 'available' },
                    { label: 'Bientôt disponible', value: 'soon' },
                    { label: 'Indisponible', value: 'unavailable' },
                  ],
                },
                {
                  name: 'workMode',
                  type: 'select',
                  label: 'Mode de travail',
                  defaultValue: 'remote',
                  options: [
                    { label: 'Télétravail', value: 'remote' },
                    { label: 'Hybride', value: 'hybrid' },
                    { label: 'Sur site', value: 'onsite' },
                  ],
                },
                { name: 'location', type: 'text', label: 'Ville', defaultValue: 'Yaoundé, Cameroun' },
              ],
            },
            { name: 'showAvailability', type: 'checkbox', label: 'Afficher la disponibilité sur le site', defaultValue: false },
            { name: 'availabilityMessage', type: 'text', label: 'Message de disponibilité', localized: true },
            {
              name: 'opportunityTypes',
              type: 'array',
              label: 'Types d’opportunité recherchés',
              admin: { description: 'Les types actifs sont proposés dans la liste « Objet » du formulaire de contact.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', label: 'Intitulé', required: true, localized: true },
                    { name: 'active', type: 'checkbox', label: 'Actif', defaultValue: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Langues et CV',
          fields: [
            { name: 'enableEnglish', type: 'checkbox', label: 'Activer la version anglaise', defaultValue: true },
            {
              name: 'detectBrowserLanguage',
              type: 'checkbox',
              label: 'Proposer la langue du navigateur à la première visite',
              defaultValue: true,
            },
            {
              type: 'row',
              fields: [
                { name: 'cvFr', type: 'upload', relationTo: 'media', label: 'CV en français (PDF)' },
                { name: 'cvEn', type: 'upload', relationTo: 'media', label: 'CV en anglais (PDF)' },
              ],
            },
          ],
        },
        {
          label: 'Référencement et animations',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'Titre de la page d’accueil', localized: true },
            { name: 'metaDescription', type: 'textarea', label: 'Description pour les moteurs de recherche', localized: true, maxLength: 170 },
            { name: 'shareImage', type: 'upload', relationTo: 'media', label: 'Image de partage (réseaux sociaux)' },
            {
              name: 'animations',
              type: 'select',
              label: 'Animations',
              defaultValue: 'normal',
              options: [
                { label: 'Aucune', value: 'none' },
                { label: 'Discrètes', value: 'subtle' },
                { label: 'Normales', value: 'normal' },
              ],
              admin: { description: 'Les visiteurs qui ont choisi « réduire les animations » dans leur système n’en voient aucune.' },
            },
          ],
        },
        {
          label: 'Statistiques',
          description:
            'Mesure d’audience intégrée, sans cookie ni adresse IP enregistrée. Les visites faites en étant connectée au back-office ne sont pas comptées.',
          fields: [
            { name: 'analyticsEnabled', type: 'checkbox', label: 'Activer les statistiques', defaultValue: true },
            {
              name: 'analyticsRespectDNT',
              type: 'checkbox',
              label: 'Respecter le réglage « Ne pas me suivre » des navigateurs',
              defaultValue: true,
            },
            {
              name: 'analyticsRetentionMonths',
              type: 'number',
              label: 'Durée de conservation (mois)',
              defaultValue: 13,
              min: 1,
              max: 25,
              admin: { description: 'Les données plus anciennes sont supprimées automatiquement.' },
            },
          ],
        },
      ],
    },
  ],
}
