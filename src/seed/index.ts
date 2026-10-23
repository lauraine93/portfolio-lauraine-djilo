/**
 * Remplit le back-office avec le contenu de départ (français + anglais).
 *
 *   SEED_ADMIN_EMAIL=… SEED_ADMIN_PASSWORD=… npm run seed
 *
 * - Les informations de profil sont réelles (export LinkedIn et précisions de Lauraine).
 * - Les trois projets sont des EXEMPLES : enregistrés en brouillon, ils ne peuvent pas être publiés.
 * - Le script est idempotent : il peut être relancé, il remplace le contenu de départ.
 */
import path from 'path'
import { getPayload, type Payload } from 'payload'
import { fileURLToPath } from 'url'

import config from '../payload.config'
import { doc, h2, p, ul } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
type L<T = string> = { fr: T; en: T }
const t = <T = string>(fr: T, en: T): L<T> => ({ fr, en })

/** Copie les identifiants générés en français dans la version anglaise (blocs et lignes de tableaux). */
function copyIds(target: unknown, source: unknown): unknown {
  if (Array.isArray(target) && Array.isArray(source)) {
    return target.map((item, i) => copyIds(item, source[i]))
  }
  if (target && typeof target === 'object' && source && typeof source === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(target)) out[k] = copyIds(v, (source as Record<string, unknown>)[k])
    if ('id' in (source as Record<string, unknown>) && !('id' in out)) out.id = (source as Record<string, unknown>).id
    return out
  }
  return target
}

/** Résout récursivement les valeurs { fr, en } pour une langue donnée. */
function pick<T>(value: T, locale: 'fr' | 'en'): unknown {
  if (Array.isArray(value)) return value.map((v) => pick(v, locale))
  if (value && typeof value === 'object') {
    const keys = Object.keys(value)
    if (keys.length === 2 && keys.includes('fr') && keys.includes('en')) return (value as unknown as L<unknown>)[locale]
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, pick(v, locale)]))
  }
  return value
}

async function upsertMedia(payload: Payload, file: string, alt: L) {
  const existing = await payload.find({ collection: 'media', where: { filename: { like: path.parse(file).name } }, limit: 1 })
  if (existing.docs[0]) return existing.docs[0].id
  const doc = await payload.create({
    collection: 'media',
    locale: 'fr',
    data: { alt: alt.fr },
    filePath: path.resolve(dirname, 'assets', file),
  })
  await payload.update({ collection: 'media', id: doc.id, locale: 'en', data: { alt: alt.en } })
  return doc.id
}

async function resetCollection(payload: Payload, collection: 'projects' | 'services' | 'experiences' | 'education' | 'certifications' | 'tools' | 'legal-pages') {
  await payload.delete({ collection, where: { id: { exists: true } } })
}

async function createLocalized<C extends 'projects' | 'services' | 'experiences' | 'education' | 'certifications' | 'tools' | 'legal-pages'>(
  payload: Payload,
  collection: C,
  data: Record<string, unknown>,
  draft = false,
) {
  const fr = await payload.create({ collection, locale: 'fr', draft, data: pick(data, 'fr') as never })
  await payload.update({ collection, id: fr.id, locale: 'en', draft, data: copyIds(pick(data, 'en'), fr) as never })
}

