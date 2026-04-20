import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, animate } from 'motion/react';
import { ArrowRight, Scale, Shield, Briefcase, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import BlurReveal from '../components/BlurReveal';
import { useInView } from '@/hooks/useInView';
import { useMobile } from '@/hooks/useMobile';
import {
  metrics,
  expertiseContentieux, expertisePenalAffaires, expertisePenalGeneral, dossiersVedette,
} from '@/data/home';

// ─── Animated counter (unified) ──────────────────────────────────────────────
// delay > 0 → timer-based start (used for hero after splash)
// delay = 0 → inView-based start (used for scroll sections)
function AnimatedCounter({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setStarted(true), delay * 1000);
      return () => clearTimeout(timer);
    } else {
      if (inView) setStarted(true);
    }
  }, [delay, inView]);

  useEffect(() => {
    if (!started) return;
    const ctrl = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [started, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Hero: Floating badge ────────────────────────────────────────────────────
function FloatingBadge({
  children,
  className,
  delay = 0,
  y = [0, -8, 0],
  duration = 5,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number[];
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// === SECTION A — HERO (Dribbble-inspired split layout) ===
// Splash: hold 2.0s → exit phase → white slides up (0.25s delay + 1.0s) → done at 4.0s
// Hero animations start at 2.6s to appear as splash panels slide away
const SPLASH_OFFSET = 2.6;
const NO_SPLASH_OFFSET = 0.1; // Quick fade-in when navigating back to home

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '6%']);

  // Base delay: long offset if splash is playing, short if navigating back
  const d = (window as any).__splashPlayed ? NO_SPLASH_OFFSET : SPLASH_OFFSET;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#FAFBFF', minHeight: '100vh' }}
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(0,47,167,0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,47,167,0.03) 0%, transparent 50%)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 pt-28 lg:pt-36 pb-16 lg:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Colonne gauche : Texte ──────────────────────────────────────── */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: d + 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Scale size={14} style={{ color: '#002FA7' }} />
              <span className="eyebrow" style={{ letterSpacing: '0.14em' }}>
                Avocate au Barreau de Paris · Contentieux · Pénal des affaires
              </span>
            </motion.div>

            {/* Titre catchy — lignes révélées une par une */}
            <h1 style={{ margin: 0, padding: 0, marginBottom: '24px' }}>
              {['Vos enjeux', 'juridiques méritent', 'une stratégie,', 'pas une réponse.'].map((line, i) => (
                <span
                  key={i}
                  className="block overflow-hidden"
                  style={{ paddingBottom: '0.3em' }}
                >
                  <motion.span
                    className="block font-heading"
                    initial={{ y: '115%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.85,
                      delay: d + 0.25 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      fontSize: 'clamp(36px, 5.5vw, 64px)',
                      fontWeight: 700,
                      lineHeight: 1.08,
                      letterSpacing: '-0.02em',
                      color: '#060608',
                    }}
                  >
                    {line.includes('stratégie') ? (
                      <>
                        une{' '}
                        <em style={{ color: '#002FA7', fontStyle: 'italic', fontWeight: 700 }}>
                          stratégie
                        </em>
                        ,
                      </>
                    ) : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Sous-titre */}
            <motion.p
              className="font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: d + 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(15px, 1.4vw, 17px)',
                fontWeight: 400,
                color: '#6B6C7A',
                lineHeight: 1.7,
                maxWidth: '440px',
                marginBottom: '32px',
              }}
            >
              Contentieux et droit pénal des affaires.
              Je conseille et représente les sociétés et leurs dirigeants devant les juridictions civiles, commerciales et pénales.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: d + 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto btn-primary transition-transform hover:scale-[1.01] active:scale-[0.97]"
                style={{ padding: '14px 32px' }}
              >
                Prendre contact
                <ArrowRight size={14} className="ml-2" />
              </Link>
              <Link
                to="/profil"
                className="group flex items-center gap-2 font-body"
                style={{ color: '#060608', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
              >
                <span className="group-hover:underline" style={{ textDecorationColor: '#002FA7' }}>
                  Découvrir le cabinet
                </span>
                <ArrowRight size={14} className="icon-bounce" />
              </Link>
            </motion.div>

            {/* ── Métriques ────────────────────────────────────────────────── */}
            <motion.div
              className="flex flex-wrap items-start gap-8 sm:gap-10 mt-12 pt-8"
              style={{ borderTop: '1px solid #E0E0E8' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: d + 1.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span
                    className="font-body"
                    style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, color: '#060608', lineHeight: 1 }}
                  >
                    <AnimatedCounter value={m.value} suffix={m.suffix} delay={d + 1.35} />
                  </span>
                  <span className="font-body mt-1" style={{ fontSize: '13px', color: '#6B6C7A' }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Colonne droite : Photo avec floating badges ────────────────── */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, delay: d + 0.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imgY }}
            >
              {/* Accent bleu derrière la photo */}
              <div
                className="absolute -right-4 -bottom-4 w-full h-full hidden lg:block"
                style={{ backgroundColor: '#002FA7', opacity: 0.06 }}
              />

              {/* Photo principale */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', maxHeight: '580px' }}>
                <img
                  src="/images/MarieOdin-test.png"
                  alt="Marie Odin, avocate au Barreau de Paris"
                  className="w-full h-full object-cover object-top"
                  style={{ backgroundColor: '#E0E0E8' }}
                />
                {/* Léger gradient en bas pour les badges */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(250,251,255,0.4), transparent)' }}
                />
              </div>
            </motion.div>

            {/* ── Floating badges autour de la photo ────────────────────────── */}
            {!isMobile && (
              <>
                {/* Badge : Barreau de Paris */}
                <FloatingBadge
                  className="top-[8%] -right-[12%] z-20"
                  delay={d + 0.7}
                  y={[0, -6, 0]}
                  duration={5}
                >
                  <CheckCircle2 size={15} style={{ color: '#002FA7' }} />
                  <span className="font-body" style={{ fontSize: '13px', fontWeight: 500, color: '#060608', whiteSpace: 'nowrap' }}>
                    Barreau de Paris
                  </span>
                </FloatingBadge>

                {/* Badge : Secret professionnel */}
                <FloatingBadge
                  className="top-[28%] -right-[8%] z-20"
                  delay={d + 0.9}
                  y={[0, -7, 0]}
                  duration={6}
                >
                  <Shield size={15} style={{ color: '#002FA7' }} />
                  <span className="font-body" style={{ fontSize: '13px', fontWeight: 500, color: '#060608', whiteSpace: 'nowrap' }}>
                    Secret professionnel
                  </span>
                </FloatingBadge>

                {/* Badge : Domaines (gauche) */}
                <FloatingBadge
                  className="bottom-[25%] -left-[10%] z-20"
                  delay={d + 1.1}
                  y={[0, -9, 0]}
                  duration={7}
                >
                  <Briefcase size={15} style={{ color: '#002FA7' }} />
                  <div className="flex flex-col">
                    <span className="font-body" style={{ fontSize: '12px', fontWeight: 600, color: '#060608' }}>
                      Domaines
                    </span>
                    <div className="flex gap-1.5 mt-1">
                      {['Contentieux', 'Pénal', 'Général'].map((tag) => (
                        <span
                          key={tag}
                          className="font-body"
                          style={{
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#002FA7',
                            backgroundColor: '#E8EDFF',
                            padding: '2px 7px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FloatingBadge>

                {/* Badge : Expérience (bas droite) */}
                <FloatingBadge
                  className="bottom-[8%] -right-[6%] z-20"
                  delay={d + 1.3}
                  y={[0, -5, 0]}
                  duration={5.5}
                >
                  <div className="flex flex-col items-center" style={{ minWidth: '80px' }}>
                    <span className="font-body" style={{ fontSize: '22px', fontWeight: 700, color: '#002FA7', lineHeight: 1 }}>
                      Paris I
                    </span>
                    <span className="font-body" style={{ fontSize: '10px', color: '#6B6C7A', whiteSpace: 'nowrap' }}>
                      Panthéon-Sorbonne
                    </span>
                  </div>
                </FloatingBadge>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// === SECTION B — ACCROCHE & CHIFFRES (parallax subtil) ===
function AccrocheSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const metricsY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [40, -40]);

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F5F5F7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <ScrollReveal>
              <p className="eyebrow mb-4">Mon Approche</p>
            </ScrollReveal>
            <BlurReveal
              as="h2"
              className="font-heading mb-5"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.3,
                color: '#060608',
              }}
              baseOpacity={0.15}
              enableBlur
              blurStrength={5}
            >
              J'interviens là où les enjeux sont les plus élevés.
            </BlurReveal>
            <ScrollReveal delay={0.14}>
              <p
                className="font-body mb-6"
                style={{ fontSize: '17px', color: '#060608', lineHeight: 1.75 }}
              >
                Formée entre Paris et le Royaume-Uni, passée par le cabinet Bredin Prat,
                j'ai construit ma pratique autour d'une conviction : chaque client mérite un
                accompagnement juridique à la hauteur de ses enjeux. Contentieux des affaires,
                droit pénal des affaires et droit pénal général. Chaque dossier est traité avec la même exigence.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.18}>
              <Link
                to="/profil"
                className="group inline-flex items-center gap-2 font-body"
                style={{ color: '#002FA7', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
              >
                <span className="group-hover:underline">En savoir plus</span>
                <ArrowRight size={15} className="icon-bounce" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Metrics avec parallax */}
          <motion.div className="flex flex-col gap-0" style={{ y: metricsY }}>
            {metrics.map((metric, i) => (
              <ScrollReveal key={metric.label} delay={i * 0.1}>
                <div
                  className="py-7 flex flex-col items-center text-center sm:flex-row sm:items-baseline sm:text-left gap-2 sm:gap-4"
                  style={{
                    borderBottom: i < metrics.length - 1 ? '1px solid #E0E0E8' : 'none',
                    borderTop: i === 0 ? '1px solid #E0E0E8' : 'none',
                  }}
                >
                  <span
                    className="font-body"
                    style={{ fontSize: 'clamp(40px, 4vw, 52px)', fontWeight: 700, color: '#060608', lineHeight: 1 }}
                  >
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </span>
                  <span className="font-body" style={{ fontSize: '13px', color: '#6B6C7A' }}>
                    {metric.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// === SECTION C — EXPERTISES (editorial columns) ===
const expertiseDomains = [
  {
    num: '01',
    title: 'Contentieux\ndes affaires',
    subtitle: 'Défendre vos intérêts devant les juridictions.',
    desc: 'Conseil et représentation des sociétés et dirigeants devant les juridictions civiles et commerciales.',
    items: expertiseContentieux,
    link: '/dossiers',
    linkLabel: 'Voir les dossiers',
  },
  {
    num: '02',
    title: 'Droit pénal\ndes affaires',
    subtitle: 'Protéger vos intérêts en cas de mise en cause.',
    desc: 'Défense des sociétés et dirigeants dans les procédures pénales liées à la vie des affaires.',
    items: expertisePenalAffaires,
    link: '/dossiers',
    linkLabel: 'Voir les dossiers',
  },
  {
    num: '03',
    title: 'Droit pénal\ngénéral',
    subtitle: 'Défendre les personnes, assister les victimes.',
    desc: 'Défense pénale et assistance aux victimes pour les atteintes aux personnes et aux biens.',
    items: expertisePenalGeneral,
    link: '/contact',
    linkLabel: 'Me contacter',
  },
];

function ExpertiseColumn({
  domain,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  domain: typeof expertiseDomains[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  // isActive = this card is hovered. When another card is hovered, this one dims.
  // When nothing is hovered, all cards are neutral (no dim).

  return (
    <ScrollReveal delay={index * 0.15} y={40} blur>
      <motion.div
        className="h-full flex flex-col"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        animate={{
          scale: isActive ? 1.02 : 1,
          y: isActive ? -6 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          cursor: 'default',
          padding: 'clamp(28px, 3vw, 40px)',
          borderRadius: '6px',
          backgroundColor: isActive ? '#FAFBFF' : 'transparent',
          boxShadow: isActive
            ? '0 12px 48px rgba(0,47,167,0.10), 0 2px 12px rgba(0,0,0,0.04)'
            : '0 0 0 rgba(0,0,0,0)',
          borderLeft: isActive ? '3px solid #002FA7' : '3px solid transparent',
          transition: 'background-color 0.4s ease, box-shadow 0.45s ease, border-color 0.3s ease',
        }}
      >
        {/* Number + accent line */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="font-heading"
            style={{
              fontSize: 'clamp(40px, 4vw, 56px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: isActive ? '#002FA7' : '#D0D0D8',
              lineHeight: 1,
              transition: 'color 0.35s ease',
            }}
          >
            {domain.num}
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background: isActive
                ? 'linear-gradient(to right, #002FA7, transparent)'
                : 'linear-gradient(to right, #D0D0D8, transparent)',
              opacity: isActive ? 0.7 : 0.25,
              transition: 'opacity 0.4s ease',
            }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-heading"
          style={{
            fontSize: 'clamp(26px, 2.8vw, 34px)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#060608',
            marginBottom: '16px',
            whiteSpace: 'pre-line',
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
          }}
        >
          {domain.title}
        </h3>

        {/* Subtitle */}
        <p
          className="font-heading"
          style={{
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#002FA7',
            lineHeight: 1.45,
            marginBottom: '14px',
            opacity: isActive ? 1 : 0.55,
            transition: 'opacity 0.35s ease',
          }}
        >
          {domain.subtitle}
        </p>

        {/* Description */}
        <p
          className="font-body"
          style={{
            fontSize: '14px',
            color: isActive ? '#4A4A5A' : '#9A9AA8',
            lineHeight: 1.7,
            marginBottom: '24px',
            transition: 'color 0.35s ease',
          }}
        >
          {domain.desc}
        </p>

        {/* Competency list */}
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {domain.items.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-start gap-3"
              initial={{ opacity: 0.6 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <div
                className="shrink-0"
                style={{
                  width: isActive ? '20px' : '12px',
                  height: '1px',
                  backgroundColor: '#002FA7',
                  marginTop: '11px',
                  opacity: isActive ? 0.6 : 0.2,
                  transition: 'width 0.35s ease, opacity 0.35s ease',
                }}
              />
              <span
                className="font-body"
                style={{
                  fontSize: '14px',
                  color: isActive ? '#060608' : '#8A8A98',
                  lineHeight: 1.55,
                  transition: 'color 0.35s ease',
                }}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA link */}
        <Link
          to={domain.link}
          className="group/link inline-flex items-center gap-2 mt-auto font-body"
          style={{
            color: '#002FA7',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            opacity: isActive ? 1 : 0.5,
            transition: 'opacity 0.35s ease',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: isActive ? '24px' : '0px',
              height: '1px',
              backgroundColor: '#002FA7',
              transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), margin 0.4s ease',
              marginRight: isActive ? '8px' : '0px',
            }}
          />
          <span className="group-hover/link:underline">{domain.linkLabel}</span>
          <ArrowRight size={13} className="icon-bounce" />
        </Link>
      </motion.div>
    </ScrollReveal>
  );
}

function ExpertisesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(64px, 8vw, 112px) 0' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <ScrollReveal>
              <p className="eyebrow mb-4">Expertise</p>
            </ScrollReveal>
            <BlurReveal
              as="h2"
              className="font-heading"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.15,
                color: '#060608',
              }}
              baseOpacity={0.15}
              enableBlur
              blurStrength={5}
            >
              Le détail de mes compétences.
            </BlurReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <p
              className="font-body"
              style={{
                fontSize: '15px',
                color: '#6B6C7A',
                lineHeight: 1.65,
                maxWidth: '380px',
              }}
            >
              J'interviens à tous les stades de la procédure, en prévention comme en contentieux.
            </p>
          </ScrollReveal>
        </div>

        {/* Separator */}
        <div style={{ height: '2px', backgroundColor: '#060608', marginBottom: 'clamp(36px, 5vw, 56px)' }} />

        {/* 3 editorial columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {expertiseDomains.map((domain, i) => (
            <ExpertiseColumn
              key={domain.num}
              domain={domain}
              index={i}
              isActive={hoveredIndex === null || hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// === SECTION D — PRÉSENTATION AVOCATE (parallax) ===
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['-10%', '10%']);

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#0A0D1A', position: 'relative' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image — full bleed à gauche */}
        <div className="relative overflow-hidden" style={{ minHeight: 'clamp(350px, 50vw, 600px)' }}>
          <motion.div className="absolute inset-0" style={{ y: imgY, scale: isMobile ? 1 : 1.15 }}>
            <img src="/images/Paris1.jpeg" alt="Université Paris 1 Panthéon-Sorbonne" className="w-full h-full object-cover" style={{ objectPosition: 'center center' }} />
          </motion.div>
          {/* Fondu progressif vers le fond sombre — pas de coupure nette */}
          <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, transparent 50%, #0A0D1A)' }} />
          <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to bottom, transparent 70%, #0A0D1A)' }} />
        </div>

        {/* Texte — centré dans le max-w */}
        <div className="flex flex-col justify-center" style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px)', maxWidth: '640px' }}>
          <ScrollReveal><p className="eyebrow mb-4" style={{ letterSpacing: '0.14em' }}>L'Avocate</p></ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="font-heading" style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, color: '#FFFFFF', marginBottom: '8px' }}>
              Marie Odin
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="font-body" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.70)', marginBottom: '24px' }}>
              Avocate au Barreau de Paris
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="font-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: '20px' }}>
              Inscrite au barreau de Paris depuis 2021, passée par le cabinet Bredin Prat, j'accompagne les sociétés et leurs dirigeants en contentieux et droit pénal des affaires.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: '28px' }}>
              Mon approche est directe, exigeante et profondément humaine. Je m'engage personnellement sur chaque dossier, en apportant une analyse claire et une stratégie sur-mesure.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Barreau de Paris', 'M2 Droit des Affaires, Paris I', 'Bredin Prat', 'Sekri Valentin Zerrouk'].map((badge) => (
                <span
                  key={badge}
                  className="font-body tag-hover"
                  style={{
                    backgroundColor: 'rgba(0,47,167,0.35)', color: '#FFFFFF',
                    border: '1px solid rgba(0,47,167,0.55)',
                    fontSize: '12px', fontWeight: 500, padding: '5px 12px', borderRadius: '3px',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.28}>
            <Link to="/profil" className="group inline-flex items-center gap-2 font-body" style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>
              <span className="group-hover:underline" style={{ textDecorationColor: '#002FA7' }}>Découvrir mon parcours</span>
              <ArrowRight size={15} className="icon-bounce" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// === SECTION E — DOSSIERS EN VEDETTE ===
// Category accent colors (consistent with Dossiers page)
const dossierAccent: Record<string, { color: string; bg: string }> = {
  Compliance: { color: '#FF6B00', bg: '#FFF0E6' },
  Corporate: { color: '#1A1A1A', bg: '#F0F0F0' },
  'Pénal des affaires': { color: '#002FA7', bg: '#E8EDFF' },
  Contentieux: { color: '#002FA7', bg: '#E8EDFF' },
};

function DossierCard({
  d,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  d: typeof dossiersVedette[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const accent = dossierAccent[d.category] || { color: '#002FA7', bg: '#E8EDFF' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="flex flex-col h-full"
        animate={{
          scale: isActive ? 1.02 : 1,
          y: isActive ? -4 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          padding: '32px',
          borderTop: `3px solid ${accent.color}`,
          boxShadow: isActive
            ? '0 16px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
            : '0 1px 4px rgba(0,0,0,0.03)',
          transition: 'box-shadow 0.4s ease, background-color 0.3s ease',
        }}
      >
        {/* Category + number */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-body"
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: accent.color,
              backgroundColor: accent.bg,
              padding: '4px 10px',
              borderRadius: '2px',
            }}
          >
            {d.tag}
          </span>
          <span
            className="font-heading"
            style={{
              fontSize: '28px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: isActive ? accent.color : '#E0E0E8',
              lineHeight: 1,
              transition: 'color 0.35s ease',
            }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Title — serif for editorial feel */}
        <h3
          className="font-heading mb-3"
          style={{
            fontSize: 'clamp(20px, 2vw, 24px)',
            fontWeight: 500,
            lineHeight: 1.25,
            color: '#060608',
          }}
        >
          {d.title}
        </h3>

        {/* Context */}
        <p
          className="flex-1 font-body"
          style={{
            fontSize: '14px',
            color: isActive ? '#4A4A5A' : '#8A8A98',
            lineHeight: 1.65,
            transition: 'color 0.35s ease',
          }}
        >
          {d.context}
        </p>

        {/* Result block */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: `1px solid ${isActive ? accent.color + '20' : '#E8E8EE'}`,
            transition: 'border-color 0.35s ease',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              style={{
                width: '3px',
                height: '100%',
                minHeight: '32px',
                backgroundColor: accent.color,
                borderRadius: '2px',
                opacity: isActive ? 0.7 : 0.2,
                transition: 'opacity 0.35s ease',
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
                  color: accent.color,
                  marginBottom: '4px',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 0.35s ease',
                }}
              >
                Résultat
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#060608',
                  lineHeight: 1.45,
                }}
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
            color: accent.color,
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            opacity: isActive ? 1 : 0.45,
            transition: 'opacity 0.35s ease',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: isActive ? '20px' : '0px',
              height: '1px',
              backgroundColor: accent.color,
              transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), margin 0.4s ease',
              marginRight: isActive ? '6px' : '0px',
            }}
          />
          <span className="group-hover/link:underline">Dossier similaire ?</span>
          <ArrowRight size={12} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function DossiersSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: '#F5F5F7', padding: 'clamp(64px, 8vw, 112px) 0' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        {/* Header — editorial asymmetric */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <ScrollReveal><p className="eyebrow mb-4">Dossiers</p></ScrollReveal>
            <BlurReveal
              as="h2"
              className="font-heading"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.15,
                color: '#060608',
              }}
              baseOpacity={0.15}
              enableBlur
              blurStrength={5}
            >
              Des résultats concrets.
            </BlurReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <Link
              to="/dossiers"
              className="group inline-flex items-center gap-2 whitespace-nowrap font-body"
              style={{ color: '#002FA7', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
            >
              <span className="group-hover:underline">Voir tous les dossiers</span>
              <ArrowRight size={14} className="icon-bounce" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Separator */}
        <div style={{ height: '2px', backgroundColor: '#060608', marginBottom: 'clamp(36px, 5vw, 56px)' }} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {dossiersVedette.map((d, i) => (
            <DossierCard
              key={d.id}
              d={d}
              index={i}
              isActive={hoveredIdx === null || hoveredIdx === i}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 flex flex-col items-center gap-3">
          <ScrollReveal>
            <Link to="/dossiers" className="btn-outline transition-all hover:scale-[1.01]" style={{ padding: '14px 32px' }}>
              Voir tous mes dossiers
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <p className="font-body" style={{ fontSize: '13px', color: '#6B6C7A' }}>
              6 dossiers illustrés · anonymisés
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// === SECTION F — CTA FINAL (parallax) ===
function CTAFinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '20%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: '#002FA7' }}>
      {/* Parallax radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center flex flex-col items-center"
        style={{ paddingTop: 'clamp(64px, 8vw, 128px)', paddingBottom: 'clamp(64px, 8vw, 128px)' }}
      >
        <BlurReveal
          as="h2"
          className="font-heading"
          style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '20px' }}
          baseOpacity={0.2}
          enableBlur
          blurStrength={4}
        >
          Votre prochain dossier commence ici.
        </BlurReveal>
        <ScrollReveal delay={0.1}>
          <p
            className="font-body"
            style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', fontWeight: 300, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, maxWidth: '480px', marginBottom: '36px' }}
          >
            Prenez contact pour un premier échange confidentiel et sans engagement.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <Link to="/contact" className="btn-primary-light transition-all hover:scale-[1.01]" style={{ padding: '16px 40px' }}>
            Prendre RDV
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-5 font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
            Premier échange confidentiel · Sans engagement
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// === PAGE HOME ===
export default function Home() {
  return (
    <>
      <HeroSection />
      <AccrocheSection />
      <ExpertisesSection />
      <AboutSection />
      <DossiersSection />
      <CTAFinalSection />
    </>
  );
}
