# Site de présentation : services IA pour indépendants et petites entreprises

Site statique (HTML, CSS, JavaScript), sans dépendance ni outil de construction, publié avec GitHub Pages. Aucun cookie, aucune mesure d'audience, polices hébergées sur le site.

## Mise en ligne avec GitHub Pages

1. Dans le dépôt : **Settings → Pages**.
2. **Source** : *Deploy from a branch*. **Branch** : `main`, dossier `/ (root)`. Enregistrer.
3. Après une à deux minutes, le site est en ligne. L'adresse exacte est affichée en haut de la page **Settings → Pages** (en principe `https://equationstratos.github.io/website1/`).

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

Le site étant statique, l'envoi passe par un service de formulaire. Exemple avec [Formspree](https://formspree.io) :

1. Créer un compte, puis un formulaire (*New form*).
2. Copier son adresse, de la forme `https://formspree.io/f/abcdwxyz`, dans le réglage `formulaire`.
3. Envoyer un message de test depuis le site : Formspree demande de confirmer l'adresse email de réception lors du premier envoi.

L'offre gratuite de Formspree limite le nombre de messages par mois (vérifier la limite actuelle). Le formulaire contient un champ piège (`_gotcha`) contre les robots. Tout service qui accepte un envoi `POST` de formulaire et répond avec un code 200 fonctionne de la même manière.

## À compléter avant de partager le lien

- [ ] **`mentions-legales.html`** : remplacer chaque élément entre crochets, affiché en orange (nom, SIRET, adresse, email, nom du service de formulaire). Ces mentions sont obligatoires pour un site professionnel en France.
- [ ] **`assets/js/site.js`** : au minimum `formulaire` (ou `email`) et `rendezVous`.
- [ ] **`index.html`** : retirer la ligne « Tarif fondateur… » (repérée par un commentaire) après les trois premiers clients.

## Structure

```
index.html               Page d'accueil
mentions-legales.html    Mentions légales et confidentialité
assets/css/style.css     Styles (couleurs relevées sur le logo, en haut du fichier)
assets/js/site.js        Réglages et envoi du formulaire
assets/img/              Logo (fond transparent), icônes, image de partage
assets/fonts/            Polices Outfit et Instrument Sans (licence SIL Open Font License)
```

## Licences

Les polices Outfit et Instrument Sans sont distribuées sous licence SIL Open Font License 1.1 (fichiers `*-OFL.txt` dans `assets/fonts/`). Le logo et les textes appartiennent à l'éditeur du site.
