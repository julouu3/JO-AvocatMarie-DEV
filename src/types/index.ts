import type { ElementType } from 'react';

// ─── Dossiers ────────────────────────────────────────────────────────────────
export interface Dossier {
  id: number;
  tag: string;
  category: string;
  featured: boolean;
  title: string;
  context: string;
  result: string;
}

// ─── Profil ──────────────────────────────────────────────────────────────────
export interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description?: string;
}

export interface Certification {
  icon: ElementType;
  label: string;
}

export interface Valeur {
  icon: string;
  title: string;
  desc: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export interface FormData {
  nom: string;
  email: string;
  entreprise: string;
  sujet: string;
  message: string;
}

export interface FormErrors {
  nom?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

export interface ConsultationOption {
  title: string;
  duration: string;
  price: string;
  desc: string;
  highlight: boolean;
}

export interface Etape {
  num: string;
  title: string;
  desc: string;
}

// ─── Home ────────────────────────────────────────────────────────────────────
export interface Metric {
  value: number;
  suffix: string;
  label: string;
}

export interface Expertise {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  variant: 'light' | 'primary';
}

// ─── Mentions Légales ────────────────────────────────────────────────────────
export interface LegalSection {
  title: string;
  content: string[];
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavLinkItem {
  label: string;
  href: string;
}
