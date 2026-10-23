import type { ServerProps } from 'payload'

import React from 'react'

import { isSiteEmpty } from '../../endpoints/setup'
import { SetupButton } from './SetupButton'

/** Affiché sur le tableau de bord tant que le site est vide : installe le contenu de départ en un clic. */
export async function SetupBanner({ payload, user }: ServerProps) {
  if (!user || !payload || !(await isSiteEmpty(payload))) return null
  return (
    <section
      style={{
        border: '2px solid var(--theme-success-500)',
        borderRadius: 14,
        padding: '22px 24px',
        marginBottom: 28,
        display: 'grid',
        gap: 12,
        background: 'var(--theme-success-50)',
      }}
    >
      <h2 style={{ margin: 0, fontSize: 20 }}>Bienvenue ! Votre site est encore vide.</h2>
      <p style={{ margin: 0, maxWidth: 720, lineHeight: 1.6 }}>
        Installez le contenu de départ : textes en français et en anglais, photos, thème prune et rose, services, parcours, pages
        légales et trois projets d’exemple (non publiés). Vous pourrez ensuite tout modifier. Ce bouton disparaît une fois le
        contenu installé et ne peut jamais écraser vos modifications.
      </p>
      <SetupButton />
    </section>
  )
}

export default SetupBanner
