# PRD — Site Web Cabinet d'Avocats
## Version 2.0 — Klein Blue Edition — Mars 2026

---

## CONTEXTE DU PROJET

Créer le site web d'une avocate libérale basée en Île-de-France, spécialisée en **droit des affaires** et **droit du travail**. La clientèle cible est composée de dirigeants d'entreprises (TPE/PME) et de grandes entreprises/ETI. Le site doit projeter une image **experte, rigoureuse, humaine et haut de gamme**, sans être froid ni institutionnel. L'archétype visuel est **B+ : éditorial accessible et percutant**.

Le nom du cabinet est **[NOM_CABINET] Avocats** (placeholder à remplacer).

---

## SECTION 01 — SYSTÈME DE DESIGN

### Palette de couleurs

| Token CSS | Valeur HEX | Usage |
|---|---|---|
| `--color-accent` | `#002FA7` | Klein Blue — accent principal, CTA, liens actifs, borders focus |
| `--color-accent-hover` | `#0038CC` | Hover sur tous les éléments accent |
| `--color-accent-deep` | `#001E6E` | Active/pressed, focus ring |
| `--color-accent-tint` | `#E8EDFF` | Fond léger bleu — pills, badges, alertes, highlights |
| `--color-bg` | `#FFFFFF` | Background général |
| `--color-bg-alt` | `#F5F5F7` | Sections alternées — off-white froid |
| `--color-bg-dark` | `#0A0D1A` | Hero, sections sombres, footer — noir bleuté |
| `--color-text` | `#060608` | Texte principal |
| `--color-text-muted` | `#6B6C7A` | Texte secondaire, labels, captions |
| `--color-text-inv` | `#FFFFFF` | Texte sur fond sombre ou bleu |
| `--color-border` | `#E0E0E8` | Bordures légères, séparateurs |
| `--color-error` | `#D93025` | États d'erreur formulaires |

**Règle absolue** : Jamais d'or, jamais de crème chaude. Tout est dans le spectre noir/blanc/bleu klein.

---

### Typographie

**Font 1 — Display (titres H1, H2)**
- Famille : `Cormorant Garamond`
- Source : Google Fonts (gratuit)
- Variantes utilisées : Bold 700, Regular 400, Regular Italic 400
- Rôle : prestige, élégance, caractère éditorial

**Font 2 — Interface (tout le reste)**
- Famille : `DM Sans`
- Source : Google Fonts (gratuit)
- Variantes utilisées : Light 300, Regular 400, Medium 500, SemiBold 600
- Rôle : lisibilité, modernité, clarté

**Échelle typographique complète**

| Élément | Font | Taille Desktop | Taille Mobile | Weight | Autres |
|---|---|---|---|---|---|
| H1 Hero | Cormorant Garamond | 80px | 44px | 700 Bold | line-height: 1.06, letter-spacing: -0.02em |
| H1 Page | Cormorant Garamond | 56px | 36px | 700 Bold | line-height: 1.1 |
| H2 Section | Cormorant Garamond | 40px | 28px | 400 Italic | line-height: 1.3 |
| H3 Sous-section | DM Sans | 22px | 18px | 600 SemiBold | line-height: 1.3 |
| Body principal | DM Sans | 17px | 16px | 400 Regular | line-height: 1.75, color: --color-text |
| Body secondaire | DM Sans | 15px | 14px | 400 Regular | line-height: 1.6, color: --color-text-muted |
| CTA / Bouton | DM Sans | 13px | 13px | 500 Medium | uppercase, letter-spacing: 0.06em |
| Navigation | DM Sans | 14px | 20px | 500 Medium | letter-spacing: 0.03em |
| Label / Eyebrow | DM Sans | 11px | 11px | 600 SemiBold | uppercase, letter-spacing: 0.12em, color: #002FA7 |
| Caption | DM Sans | 13px | 13px | 400 Regular | color: --color-text-muted |

---

### Grille & Espacement

**Breakpoints (mobile-first)**
- Mobile : 390px — 4 colonnes, gutter 16px, margin 20px
- Tablet : 768px — 8 colonnes, gutter 16px, margin 40px
- Laptop : 1024px — 12 colonnes, gutter 20px, margin 60px
- Desktop : 1280px+ — 12 colonnes, gutter 24px, margin 80px, max-width 1280px centré

**Spacing scale (base 8px)**
```
--s1: 8px
--s2: 16px
--s3: 24px
--s4: 32px
--s5: 48px
--s6: 64px
--s7: 96px
--s8: 128px
```

**Sections**
- Padding vertical desktop : 96–128px haut et bas
- Padding vertical tablet : 72px
- Padding vertical mobile : 56–64px

**Border radius**
- Boutons : 2px (quasi-carré, élégant)
- Cards : 4px
- Inputs : 2px
- Images : 0px (pas de radius)
- Badges/pills : 3px

**Ombres**
- Card default : `box-shadow: 0 2px 24px rgba(0, 0, 0, 0.06)`
- Card hover : `box-shadow: 0 8px 32px rgba(0, 47, 167, 0.12)` — teinte bleue

---

### États des éléments interactifs

**Bouton Primaire (Klein Blue)**
```
Default  → background: #002FA7 | color: #FFFFFF | border: none | radius: 2px | padding: 14px 32px
Hover    → background: #0038CC | transform: scale(1.01) | transition: 200ms ease-out
Focus    → outline: 3px solid #002FA7 | outline-offset: 3px
Active   → background: #001E6E | transform: scale(0.97) | transition: 80ms
Disabled → background: #E0E0E8 | color: #6B6C7A | opacity: 0.6 | cursor: not-allowed
Loading  → background: #002FA7 | spinner blanc centré | aria-busy: true
```

**Bouton Secondaire (outline)**
```
Default  → background: transparent | border: 1.5px solid #002FA7 | color: #002FA7
Hover    → background: #002FA7 | color: #FFFFFF | transition: 200ms
Focus    → outline: 3px solid #002FA7 | outline-offset: 3px
Active   → background: #001E6E | color: #FFFFFF | transform: scale(0.97)
Disabled → border-color: #E0E0E8 | color: #6B6C7A | opacity: 0.6
```

