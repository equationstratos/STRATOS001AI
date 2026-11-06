# Site de présentation : services IA pour indépendants et petites entreprises

Site statique (HTML, CSS, JavaScript), sans dépendance ni outil de construction, publié avec GitHub Pages. Aucun cookie, aucune mesure d'audience, polices hébergées sur le site.

## Mise en ligne avec GitHub Pages

1. Dans le dépôt : **Settings → Pages**.
2. **Source** : *Deploy from a branch*. **Branch** : `main`, dossier `/ (root)`. Enregistrer.
3. Après une à deux minutes, le site est en ligne. L'adresse exacte est affichée en haut de la page **Settings → Pages** (ici `https://equationstratos.github.io/STRATOS001AI/`).

Avec un compte GitHub gratuit, GitHub Pages ne fonctionne que si le dépôt est public.

Si l'adresse finale est différente (autre nom, nom de domaine personnalisé), mettre à jour `og:url` et `og:image` en haut de `index.html` : ce sont elles qui affichent l'aperçu quand le lien est partagé sur LinkedIn ou X.

## Réglages

Tous les réglages sont en haut de [`assets/js/site.js`](assets/js/site.js) :

| Réglage | Rôle | Si vide |
|---|---|---|
| `formulaire` | Adresse qui reçoit le formulaire de contact (voir ci-dessous) | Le formulaire ouvre la messagerie du visiteur si `email` est rempli |
| `email` | Email de contact de secours | Pas d'email affiché |
| `rendezVous` | Lien Cal.com ou Calendly | Les boutons « Réserver 15 min » mènent au formulaire |
| `demoContenu`, `demoAutomatisation` | Liens des vidéos de démo | La section « Démos » reste masquée |
| `linkedin`, `x` | Liens des profils | Liens masqués dans le pied de page |

## Formulaire de contact

Les messages partent directement depuis le site vers **stratos001ai@gmail.com**, via [EmailJS](https://www.emailjs.com) (service Gmail). Les identifiants sont dans le réglage `emailjs` de `assets/js/site.js` : Service ID, Template ID et Public Key (publics par conception ; ne jamais y mettre la Private Key).

Le site envoie toutes les informations saisies : `{{message}}` contient le récapitulatif complet (nom, email, métier, besoin, date, message), ce qui suffit avec le modèle par défaut d'EmailJS. Variables disponibles pour un modèle personnalisé : `{{nom}}`, `{{email}}`, `{{entreprise}}`, `{{besoin}}`, `{{message_seul}}`, `{{date}}` (et `{{name}}`, `{{title}}`, `{{time}}`, `{{reply_to}}` pour le modèle par défaut). Mettre `{{email}}` en « Reply To » pour répondre directement au visiteur.

Sécurité : dans EmailJS, **Account → Security**, limiter l'envoi au domaine du site (`equationstratos.github.io`).

Le formulaire contient un champ piège (`_honey`) contre les robots. Si `emailjs` est vidé, le réglage `formulaire` (Formspree, FormSubmit…) est utilisé à la place.

## À compléter avant de partager le lien

- [ ] **`mentions-legales.html`** : remplacer chaque élément entre crochets, affiché en orange (nom, SIRET, adresse). Ces mentions sont obligatoires pour un site professionnel en France.
- [ ] **`assets/js/site.js`** : `rendezVous` (le formulaire est déjà relié).
- [ ] **`index.html`** : retirer la ligne « Tarif fondateur… » (repérée par un commentaire) après les trois premiers clients.

## Page Réalisations (portfolio)

`realisations.html` présente les projets, les compétences et ce qu'ils apportent à un client.

**Ajouter un projet** (par exemple réalisé avec une autre IA) : dans `realisations.html`, copier un bloc complet `<article class="pf-projet"> … </article>` et le coller à la suite. Changer le numéro, le titre, les textes et le badge `<span class="pf-badge">Claude</span>` (ex. `ChatGPT`, `Midjourney`). Alterner `pf-projet` et `pf-projet pf-projet--inverse` pour que le visuel change de côté. Pour une image, la placer dans `assets/img/realisations/` et reprendre un bloc avec `<figure class="pf-projet__visuel pf-capture">`.

Penser à mettre à jour les chiffres en haut de page (`pf-chiffres`), le titre « Six projets… » et le badge « Réalisé avec » s'il y a d'autres outils.

## Page Tous les projets

`projets.html` recense tous les projets (32), classés en 6 domaines avec des filtres. Sans JavaScript, tous les domaines s'affichent.

**Ajouter un projet** : copier un bloc `<article class="pj-carte"> … </article>` dans le bon domaine, puis changer :
- l'image : `assets/img/projets/nom.jpg`, au format 800 × 500 (ou garder une icône avec `pj-carte__visuel--icone`) ;
- le type, le titre, la description et les étiquettes (`pj-tags`) ;
- le pied de carte : lien « Voir le code » pour un dépôt public, ou « Projet privé · démo sur demande ».

Mettre ensuite à jour le nombre de projets du domaine (`pj-domaine__nombre`), le compteur du filtre correspondant et celui de « Tous », et les chiffres du haut de page. Un domaine de 4 projets utilise `pj-grille pj-grille--4` (4 colonnes) ; les autres `pj-grille` (3 colonnes).

Les visuels des projets sont des captures des visualiseurs 3D et des rendus présents dans les dépôts.

## Page Certifications

`certifications.html` affiche les badges obtenus, avec leur lien de vérification, et un tableau du parcours : obtenus et prévus.

- **Ajouter un badge obtenu** : copier un bloc `<article class="cert"> … </article>`, choisir l'organisme (`cert--anthropic`, `cert--google`, `cert--github`, `cert--microsoft`, `cert--ibm`, `cert--helsinki`) et la médaille correspondante (`medaille--…`), puis changer le titre, la date et le lien « Vérifier ». Ensuite, passer la ligne du tableau de `statut--prevu` à `statut--obtenu` et mettre à jour les chiffres du haut.
- **Visuel officiel du badge** : déposer l'image dans `assets/img/badges/` (900 px de large suffisent) et l'indiquer dans le bloc `<div class="cert__visuel …"><img src="…"></div>` de la carte. Pour Claude Academy, l'image se trouve dans le PDF du badge (*Download PDF* sur *Your learning*) ; pour Google Skills, sur la page du badge.
- **Lien de vérification Claude Academy** : sur academy.claude.com, *Your learning*, ouvrir le badge et copier son lien public (`https://academy.claude.com/verify/…`).
- **Profil Google Skills** : renseigner `profilGoogleSkills` dans `assets/js/site.js` avec l'adresse du profil public. Le lien « Voir le profil » apparaît alors sous chaque badge Google.

## Structure

```
index.html               Page d'accueil
realisations.html        Réalisations (portfolio détaillé)
projets.html             Tous les projets
certifications.html      Certifications et parcours de formation
mentions-legales.html    Mentions légales et confidentialité
assets/css/style.css     Styles (couleurs relevées sur le logo, en haut du fichier)
assets/js/site.js        Réglages et envoi du formulaire
assets/img/              Logo (fond transparent), icônes, image de partage
assets/img/realisations/ Visuels de la page Réalisations
assets/img/projets/      Vignettes de la page Tous les projets (800 × 500)
assets/fonts/            Polices Outfit et Instrument Sans (licence SIL Open Font License)
```

## Licences

Les polices Outfit et Instrument Sans sont distribuées sous licence SIL Open Font License 1.1 (fichiers `*-OFL.txt` dans `assets/fonts/`). Le logo et les textes appartiennent à l'éditeur du site.
