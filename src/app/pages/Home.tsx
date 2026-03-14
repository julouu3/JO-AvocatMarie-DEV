import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, animate } from 'motion/react';
import { ArrowRight, Scale, Shield, Briefcase, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import BlurReveal from '../components/BlurReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useInView } from '@/hooks/useInView';
import { useMobile } from '@/hooks/useMobile';
import {
  ABOUT_IMG, metrics,
  expertiseCompliance, expertiseCorporate, dossiersVedette,
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
                Avocate au Barreau de Paris · Compliance · Corporate
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
              Compliance, corporate et pénal des affaires.
              J'accompagne les entreprises et dirigeants avec rigueur, clarté et engagement personnel.
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
                Consultation gratuite
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
                      {['Compliance', 'Corporate', 'Pénal'].map((tag) => (
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
                accompagnement juridique à la hauteur de ses enjeux. Compliance, corporate,
                pénal des affaires — chaque dossier est traité avec la même exigence.
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

// === SECTION C — EXPERTISES ===
function ExpertisesSection() {
  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(56px, 7vw, 96px) 0' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="text-center mb-14">
          <ScrollReveal>
            <p className="eyebrow mb-3">Mes Domaines</p>
          </ScrollReveal>
          <BlurReveal
            as="h2"
            className="font-heading"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3, color: '#060608' }}
            baseOpacity={0.15}
            enableBlur
            blurStrength={5}
          >
            Une expertise transversale au service de votre activité.
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Compliance & Conformité */}
          <ScrollReveal delay={0.15} y={50} blur>
            <div
              className="card-hover h-full flex flex-col"
              style={{
                backgroundColor: '#F5F5F7',
                border: '1px solid #E0E0E8',
                borderRadius: '4px',
                padding: 'clamp(28px, 4vw, 40px)',
                boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
              }}
            >
              <span className="eyebrow">Compliance & Conformité</span>
              <h3 className="mt-4 mb-4 font-body" style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, lineHeight: 1.3, color: '#060608' }}>
                Anticiper les risques, sécuriser vos pratiques.
              </h3>
              <p className="mb-6 font-body" style={{ fontSize: '15px', color: '#6B6C7A', lineHeight: 1.65 }}>
                Accompagnement des entreprises dans la mise en conformité réglementaire, la prévention des risques et la gestion des enquêtes internes.
              </p>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {expertiseCompliance.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#002FA7] rounded-full mt-[7px] shrink-0" />
                    <span className="font-body" style={{ fontSize: '15px', color: '#060608', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dossiers" className="group/link inline-flex items-center gap-2 mt-auto font-body" style={{ color: '#002FA7', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                <span className="group-hover/link:underline">Voir les dossiers</span>
                <ArrowRight size={14} className="icon-bounce" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Corporate & Pénal des affaires */}
          <ScrollReveal delay={0.45} y={50} blur>
            <div
              className="card-hover-blue h-full flex flex-col transition-all duration-200"
              style={{ backgroundColor: '#002FA7', borderRadius: '4px', padding: 'clamp(28px, 4vw, 40px)' }}
            >
              <span className="font-body" style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Corporate & Pénal des Affaires
              </span>
              <h3 className="mt-4 mb-4 font-body" style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, lineHeight: 1.3, color: '#FFFFFF' }}>
                Structurer votre activité, défendre vos intérêts.
              </h3>
              <p className="mb-6 font-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>
                Conseil en droit des sociétés, opérations de M&A, et défense en droit pénal des affaires pour sociétés et dirigeants.
              </p>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {expertiseCorporate.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-white/70 rounded-full mt-[7px] shrink-0" />
                    <span className="font-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dossiers" className="group/link inline-flex items-center gap-2 mt-auto font-body" style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                <span className="group-hover/link:underline">Voir les dossiers</span>
                <ArrowRight size={14} className="icon-bounce" />
              </Link>
            </div>
          </ScrollReveal>
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
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="relative overflow-hidden" style={{ minHeight: 'clamp(350px, 50vw, 600px)' }}>
          <motion.div className="absolute inset-0" style={{ y: imgY, scale: isMobile ? 1 : 1.15 }}>
            <ImageWithFallback src={ABOUT_IMG} alt="Marie Odin, avocate" className="w-full h-full object-cover" style={{ objectPosition: 'top center' }} />
          </motion.div>
          <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, transparent 70%, #0A0D1A)' }} />
          <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to bottom, transparent 70%, #0A0D1A)' }} />
        </div>

        <div className="flex flex-col justify-center" style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px)' }}>
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
              Formée entre Paris et le Royaume-Uni, passée par le cabinet Bredin Prat, j'accompagne entreprises, fonds d'investissement et dirigeants en compliance, corporate et pénal des affaires.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: '28px' }}>
              Mon approche est directe, exigeante et profondément humaine. Je m'engage personnellement sur chaque dossier, en apportant une analyse claire et une stratégie sur-mesure.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Barreau de Paris', 'M2 Droit des Affaires — Paris I', 'Bredin Prat Alumni'].map((badge) => (
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
function DossiersSection() {
  return (
    <section style={{ backgroundColor: '#F5F5F7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <ScrollReveal><p className="eyebrow mb-3">Mes Dossiers</p></ScrollReveal>
            <BlurReveal
              as="h2"
              className="font-heading"
              style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3, color: '#060608' }}
              baseOpacity={0.15}
              enableBlur
              blurStrength={5}
            >
              Des résultats concrets pour des enjeux complexes.
            </BlurReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <Link to="/dossiers" className="group inline-flex items-center gap-2 whitespace-nowrap font-body" style={{ color: '#002FA7', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              <span className="group-hover:underline">Voir tous les dossiers</span>
              <ArrowRight size={14} className="icon-bounce" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dossiersVedette.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 60, scale: 0.95, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.25,
                ease: [0.22, 1, 0.36, 1],
                filter: { duration: 0.5, delay: i * 0.25 },
              }}
            >
              <div
                className="flex flex-col card-hover h-full"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E8', borderRadius: '4px', padding: '28px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}
              >
                <span className="font-body inline-block" style={{ backgroundColor: '#E8EDFF', color: '#002FA7', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 9px', borderRadius: '3px' }}>
                  {d.tag}
                </span>
                <h3 className="mt-3 mb-2 font-body" style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.4, color: '#060608' }}>{d.title}</h3>
                <p className="flex-1 font-body" style={{ fontSize: '14px', color: '#6B6C7A', lineHeight: 1.6 }}>{d.context}</p>
                <div style={{ borderTop: '1px solid #E0E0E8', margin: '16px 0' }} />
                <p className="eyebrow mb-1" style={{ fontSize: '10px', letterSpacing: '0.10em' }}>Résultat</p>
                <p className="font-body mb-4" style={{ fontSize: '14px', fontWeight: 600, color: '#060608', lineHeight: 1.5 }}>{d.result}</p>
                <Link to="/contact" className="group/link inline-flex items-center gap-1 mt-auto font-body" style={{ color: '#002FA7', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                  <span className="group-hover/link:underline">→ Dossier similaire ?</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col items-center gap-3">
          <ScrollReveal>
            <Link to="/dossiers" className="btn-outline transition-all hover:scale-[1.01]" style={{ padding: '14px 32px' }}>
              Voir tous mes dossiers
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <p className="font-body" style={{ fontSize: '13px', color: '#6B6C7A' }}>6 dossiers illustrés · anonymisés</p>
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
