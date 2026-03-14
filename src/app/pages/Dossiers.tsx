import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const categories = ['Tous', 'Droit des affaires', 'Droit du travail', 'Contentieux', 'Restructuration', 'Contrats'];

const allDossiers = [
  {
    id: 1,
    tag: 'DROIT DU TRAVAIL',
    category: 'Droit du travail',
    featured: true,
    title: 'Restructuration d\'une ETI industrielle',
    context:
      'Accompagnement d\'une ETI de 200 salariés dans un PSE. Négociation avec les partenaires sociaux, rédaction des accords collectifs, validation DREETS. Gestion de l\'ensemble des interlocuteurs institutionnels.',
    result: 'PSE homologué sans recours · Délais respectés · 4 mois de procédure',
  },
  {
    id: 2,
    tag: 'DROIT DES AFFAIRES',
    category: 'Droit des affaires',
    featured: true,
    title: 'Cession d\'une PME familiale',
    context:
      'Structuration et sécurisation juridique de la cession d\'une PME du secteur distribution. Accompagnement du dirigeant de la LOI au signing, coordination avec les conseils financiers et fiscaux.',
    result: 'Transaction sécurisée · Garanties de passif négociées · Closing réalisé',
  },
  {
    id: 3,
    tag: 'CONTENTIEUX',
    category: 'Contentieux',
    featured: true,
    title: 'Litige commercial entre associés',
    context:
      'Représentation d\'un dirigeant dans un conflit portant sur l\'exclusion et la valorisation des parts sociales. Procédure en urgence devant le Tribunal de Commerce de Paris.',
    result: 'Transaction amiable · Préjudice évité > 800K€',
  },
  {
    id: 4,
    tag: 'DROIT DU TRAVAIL',
    category: 'Droit du travail',
    featured: false,
    title: 'Rupture conventionnelle collective (RCC)',
    context:
      'Mise en œuvre d\'une RCC pour une scale-up tech en restructuration. Coordination RH, négociation syndicale, validation administrative. Accompagnement des 35 salariés concernés.',
    result: 'RCC validée · Délais raccourcis de 30% · 0 recours',
  },
  {
    id: 5,
    tag: 'DROIT DES AFFAIRES',
    category: 'Droit des affaires',
    featured: false,
    title: 'Contrats fournisseurs internationaux',
    context:
      'Audit et refonte des contrats fournisseurs d\'un groupe industriel avec partenaires européens et asiatiques. Identification des clauses à risque, rédaction de nouveaux modèles contractuels.',
    result: '15 contrats sécurisés · Clauses de risque éliminées',
  },
  {
    id: 6,
    tag: 'DROIT DU TRAVAIL',
    category: 'Droit du travail',
    featured: false,
    title: 'Défense employeur — contentieux prud\'homal',
    context:
      'Assistance d\'une PME dans une procédure prud\'homale complexe suite à un licenciement contesté. Élaboration de la stratégie de défense, gestion des audiences, négociation de l\'accord final.',
    result: 'Décision favorable · Indemnité réduite de 70%',
  },
];

export default function Dossiers() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered =
    activeCategory === 'Tous'
      ? allDossiers
      : allDossiers.filter((d) => d.category === activeCategory);

  return (
    <>
      {/* === A — HERO DOSSIERS === */}
      <section style={{ backgroundColor: '#0A0D1A', padding: 'clamp(80px, 10vw, 128px) 0 clamp(56px, 7vw, 80px)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              color: '#002FA7',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '16px',
            }}
          >
            Portfolio juridique
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Mes Dossiers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              color: 'rgba(255,255,255,0.70)',
              marginBottom: '48px',
            }}
          >
            Des situations complexes, des résultats concrets.
          </motion.p>

          {/* Métriques */}
          <motion.div
            className="flex flex-row flex-wrap gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {[
              { value: '200+', label: 'dossiers traités' },
              { value: '12 ans', label: "d'expérience" },
              { value: '2', label: 'spécialités' },
            ].map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(28px, 3vw, 36px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === B — FILTRES === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '32px 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <div className="flex flex-wrap items-center gap-3">
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#6B6C7A',
                flexShrink: 0,
              }}
            >
              Filtrer par :
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  backgroundColor: activeCategory === cat ? '#002FA7' : '#F5F5F7',
                  color: activeCategory === cat ? '#FFFFFF' : '#060608',
                  border: `1px solid ${activeCategory === cat ? '#002FA7' : '#E0E0E8'}`,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  padding: '6px 14px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = '#002FA7';
                    el.style.color = '#002FA7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = '#E0E0E8';
                    el.style.color = '#060608';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* === C — GRILLE DOSSIERS === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(32px, 4vw, 48px) 0 clamp(56px, 7vw, 96px)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-col transition-all duration-200"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E8',
                    borderRadius: '4px',
                    padding: '28px',
                    boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.borderColor = '#002FA7';
                    el.style.boxShadow = '0 8px 32px rgba(0,47,167,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.borderColor = '#E0E0E8';
                    el.style.boxShadow = '0 2px 24px rgba(0,0,0,0.06)';
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#E8EDFF',
                      color: '#002FA7',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '3px 9px',
                      borderRadius: '3px',
                    }}
                  >
                    {d.tag}
                  </span>
                  <h3
                    className="mt-3 mb-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '17px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: '#060608',
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="flex-1"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      color: '#6B6C7A',
                      lineHeight: 1.6,
                    }}
                  >
                    {d.context}
                  </p>
                  <div style={{ borderTop: '1px solid #E0E0E8', margin: '16px 0' }} />
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#002FA7',
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                      marginBottom: '4px',
                    }}
                  >
                    Résultat
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#060608',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                    }}
                  >
                    {d.result}
                  </p>
                  <Link
                    to="/contact"
                    className="group/link inline-flex items-center gap-1"
                    style={{
                      color: '#002FA7',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      marginTop: 'auto',
                      transition: 'opacity 150ms ease',
                    }}
                  >
                    <span
                      className="group-hover/link:underline"
                      style={{ textDecorationColor: '#002FA7' }}
                    >
                      → Dossier similaire ?
                    </span>
                  </Link>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* === D — CTA BAS === */}
      <section style={{ backgroundColor: '#002FA7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center flex flex-col items-center">
          <ScrollReveal>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Votre situation mérite une expertise sur-mesure.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(15px, 1.5vw, 18px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.80)',
                lineHeight: 1.65,
                maxWidth: '460px',
                marginBottom: '36px',
              }}
            >
              Discutons de votre dossier en toute confidentialité.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#002FA7',
                borderRadius: '2px',
                padding: '16px 40px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'background-color 200ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#E8EDFF'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF'; }}
            >
              Prendre RDV
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Mobile sticky spacer */}
      <div className="lg:hidden" style={{ height: '64px' }} />
    </>
  );
}