async function seed() {
  const payload = await getPayload({ config })
  payload.logger.info('Contenu de départ : démarrage…')

  // Compte administratrice -------------------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const users = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
    if (!users.docs[0]) {
      await payload.create({ collection: 'users', data: { email, password, name: 'Lauraine Djilo' } })
      payload.logger.info(`Compte créé : ${email}`)
    }
  } else {
    payload.logger.warn('SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD absents : aucun compte créé (créez-le sur /admin).')
  }

  // Médias -----------------------------------------------------------------
  const portrait = await upsertMedia(
    payload,
    'lauraine-portrait.png',
    t('Portrait de Lauraine Djilo, souriante, bras croisés, en chemise blanche', 'Portrait of Lauraine Djilo, smiling, arms crossed, wearing a white shirt'),
  )
  const aboutPhoto = await upsertMedia(
    payload,
    'lauraine-apropos.jpg',
    t('Lauraine Djilo, ordinateur portable en main', 'Lauraine Djilo holding her laptop'),
  )

  // Thème ------------------------------------------------------------------
  await payload.updateGlobal({
    slug: 'theme',
    data: {
      palette: { primary: '#2B1E3F', accent: '#F4A3C3', background: '#FCF5F3', ink: '#1D1428', surface: '#FFFFFF' },
      typography: { headingFont: 'plus-jakarta-sans', bodyFont: 'plus-jakarta-sans', scriptFont: 'caveat' },
      shape: { buttonStyle: 'pill', cardRadius: 24 },
    },
  })

  // Réglages ---------------------------------------------------------------
  const settings = {
    fullName: 'Lauraine Djilo',
    brandName: 'Lauraine',
    monogram: 'L',
    jobTitle: t('UI/UX Product Designer', 'UI/UX Product Designer'),
    email: 'laurainefotso0@gmail.com',
    socialLinks: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/lauraine-djilo-6396b72b9/' }],
    navItems: [
      { label: t('Accueil', 'Home'), href: '/' },
      { label: t('Projets', 'Work'), href: '/projets' },
      { label: t('Services', 'Services'), href: '/services' },
      { label: t('À propos', 'About'), href: '/a-propos' },
      { label: t('CV', 'Resume'), href: 'cv' },
    ],
    navCta: { label: t('Me contacter', 'Contact me'), href: '/contact' },
    footerText: t('UI/UX Product Designer', 'UI/UX Product Designer'),
    footerLinks: [
      { label: t('Mentions légales', 'Legal notice'), href: '/mentions-legales' },
      { label: t('Confidentialité', 'Privacy'), href: '/confidentialite' },
    ],
    analyticsEnabled: true,
    analyticsRespectDNT: true,
    analyticsRetentionMonths: 13,
    availability: 'available',
    workMode: 'remote',
    location: 'Yaoundé, Cameroun',
    showAvailability: false,
    availabilityMessage: t('Disponible pour de nouveaux projets', 'Available for new projects'),
    opportunityTypes: [
      { label: t('Offre d’emploi', 'Job offer'), active: true },
      { label: t('Mission freelance', 'Freelance project'), active: true },
      { label: t('Collaboration', 'Collaboration'), active: true },
      { label: t('Autre demande', 'Other'), active: true },
    ],
    enableEnglish: true,
    detectBrowserLanguage: true,
    metaTitle: t('Lauraine Djilo — UI/UX Product Designer', 'Lauraine Djilo — UI/UX Product Designer'),
    metaDescription: t(
      'UI/UX Product Designer à Yaoundé : des interfaces web et mobiles fondées sur la recherche utilisateur, et des maquettes que les développeurs peuvent construire.',
      'UI/UX Product Designer based in Yaoundé. I design research-led web and mobile interfaces and hand off designs developers can build.',
    ),
    animations: 'normal',
  }
  const frSettings = await payload.updateGlobal({ slug: 'site-settings', locale: 'fr', data: pick(settings, 'fr') as never })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data: copyIds(pick(settings, 'en'), frSettings) as never })

  // Page d'accueil ---------------------------------------------------------
  const home = {
    sections: [
      {
        blockType: 'hero',
        greeting: t('Bonjour, bienvenue !', 'Hello, welcome!'),
        sizeTag: 'Hug × Hug',
        title: t('Je suis *Lauraine Djilo*, UI/UX Product Designer.', 'I’m *Lauraine Djilo*, a UI/UX Product Designer.'),
        intro: t(
          'Avant de dessiner un écran, je cherche à comprendre le problème. Puis je prototype, je teste, et je livre des maquettes que les développeurs peuvent construire sans deviner.',
          'Before I design a single screen, I try to understand the problem. Then I prototype, test, and hand off designs developers can build without guesswork.',
        ),
        primaryCta: { label: t('Voir mes projets', 'See my work'), href: '#projets' },
        secondaryCta: { label: t('Télécharger mon CV', 'Download my resume'), action: 'cv' },
        badges: [
          { text: t('Certifiée Google UX Design', 'Google UX Design certified') },
          { text: t('Bachelor en génie logiciel', 'Software engineering degree') },
          { text: t('Bilingue', 'Bilingual') },
        ],
        portrait,
        cursors: [
          { kind: 'tag', tone: 'primary', name: t('Lauraine · Designer', 'Lauraine · Designer'), x: 0, y: 48 },
          {
            kind: 'bubble',
            tone: 'light',
            name: t('', ''),
            text: t('« Le design qui comprend les clients. »', '“Design that understands clients.”'),
            x: 52.5,
            y: 82.6,
          },
        ],
      },
      {
        blockType: 'marquee',
        items: [
          { text: t('UI Design', 'UI Design') },
          { text: t('Recherche utilisateur', 'User research') },
          { text: t('Prototypage', 'Prototyping') },
          { text: t('Design system', 'Design systems') },
          { text: t('Handoff', 'Handoff') },
          { text: t('Applis mobiles', 'Mobile apps') },
        ],
        speed: 'normal',
        tilt: -1.6,
      },
      {
        blockType: 'services',
        anchor: 'services',
        eyebrow: t('Services', 'Services'),
        title: t('Ce que je *conçois* pour vous', 'What I *design* for you'),
        intro: t('De la première interview utilisateur jusqu’au fichier prêt pour les développeurs.', 'From the first user interview to a file that is ready for developers.'),
        limit: 3,
      },
      {
        blockType: 'projects',
        anchor: 'projets',
        eyebrow: t('Projets', 'Work'),
        title: t('Projets *choisis*', 'Selected *work*'),
        cta: { label: t('Tous les projets', 'All projects'), href: '/projets' },
        limit: 3,
      },
      {
        blockType: 'about',
        anchor: 'a-propos',
        eyebrow: t('À propos', 'About'),
        title: t('Qui est *Lauraine* ?', 'Who is *Lauraine*?'),
        bio: t(
          'J’ai étudié le génie logiciel, puis le design est devenu mon métier. Aujourd’hui, je conçois des produits numériques utiles et je fais le lien entre les utilisateurs, le design et l’équipe technique. Je travaille en télétravail, en français comme en anglais.',
          'I studied software engineering, then design became my profession. Today I design useful digital products and connect users, design and the engineering team. I work remotely, in French and in English.',
        ),
        photo: aboutPhoto,
        chips: [
          { text: t('Recherche utilisateur', 'User research'), tone: 'light' },
          { text: t('Prototypage', 'Prototyping'), tone: 'dark' },
          { text: t('Design system', 'Design systems'), tone: 'accent' },
          { text: t('Figma', 'Figma'), tone: 'light' },
        ],
        facts: [
          { value: t('Google', 'Google'), label: t('Certifiée UX Design', 'UX Design certified') },
          { value: t('Bachelor', 'Bachelor'), label: t('Génie logiciel, 2026', 'Software engineering, 2026') },
          { value: t('FR · EN', 'FR · EN'), label: t('Bilingue', 'Bilingual') },
        ],
        cvLabel: t('Télécharger mon CV', 'Download my resume'),
        signature: 'Lauraine',
      },
      {
        blockType: 'tools',
        eyebrow: t('Mes outils', 'My tools'),
        title: t('Les outils derrière *mes maquettes*', 'The tools behind *my designs*'),
      },
      {
        blockType: 'contactCta',
        anchor: 'contact',
        kicker: t('Un projet en tête ?', 'Got a project in mind?'),
        title: t('Parlons de votre produit.', 'Let’s talk about your product.'),
        showEmail: true,
        cta: { label: t('Écrivez-moi', 'Write to me'), href: '/contact' },
      },
    ],
  }
  const frHome = await payload.updateGlobal({ slug: 'home-page', locale: 'fr', data: { ...(pick(home, 'fr') as object), _status: 'published' } as never })
  await payload.updateGlobal({ slug: 'home-page', locale: 'en', data: { ...(copyIds(pick(home, 'en'), frHome) as object), _status: 'published' } as never })

  // Collections ------------------------------------------------------------
  for (const c of ['projects', 'services', 'experiences', 'education', 'certifications', 'tools', 'legal-pages'] as const) {
    await resetCollection(payload, c)
  }

  const services = [
    {
      title: t('UI Design', 'UI Design'),
      description: t(
        'Des interfaces web et mobiles claires, cohérentes et accessibles, pensées pour chaque taille d’écran.',
        'Clear, consistent and accessible web and mobile interfaces, designed for every screen size.',
      ),
      icon: 'layout',
      highlighted: false,
      order: 1,
    },
    {
      title: t('Recherche et prototypage', 'Research and prototyping'),
      description: t(
        'Interviews, parcours utilisateurs et prototypes testés, pour valider une idée avant d’investir dans le développement.',
        'Interviews, user journeys and tested prototypes, to validate an idea before investing in development.',
      ),
      icon: 'search',
      highlighted: true,
      order: 2,
    },
    {
      title: t('Design system et handoff', 'Design systems and handoff'),
      description: t(
        'Composants, tokens et spécifications documentés, pour que l’équipe technique construise exactement ce qui a été conçu.',
        'Documented components, tokens and specs, so the engineering team builds exactly what was designed.',
      ),
      icon: 'code',
      highlighted: false,
      order: 3,
    },
  ]
  for (const s of services) await createLocalized(payload, 'services', { ...s, visible: true })

  // Études de cas d'EXEMPLE : elles montrent la structure attendue et seront remplacées par les vrais projets.
  const exampleNote = (fr: string, en: string) => ({
    blockType: 'callout',
    kind: 'learning',
    title: t('Contenu d’exemple', 'Example content'),
    text: t(fr, en),
  })

  const projects = [
    {
      title: t('Tontina', 'Tontina'),
      slug: 'tontina',
      frameLabel: t('# Tontina — Mobile', '# Tontina — Mobile'),
      summary: t(
        'Une application pour gérer les tontines, de la recherche utilisateur au prototype.',
        'An app to manage savings circles (tontines), from user research to prototype.',
      ),
      intro: t(
        'Comment rendre la gestion d’une tontine aussi simple qu’un échange sur WhatsApp, sans perdre la confiance qui en fait la force ?',
        'How can managing a savings circle feel as simple as a WhatsApp chat, without losing the trust that makes it work?',
      ),
      tags: t('Recherche · UX · UI mobile', 'Research · UX · Mobile UI'),
      discipline: 'mobile',
      coverTone: 'accent',
      year: 2026,
      facts: {
        client: t('Projet d’exemple', 'Example project'),
        role: t('UI/UX Product Designer', 'UI/UX Product Designer'),
        duration: t('[Durée]', '[Duration]'),
        team: t('[Équipe]', '[Team]'),
        tools: 'Figma, FigJam',
      },
      content: [
        exampleNote(
          'Cette étude de cas est un modèle. Remplacez chaque bloc par votre vrai projet, puis décochez « Contenu d’exemple » pour pouvoir la publier.',
          'This case study is a template. Replace each block with your real project, then untick “Example content” to publish it.',
        ),
        {
          blockType: 'textSection',
          eyebrow: t('01 — Le contexte', '01 — Context'),
          heading: t('Une pratique d’épargne très répandue, gérée sur papier', 'A widespread savings practice, managed on paper'),
          body: t(
            doc(
              p('Décrivez ici le contexte : qui sont les utilisateurs, comment ils s’organisent aujourd’hui, et pourquoi le sujet compte.'),
              p('Une ou deux phrases suffisent pour que le lecteur comprenne l’enjeu avant d’entrer dans votre démarche.'),
            ),
            doc(
              p('Describe the context here: who the users are, how they organise themselves today, and why the topic matters.'),
              p('One or two sentences are enough for readers to understand the stakes before diving into your process.'),
            ),
          ),
        },
        {
          blockType: 'textSection',
          eyebrow: t('02 — La recherche', '02 — Research'),
          heading: t('Ce que les entretiens ont révélé', 'What the interviews revealed'),
          body: t(
            doc(
              p('Présentez votre méthode (entretiens, observation, questionnaire) et les enseignements principaux.'),
              ul(['[Enseignement 1]', '[Enseignement 2]', '[Enseignement 3]']),
            ),
            doc(
              p('Present your method (interviews, observation, survey) and the main insights.'),
              ul(['[Insight 1]', '[Insight 2]', '[Insight 3]']),
            ),
          ),
        },
        {
          blockType: 'keyPoints',
          heading: t('Les décisions de design', 'Design decisions'),
          items: [
            { title: t('[Décision 1]', '[Decision 1]'), text: t('Pourquoi ce choix, et ce qu’il change pour l’utilisateur.', 'Why this choice, and what it changes for the user.') },
            { title: t('[Décision 2]', '[Decision 2]'), text: t('Quelle alternative a été écartée, et pourquoi.', 'Which alternative was dropped, and why.') },
            { title: t('[Décision 3]', '[Decision 3]'), text: t('Comment le test a confirmé ou modifié la décision.', 'How testing confirmed or changed the decision.') },
          ],
        },
        {
          blockType: 'callout',
          kind: 'collaboration',
          title: t('Collaboration avec l’équipe technique', 'Working with the engineering team'),
          text: t(
            'Expliquez comment vous avez préparé le handoff : contraintes anticipées, états et cas limites documentés, ajustements faits avec les développeurs.',
            'Explain how you prepared the handoff: constraints anticipated, states and edge cases documented, adjustments made with developers.',
          ),
        },
        {
          blockType: 'textSection',
          eyebrow: t('03 — Le résultat', '03 — Outcome'),
          heading: t('Ce que le projet a permis', 'What the project achieved'),
          body: t(
            doc(p('Indiquez uniquement des résultats réels et vérifiables, ou ce que vous avez appris si le projet n’est pas encore lancé.')),
            doc(p('Only state real, verifiable outcomes, or what you learned if the project has not launched yet.')),
          ),
        },
      ],
      order: 1,
    },
    {
      title: t('Clinica', 'Clinica'),
      slug: 'clinica',
      frameLabel: t('# Clinica — Web', '# Clinica — Web'),
      summary: t(
        'La refonte d’un parcours de prise de rendez-vous, simplifié pour mobile.',
        'A redesigned appointment booking flow, simplified for mobile.',
      ),
      intro: t('[Chapeau de l’étude de cas : le défi et la réponse en deux phrases.]', '[Case study lead: the challenge and the answer in two sentences.]'),
      tags: t('UX · Parcours · Tests utilisateurs', 'UX · User flows · Usability testing'),
      discipline: 'web',
      coverTone: 'primary',
      year: 2026,
      facts: { client: t('Projet d’exemple', 'Example project'), role: t('UX Designer', 'UX Designer'), tools: 'Figma' },
      content: [
        exampleNote('Étude de cas à remplacer par un vrai projet.', 'Case study to be replaced with a real project.'),
        {
          blockType: 'textSection',
          eyebrow: t('01 — Le problème', '01 — The problem'),
          heading: t('[Titre de la section]', '[Section title]'),
          body: t(doc(p('[Votre texte]')), doc(p('[Your text]'))),
        },
      ],
      order: 2,
    },
    {
      title: t('Atelier', 'Atelier'),
      slug: 'atelier',
      frameLabel: t('# Atelier — Design system', '# Atelier — Design system'),
      summary: t('Un design system e-commerce et sa documentation de handoff.', 'An e-commerce design system and its handoff documentation.'),
      intro: t('[Chapeau de l’étude de cas : le défi et la réponse en deux phrases.]', '[Case study lead: the challenge and the answer in two sentences.]'),
      tags: t('Design system · Handoff', 'Design system · Handoff'),
      discipline: 'system',
      coverTone: 'soft',
      year: 2026,
      facts: { client: t('Projet d’exemple', 'Example project'), role: t('Product Designer', 'Product Designer'), tools: 'Figma' },
      content: [
        exampleNote('Étude de cas à remplacer par un vrai projet.', 'Case study to be replaced with a real project.'),
        {
          blockType: 'textSection',
          eyebrow: t('01 — Le besoin', '01 — The need'),
          heading: t('[Titre de la section]', '[Section title]'),
          body: t(doc(p('[Votre texte]')), doc(p('[Your text]'))),
        },
      ],
      order: 3,
    },
  ]
  for (const pr of projects) {
    await createLocalized(payload, 'projects', { ...pr, isExample: true, featured: true, _status: 'draft' }, true)
  }

  await createLocalized(payload, 'experiences', {
    role: t('UX/UI Designer', 'UX/UI Designer'),
    company: 'iSpark Inno',
    location: t('Buea, Cameroun', 'Buea, Cameroon'),
    startDate: '2025-08-01',
    endDate: '2025-12-31',
    current: false,
    description: t('', ''),
    visible: true,
    order: 1,
  })
  await createLocalized(payload, 'experiences', {
    role: t('Technicienne de maintenance', 'Maintenance technician'),
    company: 'ETELEC SARL',
    location: t('Yaoundé, Cameroun', 'Yaoundé, Cameroon'),
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    current: false,
    description: t('', ''),
    visible: false,
    order: 2,
  })
  await createLocalized(payload, 'education', {
    degree: t('Bachelor of Engineering', 'Bachelor of Engineering'),
    field: t('Génie logiciel', 'Computer Software Engineering'),
    school: 'University Institute of Sciences and Technologies of Yaoundé',
    startYear: 2023,
    endYear: 2026,
    visible: true,
    order: 1,
  })
  await createLocalized(payload, 'certifications', {
    name: t('Google UX Design Professional Certificate', 'Google UX Design Professional Certificate'),
    issuer: 'Google (Coursera)',
    credentialUrl: '',
    visible: true,
    order: 1,
  })

  const tools: [string, 'design' | 'tech'][] = [
    ['Figma', 'design'],
    ['HTML / CSS', 'tech'],
    ['JavaScript', 'tech'],
    ['TypeScript', 'tech'],
    ['React', 'tech'],
    ['Next.js', 'tech'],
    ['Tailwind CSS', 'tech'],
  ]
  for (const [i, [name, group]] of tools.entries()) {
    await payload.create({ collection: 'tools', data: { name, group, visible: true, order: i + 1 } })
  }

  // Pages intérieures ------------------------------------------------------
  const ctaFor = (title: L) => ({
    show: true,
    kicker: t('Un projet en tête ?', 'Got a project in mind?'),
    title,
    label: t('Écrivez-moi', 'Write to me'),
    href: '/contact',
  })
  const pagesContent = {
    projects: {
      eyebrow: t('Projets', 'Work'),
      title: t('Des projets, et surtout *la démarche* derrière', 'Projects, and above all *the thinking* behind them'),
      intro: t(
        'Chaque étude de cas raconte le problème de départ, les décisions prises et la façon dont j’ai travaillé avec l’équipe technique.',
        'Each case study walks through the initial problem, the decisions made and how I worked with the engineering team.',
      ),
      allLabel: t('Tous', 'All'),
      filterLabels: {
        mobile: t('Applications mobiles', 'Mobile apps'),
        web: t('Web', 'Web'),
        system: t('Design systems', 'Design systems'),
        other: t('Autres', 'Other'),
      },
      emptyText: t('Les premières études de cas arrivent bientôt.', 'The first case studies are coming soon.'),
      caseStudyLabels: {
        client: t('Client', 'Client'),
        role: t('Mon rôle', 'My role'),
        duration: t('Durée', 'Duration'),
        team: t('Équipe', 'Team'),
        tools: t('Outils', 'Tools'),
        year: t('Année', 'Year'),
        back: t('Tous les projets', 'All projects'),
        next: t('Projet suivant', 'Next project'),
      },
      cta: ctaFor(t('Parlons de votre produit.', 'Let’s talk about your product.')),
      seo: {
        title: t('Projets et études de cas', 'Work and case studies'),
        description: t(
          'Études de cas UI/UX de Lauraine Djilo : recherche utilisateur, prototypage, design system et collaboration avec les développeurs.',
          'UI/UX case studies by Lauraine Djilo: user research, prototyping, design systems and collaboration with developers.',
        ),
      },
    },
    services: {
      eyebrow: t('Services', 'Services'),
      title: t('De l’idée au fichier *prêt à coder*', 'From idea to a *build-ready* file'),
      intro: t(
        'Je conçois des produits numériques utiles, en partant des besoins réels des utilisateurs, et je livre des maquettes que les développeurs peuvent construire sans deviner.',
        'I design useful digital products starting from real user needs, and hand off designs developers can build without guesswork.',
      ),
      process: {
        eyebrow: t('Méthode', 'Process'),
        title: t('Comment nous *travaillerons* ensemble', 'How we will *work* together'),
        steps: [
          {
            title: t('Comprendre', 'Understand'),
            text: t('Échange sur vos objectifs, vos utilisateurs et vos contraintes techniques.', 'We discuss your goals, your users and your technical constraints.'),
            deliverables: t('Cadrage, questions de recherche', 'Brief, research questions'),
          },
          {
            title: t('Explorer', 'Explore'),
            text: t('Recherche utilisateur, parcours et premières pistes en basse fidélité.', 'User research, journeys and first low-fidelity concepts.'),
            deliverables: t('Synthèse, parcours, wireframes', 'Insights, journeys, wireframes'),
          },
          {
            title: t('Concevoir et tester', 'Design and test'),
            text: t('Maquettes haute fidélité et prototype testé auprès d’utilisateurs.', 'High-fidelity designs and a prototype tested with users.'),
            deliverables: t('Maquettes, prototype, résultats de tests', 'Designs, prototype, test results'),
          },
          {
            title: t('Livrer', 'Hand off'),
            text: t('Spécifications, composants et suivi pendant le développement.', 'Specs, components and follow-up during development.'),
            deliverables: t('Fichier Figma documenté, design system', 'Documented Figma file, design system'),
          },
        ],
      },
      opportunities: {
        show: true,
        title: t('Ce que je recherche', 'What I am looking for'),
        text: t(
          'Je suis ouverte aux opportunités suivantes, en français comme en anglais.',
          'I am open to the following opportunities, in French or in English.',
        ),
      },
      cta: ctaFor(t('Un besoin ? Parlons-en.', 'Have a need? Let’s talk.')),
      seo: {
        title: t('Services UI/UX', 'UI/UX services'),
        description: t(
          'UI design, recherche utilisateur, prototypage, design system et handoff : les services de Lauraine Djilo, UI/UX Product Designer.',
          'UI design, user research, prototyping, design systems and handoff: services by Lauraine Djilo, UI/UX Product Designer.',
        ),
      },
    },
    about: {
      eyebrow: t('À propos', 'About'),
      title: t('Designer, avec une *culture d’ingénieure*', 'A designer with an *engineer’s mindset*'),
      intro: t(
        'Je suis Lauraine Djilo, UI/UX Product Designer basée à Yaoundé. Je conçois des interfaces web et mobiles à partir des besoins réels des utilisateurs.',
        'I’m Lauraine Djilo, a UI/UX Product Designer based in Yaoundé. I design web and mobile interfaces grounded in real user needs.',
      ),
      photo: aboutPhoto,
      story: t(
        doc(
          p('J’ai étudié le génie logiciel, puis le design est devenu mon métier. Cette double culture change ma façon de travailler : avant de dessiner un écran, je cherche à comprendre le problème, et en le dessinant, je pense déjà à la façon dont il sera construit.'),
          p('J’ai obtenu le certificat Google UX Design et travaillé comme UX/UI Designer chez iSpark Inno. Aujourd’hui, je conçois des produits numériques utiles et je fais le lien entre les utilisateurs, le design et l’équipe technique.'),
        ),
        doc(
          p('I studied software engineering, then design became my profession. This dual background shapes how I work: before designing a screen I try to understand the problem, and while designing it I already think about how it will be built.'),
          p('I earned the Google UX Design certificate and worked as a UX/UI Designer at iSpark Inno. Today I design useful digital products and connect users, design and the engineering team.'),
        ),
      ),
      values: [
        { title: t('Partir du problème', 'Start from the problem'), text: t('Comprendre les utilisateurs avant de proposer une solution.', 'Understand users before proposing a solution.') },
        { title: t('Concevoir ce qui se construit', 'Design what can be built'), text: t('Anticiper les contraintes techniques et documenter chaque état.', 'Anticipate technical constraints and document every state.') },
        { title: t('Tester tôt', 'Test early'), text: t('Prototyper et valider avant d’investir dans le développement.', 'Prototype and validate before investing in development.') },
      ],
      headings: {
        values: t('Ma façon de travailler', 'How I work'),
        experience: t('Expériences', 'Experience'),
        education: t('Formation', 'Education'),
        certifications: t('Certifications', 'Certifications'),
        tools: t('Outils', 'Tools'),
        languages: t('Langues', 'Languages'),
        present: t('Aujourd’hui', 'Present'),
        verify: t('Vérifier', 'Verify'),
        cv: t('Télécharger mon CV', 'Download my resume'),
      },
      languages: [
        { name: t('Français', 'French'), level: t('Courant', 'Fluent') },
        { name: t('Anglais', 'English'), level: t('Courant', 'Fluent') },
      ],
      cta: ctaFor(t('Travaillons ensemble.', 'Let’s work together.')),
      seo: {
        title: t('À propos', 'About'),
        description: t(
          'Lauraine Djilo, UI/UX Product Designer à Yaoundé : parcours, formation en génie logiciel, certificat Google UX Design.',
          'Lauraine Djilo, UI/UX Product Designer in Yaoundé: background, software engineering degree, Google UX Design certificate.',
        ),
      },
    },
    contact: {
      eyebrow: t('Contact', 'Contact'),
      title: t('Parlons de *votre projet*', 'Let’s talk about *your project*'),
      intro: t(
        'Une offre, une mission ou simplement une question : écrivez-moi, je réponds à chaque message.',
        'A job offer, a project or just a question: write to me, I reply to every message.',
      ),
      note: t('Télétravail · Français et anglais', 'Remote · French and English'),
      seo: { title: t('Contact', 'Contact') },
    },
  }
  const frPages = await payload.updateGlobal({ slug: 'pages-content', locale: 'fr', data: pick(pagesContent, 'fr') as never })
  await payload.updateGlobal({ slug: 'pages-content', locale: 'en', data: copyIds(pick(pagesContent, 'en'), frPages) as never })

  await createLocalized(payload, 'legal-pages', {
    slug: 'mentions-legales',
    title: t('Mentions légales', 'Legal notice'),
    content: t(
      doc(
        h2('Éditrice du site'),
        p('Lauraine Djilo, UI/UX Product Designer, Yaoundé (Cameroun).'),
        p('Contact : laurainefotso0@gmail.com'),
        h2('Hébergement'),
        p('[À compléter : nom, adresse et contact de l’hébergeur choisi lors de la mise en ligne.]'),
        h2('Propriété intellectuelle'),
        p('Les contenus de ce site (textes, maquettes, visuels) sont la propriété de Lauraine Djilo ou de leurs auteurs respectifs. Toute reproduction sans autorisation est interdite.'),
      ),
      doc(
        h2('Site publisher'),
        p('Lauraine Djilo, UI/UX Product Designer, Yaoundé (Cameroon).'),
        p('Contact: laurainefotso0@gmail.com'),
        h2('Hosting'),
        p('[To be completed: name, address and contact details of the hosting provider chosen at launch.]'),
        h2('Intellectual property'),
        p('The content of this website (texts, designs, visuals) belongs to Lauraine Djilo or their respective authors. Any reproduction without permission is prohibited.'),
      ),
    ),
  })

  await createLocalized(payload, 'legal-pages', {
    slug: 'confidentialite',
    title: t('Politique de confidentialité', 'Privacy policy'),
    content: t(
      doc(
        p('Ce site collecte le minimum de données nécessaires. Il n’utilise aucun cookie de suivi ni outil publicitaire.'),
        h2('Formulaire de contact'),
        p('Lorsque vous m’écrivez, votre nom, votre adresse e-mail, l’objet et votre message sont enregistrés pour pouvoir vous répondre. Ils ne sont jamais transmis à des tiers. Vous pouvez demander leur suppression à tout moment.'),
        h2('Mesure d’audience'),
        p('Le site mesure sa fréquentation avec un outil intégré, sans cookie :'),
        ul([
          'aucune adresse IP n’est enregistrée ;',
          'un identifiant anonyme, renouvelé chaque jour, permet de compter les visites sans pouvoir vous suivre d’un jour à l’autre ;',
          'seules sont conservées la page consultée, la langue, le site de provenance, le type d’appareil, le navigateur et le pays ;',
          'ces données sont supprimées automatiquement au bout de 13 mois ;',
          'si votre navigateur envoie le signal « Ne pas me suivre », aucune donnée n’est enregistrée.',
        ]),
        h2('Vos droits'),
        p('Conformément à la loi camerounaise n° 2024/017 relative à la protection des données à caractère personnel et, pour les visiteurs européens, au RGPD, vous pouvez accéder à vos données, les faire rectifier ou supprimer en écrivant à laurainefotso0@gmail.com.'),
      ),
      doc(
        p('This website collects as little data as possible. It uses no tracking cookies and no advertising tools.'),
        h2('Contact form'),
        p('When you write to me, your name, email address, subject and message are stored so I can reply. They are never shared with third parties. You can ask for them to be deleted at any time.'),
        h2('Audience measurement'),
        p('The website measures its traffic with a built-in, cookie-free tool:'),
        ul([
          'no IP address is stored;',
          'an anonymous identifier, renewed every day, counts visits without being able to follow you from one day to the next;',
          'only the page viewed, language, referring website, device type, browser and country are kept;',
          'this data is automatically deleted after 13 months;',
          'if your browser sends a “Do Not Track” signal, nothing is recorded.',
        ]),
        h2('Your rights'),
        p('Under Cameroonian law No. 2024/017 on personal data protection and, for European visitors, the GDPR, you can access, correct or delete your data by writing to laurainefotso0@gmail.com.'),
      ),
    ),
  })

  payload.logger.info('Contenu de départ : terminé.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