**Bouton Ghost (sur fond sombre)**
```
Default  → background: transparent | border: 1.5px solid rgba(255,255,255,0.40) | color: #FFFFFF
Hover    → background: rgba(255,255,255,0.10) | border-color: rgba(255,255,255,0.70)
```

**Input formulaire**
```
Default      → border: 1px solid #E0E0E8 | background: #FFFFFF | radius: 2px | padding: 12px 16px
Placeholder  → color: #6B6C7A | DM Sans Regular 15px
Focus        → border: 1px solid #002FA7 | box-shadow: 0 0 0 3px rgba(0,47,167,0.15)
Filled       → border: 1px solid #002FA7
Error        → border: 1px solid #D93025 | box-shadow: 0 0 0 3px rgba(217,48,37,0.15)
Disabled     → background: #F0F0F5 | border: #E0E0E8 | color: #6B6C7A | cursor: not-allowed
```

**Liens & Navigation**
```
Lien texte default       → color: #002FA7 | text-decoration: none
Lien texte hover         → text-decoration: underline 2px solid #002FA7 | transition: 150ms
Nav item default         → color: #060608 | DM Sans Medium 14px
Nav item hover           → color: #002FA7 | pseudo-underline glisse L→R | transition: 250ms
Nav item actif (page)    → color: #002FA7 | underline 2px fixe
Card hover               → translateY(-4px) | border-color: #002FA7 | shadow bleu | 200ms
Image hover              → scale(1.03) overflow hidden | transition: 400ms ease-out
```

---

## SECTION 02 — ANIMATIONS & INTERACTIONS

**Principe directeur** : Les animations révèlent le contenu avec élégance. Elles ne distraient pas. Chaque animation a un but fonctionnel. Durée max : 600ms. Easing universel : `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

**Règle d'accessibilité obligatoire** :
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

**Tableau des animations**

| Animation | Effet | Timing | Déclencheur |
|---|---|---|---|
| Scroll Reveal | fade-in + translateY(24px → 0) | 500ms, delay échelonné 80ms | Tous les blocs au scroll |
| Hero Text | Split lines reveal ligne par ligne | 800ms, stagger 80ms/ligne | Entrée page — H1 + tagline |
| Navbar scroll | transparent → #0A0D1A + ombre | 200ms | Scroll > 60px |
| Hover CTA primaire | bg #002FA7→#0038CC + scale(1.01) | 200ms | Hover bouton |
| Hover nav links | underline klein glisse L→R | 250ms | Hover menu desktop |
| Hover cards dossiers | translateY(-4px) + border klein + shadow bleu | 200ms | Hover card portfolio |
| Hover images | scale(1.03) overflow:hidden | 400ms ease-out | Hover photos section About |
| Page load | fade global 0→1 | 300ms | DOMContentLoaded |
| Transition pages | fade out 150ms + fade in 150ms | 300ms total | Navigation entre pages |
| Curseur custom (opt.) | cercle 10px bleu, grossit sur hover lien | — | Desktop uniquement |
| Parallax hero (opt.) | image de fond vitesse 0.5× au scroll | GSAP | Hero section |

**Règles interdites**
- Pas d'auto-play vidéo ou audio
- Pas d'animation en boucle infinie visible sans interaction utilisateur
- Pas de loading spinner (optimiser les perfs pour l'éviter)
- Pas d'animation qui retarde l'accès au contenu de plus de 300ms

---

## SECTION 03 — ARCHITECTURE DU SITE

### Pages

```
/                  → Accueil (Home) — page principale
/profil            → Profil & À propos de l'avocate
/dossiers          → Mes Dossiers — Portfolio juridique anonymisé
/contact           → Contact & Prise de RDV (Calendly)
/mentions-legales  → Mentions légales (obligatoire RGPD)

Phase 2 (plus tard) :
/actualites        → Blog juridique
/droit-affaires    → Page SEO spécialité
/droit-travail     → Page SEO spécialité
```

### Navigation principale

**Desktop**
- Logo à gauche : wordmark "[NOM_CABINET] Avocats" — Cormorant Garamond
- Liens à droite : Accueil · Profil · Mes Dossiers · Contact — DM Sans Medium 14px
- Bouton CTA tout à droite : "Prendre RDV" — fond Klein #002FA7 — toujours visible
- État transparent : fond transparent sur hero, texte blanc, logo blanc
- État scrollé (>60px) : fond #0A0D1A, texte blanc, ombre légère, transition 200ms
- Position : sticky top, z-index élevé

**Mobile (≤768px)**
- Logo gauche + hamburger (3 lignes → X) droite
- Menu fullscreen fond #0A0D1A, liens centrés, DM Sans Medium 20px
- Bouton "Prendre RDV" klein visible dans le menu
- Sticky bar optionnelle en bas de page : "Prendre RDV" — très efficace pour conversion

### Footer

- Fond : #0A0D1A
- Ligne accent 2px Klein Blue #002FA7 tout en haut du footer
- Colonne 1 (40%) : Logo + tagline court + icône LinkedIn + copyright
- Colonne 2 (30%) : Nav rapide — Accueil · Profil · Mes Dossiers · Contact
- Colonne 3 (30%) : Infos — Barreau de Paris · [Adresse IDF] · [Email]
- Bande basse : Mentions légales · Politique de confidentialité — DM Sans 12px muted
- Mobile : stack vertical centré

---

## SECTION 04 — PAGE ACCUEIL (HOME)

La home comporte 6 sections dans cet ordre exact.

---

### SECTION A — HERO (hauteur 100vh)

**Fond**
- Image plein écran `[PLACEHOLDER_IMG_HERO]` — 1920×1080px minimum, format WebP
- `object-fit: cover` — `object-position: center`
- Overlay gradient : `linear-gradient(135deg, rgba(10,13,26,0.72) 0%, rgba(0,47,167,0.18) 100%)`
- Le bleu klein transparaît légèrement en haut — renforce l'identité

**Contenu (centré à gauche, max-width 680px)**

Eyebrow label en haut :
```
DROIT DES AFFAIRES · DROIT DU TRAVAIL · PARIS
DM Sans SemiBold — 11px — #002FA7 — tracking: 0.14em — uppercase
Petite ligne verticale klein 32px avant le texte
```

H1 :
```
Votre droit.
Votre force.
Cormorant Garamond Bold — 80px desktop / 44px mobile
line-height: 1.06 — color: #FFFFFF — max-width: 640px
```

Tagline sous le H1 :
```
J'accompagne les dirigeants et leurs entreprises avec rigueur, clarté et engagement.
DM Sans Light 300 — 18px desktop / 16px mobile
color: rgba(255,255,255,0.80) — line-height: 1.65 — max-width: 500px
```

CTAs côte à côte :
```
[Bouton primaire] "Prendre RDV" → /contact
  fond: #002FA7 | texte: blanc | padding: 16px 36px | radius: 2px

