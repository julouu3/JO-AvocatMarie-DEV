import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Shield, Building2, Scale, Gavel } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import BlurReveal from '../components/BlurReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { categories, allDossiers } from '@/data/dossiers';
import { useMobile } from '@/hooks/useMobile';

const DOSSIERS_IMG = '/images/Dossiers.png';

// ── Category styling map ────────────────────────────────────────────────────
const categoryStyle: Record<string, { bg: string; color: string; border: string; icon: React.ElementType }> = {
  Compliance:          { bg: '#FFF0E6', color: '#FF6B00', border: '#FFB380', icon: Shield },
  Corporate:           { bg: '#F0F0F0', color: '#1A1A1A', border: '#D0D0D0', icon: Building2 },
  'Pénal des affaires': { bg: '#E8EDFF', color: '#002FA7', border: '#B3C4F5', icon: Gavel },
  Contentieux:         { bg: '#E8EDFF', color: '#002FA7', border: '#B3C4F5', icon: Scale },
};
const defaultStyle = { bg: '#F5F5F7', color: '#6B6C7A', border: '#E0E0E8', icon: Scale };

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
      {/* === A — HERO DOSSIERS (full-width photo, text overlaid bottom-left) === */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0A0D1A' }}
      >
        {/* Photo — full-width with parallax */}
        <motion.div
          className="relative"
          style={{ y: heroBgY }}
        >
          <ImageWithFallback
            src={DOSSIERS_IMG}
            alt="Dossiers juridiques"
            className="w-full object-cover"
            style={{
              height: 'clamp(500px, 70vh, 780px)',
              objectPosition: 'center center',
            }}
          />
          {/* Bottom gradient for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to top, rgba(10,13,26,0.85) 0%, rgba(10,13,26,0.35) 35%, transparent 60%),
                linear-gradient(to top, rgba(10,13,26,0.5) 0%, transparent 20%)
              `,
            }}
          />
        </motion.div>

        {/* Title + subtitle — overlaid at bottom-left */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20"
          style={{
            paddingBottom: 'clamp(32px, 4vw, 56px)',
            y: heroContentY,
            opacity: heroContentOpacity,
          }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="font-heading"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(40px, 7vw, 88px)',
                fontWeight: 400,
                lineHeight: 1.05,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}
            >
              Mes Dossiers
            </motion.h1>
          </div>
          <motion.p
            className="font-body"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.75)',
              marginTop: '8px',
              letterSpacing: '0.02em',
            }}
          >
            Des situations complexes, des résultats concrets.
          </motion.p>
        </motion.div>
      </section>

      {/* === B — FILTRES === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '32px 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-body flex-shrink-0" style={{ fontSize: '13px', fontWeight: 500, color: '#6B6C7A' }}>
              Filtrer par :
            </span>
            {categories.map((cat) => {
              const cs = categoryStyle[cat as string];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-btn${isActive ? ' active' : ''}`}
                  style={{
                    backgroundColor: isActive
                      ? (cs ? cs.color : '#002FA7')
                      : '#F5F5F7',
                    color: isActive ? '#FFFFFF' : '#060608',
                    border: `1px solid ${isActive ? (cs ? cs.color : '#002FA7') : '#E0E0E8'}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {cs && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? '#FFFFFF' : cs.color,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
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
              {filtered.map((d) => {
                const cs = categoryStyle[d.category] || defaultStyle;
                const Icon = cs.icon;
                return (
                <div
                  key={d.id}
                  className="card-hover flex flex-col"
                  style={{
                    backgroundColor: '#F8F9FC',
                    borderRadius: '6px',
                    padding: '32px',
                    border: `1px solid #E8E8EE`,
                    borderTop: `3px solid ${cs.color}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                  }}
                >
                  {/* Category tag + icon */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        backgroundColor: cs.bg,
                        borderRadius: '6px',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={14} style={{ color: cs.color }} />
                    </span>
                    <span
                      className="font-body"
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: cs.color,
                        backgroundColor: cs.bg,
                        border: `1px solid ${cs.border}`,
                        padding: '4px 10px',
                        borderRadius: '2px',
                      }}
                    >
                      {d.tag}
                    </span>
                  </div>

                  {/* Title — serif */}
                  <h3
                    className="font-heading mb-3"
                    style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, lineHeight: 1.25, color: '#060608' }}
                  >
                    {d.title}
                  </h3>

                  {/* Context */}
                  <p
                    className="font-body flex-1"
                    style={{ fontSize: '14px', color: '#6B6C7A', lineHeight: 1.65 }}
                  >
                    {d.context}
                  </p>

                  {/* Result block */}
                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid #E8E8EE',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        style={{
                          width: '3px',
                          minHeight: '32px',
                          backgroundColor: cs.color,
                          borderRadius: '2px',
                          opacity: 0.4,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <p
                          className="font-body"
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: cs.color,
                            marginBottom: '4px',
                          }}
                        >
                          Résultat
                        </p>
                        <p
                          className="font-body"
                          style={{ fontSize: '14px', fontWeight: 600, color: '#060608', lineHeight: 1.45 }}
                        >
                          {d.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    className="group/link inline-flex items-center gap-2 mt-5 font-body"
                    style={{
                      color: cs.color,
                      fontSize: '13px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      marginTop: 'auto',
                      paddingTop: '12px',
                    }}
                  >
                    <span className="group-hover/link:underline" style={{ textDecorationColor: cs.color }}>
                      Dossier similaire ?
                    </span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                );
              })}
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
