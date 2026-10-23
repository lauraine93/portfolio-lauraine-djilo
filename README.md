# Portfolio — Lauraine Djilo

Site portfolio bilingue (français / anglais) de Lauraine Djilo, UI/UX Product Designer, avec un back-office complet pour tout modifier sans code.

- **Site public** : Next.js 16 (App Router), React 19, TypeScript, CSS pur avec variables de thème.
- **Back-office** : Payload CMS 3, intégré à la même application, sur `/admin`.
- **Base de données** : SQLite en local, PostgreSQL en production.
- **Polices** : auto-hébergées (Fontsource), aucune requête vers un service tiers.

## Démarrer en local

Prérequis : Node.js 22.23 ou plus récent (ou 24.22+).

```bash
npm install
cp .env.example .env          # puis renseigner PAYLOAD_SECRET
SEED_ADMIN_EMAIL=vous@exemple.com SEED_ADMIN_PASSWORD='un-mot-de-passe-solide' npm run seed
npm run dev
```

- Site : http://localhost:3000 (redirige vers `/fr` ou `/en` selon la langue du navigateur)
- Back-office : http://localhost:3000/admin

`npm run seed` remplit la base avec le contenu de départ (profil réel, trois projets **d'exemple**) et crée le compte administratrice. Il peut être relancé : il remplace le contenu de départ.

## Ce qui se règle dans le back-office

| Écran | Contenu |
| --- | --- |
| Apparence › Thème | Couleurs (avec pipette, aperçu et contrôle des contrastes WCAG), polices, forme des boutons, arrondi des cartes |
| Apparence › Page d’accueil | Sections en blocs : ajouter, masquer, réordonner par glisser-déposer ; tous les textes, photos, boutons, curseurs « Figma » et leur position, bandeau défilant (mots, vitesse, inclinaison), faits clés, signature |
| Contenu › Projets | Projets et études de cas, brouillons, versions ; les projets « Exemple » ne peuvent pas être publiés |
| Contenu › Services, Parcours › Expériences, Formations, Certifications, Outils | Listes, ordre, visibilité |
| Réglages › Réglages du site | Identité, menu, pied de page, disponibilité, mode de travail, types d’opportunité (repris dans le formulaire), langues, CV FR / EN, référencement, intensité des animations |
| Messages | Demandes reçues par le formulaire de contact, avec statut |

Astuces de saisie :

- Dans un titre, entourez des mots d’astérisques pour les surligner : `Je suis *Lauraine Djilo*`.
- Dans un lien, `#projets` vise une section de l’accueil, `/contact` une page, `cv` le CV de la langue affichée.
- Chaque texte existe en français et en anglais : changez la langue avec le sélecteur « Locale » en haut de l’écran.

## Pages du site

| Adresse | Contenu | Où le modifier |
| --- | --- | --- |
| `/fr`, `/en` | Accueil | Apparence › Page d’accueil |
| `/projets` | Liste des projets, filtrable par type | Apparence › Pages › Projets ; Contenu › Projets |
| `/projets/[adresse]` | Étude de cas composée en blocs (texte, image, galerie, citation, encadré, points clés, prototype Figma) | Contenu › Projets |
| `/services` | Services, méthode de travail, opportunités recherchées | Apparence › Pages › Services ; Contenu › Services ; Réglages |
| `/a-propos` | Histoire, façon de travailler, expériences, formation, certifications, outils, langues | Apparence › Pages › À propos ; Parcours |
| `/contact` | Formulaire de contact | Apparence › Pages › Contact ; Réglages (types d’opportunité) |
| `/mentions-legales`, `/confidentialite`… | Pages de texte libres | Contenu › Pages simples |

## Statistiques

Le back-office contient sa propre mesure d’audience : **/admin/statistiques**, et un résumé des 30 derniers jours en tête du tableau de bord. Rien à installer ni à configurer : elle fonctionne dès que le site est en ligne.

- **Indicateurs** : visites, pages vues, CV téléchargés, messages reçus, taux de contact. Chacun est comparé à la période précédente (7 jours, 30 jours, 3 mois ou 12 mois).
- **Détails** : courbe jour par jour, pages les plus vues, provenance (LinkedIn, Google, accès direct…), pays, appareils, langues, navigateurs, liens externes cliqués.
- **Vie privée** : aucun cookie, aucune adresse IP enregistrée. Un identifiant anonyme est renouvelé chaque jour. Le signal « Ne pas me suivre » est respecté. Les données sont supprimées automatiquement après 13 mois (durée réglable).
- **Comptage** : les robots et vos propres visites quand vous êtes connectée au back-office ne sont pas comptés.
- **Pays** : il est fourni par l’hébergeur (Vercel, Cloudflare, Netlify…). Il s’affiche « Non déterminé » si l’hébergeur ne le transmet pas.

Réglages : Réglages du site › Statistiques.

## Garde-fous

- Une palette dont les contrastes passent sous WCAG AA est refusée à l’enregistrement.
- Les projets d’exemple restent en brouillon et ne s’affichent que si `SHOW_EXAMPLE_CONTENT=true`.
- Le formulaire de contact est protégé par un champ piège anti-robots et une limite de 5 envois par heure et par adresse IP.
- Le compte est verrouillé 15 minutes après 5 tentatives de connexion ratées.

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` puis `npm start` | Version de production |
| `npm run seed` | Contenu de départ |
| `npm run typecheck` | Vérification TypeScript |
| `npm run test:int` | Tests unitaires (contrastes, liens, polices) |
| `npm run generate:types` | Régénère `src/payload-types.ts` après un changement de modèle |
| `npm run generate:importmap` | Régénère la carte des composants du back-office |

## Structure

```
src/
  app/(frontend)/[locale]/   pages publiques (accueil, contact), une par langue
  app/(payload)/             back-office et API Payload
  collections/               projets, services, parcours, médias, messages, comptes
  globals/                   thème, réglages du site, page d’accueil en blocs
  components/site/           composants React du site (une section = un composant)
  components/admin/          champ couleur et aperçu de thème du back-office
  lib/                       couleurs et contrastes, polices, thème, données, langues
  seed/                      contenu de départ et photos
```

## Mise en production

Le site, le back-office et les statistiques forment une seule application : un seul déploiement suffit.

1. Créer une base PostgreSQL (par exemple Neon ou Supabase, offre gratuite suffisante au démarrage) et renseigner `DATABASE_URL`.
2. Définir `PAYLOAD_SECRET` (long et aléatoire), `NEXT_PUBLIC_SERVER_URL` (l’adresse publique) et `SHOW_EXAMPLE_CONTENT=false`.
3. Prévoir un stockage durable pour les médias : sur un hébergeur sans disque persistant (Vercel), ajouter l’adaptateur de stockage S3 / Cloudflare R2 de Payload.
4. Déployer : `npm run build` puis `npm start` sur un serveur Node, ou import du dépôt sur Vercel.
5. Lancer `npm run seed` une fois sur la base de production (avec `SEED_ADMIN_EMAIL` et `SEED_ADMIN_PASSWORD`), puis remplacer le contenu d’exemple.
6. Compléter la page « Mentions légales » avec les coordonnées de l’hébergeur.

SQLite (`file:./portfolio.db`) ne convient qu’au développement local : les hébergeurs sans disque persistant l’effaceraient à chaque déploiement.
