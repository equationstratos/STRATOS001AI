/* ─────────────────────────────── Réglages du site ───────────────────────────────
   Ce sont les seules lignes à modifier. Laisser "" pour une option non utilisée. */
const REGLAGES = {
  // EmailJS (emailjs.com) : le formulaire envoie l'email directement depuis le site.
  // Ces trois identifiants sont publics par conception (jamais la « Private Key » ici).
  emailjs: {
    service: "service_gablvm1",
    modele: "template_l2k93kc",
    cle: "s29yZqc0GU1_oIRt-",
  },
  // Autre service de formulaire, utilisé si "emailjs" est vide (ex. "https://formspree.io/f/abcdwxyz").
  formulaire: "",
  // Votre email : affiché en secours si l'envoi échoue, et utilisé tant que "formulaire" est vide.
  email: "stratos001ai@gmail.com",
  // Lien de prise de rendez-vous (Cal.com, Calendly). Vide : les boutons mènent au formulaire.
  rendezVous: "",
  // Vidéos de démo (Loom…). Vides : la section « Démos » reste masquée.
  demoContenu: "",
  demoAutomatisation: "",
  // Profils
  linkedin: "",
  x: "https://x.com/stratos001ai",
};

(function () {
  "use strict";
  const R = Object.assign({}, REGLAGES, window.REGLAGES_TEST || {});

  // ── Liens de rendez-vous, démos, réseaux ──
  if (R.rendezVous) {
    document.querySelectorAll("[data-rdv]").forEach((a) => {
      a.href = R.rendezVous;
      a.target = "_blank";
      a.rel = "noopener";
    });
    const bloc = document.querySelector("[data-rdv-bloc]");
    if (bloc) {
      bloc.querySelector("[data-rdv-lien]").href = R.rendezVous;
      bloc.hidden = false;
    }
  }

  const demos = { contenu: R.demoContenu, automatisation: R.demoAutomatisation };
  let auMoinsUneDemo = false;
  document.querySelectorAll("[data-demo]").forEach((a) => {
    const lien = demos[a.dataset.demo];
    if (lien) {
      a.href = lien;
      a.hidden = false;
      auMoinsUneDemo = true;
    }
  });
  const sectionDemos = document.getElementById("demos");
  if (auMoinsUneDemo && sectionDemos) sectionDemos.hidden = false;

  document.querySelectorAll("[data-reseau]").forEach((a) => {
    const lien = R[a.dataset.reseau];
    if (lien) {
      a.href = lien;
      a.hidden = false;
    }
  });

  document.querySelectorAll("[data-annee]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // ── Exemples par métier : onglets (flèches, Début et Fin au clavier) ──
  document.querySelectorAll("[data-onglets]").forEach((zone) => {
    const liste = zone.querySelector('[role="tablist"]');
    const onglets = [...zone.querySelectorAll('[role="tab"]')];
    const panneaux = onglets.map((o) => document.getElementById(o.getAttribute("aria-controls")));
    const choisir = (index, focus) => {
      onglets.forEach((onglet, i) => {
        const actif = i === index;
        onglet.setAttribute("aria-selected", String(actif));
        onglet.tabIndex = actif ? 0 : -1;
        panneaux[i].hidden = !actif;
      });
      if (focus) onglets[index].focus({ preventScroll: true });
      // Sur mobile, la barre d'onglets défile : on y amène l'onglet choisi, sans faire bouger la page.
      const o = onglets[index].getBoundingClientRect();
      const l = liste.getBoundingClientRect();
      if (o.left < l.left) liste.scrollLeft -= l.left - o.left + 8;
      else if (o.right > l.right) liste.scrollLeft += o.right - l.right + 8;
    };
    onglets.forEach((onglet, i) => {
      onglet.addEventListener("click", () => choisir(i, false));
      onglet.addEventListener("keydown", (e) => {
        const n = onglets.length;
        const cible = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (cible === undefined) return;
        e.preventDefault();
        choisir(cible, true);
      });
    });
    zone.classList.add("onglets--actifs");
    choisir(0, false);
  });

  // ── Page « Tous les projets » : filtres par domaine (sans JavaScript, tout s'affiche) ──
  document.querySelectorAll("[data-filtres]").forEach((zone) => {
    const boutons = [...zone.querySelectorAll("[data-filtre]")];
    const domaines = [...document.querySelectorAll("[data-domaine]")];
    boutons.forEach((bouton) => {
      bouton.addEventListener("click", () => {
        const choix = bouton.dataset.filtre;
        boutons.forEach((b) => b.setAttribute("aria-pressed", String(b === bouton)));
        domaines.forEach((d) => (d.hidden = choix !== "tous" && d.dataset.domaine !== choix));
        // Revenir en haut de la liste si on l'a dépassée
        const haut = zone.parentElement.getBoundingClientRect().top;
        if (haut < 0) zone.parentElement.scrollIntoView({ block: "start" });
      });
    });
    zone.hidden = false;
  });

  // ── Formulaire de contact ──
  const form = document.getElementById("formulaire");
  if (!form) return;
  const statut = document.getElementById("statut");
  const bouton = form.querySelector('button[type="submit"]');

  const afficher = (message, etat) => {
    statut.textContent = message;
    statut.dataset.etat = etat || "";
  };
  const contactSecours = () => (R.email ? ` ou écrivez directement à ${R.email}` : "");

  const champsValides = () => {
    let premierInvalide = null;
    form.querySelectorAll("input[required], textarea[required]").forEach((champ) => {
      const valide = champ.checkValidity() && champ.value.trim() !== "";
      champ.setAttribute("aria-invalid", valide ? "false" : "true");
      if (!valide && !premierInvalide) premierInvalide = champ;
    });
    if (premierInvalide) {
      premierInvalide.focus();
      const libelle = form.querySelector(`label[for="${premierInvalide.id}"]`);
      const nom = libelle ? libelle.textContent.replace(/\s*\(.*\)\s*/, "").trim() : "ce champ";
      afficher(
        premierInvalide.type === "email" && premierInvalide.value.trim()
          ? "Vérifiez votre adresse email."
          : `Merci de remplir : ${nom}.`,
        "erreur"
      );
      return false;
    }
    return true;
  };

  // Toutes les informations saisies, sous plusieurs noms : elles apparaissent dans l'email
  // aussi bien avec le modèle EmailJS par défaut ({{name}}, {{title}}, {{message}}…)
  // qu'avec un modèle personnalisé ({{nom}}, {{besoin}}, {{message_seul}}…).
  const recapitulatif = (donnees) => {
    const champ = (nom, defaut = "(non précisé)") => (donnees.get(nom) || "").toString().trim() || defaut;
    const infos = {
      nom: champ("nom"),
      email: champ("email"),
      entreprise: champ("entreprise"),
      besoin: champ("besoin"),
      message_seul: champ("message"),
    };
    const date = new Date().toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" });
    return Object.assign({}, infos, {
      name: infos.nom,
      title: infos.besoin,
      time: date,
      date: date,
      reply_to: infos.email,
      message: [
        `Nom et prénom : ${infos.nom}`,
        `Email : ${infos.email}`,
        `Métier ou entreprise : ${infos.entreprise}`,
        `Besoin : ${infos.besoin}`,
        `Envoyé le : ${date}`,
        "",
        "Message :",
        infos.message_seul,
      ].join("\n"),
    });
  };

  const remercier = () => {
    // Nom complet, tel que saisi (espaces multiples ramenés à un seul)
    const nomComplet = form.elements.nom.value.trim().replace(/\s+/g, " ").slice(0, 80);
    form.classList.add("formulaire--envoye");
    form.innerHTML = "";
    const titre = document.createElement("h3");
    titre.textContent = nomComplet ? `Merci ${nomComplet}, votre message est bien parti.` : "Merci, votre message est bien parti.";
    const texte = document.createElement("p");
    texte.textContent = "Je vous réponds sous 24 heures ouvrées, à l'adresse email indiquée.";
    form.append(titre, texte);
    titre.setAttribute("tabindex", "-1");
    titre.focus();
  };

  form.addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity() && e.target.value.trim()) {
      e.target.setAttribute("aria-invalid", "false");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!champsValides()) return;

    // Champ piège rempli : c'est un robot. On fait comme si de rien n'était.
    if (form.elements._honey.value) {
      remercier();
      return;
    }

    const donnees = new FormData(form);
    // Champs reconnus par FormSubmit : objet de l'email et mise en forme en tableau
    donnees.set("_subject", `Nouvelle demande depuis le site : ${donnees.get("besoin")} (${donnees.get("nom")})`);
    donnees.set("_template", "table");
    donnees.set("_captcha", "false");

    const ej = R.emailjs || {};
    const avecEmailjs = Boolean(ej.service && ej.modele && ej.cle);

    // Pas encore de service de formulaire : on ouvre la messagerie du visiteur.
    if (!avecEmailjs && !R.formulaire) {
      if (R.email) {
        const sujet = `Demande depuis le site : ${donnees.get("besoin")}`;
        const corps = `${donnees.get("message")}\n\n${donnees.get("nom")}\n${donnees.get("entreprise") || ""}\n${donnees.get("email")}`;
        window.location.href = `mailto:${R.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
        afficher("Votre messagerie s'ouvre avec le message prêt à envoyer.", "ok");
      } else {
        afficher("Le formulaire n'est pas encore relié : renseignez « formulaire » ou « email » dans assets/js/site.js.", "erreur");
      }
      return;
    }

    bouton.disabled = true;
    afficher("Envoi en cours…");
    try {
      const reponse = avecEmailjs
        ? await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id: ej.service,
              template_id: ej.modele,
              user_id: ej.cle,
              template_params: recapitulatif(donnees),
            }),
          })
        : await fetch(R.formulaire, {
            method: "POST",
            body: donnees,
            headers: { Accept: "application/json" },
          });
      if (!reponse.ok) {
        console.error("Envoi refusé :", reponse.status, await reponse.text().catch(() => ""));
        throw new Error(`HTTP ${reponse.status}`);
      }
      if (avecEmailjs) {
        remercier();
        return;
      }
      // FormSubmit répond 200 avec {"success": "false"} quand le formulaire n'est pas encore activé.
      const resultat = await reponse.json().catch(() => ({}));
      if (resultat.success === false || resultat.success === "false") throw new Error(resultat.message || "refusé");
      remercier();
    } catch (erreur) {
      bouton.disabled = false;
      afficher(`Le message n'a pas pu partir. Réessayez dans un instant${contactSecours()}.`, "erreur");
    }
  });
})();
