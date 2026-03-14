import type { Dossier } from '@/types';

export const categories = [
  'Tous',
  'Compliance',
  'Corporate',
  'Pénal des affaires',
  'Contentieux',
] as const;

export const allDossiers: Dossier[] = [
  {
    id: 1,
    tag: 'COMPLIANCE',
    category: 'Compliance',
    featured: true,
    title: "Mise en conformité Sapin II d'un groupe industriel",
    context:
      "Accompagnement d'un groupe de 500 collaborateurs dans le déploiement de son programme de conformité anti-corruption : cartographie des risques, code de conduite, formation des équipes.",
    result: "Programme validé par l'AFA · Zéro non-conformité",
  },
  {
    id: 2,
    tag: 'CORPORATE',
    category: 'Corporate',
    featured: true,
    title: "Restructuration d'un fonds d'investissement",
    context:
      "Structuration juridique et accompagnement d'un fonds dans la réorganisation de ses participations. Coordination multi-juridictionnelle France / Royaume-Uni.",
    result: 'Opération bouclée en 4 mois · Fiscalité optimisée',
  },
  {
    id: 3,
    tag: 'PÉNAL DES AFFAIRES',
    category: 'Pénal des affaires',
    featured: true,
    title: "Défense d'un dirigeant en enquête préliminaire",
    context:
      "Représentation d'un dirigeant de société dans le cadre d'une enquête préliminaire pour abus de biens sociaux. Stratégie de défense et négociation.",
    result: 'Classement sans suite · Réputation préservée',
  },
  {
    id: 4,
    tag: 'COMPLIANCE',
    category: 'Compliance',
    featured: false,
    title: 'Audit de conformité RGPD pour une fintech',
    context:
      "Réalisation d'un audit complet des pratiques de traitement de données personnelles d'un prestataire de services d'investissement. Cartographie des flux de données, mise en conformité des contrats sous-traitants, rédaction du registre des traitements.",
    result: 'Conformité RGPD certifiée · Zéro observation CNIL',
  },
  {
    id: 5,
    tag: 'CORPORATE',
    category: 'Corporate',
    featured: false,
    title: "Cession d'une PME familiale",
    context:
      "Structuration et sécurisation juridique de la cession d'une PME du secteur distribution. Accompagnement du dirigeant de la LOI au signing, coordination avec les conseils financiers et fiscaux.",
    result: 'Transaction sécurisée · Garanties de passif négociées · Closing réalisé',
  },
  {
    id: 6,
    tag: 'CONTENTIEUX',
    category: 'Contentieux',
    featured: false,
    title: 'Litige commercial entre associés',
    context:
      "Représentation d'un dirigeant dans un conflit portant sur l'exclusion et la valorisation des parts sociales. Procédure en urgence devant le Tribunal de Commerce de Paris.",
    result: 'Transaction amiable · Préjudice évité > 800K€',
  },
];
