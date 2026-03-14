import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import BlurReveal from '../components/BlurReveal';
import { categories, allDossiers } from '@/data/dossiers';
import { useMobile } from '@/hooks/useMobile';

export default function Dossiers() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const isMobile = useMobile();

  const filtered =
    activeCategory === 'Tous'
      ? allDossiers
      : allDossiers.filter((d) => d.category === activeCategory);

  // Parallax hero
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', isMobile ? '0%' : '18%']);
  const heroContentY = useTransform(heroProgress, [0, 1], ['0%', isMobile ? '0%' : '10%']);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  // Parallax CTA section
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });
  const ctaBgY = useTransform(ctaProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '15%']);

  return (
    <>
      {/* === A — HERO DOSSIERS (parallax) === */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0A0D1A' }}
      >
        {/* Background parallax gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroBgY,
            background: 'radial-gradient(ellipse at 60% 40%, rgba(0,47,167,0.12) 0%, transparent 65%)',
          }}
        />

        <motion.div
          className="relative z-10"
          style={{
            y: heroContentY,
            opacity: heroContentOpacity,
            padding: 'clamp(80px, 10vw, 128px) 0 clamp(56px, 7vw, 80px)',
          }}
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow"
              style={{ marginBottom: '16px' }}
            >
              Portfolio juridique
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading"
              style={{
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
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-body"
              style={{
                fontSize: 'clamp(16px, 1.5vw, 18px)',
                color: 'rgba(255,255,255,0.70)',
                marginBottom: '48px',
              }}
            >
              Des situations complexes, des résultats concrets.
            </motion.p>

            <motion.div
              className="flex flex-row flex-wrap gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                { value: '5', label: "domaines d'expertise" },
                { value: '3', label: 'diplômes internationaux' },
                { value: '3', label: 'spécialités' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span
                    className="font-body"
                    style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}
                  >
                    {m.value}
                  </span>
                  <span className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* === B — FILTRES === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '32px 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-body flex-shrink-0" style={{ fontSize: '13px', fontWeight: 500, color: '#6B6C7A' }}>
              Filtrer par :
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                style={{
                  backgroundColor: activeCategory === cat ? '#002FA7' : '#F5F5F7',
                  color: activeCategory === cat ? '#FFFFFF' : '#060608',
                  border: `1px solid ${activeCategory === cat ? '#002FA7' : '#E0E0E8'}`,
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
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="card-hover flex flex-col"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E8',
                    borderRadius: '4px',
                    padding: '28px',
                    boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
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
                    className="font-body mt-3 mb-2"
                    style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.4, color: '#060608' }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="font-body flex-1"
                    style={{ fontSize: '14px', color: '#6B6C7A', lineHeight: 1.6 }}
                  >
                    {d.context}
                  </p>
                  <div style={{ borderTop: '1px solid #E0E0E8', margin: '16px 0' }} />
                  <p
                    className="eyebrow"
                    style={{ fontSize: '10px', letterSpacing: '0.10em', marginBottom: '4px' }}
                  >
                    Résultat
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: '14px', fontWeight: 600, color: '#060608', lineHeight: 1.5, marginBottom: '16px' }}
                  >
                    {d.result}
                  </p>
                  <Link
                    to="/contact"
                    className="group/link inline-flex items-center gap-1 font-body"
                    style={{
                      color: '#002FA7',
                      fontSize: '13px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      marginTop: 'auto',
                      transition: 'opacity 150ms ease',
                    }}
                  >
                    <span className="group-hover/link:underline" style={{ textDecorationColor: '#002FA7' }}>
                      → Dossier similaire ?
                    </span>
                  </Link>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* === D — CTA BAS (parallax) === */}
      <section ref={ctaRef} className="relative overflow-hidden" style={{ backgroundColor: '#002FA7' }}>
        <motion.div
          className="absolute inset-0"
          style={{
            y: ctaBgY,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.07) 0%, transparent 55%)',
          }}
        />
        <div
          className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center flex flex-col items-center"
          style={{ padding: 'clamp(56px, 7vw, 96px) 0' }}
        >
          <BlurReveal
            as="h2"
            className="font-heading"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
            baseOpacity={0.2}
            enableBlur
            blurStrength={4}
          >
            Votre situation mérite une expertise sur-mesure.
          </BlurReveal>
          <ScrollReveal delay={0.1}>
            <p
              className="font-body"
              style={{
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
              className="btn-primary-light gap-2"
              style={{ padding: '16px 40px' }}
            >
              Prendre RDV
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
