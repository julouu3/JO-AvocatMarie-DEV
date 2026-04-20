import { GraduationCap, Award, Globe, Scale } from 'lucide-react';
import type { TimelineItem, Certification, Valeur } from '@/types';

export const PROFIL_IMG = '/images/MarieODIN-large.png';

export const timelineItems: TimelineItem[] = [
  {
    year: '2017',
    title: 'Magistère, Droit franco-britannique des affaires',
    institution: 'Université de Rennes',
  },
  {
    year: '2018',
    title: 'Master of Laws (LLM), International Commercial Law',
    institution: 'University of Exeter, Royaume-Uni',
  },
  {
    year: '2019',
    title: 'Master II, Droit des affaires et fiscalité',
    institution: 'Université Paris I Panthéon-Sorbonne',
  },
  {
    year: '2021',
    title: "Prestation de serment",
    institution: 'Barreau de Paris',
  },
  {
    year: '2021–2025',
    title: 'Avocate à la Cour, Contentieux des affaires',
    institution: 'Bredin Prat',
    description: 'Contentieux des affaires au sein d\'un cabinet de premier plan',
  },
  {
    year: '2025–présent',
    title: 'Avocate à la Cour, Contentieux et droit pénal des affaires',
    institution: 'Sekri Valentin Zerrouk',
    description: 'Contentieux et droit pénal des affaires',
  },
];

export const certifications: Certification[] = [
  { icon: GraduationCap, label: 'Université Paris I Panthéon-Sorbonne | M2 Droit des affaires' },
  { icon: GraduationCap, label: 'University of Exeter | LLM International Commercial Law' },
  { icon: GraduationCap, label: 'Université de Rennes | Magistère Droit franco-britannique' },
  { icon: Scale, label: 'Barreau de Paris | Avocate inscrite (2021)' },
  { icon: Award, label: 'Bredin Prat | Contentieux des affaires (4 ans)' },
  { icon: Award, label: 'Sekri Valentin Zerrouk | Contentieux & pénal des affaires' },
  { icon: Globe, label: 'Français · Anglais courant' },
];

export const formationGroups = [
  {
    category: 'Formation',
    items: [
      { institution: 'Paris I Panthéon-Sorbonne', detail: 'Master 2, Droit des affaires & fiscalité' },
      { institution: 'University of Exeter', detail: 'LL.M, International Business Law' },
      { institution: 'Université de Rennes 1', detail: 'Magistère Juriste d\'Affaires Franco-britannique' },
    ],
  },
  {
    category: 'Expérience',
    items: [
      { institution: 'Sekri Valentin Zerrouk', detail: 'Contentieux & droit pénal des affaires' },
      { institution: 'Bredin Prat', detail: 'Contentieux des affaires (4 ans)' },
    ],
  },
  {
    category: 'Barreau & Langues',
    items: [
      { institution: 'Barreau de Paris', detail: 'Avocate inscrite depuis 2021' },
      { institution: 'Langues', detail: 'Français · Anglais courant' },
    ],
  },
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
  "Inscrite au barreau de Paris depuis 2021, Marie est diplômée de l'Université Paris 1 Panthéon-Sorbonne (Master 2, droit des affaires et fiscalité), de l'Université anglaise d'Exeter (LL.M International Business Law) et de l'Université de Rennes 1 (Magistère Juriste d'Affaires Franco-britannique).",
  "Avant de rejoindre le cabinet Sekri Valentin Zerrouk, où elle exerce au sein de l'équipe Contentieux et droit pénal des affaires, Marie a développé une solide expérience pendant plus de quatre années au sein de l'équipe Contentieux des affaires du cabinet Bredin Prat.",
  "Forte de son expérience, Marie Odin conseille et représente les sociétés et leurs dirigeants devant les juridictions civiles, commerciales et pénales. Elle intervient à tous les stades de la procédure, tant en amont, dans une logique de prévention et de gestion du risque, que dans le cadre de procédures contentieuses.",
  "Plus récemment, Marie a développé une activité en droit pénal général. Sa clientèle est diverse : sociétés de toute taille, dirigeants et particuliers. Chaque client bénéficie d'un accompagnement sur-mesure, avec la même exigence et le même engagement personnel.",
];

export const skillPills = ['Contentieux des affaires', 'Droit pénal des affaires', 'Droit pénal général'];

export const badges = ["Barreau de Paris", "M2 Droit des Affaires, Paris I", "Bredin Prat", "Sekri Valentin Zerrouk"];
