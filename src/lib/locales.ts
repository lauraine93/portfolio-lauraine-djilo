export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

/** Libellés d'interface qui ne viennent pas du back-office (accessibilité, états). */
export const ui = {
  fr: {
    mainNav: 'Navigation principale',
    language: 'Langue',
    exampleBadge: 'EXEMPLE',
    skipToContent: 'Aller au contenu',
    contactTitle: 'Écrivez-moi',
    form: {
      name: 'Votre nom',
      email: 'Votre e-mail',
      subject: 'Objet',
      message: 'Votre message',
      send: 'Envoyer le message',
      sending: 'Envoi…',
      success: 'Merci ! Votre message est bien arrivé. Je vous réponds rapidement.',
      error: "Le message n'a pas pu être envoyé. Vérifiez les champs et réessayez.",
      required: 'obligatoire',
    },
    backHome: "Retour à l'accueil",
  },
  en: {
    mainNav: 'Main navigation',
    language: 'Language',
    exampleBadge: 'EXAMPLE',
    skipToContent: 'Skip to content',
    contactTitle: 'Write to me',
    form: {
      name: 'Your name',
      email: 'Your email',
      subject: 'Subject',
      message: 'Your message',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Thank you! Your message has arrived. I will get back to you shortly.',
      error: 'The message could not be sent. Please check the fields and try again.',
      required: 'required',
    },
    backHome: 'Back to home',
  },
} satisfies Record<Locale, unknown>
