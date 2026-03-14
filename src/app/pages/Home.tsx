import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useInView } from '@/hooks/useInView';
import { useMobile } from '@/hooks/useMobile';
import {
  HERO_IMG, ABOUT_IMG, heroLines, metrics,
  expertiseAffaires, expertiseTravail, dossiersVedette,
} from '@/data/home';

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const steps = 60;
    const increment = value / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// === SECTION A — HERO ===
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden min-h-screen"
      style={{ backgroundColor: '#0A0D1A' }}
    >
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: isMobile ? 1 : 1.12 }}>
        <ImageWithFallback
          src={HERO_IMG}
          alt="Cabinet d'avocats"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(10,13,26,0.82) 0%, rgba(0,47,167,0.22) 100%)',
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 pt-24 pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[680px]">
          <motion.div
            className="flex items-center gap-3 mb-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-8 h-[2px] bg-[#002FA7] shrink-0" />
            <span className="eyebrow" style={{ letterSpacing: '0.14em' }}>
              Droit des Affaires · Droit du Travail · Paris
            </span>
          </motion.div>

          <h1 style={{ margin: 0, padding: 0 }}>
            {heroLines.map((line, i) => (
              <motion.span
                key={i}
                className="block font-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  fontSize: 'clamp(44px, 6.5vw, 80px)',
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.80)',
              lineHeight: 1.65,
              maxWidth: '500px',
              margin: '24px 0 0',
            }}
          >
            J'accompagne les dirigeants et leurs entreprises avec rigueur, clarté et engagement.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-10 mb-16 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto btn-primary transition-transform hover:scale-[1.01] active:scale-[0.97]"
              style={{ padding: '16px 36px' }}
            >
              Prendre RDV
            </Link>
            <Link
              to="/profil"
              className="group flex items-center gap-2 font-body"
              style={{ color: '#FFFFFF', fontSize: '15px', textDecoration: 'none' }}
            >
              <span className="group-hover:underline" style={{ textDecorationColor: '#002FA7' }}>
                Découvrir le cabinet
              </span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
        animate={{ opacity: [0.4, 0.8, 0.4], y: [0, 4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: contentOpacity }}
      >
        <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.5)' }} />
      </motion.div>
    </section>
  );
}

