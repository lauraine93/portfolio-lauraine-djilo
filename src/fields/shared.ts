import type { Access, Field } from 'payload'

export const highlightHelp =
  'Entourez un ou plusieurs mots d’astérisques pour les surligner, par exemple : Je suis *Lauraine Djilo*.'

export const anyone: Access = () => true
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Contenu visible publiquement, modifiable uniquement par une personne connectée. */
export const publicContentAccess = {
  read: anyone,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
}

export const orderField: Field = {
  name: 'order',
  type: 'number',
  label: 'Ordre d’affichage',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Les plus petits nombres s’affichent en premier.' },
}

export const visibleField: Field = {
  name: 'visible',
  type: 'checkbox',
  label: 'Afficher sur le site',
  defaultValue: true,
  admin: { position: 'sidebar' },
}

export const iconOptions = [
  { label: 'Interface (grille)', value: 'layout' },
  { label: 'Recherche (loupe)', value: 'search' },
  { label: 'Code (chevrons)', value: 'code' },
  { label: 'Crayon', value: 'pen' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Utilisateurs', value: 'users' },
  { label: 'Composants', value: 'components' },
  { label: 'Prototype (curseur)', value: 'cursor' },
]

export const linkFields = (labelDefault = 'Texte du lien'): Field[] => [
  { name: 'label', type: 'text', label: labelDefault, localized: true, required: true },
  {
    name: 'href',
    type: 'text',
    label: 'Destination',
    required: true,
    admin: {
      description:
        'Une page du site (/contact), une section de l’accueil (#services), « cv » pour le CV de la langue affichée, ou une adresse complète (https://…). La langue est ajoutée automatiquement.',
    },
  },
]
