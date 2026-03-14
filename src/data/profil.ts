import { GraduationCap, Award, Globe, Scale } from 'lucide-react';
import type { TimelineItem, Certification, Valeur } from '@/types';

export const PROFIL_IMG =
  'https://images.unsplash.com/photo-1758600587730-a11917c13b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3dvbWFuJTIwcHJvZmVzc2lvbmFsJTIwY29uZmlkZW50JTIwcG9ydHJhaXQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzM0OTAwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const timelineItems: TimelineItem[] = [
  {
    year: '2017',
    title: 'Magistère — Droit franco-britannique des affaires',
    institution: 'Université de Rennes',
  },
  {
    year: '2018',
    title: 'Master of Laws (LLM) — International Commercial Law',
    institution: 'University of Exeter, Royaume-Uni',
  },
  {
    year: '2019',
    title: 'Master II — Droit des affaires et fiscalité',
    institution: 'Université Paris I Panthéon-Sorbonne',
  },
  {
    year: '2022',
    title: "Prestation de serment",
    institution: 'Barreau de Paris',
  },
  {
    year: '2022–présent',
    title: 'Avocate — Compliance, Corporate & Pénal des affaires',
    institution: 'Paris 8e',
    description: 'Accompagnement de sociétés, fonds d\'investissement et dirigeants',
  },
];

export const certifications: Certification[] = [
  { icon: GraduationCap, label: 'Université Paris I Panthéon-Sorbonne — M2 Droit des affaires' },
  { icon: GraduationCap, label: 'University of Exeter — LLM International Commercial Law' },
  { icon: GraduationCap, label: 'Université de Rennes — Magistère Droit franco-britannique' },
  { icon: Scale, label: 'Barreau de Paris — Avocate inscrite (2022)' },
  { icon: Award, label: 'Bredin Prat — Équipe Contentieux (4 ans)' },
  { icon: Globe, label: 'Français · Anglais courant' },
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
  "Formée en droit des affaires entre la France et le Royaume-Uni, j'ai développé une approche rigoureuse et transversale du droit. Mon parcours au sein du cabinet Bredin Prat, au sein de l'équipe contentieux, m'a forgée au contact des dossiers les plus exigeants.",
  "En compliance et droit pénal des affaires, j'accompagne les entreprises dans la mise en conformité de leurs pratiques, la gestion des risques réglementaires et la défense de leurs intérêts en cas de mise en cause.",
  "En droit des sociétés, j'interviens sur les opérations courantes et exceptionnelles : structurations, transformations, cessions, et accompagnement des dirigeants dans leur gouvernance.",
  "Ma clientèle est diverse : sociétés de toute taille, prestataires de services d'investissement, fonds, actionnaires et dirigeants. Chaque client bénéficie d'un accompagnement sur-mesure, avec la même exigence et le même engagement personnel.",
];

export const skillPills = ['Compliance', 'Corporate', 'Pénal des affaires'];

export const badges = ["Barreau de Paris", "M2 Droit des Affaires — Paris I", "Bredin Prat Alumni"];
