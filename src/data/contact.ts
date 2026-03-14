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
    desc: 'Premier échange libre et confidentiel',
  },
  {
    num: '2',
    title: "J'analyse votre demande",
    desc: 'Je prépare nos échanges en amont',
  },
  {
    num: '3',
    title: 'On avance ensemble',
    desc: 'Stratégie claire dès la première consultation',
  },
];
