import type { Dossier } from '@/types';

export const categories = [
  'Tous',
  'Droit des affaires',
  'Droit du travail',
  'Contentieux',
  'Restructuration',
  'Contrats',
] as const;

export const allDossiers: Dossier[] = [
  {
    id: 1,
    tag: 'DROIT DU TRAVAIL',
    category: 'Droit du travail',
    featured: true,
    title: "Restructuration d'une ETI industrielle",
    context:
      "Accompagnement d'une ETI de 200 salariés dans un PSE. Négociation avec les partenaires sociaux, rédaction des accords collectifs, validation DREETS. Gestion de l'ensemble des interlocuteurs institutionnels.",
    result: 'PSE homologué sans recours · Délais respectés · 4 mois de procédure',
  },
  {
    id: 2,
    tag: 'DROIT DES AFFAIRES',
    category: 'Droit des affaires',
    featured: true,
    title: "Cession d'une PME familiale",
    context:
      "Structuration et sécurisation juridique de la cession d'une PME du secteur distribution. Accompagnement du dirigeant de la LOI au signing, coordination avec les conseils financiers et fiscaux.",
    result: 'Transaction sécurisée · Garanties de passif négociées · Closing réalisé',
  },
  {
    id: 3,
    tag: 'CONTENTIEUX',
    category: 'Contentieux',
    featured: true,
    title: 'Litige commercial entre associés',
    context:
      "Représentation d'un dirigeant dans un conflit portant sur l'exclusion et la valorisation des parts sociales. Procédure en urgence devant le Tribunal de Commerce de Paris.",
    result: 'Transaction amiable · Préjudice évité > 800K€',
  },
  {
    id: 4,
    tag: 'DROIT DU TRAVAIL',
    category: 'Droit du travail',
    featured: false,
    title: 'Rupture conventionnelle collective (RCC)',
    context:
      "Mise en œuvre d'une RCC pour une scale-up tech en restructuration. Coordination RH, négociation syndicale, validation administrative. Accompagnement des 35 salariés concernés.",
    result: 'RCC validée · Délais raccourcis de 30% · 0 recours',
  },
  {
    id: 5,
    tag: 'DROIT DES AFFAIRES',
    category: 'Droit des affaires',
    featured: false,
    title: 'Contrats fournisseurs internationaux',
    context:
      "Audit et refonte des contrats fournisseurs d'un groupe industriel avec partenaires européens et asiatiques. Identification des clauses à risque, rédaction de nouveaux modèles contractuels.",
    result: '15 contrats sécurisés · Clauses de risque éliminées',
  },
  {
    id: 6,
    tag: 'DROIT DU TRAVAIL',
    category: 'Droit du travail',
    featured: false,
    title: 'Défense employeur — contentieux prud\'homal',
    context:
      "Assistance d'une PME dans une procédure prud'homale complexe suite à un licenciement contesté. Élaboration de la stratégie de défense, gestion des audiences, négociation de l'accord final.",
    result: 'Décision favorable · Indemnité réduite de 70%',
  },
];