// === SECTION B — ACCROCHE & CHIFFRES ===
function AccrocheSection() {
  return (
    <section style={{ backgroundColor: '#F5F5F7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <ScrollReveal>
              <p className="eyebrow mb-4">Mon Approche</p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2
                className="font-heading mb-5"
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                  color: '#060608',
                }}
              >
                J'interviens là où les enjeux sont les plus élevés.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p
                className="font-body mb-6"
                style={{ fontSize: '17px', color: '#060608', lineHeight: 1.75 }}
              >
                Avocate libérale depuis plus de dix ans, j'ai construit ma pratique autour d'une
                conviction : les dirigeants méritent un accompagnement juridique à la hauteur de
                leurs ambitions. Chaque dossier est traité avec la même exigence, qu'il s'agisse
                d'une restructuration complexe ou d'un contrat stratégique.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.18}>
              <Link
                to="/profil"
                className="group inline-flex items-center gap-2 font-body"
                style={{ color: '#002FA7', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
              >
                <span className="group-hover:underline">En savoir plus</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-0">
            {metrics.map((metric, i) => (
              <ScrollReveal key={metric.label} delay={i * 0.1}>
                <div
                  className="py-7 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4"
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
          </div>
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
          <ScrollReveal delay={0.08}>
            <h2
              className="font-heading"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3, color: '#060608' }}
            >
              Une expertise double au service de votre activité.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Droit des affaires */}
          <ScrollReveal delay={0.1}>
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
              <span className="eyebrow">Droit des Affaires</span>
              <h3 className="mt-4 mb-4 font-body" style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, lineHeight: 1.3, color: '#060608' }}>
                Sécuriser et développer votre entreprise.
              </h3>
              <p className="mb-6 font-body" style={{ fontSize: '15px', color: '#6B6C7A', lineHeight: 1.65 }}>
                Accompagnement des dirigeants dans toutes leurs opérations juridiques stratégiques, de la création à la transmission.
              </p>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {expertiseAffaires.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#002FA7] rounded-full mt-[7px] shrink-0" />
                    <span className="font-body" style={{ fontSize: '15px', color: '#060608', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dossiers" className="group/link inline-flex items-center gap-2 mt-auto font-body" style={{ color: '#002FA7', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                <span className="group-hover/link:underline">Voir les dossiers</span>
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Droit du travail */}
          <ScrollReveal delay={0.18}>
            <div
              className="card-hover-blue h-full flex flex-col transition-all duration-200"
              style={{ backgroundColor: '#002FA7', borderRadius: '4px', padding: 'clamp(28px, 4vw, 40px)' }}
            >
              <span className="font-body" style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Droit du Travail
              </span>
              <h3 className="mt-4 mb-4 font-body" style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, lineHeight: 1.3, color: '#FFFFFF' }}>
                Protéger vos équipes, maîtriser vos risques.
              </h3>
              <p className="mb-6 font-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>
                Accompagnement des employeurs et dirigeants dans la gestion de leurs relations collectives et individuelles de travail.
              </p>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {expertiseTravail.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-white/70 rounded-full mt-[7px] shrink-0" />
                    <span className="font-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dossiers" className="group/link inline-flex items-center gap-2 mt-auto font-body" style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                <span className="group-hover/link:underline">Voir les dossiers</span>
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// === SECTION D — PRÉSENTATION AVOCATE ===
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
            <ImageWithFallback src={ABOUT_IMG} alt="Sophie Lefebvre, avocate" className="w-full h-full object-cover" style={{ objectPosition: 'top center' }} />
          </motion.div>
          <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, transparent 70%, #0A0D1A)' }} />
          <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to bottom, transparent 70%, #0A0D1A)' }} />
        </div>

        <div className="flex flex-col justify-center" style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px)' }}>
          <ScrollReveal><p className="eyebrow mb-4" style={{ letterSpacing: '0.14em' }}>L'Avocate</p></ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="font-heading" style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, color: '#FFFFFF', marginBottom: '8px' }}>
              Sophie Lefebvre
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="font-body" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.70)', marginBottom: '24px' }}>
              Avocate au Barreau de Paris
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="font-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: '20px' }}>
              Je défends les intérêts des dirigeants et de leurs entreprises depuis plus de douze ans, avec une double compétence en droit des affaires et en droit du travail.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: '28px' }}>
              Mon approche est directe, exigeante et profondément humaine. Je m'engage personnellement sur chaque dossier, en apportant une analyse claire et une stratégie sur-mesure.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Barreau de Paris', 'Master II Droit des Affaires', "12 ans d'expérience"].map((badge) => (
                <span
                  key={badge}
                  className="font-body"
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
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
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
            <ScrollReveal delay={0.06}>
              <h2 className="font-heading" style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3, color: '#060608' }}>
                Des résultats concrets pour des enjeux complexes.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <Link to="/dossiers" className="group inline-flex items-center gap-2 whitespace-nowrap font-body" style={{ color: '#002FA7', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              <span className="group-hover:underline">Voir tous les dossiers</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dossiersVedette.map((d, i) => (
            <ScrollReveal key={d.id} delay={i * 0.1}>
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
            </ScrollReveal>
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

// === SECTION F — CTA FINAL ===
function CTAFinalSection() {
  return (
    <section style={{ backgroundColor: '#002FA7', padding: 'clamp(64px, 8vw, 128px) 0' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center flex flex-col items-center">
        <ScrollReveal>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '20px' }}>
            Votre prochain dossier commence ici.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="font-body" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', fontWeight: 300, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, maxWidth: '480px', marginBottom: '36px' }}>
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
      <div className="lg:hidden h-16" />
    </>
  );
}
