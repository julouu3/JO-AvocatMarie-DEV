import type { Metric, Dossier } from '@/types';

export const HERO_IMG =
  'https://images.unsplash.com/photo-1770823207145-831fc065366f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMGNpdHlzY2FwZSUyMG5pZ2h0JTIwYmx1ZSUyMGJ1aWxkaW5nc3xlbnwxfHx8fDE3NzM0OTAwNzV8MA&ixlib=rb-4.1.0&q=80&w=1920';

export const ABOUT_IMG =
  'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBsYXd5ZXIlMjBwb3J0cmFpdCUyMG9mZmljZXxlbnwxfHx8fDE3NzM0OTAwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const heroLines = ['Votre droit.', 'Votre force.'];

export const metrics: Metric[] = [
  { value: 12, suffix: '+', label: "ans d'expérience" },
  { value: 200, suffix: '+', label: 'dossiers traités' },
  { value: 2, suffix: '', label: 'spécialités maîtrisées' },
];

export const expertiseAffaires = [
  'Cessions & acquisitions (M&A)',
  'Rédaction et négociation de contrats',
  'Création et restructuration de sociétés',
  'Litiges commerciaux et contentieux',
  'Contrats commerciaux internationaux',
];

export const expertiseTravail = [
  "Plans de sauvegarde de l'emploi (PSE)",
  'Ruptures conventionnelles collectives (RCC)',
  "Négociations collectives & accords d'entreprise",
  'Licenciements et contentieux prud\'homaux',
  'Audits sociaux & conformité RH',
];

export const dossiersVedette: Dossier[] = [
  {
    id: 1,
    tag: 'DROIT DU TRAVAIL',
    category: 'Droit du travail',
    featured: true,
    title: "Restructuration d'une ETI industrielle",
    context:
      "Accompagnement d'une ETI de 200 salariés dans un PSE. Négociation avec les partenaires sociaux, rédaction des accords, validation DREETS.",
    result: 'PSE homologué sans recours · Délais respectés',
  },
  {
    id: 2,
    tag: 'DROIT DES AFFAIRES',
    category: 'Droit des affaires',
    featured: true,
    title: "Cession d'une PME familiale",
    context:
      "Structuration et sécurisation juridique de la cession d'une PME du secteur distribution. Accompagnement du dirigeant de la LOI au signing.",
    result: 'Transaction sécurisée · Garanties de passif négociées',
  },
  {
    id: 3,
    tag: 'CONTENTIEUX',
    category: 'Contentieux',
    featured: true,
    title: 'Litige commercial entre associés',
    context:
      "Représentation d'un dirigeant dans un conflit portant sur l'exclusion et la valorisation des parts sociales. Procédure en urgence.",
    result: 'Transaction amiable · Préjudice évité > 800K€',
  },
];
