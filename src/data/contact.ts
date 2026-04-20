import type { ConsultationOption, Etape } from '@/types';

export const consultationOptions: ConsultationOption[] = [
  {
    title: 'Appel découverte',
    duration: '30 min',
    price: 'Gratuit',
    desc: 'Pour évaluer si je peux vous aider et quel accompagnement est adapté.',
    highlight: false,
  },
  {
    title: 'Consultation approfondie',
    duration: '1 heure',
    price: 'Sur devis',
    desc: 'Analyse détaillée de votre situation juridique et recommandations stratégiques.',
    highlight: true,
  },
];

export const etapes: Etape[] = [
  {
    num: '1',
    title: 'Vous choisissez un créneau',
    desc: 'Sélectionnez le format qui vous convient : appel découverte gratuit ou consultation approfondie. Premier échange libre et confidentiel.',
  },
  {
    num: '2',
    title: "J'analyse votre demande",
    desc: "Je prends connaissance de votre situation en amont pour préparer nos échanges et vous apporter des premières pistes de réflexion dès notre rendez-vous.",
  },
  {
    num: '3',
    title: 'On avance ensemble',
    desc: "Vous repartez avec une stratégie claire, un plan d'action concret et un interlocuteur dédié pour la suite de votre dossier.",
  },
];
