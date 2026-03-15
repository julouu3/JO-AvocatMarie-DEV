import type { Metric, Dossier } from '@/types';

export const HERO_IMG =
  'https://images.unsplash.com/photo-1770823207145-831fc065366f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMGNpdHlzY2FwZSUyMG5pZ2h0JTIwYmx1ZSUyMGJ1aWxkaW5nc3xlbnwxfHx8fDE3NzM0OTAwNzV8MA&ixlib=rb-4.1.0&q=80&w=1920';

export const ABOUT_IMG =
  'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBsYXd5ZXIlMjBwb3J0cmFpdCUyMG9mZmljZXxlbnwxfHx8fDE3NzM0OTAwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const metrics: Metric[] = [
  { value: 7, suffix: '+', label: "cabinets d'expérience" },
  { value: 3, suffix: '', label: 'diplômes internationaux' },
  { value: 100, suffix: '%', label: 'engagement client' },
];

export const expertiseCompliance = [
  'Cartographie des risques et plans de conformité',
  'Lutte anti-corruption (loi Sapin II)',
  'Mise en conformité RGPD et réglementaire',
  'Procédures internes et codes de conduite',
  'Enquêtes internes et audits de conformité',
];

export const expertiseCorporate = [
  'Droit des sociétés et gouvernance',
  'Opérations de cession et acquisition (M&A)',
  'Droit des transports et droit douanier',
  'Droit pénal des affaires',
  'Responsabilité du fait des produits',
];

export const dossiersVedette: Dossier[] = [
  {
    id: 1,
    tag: 'COMPLIANCE',
    category: 'Compliance',
    featured: true,
    title: "Mise en conformité Sapin II d'un groupe industriel",
    context:
      "Accompagnement d'un groupe de 500 collaborateurs dans le déploiement de son programme de conformité anti-corruption : cartographie des risques, code de conduite, formation des équipes.",
    result: 'Programme validé par l\'AFA · Zéro non-conformité',
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
];