[Lien texte] "Découvrir le cabinet →" → /profil
  texte: blanc | underline klein au hover
```

Scroll indicator en bas de section :
```
Chevron ↓ ou texte "Scroll" vertical
blanc 40% opacité — animation pulse 2s en boucle
```

**Mobile**
- H1 : 44px
- Tagline : 16px
- CTAs : pleine largeur, empilés verticalement
- Image : object-position: top center pour ne pas couper un visage

---

### SECTION B — ACCROCHE & CHIFFRES (fond #F5F5F7)

**Structure : 2 colonnes sur desktop, 1 colonne sur mobile**

Colonne gauche (60%) — texte accroche :
```
Eyebrow : "MON APPROCHE" — klein — 11px uppercase
H2 : "J'interviens là où les enjeux sont les plus élevés."
     Cormorant Garamond Italic — 36px
Corps : [PLACEHOLDER_TEXTE_ACCROCHE] — 3-4 lignes — DM Sans 17px
Lien : "En savoir plus →" — color klein
```

Colonne droite (40%) — 3 métriques :
```
Métrique 1 : [X]+ ans — DM Sans Bold 52px noir — "d'expérience" DM Sans 13px muted
Métrique 2 : [XX]+ — DM Sans Bold 52px noir — "dossiers traités" DM Sans 13px muted
Métrique 3 : 2 — DM Sans Bold 52px noir — "spécialités maîtrisées" DM Sans 13px muted
Séparateurs verticaux fins #E0E0E8 entre les métriques
```

**Mobile** : stack vertical, métriques sur 1 ligne chacune, valeur + label

---

### SECTION C — EXPERTISES (fond #FFFFFF)

**Structure : titre centré + 2 grandes cards côte à côte**

Titre section centré :
```
Eyebrow : "MES DOMAINES" — klein — 11px uppercase
H2 : "Une expertise double au service de votre activité."
     Cormorant Garamond Italic — 40px — centré
```

Card 1 — Droit des Affaires :
```
Fond : #F5F5F7 | border: 1px solid #E0E0E8 | radius: 4px | padding: 40px
Eyebrow klein : "DROIT DES AFFAIRES"
H3 : "Sécuriser et développer votre entreprise."
Corps : accompagnement des dirigeants dans toutes leurs opérations
Sous-items (liste) :
  → Cessions & acquisitions (M&A)
  → Rédaction et négociation de contrats
  → Création et restructuration de sociétés
  → Litiges commerciaux et contentieux
  → Contrats commerciaux internationaux
Lien bas : "Voir les dossiers →" — color klein
```

Card 2 — Droit du Travail :
```
Fond : #002FA7 (klein) | radius: 4px | padding: 40px — section inversée
Eyebrow blanc 60% : "DROIT DU TRAVAIL"
H3 blanc : "Protéger vos équipes, maîtriser vos risques."
Corps blanc 80% : accompagnement des employeurs et dirigeants
Sous-items (liste) blanc 80% :
  → Plans de sauvegarde de l'emploi (PSE)
  → Ruptures conventionnelles collectives (RCC)
  → Négociations collectives & accords d'entreprise
  → Licenciements et contentieux prud'homaux
  → Audits sociaux & conformité RH
Lien bas : "Voir les dossiers →" — blanc
```

**Mobile** : cards empilées verticalement

---

### SECTION D — PRÉSENTATION AVOCATE (fond #0A0D1A)

**Structure : 2 colonnes 50/50 desktop — photo gauche, texte droite**

Photo (gauche 50%) :
```
[PLACEHOLDER_IMG_ABOUT] — portrait 3:4 — haute résolution
object-fit: cover — hauteur section complète
Légère vignette sur les bords pour fondu avec le fond sombre
```

Texte (droite 50%) — padding 64px :
```
Eyebrow : "L'AVOCATE" — #002FA7 — 11px — uppercase — tracking 0.14em
H2 blanc : "[Prénom Nom]"
           Cormorant Garamond Bold — 48px
Sous-titre blanc 70% : "Avocate au Barreau de Paris"
                        DM Sans Regular — 18px

Corps blanc 80% (3-4 §) : [PLACEHOLDER_TEXTE_ABOUT_HOME]
Ton : première personne, direct, chaleureux
Ex : "Je défends les intérêts des dirigeants et de leurs entreprises depuis [X] ans..."

