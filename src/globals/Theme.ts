import { APIError, type Field, type GlobalConfig } from 'payload'

import { defaultPalette, evaluatePalette, isHex } from '../lib/color'
import { scriptFonts, textFonts } from '../lib/fonts'
import { anyone, authenticated } from '../fields/shared'

const colorField = (name: keyof typeof defaultPalette, label: string, description: string): Field => ({
  name,
  type: 'text',
  label,
  required: true,
  defaultValue: defaultPalette[name],
  validate: (value: unknown) => (isHex(value) ? true : 'Couleur hexadécimale attendue, par exemple #2B1E3F.'),
  admin: {
    description,
    components: { Field: '/components/admin/ColorField#ColorField' },
  },
})

export const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Thème',
  admin: {
    group: 'Apparence',
    description: 'Couleurs, polices et formes du site. Les changements s’appliquent sans redéploiement.',
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 30 },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const failing = evaluatePalette(data?.palette ?? {}).filter((c) => !c.pass)
        if (failing.length) {
          throw new APIError(
            `Palette refusée, contraste insuffisant : ${failing
              .map((c) => `${c.label} (${c.ratio ? c.ratio.toFixed(2) : '?'}:1, minimum ${c.min}:1)`)
              .join(' ; ')}.`,
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
    {
      name: 'palette',
      type: 'group',
      label: 'Couleurs',
      fields: [
        {
          type: 'row',
          fields: [
            colorField('primary', 'Couleur principale', 'Navigation, boutons, sections foncées.'),
            colorField('accent', 'Couleur d’accent', 'Surlignages, cercles, icônes.'),
            colorField('background', 'Fond', 'Fond général des pages.'),
          ],
        },
        {
          type: 'row',
          fields: [
            colorField('ink', 'Texte', 'Couleur des titres et du texte.'),
            colorField('surface', 'Cartes', 'Fond des cartes et des étiquettes.'),
          ],
        },
        {
          name: 'preview',
          type: 'ui',
          admin: { components: { Field: '/components/admin/ThemePreview#ThemePreview' } },
        },
      ],
    },
    {
      name: 'typography',
      type: 'group',
      label: 'Typographie',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'headingFont',
              type: 'select',
              label: 'Police des titres',
              defaultValue: 'plus-jakarta-sans',
              options: textFonts.map(({ label, value }) => ({ label, value })),
            },
            {
              name: 'bodyFont',
              type: 'select',
              label: 'Police du texte',
              defaultValue: 'plus-jakarta-sans',
              options: textFonts.map(({ label, value }) => ({ label, value })),
            },
            {
              name: 'scriptFont',
              type: 'select',
              label: 'Police manuscrite',
              defaultValue: 'caveat',
              options: scriptFonts.map(({ label, value }) => ({ label, value })),
            },
          ],
        },
      ],
    },
    {
      name: 'shape',
      type: 'group',
      label: 'Formes',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'buttonStyle',
              type: 'select',
              label: 'Boutons',
              defaultValue: 'pill',
              options: [
                { label: 'Pilule', value: 'pill' },
                { label: 'Arrondis', value: 'rounded' },
                { label: 'Carrés', value: 'square' },
              ],
            },
            {
              name: 'cardRadius',
              type: 'number',
              label: 'Arrondi des cartes (px)',
              defaultValue: 24,
              min: 0,
              max: 40,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
