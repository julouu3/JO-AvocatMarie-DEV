import { GraduationCap, Award, Globe, Scale } from 'lucide-react';
import type { TimelineItem, Certification, Valeur } from '@/types';

export const PROFIL_IMG =
  'https://images.unsplash.com/photo-1758600587730-a11917c13b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3dvbWFuJTIwcHJvZmVzc2lvbmFsJTIwY29uZmlkZW50JTIwcG9ydHJhaXQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzM0OTAwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const timelineItems: TimelineItem[] = [
  {
    year: '2007',
    title: 'Master I — Droit privé',
    institution: 'Université Paris I Panthéon-Sorbonne',
  },
  {
    year: '2009',
    title: 'Master II — Droit des affaires et fiscalité',
    institution: 'Université Paris II Panthéon-Assas',
  },
  {
    year: '2011',
    title: "Serment d'avocat",
    institution: 'Barreau de Paris — École de Formation du Barreau (EFB)',
  },
  {
    year: '2011–2018',
    title: 'Collaboratrice senior',
    institution: 'Cabinet Gide Loyrette Nouel, Paris',
    description: 'Spécialisée droit social et restructurations',
  },
  {
    year: '2019',
    title: 'Création de Lefebvre Avocats',
    institution: 'Cabinet libéral, Paris',
    description: 'Droit des affaires & droit du travail',
  },
];

export const certifications: Certification[] = [
  { icon: GraduationCap, label: 'Université Paris I Panthéon-Sorbonne' },
  { icon: GraduationCap, label: 'Université Paris II Panthéon-Assas' },
  { icon: Award, label: 'CAPA — École de Formation du Barreau' },
  { icon: Scale, label: 'Barreau de Paris — Avocat inscrit' },
  { icon: Award, label: 'Médiation — Institut de Médiation' },
  { icon: Globe, label: 'Français · Anglais professionnel' },
];

export const valeurs: Valeur[] = [
  {
    icon: '⚖',
    title: 'Rigueur',
    desc: "Chaque détail compte. J'analyse chaque dossier avec une précision d'orfèvre pour ne laisser aucun risque non anticipé.",
  },
  {
    icon: '◈',
    title: 'Clarté',
    desc: "Le droit peut être complexe, ma communication ne l'est pas. Je m'engage à vous expliquer chaque étape clairement.",
  },
  {
    icon: '◎',
    title: 'Engagement',
    desc: "Je m'implique personnellement sur chaque dossier, de la première consultation jusqu'au résultat obtenu.",
  },
];

export const approachParagraphs = [
  "Depuis le début de ma carrière, j'ai fait le choix de travailler en cabinet libéral, au plus proche de mes clients. Cette proximité n'est pas un hasard : elle correspond à ma vision de l'exercice juridique. Un avocat doit comprendre l'entreprise de son client, ses enjeux, sa culture, avant de lui proposer une stratégie.",
  "En droit des affaires, j'accompagne les dirigeants dans leurs opérations les plus stratégiques : acquisitions, cessions, restructurations, contentieux commerciaux. Chaque opération est unique, chaque solution doit l'être aussi.",
  "En droit du travail, mon approche est préventive autant que défensive. Je travaille en amont pour identifier les risques, construire des process robustes, et former les équipes dirigeantes. Quand le contentieux est inévitable, je m'engage avec détermination.",
  "Ce qui me distingue, c'est mon engagement personnel. Je connais mes clients, leurs équipes, leurs contraintes. Cette connaissance intime est ce qui me permet de défendre leurs intérêts avec la précision et la force qui font la différence.",
];

export const skillPills = ['Droit des affaires', 'Droit du travail', 'Contentieux'];

export const badges = ["Barreau de Paris", "Master II Droit des Affaires", "12 ans d'expérience"];