Badges de confiance (flex row) :
  [Barreau de Paris] [Master [Université]] [[X] ans d'expérience]
  bg: rgba(0,47,167,0.35) | color: blanc | border: 1px solid rgba(0,47,167,0.55)
  DM Sans Medium 12px | padding: 5px 12px | radius: 3px

CTA lien : "Découvrir mon parcours →" — texte blanc — underline klein hover
```

**Mobile** : photo en haut (aspect 16:9, object-position: top), texte en dessous sur fond dark

---

### SECTION E — DOSSIERS EN VEDETTE (fond #F5F5F7)

**Structure : titre + grille 3 cards + CTA bas**

Header section :
```
Eyebrow klein : "MES DOSSIERS"
H2 : "Des résultats concrets pour des enjeux complexes."
Lien droite : "Voir tous les dossiers →" — color klein
```

Grille 3 cards dossiers (voir specs cards dans Section 07) :
- Card 1 : placeholder dossier droit du travail (PSE)
- Card 2 : placeholder dossier droit des affaires (cession PME)
- Card 3 : placeholder contentieux (litige associés)

CTA centré bas :
```
Bouton secondaire : "Voir tous mes dossiers"
Sous-texte muted : "6 dossiers illustrés · anonymisés"
```

**Mobile** : 1 colonne, 3 cards empilées

---

### SECTION F — CTA FINAL (fond #002FA7 Klein Blue)

**Section la plus identitaire du site — fond plein Klein Blue**

Contenu centré :
```
H2 : "Votre prochain dossier commence ici."
     Cormorant Garamond Bold — 52px desktop / 36px mobile — blanc — centré

Sous-titre :
     "Prenez contact pour un premier échange confidentiel et sans engagement."
     DM Sans Light 300 — 18px desktop / 16px mobile — rgba(255,255,255,0.80) — centré — max-width: 480px

Bouton CTA :
     "Prendre RDV" — fond blanc #FFFFFF — texte klein #002FA7 — padding: 16px 40px
     Hover : fond #E8EDFF | transition 200ms

Badge de réassurance sous le bouton :
     "Premier échange confidentiel · Sans engagement"
     DM Sans Regular — 13px — blanc 55%
```

---

## SECTION 05 — PAGE PROFIL (/profil)

### A — HERO PROFIL (hauteur auto, min 520px)

```
Fond : #0A0D1A
Layout desktop : 50% photo gauche | 50% texte droite
Layout mobile : photo en haut (aspect 4:5) | texte en dessous

Photo : [PLACEHOLDER_IMG_HERO_PROFIL] — portrait 3:4 haute résolution
        Style : regard direct, sourire discret, tenue sobre, fond élégant

Texte (fond dark, padding 64px) :
  Eyebrow klein : "L'AVOCATE"
  Nom H1 blanc : [Prénom NOM] — Cormorant Bold — 56px
  Titre blanc 70% : "Avocate au Barreau de Paris" — DM Sans — 18px
  Pills spécialités :
    [Droit des affaires] [Droit du travail] [Contentieux]
    bg: rgba(0,47,167,0.40) | color: blanc | border: 1px solid rgba(0,47,167,0.60)
    DM Sans Medium 12px | radius: 3px
```

### B — PHILOSOPHIE & APPROCHE (fond #FFFFFF)

```
Layout : texte éditorial large, max-width 760px, centré
Eyebrow klein : "MON APPROCHE"
H2 : [PLACEHOLDER_H2_PHILOSOPHIE]
     Cormorant Garamond Italic — 40px
Corps : [PLACEHOLDER_TEXTE_PHILOSOPHIE]
        4 à 6 paragraphes — DM Sans Regular 17px — line-height 1.75
        Ton : première personne, direct, authentique, pas de jargon
```

### C — PARCOURS TIMELINE (fond #F5F5F7)

```
Eyebrow klein : "PARCOURS"
H2 : "Un parcours construit sur l'exigence."

Timeline verticale desktop :
  Ligne verticale 2px klein au centre (ou à gauche)
  Chaque item :
    → Point rond Klein rempli sur la ligne (16px)
    → Année à gauche : DM Sans Bold — 14px — klein
    → Titre à droite : DM Sans SemiBold — 16px — noir
    → Institution : DM Sans Regular — 14px — muted
    → Description courte optionnelle : 1 ligne — 13px muted

[PLACEHOLDER_TIMELINE] — items à compléter :
  Ex: [2009] Master II Droit des affaires — [Université]
  Ex: [2011] Serment d'avocat — Barreau de Paris
  Ex: [2012-2018] Collaboratrice — [Cabinet]
  Ex: [2019] Création [NOM_CABINET] Avocats
```

### D — FORMATIONS & CERTIFICATIONS (fond #FFFFFF)

```
H3 : "Formations & Certifications"
Grille de badges 3 colonnes desktop / 2 col tablet / 1 col mobile :
  Chaque badge :
    bg: #F0F0F5 | border: 1px solid #E0E0E8 | radius: 4px | padding: 14px 18px
    Icône SVG simple klein 16px + DM Sans Medium 13px
    [PLACEHOLDER_BADGE] — ex: "Université Paris I Panthéon-Sorbonne"
    [PLACEHOLDER_BADGE] — ex: "CAPA — École de Formation du Barreau"
    [PLACEHOLDER_BADGE] — ex: "Barreau de Paris"
    [PLACEHOLDER_BADGE] — ex: "Médiation — [Institut]"
    [PLACEHOLDER_BADGE] — ex: "Français · Anglais"
```

### E — VALEURS (fond #F5F5F7)

```
H3 centré : "Ce qui guide mon travail"
Grille 3 colonnes desktop / 1 colonne mobile :
  Valeur 1 :
    Icône SVG minimaliste klein 32px
    Titre H3 : "Rigueur" (ou [PLACEHOLDER_VALEUR_1])
    Description : DM Sans Regular 15px muted — 2 lignes max

  Valeur 2 :
    Icône SVG minimaliste klein 32px
    Titre H3 : "Clarté" (ou [PLACEHOLDER_VALEUR_2])
    Description : DM Sans Regular 15px muted — 2 lignes max

  Valeur 3 :
    Icône SVG minimaliste klein 32px
    Titre H3 : "Engagement" (ou [PLACEHOLDER_VALEUR_3])
    Description : DM Sans Regular 15px muted — 2 lignes max
```

### F — CTA FINAL PROFIL (fond #002FA7)

```
Identique à la Section F de la Home.
H2 blanc : "Parlons de votre dossier."
Sous-titre blanc 80% : "Premier échange confidentiel et sans engagement."
Bouton blanc → /contact | Bouton ghost "Voir mes dossiers" → /dossiers
Mobile : stack vertical, boutons pleine largeur
```

---

## SECTION 06 — PAGE MES DOSSIERS (/dossiers)

Page la plus différenciante du site. Répond à la question des dirigeants : "A-t-elle déjà géré une situation comme la mienne ?"

### A — HERO DOSSIERS

```
Fond : #0A0D1A
H1 blanc : "Mes Dossiers" — Cormorant Bold — 56px
Sous-titre blanc 70% : "Des situations complexes, des résultats concrets."
3 métriques en ligne :
  [XX]+ dossiers | [X] ans d'expérience | 2 spécialités
  Valeurs DM Sans Bold 36px blanc | Labels DM Sans 13px blanc 55%
```

### B — FILTRES CATÉGORIES

```
Fond : #FFFFFF — padding: 32px vertical
"Filtrer par :" — DM Sans Medium 13px muted

Pills cliquables :
  [Tous] [Droit des affaires] [Droit du travail] [Contentieux] [Restructuration] [Contrats]

Style pill par défaut :
  bg: #F5F5F7 | border: 1px solid #E0E0E8 | color: #060608
  DM Sans Medium 12px | padding: 6px 14px | radius: 3px

Style pill active :
  bg: #002FA7 | color: #FFFFFF | border-color: #002FA7

Transition entre états : 200ms
```

### C — GRILLE DOSSIERS

**Layout**
- Desktop ≥1024px : 3 colonnes, gutter 24px
- Tablet 768-1023px : 2 colonnes, gutter 16px
- Mobile <768px : 1 colonne, gutter 12px

**Structure d'une card dossier**

```
Conteneur :
  bg: #FFFFFF | border: 1px solid #E0E0E8 | radius: 4px | padding: 28px
  box-shadow: 0 2px 24px rgba(0,0,0,0.06)
  Hover : translateY(-4px) | border-color: #002FA7
          box-shadow: 0 8px 32px rgba(0,47,167,0.12) | transition: 200ms

Tag catégorie (haut de card) :
  bg: #E8EDFF | color: #002FA7 | DM Sans SemiBold 11px | uppercase | tracking: 0.08em
  padding: 3px 9px | radius: 3px | display: inline-block

Titre dossier (H3) :
  DM Sans SemiBold 600 — 17px — color: #060608 — line-height: 1.4
  Margin-top: 12px

Contexte :
  DM Sans Regular 400 — 14px — color: #6B6C7A — line-height: 1.6
  3-4 lignes — margin-top: 8px

Séparateur :
  border-top: 1px solid #E0E0E8 — margin: 16px 0

Label résultat :
  "RÉSULTAT" — DM Sans SemiBold 600 — 10px — color: #002FA7 — uppercase — tracking: 0.10em

Valeur résultat :
  DM Sans SemiBold 600 — 14px — color: #060608 — line-height: 1.5
  margin-top: 4px

CTA lien bas de card :
  "→ Dossier similaire ?" — DM Sans Medium 13px — color: #002FA7
  Hover : underline 2px solid #002FA7 | transition: 150ms
```

**6 dossiers placeholder (à remplacer par cas réels anonymisés)**

```
Dossier 1 :
  Tag : DROIT DU TRAVAIL
  Titre : Restructuration d'une ETI industrielle
  Contexte : Accompagnement d'une ETI de 200 salariés dans un PSE. Négociation
             avec les partenaires sociaux, rédaction des accords, validation DREETS.
  Résultat : PSE homologué sans recours · Délais respectés · [X] mois de procédure

Dossier 2 :
  Tag : DROIT DES AFFAIRES
  Titre : Cession d'une PME familiale
  Contexte : Structuration et sécurisation juridique de la cession d'une PME du
             secteur distribution. Accompagnement du dirigeant de la LOI au signing.
  Résultat : Transaction sécurisée · Garanties de passif négociées · Closing réalisé

Dossier 3 :
  Tag : CONTENTIEUX
  Titre : Litige commercial entre associés
  Contexte : Représentation d'un dirigeant dans un conflit portant sur l'exclusion
             et la valorisation des parts sociales. Procédure en urgence.
  Résultat : Transaction amiable · Préjudice évité > 800K€

Dossier 4 :
  Tag : DROIT DU TRAVAIL
  Titre : Rupture conventionnelle collective (RCC)
  Contexte : Mise en œuvre d'une RCC pour une scale-up tech en restructuration.
             Coordination RH, négociation syndicale, validation administrative.
  Résultat : RCC validée · Délais raccourcis de 30% · 0 recours

Dossier 5 :
  Tag : DROIT DES AFFAIRES
  Titre : Contrats fournisseurs internationaux
  Contexte : Audit et refonte des contrats fournisseurs d'un groupe industriel
             avec partenaires européens et asiatiques.
  Résultat : 15 contrats sécurisés · Clauses de risque éliminées

Dossier 6 :
  Tag : DROIT DU TRAVAIL
  Titre : Défense employeur — contentieux prud'homal
  Contexte : Assistance d'une PME dans une procédure prud'homale complexe.
             Stratégie de défense, audiences, négociation de l'accord.
  Résultat : Décision favorable · Indemnité réduite de 70%
```

### D — CTA BAS DE PAGE DOSSIERS (fond #002FA7)

```
H2 blanc : "Votre situation mérite une expertise sur-mesure."
Sous-titre blanc 80% : "Discutons de votre dossier en toute confidentialité."
Bouton blanc : "Prendre RDV" → /contact
```

---

## SECTION 07 — PAGE CONTACT (/contact)

### A — HERO CONTACT

```
Fond : #0A0D1A | padding: 80px vertical
H1 blanc : "Parlons de votre dossier."
           Cormorant Garamond Bold — 56px — centré
Sous-titre blanc 75% : "Premier échange confidentiel, sans engagement."
                        DM Sans Regular — 18px — centré
```

### B — BLOC PRINCIPAL (fond #FFFFFF)

**Layout desktop : grille 60% / 40%**

Partie gauche (60%) :
```
Titre : "Choisissez un créneau"
        DM Sans SemiBold — 18px — noir
Intégration Calendly :
  Script/iframe Calendly chargé en lazy-load
  Créneau 1 : Appel découverte — 30 min (gratuit)
  Créneau 2 : Consultation approfondie — 1h (payant)
  Fond iframe : blanc | radius: 8px | ombre légère
  [URL_CALENDLY] — à remplacer
```

Partie droite (40%) :
```
Bloc "Autres façons de me contacter" :
  Email :    [EMAIL@NOM_CABINET.FR] — link mailto: klein
  LinkedIn : [URL_LINKEDIN] — link externe klein
  Adresse :  [ADRESSE IDF] — DM Sans Regular 15px muted

Bloc "À quoi s'attendre" — 3 étapes :
  Chaque étape : numéro klein cercle + titre DM Sans SemiBold + description 1 ligne
  1. "Vous choisissez un créneau"
     Premier échange libre et confidentiel
  2. "J'analyse votre demande"
     Je prépare nos échanges en amont
  3. "On avance ensemble"
     Stratégie claire dès la première consultation
```

**Layout tablet (<1024px) :** Calendly pleine largeur, infos en dessous
**Layout mobile :** Calendly full width, infos dessous, sticky CTA bas

### C — FORMULAIRE DE CONTACT (fallback si Calendly indisponible)

```
Titre : "Ou envoyez-moi un message"
        DM Sans SemiBold — 16px — noir

Champs :
  [Votre nom]         → input text | required
  [Votre email]       → input email | required
  [Votre entreprise]  → input text | optional
  [Sujet]             → input text | required
  [Votre message]     → textarea 4 lignes | required

Bouton submit : "Envoyer mon message" — fond Klein — pleine largeur
Texte sous bouton : "Réponse garantie sous 24h ouvrées"
                    DM Sans Regular 13px muted

Validation : côté client en temps réel (rouge sur erreur) + server-side
```

### D — BANDEAU RÉASSURANCE (fond #E8EDFF)

```
3 éléments en ligne desktop / stack vertical mobile :
  [Icône SVG] "Barreau de Paris"
  [Icône SVG] "Secret professionnel absolu"
  [Icône SVG] "Réponse sous 24h ouvrées"

Style : DM Sans Medium 13px — color: #002FA7
        padding: 20px — centré
```

---

## SECTION 08 — RESPONSIVE COMPLET

Approche **mobile-first** : CSS écrit pour 390px en premier, breakpoints `min-width` en cascade.

### Breakpoint 390px — Mobile (base)

```
Navbar
  Logo gauche | hamburger droite
  Menu fullscreen #0A0D1A, liens centrés DM Sans Medium 20px
  Bouton "Prendre RDV" dans menu
  Sticky bar optionnelle bas de page : position fixed, z-index: 100

Hero
  H1 : 40–44px
  Tagline : 15px
  CTAs : 100% width, empilés, gap: 12px
  Image : min-height: 100vh, object-position: top center

Sections
  padding V : 56px
  1 colonne systématique
  side-margin : 20px

Chiffres métriques
  Stack vertical : grande valeur + label — centré

Cards expertises
  1 colonne, full width

Section About
  Photo en haut, aspect 16:9
  Texte en dessous, fond dark

Dossiers
  1 colonne, cards full width

Footer
  1 colonne, centré

Contact
  Calendly full width
  Infos de contact en dessous
  Formulaire full width
```

### Breakpoint 768px — Tablet

```
Navbar
  Logo + liens (si espace) + CTA
  Hamburger si liens ne tiennent pas

Hero
  H1 : 52–60px | Tagline : 17px

Sections
  padding V : 72px | side-margin : 40px
  Passage en 2 colonnes pour grilles

Section About
  50/50 si hauteur suffisante, sinon photo top

Dossiers
  2 colonnes, gutter: 16px

Footer
  2 colonnes
```

### Breakpoint 1024px — Laptop

```
Navbar
  Tous liens visibles + CTA button

Hero
  H1 : 64–72px | max-width content: 640px

Sections
  padding V : 88px | side-margin : 60px

Dossiers
  3 colonnes, gutter: 20px

Section About
  50/50 exact, photo portrait 3:4

Contact
  60% Calendly | 40% infos

Footer
  3 colonnes
```

### Breakpoint 1280px — Desktop

```
Navbar
  max-width: 1280px centré, tous liens, CTA

Hero
  H1 : 72–80px | image 1920px

Sections
  max-width: 1280px centré
  Hover effects activés (cards, images)

Dossiers
  3 colonnes, gutter: 24px

Contact
  60/40, Calendly comfortable

Footer
  max-width: 1280px, 3 colonnes
```

### Points critiques mobile (ne jamais oublier)

1. Touch targets minimum **44×44px** sur tous éléments cliquables
2. Font-size minimum **16px** sur mobile pour éviter le zoom auto iOS
3. Jamais de **hover-only interactions** (inexistant sur tactile)
4. Éviter les tableaux >2 colonnes sur mobile — préférer les cards
5. Préciser `object-position` sur les images hero pour ne pas couper les visages
6. Inputs avec type approprié (`email`, `tel`) pour clavier mobile adapté
7. Sticky CTA "Prendre RDV" bas de page sur mobile (`position: fixed`)
8. Tester sur vrai appareil, pas seulement DevTools

---

## SECTION 09 — COMPOSANTS UI COMPLETS

### Boutons

**Primaire**
```
Classe : .btn-primary
background: #002FA7
color: #FFFFFF
padding: 14px 32px
border-radius: 2px
font-family: DM Sans, sans-serif
font-weight: 500
font-size: 13px
text-transform: uppercase
letter-spacing: 0.06em
border: none
cursor: pointer
transition: background 200ms ease-out, transform 150ms ease-out

:hover  → background: #0038CC | transform: scale(1.01)
:focus  → outline: 3px solid #002FA7 | outline-offset: 3px
:active → background: #001E6E | transform: scale(0.97)
:disabled → background: #E0E0E8 | color: #6B6C7A | opacity: 0.6 | cursor: not-allowed

Mobile : min-width: 100% si dans un conteneur de form ou CTA isolé
```

**Secondaire (outline)**
```
Classe : .btn-secondary
background: transparent
border: 1.5px solid #002FA7
color: #002FA7
(mêmes padding/font que primaire)

:hover  → background: #002FA7 | color: #FFFFFF
:focus  → outline: 3px solid #002FA7 | outline-offset: 3px
:active → background: #001E6E | color: #FFFFFF | transform: scale(0.97)
```

**Ghost (sur fond sombre)**
```
Classe : .btn-ghost
background: transparent
border: 1.5px solid rgba(255,255,255,0.40)
color: #FFFFFF
(mêmes padding/font)

:hover  → background: rgba(255,255,255,0.10) | border-color: rgba(255,255,255,0.70)
:focus  → outline: 3px solid rgba(255,255,255,0.60) | outline-offset: 3px
```

### Tags / Pills catégorie

```
Classe : .tag
background: #E8EDFF
color: #002FA7
font-family: DM Sans
font-weight: 600
font-size: 11px
text-transform: uppercase
letter-spacing: 0.08em
padding: 4px 10px
border-radius: 3px
display: inline-block

.tag.active → background: #002FA7 | color: #FFFFFF
Transition : background 200ms, color 200ms
```

### Badge de confiance

```
Classe : .badge-trust
display: flex | align-items: center | gap: 8px
background: #F0F0F5
border: 1px solid #E0E0E8
border-radius: 4px
padding: 8px 14px
font-family: DM Sans
font-size: 13px
color: #060608

Icône : SVG klein #002FA7, 16×16px
```

### Inputs formulaire

```
Classe : .form-input
width: 100%
background: #FFFFFF
border: 1px solid #E0E0E8
border-radius: 2px
padding: 12px 16px
font-family: DM Sans
font-size: 15px
color: #060608
transition: border 150ms, box-shadow 150ms

::placeholder → color: #6B6C7A

:focus → border-color: #002FA7
         box-shadow: 0 0 0 3px rgba(0,47,167,0.15)
         outline: none

.form-input.error → border-color: #D93025
                    box-shadow: 0 0 0 3px rgba(217,48,37,0.15)

:disabled → background: #F0F0F5 | cursor: not-allowed

Label au-dessus :
  DM Sans SemiBold 11px | uppercase | letter-spacing: 0.08em
  color: #6B6C7A | margin-bottom: 6px
```

### Pills sur fond sombre (section hero/dark)

```
background: rgba(0,47,167,0.35)
color: #FFFFFF
border: 1px solid rgba(0,47,167,0.60)
font-family: DM Sans
font-weight: 500
font-size: 12px
padding: 5px 12px
border-radius: 3px
```

---

## SECTION 10 — SPECS TECHNIQUES & SEO

### Stack technique

```
Framework   : Next.js 14 App Router — React 18 — TypeScript
Styles      : CSS Modules (ou Tailwind CSS 3) — pas de CSS-in-JS
Animations  : CSS transitions natives + GSAP ScrollTrigger pour scroll complex
Fonts       : next/font — Cormorant Garamond + DM Sans — preconnect automatique
Images      : next/image — WebP obligatoire — sizes par breakpoint — lazy load
Hébergement : Vercel — preview deployments sur chaque PR
Repository  : GitHub — branches: main (prod) · develop · feature/*
Email       : Resend + Netlify Forms ou Next.js API Route
Calendly    : Script lazy-loaded ou widget popup
Analytics   : Google Analytics 4 + Google Search Console + Vercel Analytics
RGPD        : Bandeau cookie obligatoire (Tarteaucitron recommandé)
```

### Core Web Vitals cibles

```
LCP (Largest Contentful Paint)  : < 2.5s  → preload hero image (next/image priority)
INP (Interaction to Next Paint) : < 100ms → pas de JS lourd au 1er rendu
CLS (Cumulative Layout Shift)   : < 0.1   → dimensions images fixées, fonts preloaded
PageSpeed Score                 : ≥ 90 desktop / ≥ 80 mobile
Bundle JS initial               : < 80KB  (hors images)
```

### SEO — Balises et structure

```
Title Home :
  [NOM_CABINET] Avocats — Droit des Affaires & Travail · Paris IDF
  (maximum 60 caractères)

Meta description Home :
  Avocate spécialisée en droit des affaires et du travail à Paris.
  J'accompagne dirigeants et entreprises avec rigueur et engagement.
  Premier RDV gratuit. (maximum 155 caractères)

Règles par page :
  → 1 seul H1 par page contenant le mot-clé principal
  → H1 → H2 → H3 — ne jamais sauter un niveau
  → Balise canonical rel=canonical sur chaque page
  → Alt text descriptif sur toutes les images
  → Open Graph : og:title · og:description · og:image 1200×630px

Schema.org (JSON-LD dans <head>) :
  LocalBusiness + LegalService + Person

Fichiers :
  sitemap.xml auto-généré → soumis Google Search Console
  robots.txt : Allow all | Disallow /api/ | Sitemap: https://[domaine]/sitemap.xml
```

### Accessibilité (WCAG 2.1 AA)

```
Contraste texte :
  Body blanc sur Klein #002FA7 : ratio 7.8:1 ✓ (AAA)
  Noir #060608 sur blanc : ratio 20:1 ✓ (AAA)
  Vérifier : texte muted #6B6C7A sur blanc = ratio 4.7:1 ✓ (AA)

Focus outline :
  Visible sur TOUS les éléments interactifs
  outline: 3px solid #002FA7 | outline-offset: 3px

Structure sémantique :
  <main>, <nav>, <header>, <footer>, <section>, <article>
  aria-current="page" sur lien nav actif
  aria-label sur tous les boutons icônes
  aria-busy="true" sur boutons en état loading

Images :
  alt descriptif sur toutes images de contenu
  alt="" sur images purement décoratives

Formulaires :
  <label> associé via for/id sur chaque champ
  Messages d'erreur en texte (pas seulement par couleur)
  role="alert" sur les messages d'erreur dynamiques

Reduced motion :
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important; }
  }
```

---

## SECTION 11 — PLACEHOLDERS IMAGES

Toutes les images sont en format **WebP**. Prévoir des versions 2× pour écrans Retina.

```
[PLACEHOLDER_IMG_HERO]
  Dimensions : 1920×1080px minimum
  Usage : Image hero pleine page — Home
  Options recommandées :
    (A) Photo avocate en bureau parisien moderne, lumière naturelle, sombre et élégant
    (B) Architecture Paris épurée — verrière, béton brut, Haussmann avec lumière
    (C) Texture premium abstraite — marbre noir, grain argenté
  ⚠ L'image doit fonctionner avec l'overlay gradient — tester le contraste du texte blanc
  ⚠ mobile : object-position: top center pour ne pas couper les sujets importants

[PLACEHOLDER_IMG_ABOUT]
  Dimensions : 800×1000px (ratio 4:5)
  Usage : Section About Home — colonne gauche fond sombre
  Style : Portrait 3/4, avocate en posture d'autorité, regard direct, tenue sobre

[PLACEHOLDER_IMG_HERO_PROFIL]
  Dimensions : 1920×800px ou portrait recadré
  Usage : Hero page /profil — colonne gauche
  Style : Portrait haute résolution, fond neutre ou bureau élégant

[PLACEHOLDER_IMG_ABOUT_2]
  Dimensions : 600×400px
  Usage : Secondaire optionnel — avocate en contexte professionnel
  Style : En réunion, bibliothèque de droit, ou travail — "en action"

[PLACEHOLDER_FAVICON]
  Dimensions : 32×32 + 180×180 + 512×512px — format SVG ou PNG
  Contenu : Initiales du cabinet en Klein Blue sur blanc, ou blanc sur Klein Blue

[PLACEHOLDER_LOGO_SVG]
  Format : SVG vectoriel — 2 versions : noir (fonds clairs) + blanc (fonds sombres)
  Suggestion : Wordmark "[NOM] Avocats" — Cormorant Garamond — tracking élargi
```

---

## SECTION 12 — PLACEHOLDERS TEXTES

Tous les textes ci-dessous sont à compléter par l'avocate.

```
[NOM_CABINET]
  Nom exact du cabinet affiché sur tout le site
  Ex : "Martin", "Leroy", "Duchamp" → "[NOM] Avocats"

[TAGLINE_HERO]
  Proposition de valeur H1 du hero
  Proposition actuelle : "Votre droit. Votre force." → à valider ou remplacer
  Doit être court (4-6 mots), percutant, mémorable

[TEXTE_ACCROCHE_HOME]
  Texte section B Home — 3-4 lignes — première personne
  Ex : "Je défends les intérêts des dirigeants et de leurs entreprises depuis [X] ans,
        en combinant rigueur juridique et vision stratégique des enjeux de votre activité."

[TEXTE_ABOUT_HOME]
  Texte section D Home — 3 paragraphes — première personne, chaleureux
  Approche, méthode de travail, ce qui distingue l'avocate

[TEXTE_PHILOSOPHIE]
  Texte long page /profil — 4 à 6 paragraphes
  Valeurs, méthode, vision du droit, relation client — ton authentique

[TIMELINE]
  Parcours chronologique complet :
    [ANNÉE] → [Diplôme/Poste] → [Institution]
    Ex : 2009 → Master II Droit des affaires → Université Paris I
    Ex : 2011 → Serment d'avocat → Barreau de Paris
    Ex : 2012 → Collaboratrice → [Cabinet]
    Ex : 2019 → Création [NOM_CABINET] Avocats

[FORMATIONS]
  Liste des diplômes, certifications, langues, adhésions professionnelles

[VALEUR_1] [VALEUR_2] [VALEUR_3]
  3 valeurs page profil — proposition : Rigueur · Clarté · Engagement
  À valider et décrire en 1-2 phrases chacune

[ANS_EXPERIENCE]
  Nombre d'années d'expérience — pour métriques hero et profil

[NB_DOSSIERS]
  Nombre approximatif de dossiers traités — ex: "+150", "+200"

[6_DOSSIERS_REELS]
  Remplacer les 6 dossiers placeholder par des cas réels anonymisés
  Format par dossier : Tag catégorie | Titre | Contexte 3-4 lignes | Résultat précis

[EMAIL]
  Email professionnel — ex: contact@[nom_cabinet]-avocats.fr

[LINKEDIN]
  URL profil LinkedIn de l'avocate

[ADRESSE]
  Adresse du cabinet (optionnel selon préférence de l'avocate)

[TEL]
  Téléphone (optionnel)

[URL_CALENDLY]
  URL ou widget ID Calendly pour la prise de RDV en ligne
```

---

## SECTION 13 — PROCHAINES ÉTAPES

```
1. Compléter les placeholders textes avec l'avocate (30-60 min d'entretien)
2. Réaliser ou sélectionner les photos professionnelles
3. Importer ce PRD dans Figma Make → générer le premier jet visuel
4. Itérer sur le design Figma — valider sur mobile ET desktop (2-3 rounds)
5. Créer le repo GitHub + connecter Vercel (preview URL pour validation client)
6. Passer à Claude Code pour l'implémentation complète
7. Tests : Lighthouse · WAVE accessibilité · test sur vrais appareils iOS et Android
8. Mise en ligne + soumission Google Search Console + GA4 configuré
```

---

*PRD v2.0 — Palette Klein Blue · Full Responsive · [NOM_CABINET] Avocats · Mars 2026*
*Généré avec Claude — Anthropic*
