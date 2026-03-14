import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import ScrollReveal from '../components/ScrollReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useMobile } from '@/hooks/useMobile';
import {
  PROFIL_IMG,
  timelineItems,
  certifications,
  valeurs,
  approachParagraphs,
  skillPills,
} from '@/data/profil';

export default function Profil() {
  const isMobile = useMobile();

  // Parallax hero image
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '20%']);
  const heroImgScale = isMobile ? 1 : 1.1;
  const heroContentY = useTransform(heroProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '12%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  // Parallax timeline section
  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress: tlProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });
  const tlLineScale = useTransform(tlProgress, [0, 0.5], [0, 1]);

  // Parallax valeurs section
  const valeursRef = useRef<HTMLElement>(null);
  const { scrollYProgress: valProgress } = useScroll({
    target: valeursRef,
    offset: ['start end', 'end start'],
  });
  const valY = useTransform(valProgress, [0, 1], isMobile ? [0, 0] : [60, -60]);

  // Parallax CTA
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });
  const ctaBgY = useTransform(ctaProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '15%']);

  return (
    <>
      {/* === A — HERO PROFIL (parallax) === */}
      <section ref={heroRef} style={{ backgroundColor: '#0A0D1A', minHeight: '520px', overflow: 'hidden' }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Photo avec parallax */}
          <div className="relative overflow-hidden" style={{ minHeight: 'clamp(320px, 45vw, 560px)' }}>
            <motion.div
              className="absolute inset-0"
              style={{ y: heroImgY, scale: heroImgScale }}
            >
              <ImageWithFallback
                src={PROFIL_IMG}
                alt="Sophie Lefebvre, avocate"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'top center', minHeight: 'clamp(320px, 45vw, 560px)' }}
              />
            </motion.div>
            <div
              className="absolute inset-0 hidden lg:block"
              style={{ background: 'linear-gradient(to right, transparent 65%, #0A0D1A)' }}
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{ background: 'linear-gradient(to bottom, transparent 70%, #0A0D1A)' }}
            />
          </div>

          {/* Texte avec parallax */}
          <motion.div
            className="flex flex-col justify-center"
            style={{
              padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px)',
              y: heroContentY,
              opacity: heroOpacity,
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow"
              style={{ letterSpacing: '0.14em', marginBottom: '16px' }}
            >
              L'Avocate
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              Sophie Lefebvre
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-body"
              style={{ fontSize: '18px', color: 'rgba(255,255,255,0.70)', marginBottom: '24px' }}
            >
              Avocate au Barreau de Paris
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {skillPills.map((pill) => (
                <span
                  key={pill}
                  className="font-body"
                  style={{
                    backgroundColor: 'rgba(0,47,167,0.40)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(0,47,167,0.60)',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '5px 12px',
                    borderRadius: '3px',
                  }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === B — PHILOSOPHIE & APPROCHE === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[760px] mx-auto px-5 md:px-10">
          <ScrollReveal>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Mon Approche</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(26px, 3.5vw, 40px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.3,
                color: '#060608',
                marginBottom: '32px',
              }}
            >
              Le droit comme un outil stratégique, pas une contrainte.
            </h2>
          </ScrollReveal>
          {approachParagraphs.map((para, i) => (
            <ScrollReveal key={i} delay={0.08 + i * 0.06}>
              <p
                className="font-body mb-6"
                style={{ fontSize: '17px', fontWeight: 400, color: '#060608', lineHeight: 1.75 }}
              >
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* === C — PARCOURS TIMELINE (parallax animated line) === */}
      <section ref={timelineRef} style={{ backgroundColor: '#F5F5F7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <div className="text-center mb-14">
            <ScrollReveal>
              <p className="eyebrow" style={{ marginBottom: '12px' }}>Parcours</p>
            </ScrollReveal>
            <ScrollReveal delay={0.07}>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 40px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                  color: '#060608',
                }}
              >
                Un parcours construit sur l'exigence.
              </h2>
            </ScrollReveal>
          </div>

          <div className="relative max-w-[720px] mx-auto">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-[18px] md:left-[80px] top-0 bottom-0 w-[2px]"
              style={{
                backgroundColor: '#002FA7',
                opacity: 0.3,
                scaleY: tlLineScale,
                transformOrigin: 'top center',
              }}
            />
            <div className="flex flex-col gap-10">
              {timelineItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-10 items-start pl-12 md:pl-0">
                    <div className="hidden md:block flex-shrink-0 text-right" style={{ width: '64px' }}>
                      <span className="font-body" style={{ fontSize: '13px', fontWeight: 700, color: '#002FA7', lineHeight: 1, paddingTop: '2px', display: 'block' }}>
                        {item.year}
                      </span>
                    </div>
                    <div className="relative flex-shrink-0" style={{ marginTop: '4px' }}>
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          backgroundColor: '#002FA7',
                          borderRadius: '50%',
                          position: 'absolute',
                          left: '-7px',
                          top: '0',
                        }}
                      />
                    </div>
                    <div className="pl-2 md:pl-0">
                      <span className="font-body md:hidden block mb-1" style={{ fontSize: '12px', fontWeight: 700, color: '#002FA7' }}>
                        {item.year}
                      </span>
                      <p className="font-body" style={{ fontSize: '16px', fontWeight: 600, color: '#060608', lineHeight: 1.4 }}>
                        {item.title}
                      </p>
                      <p className="font-body" style={{ fontSize: '14px', color: '#6B6C7A', marginTop: '3px' }}>
                        {item.institution}
                      </p>
                      {item.description && (
                        <p className="font-body" style={{ fontSize: '13px', color: '#6B6C7A', marginTop: '2px' }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === D — FORMATIONS & CERTIFICATIONS === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <ScrollReveal>
            <h3
              className="font-body mb-8"
              style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, color: '#060608', lineHeight: 1.3 }}
            >
              Formations & Certifications
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div
                  className="cert-card flex items-center gap-3"
                  style={{
                    backgroundColor: '#F0F0F5',
                    border: '1px solid #E0E0E8',
                    borderRadius: '4px',
                    padding: '14px 18px',
                  }}
                >
                  <cert.icon size={16} style={{ color: '#002FA7', flexShrink: 0 }} />
                  <span className="font-body" style={{ fontSize: '13px', fontWeight: 500, color: '#060608' }}>
                    {cert.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* === E — VALEURS (parallax) === */}
      <section ref={valeursRef} style={{ backgroundColor: '#F5F5F7', padding: 'clamp(56px, 7vw, 96px) 0', overflow: 'hidden' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <ScrollReveal>
            <h3
              className="font-body text-center mb-12"
              style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, color: '#060608', lineHeight: 1.3 }}
            >
              Ce qui guide mon travail
            </h3>
          </ScrollReveal>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ y: valY }}>
            {valeurs.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '52px',
                      height: '52px',
                      border: '2px solid #002FA7',
                      borderRadius: '4px',
                      fontSize: '22px',
                      color: '#002FA7',
                    }}
                  >
                    {v.icon}
                  </div>
                  <h4
                    className="font-body"
                    style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, color: '#060608', lineHeight: 1.3 }}
                  >
                    {v.title}
                  </h4>
                  <p className="font-body" style={{ fontSize: '15px', color: '#6B6C7A', lineHeight: 1.6 }}>
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === F — CTA FINAL (parallax background) === */}
      <section ref={ctaRef} className="relative overflow-hidden" style={{ backgroundColor: '#002FA7' }}>
        <motion.div
          className="absolute inset-0"
          style={{
            y: ctaBgY,
            background: 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
          }}
        />
        <div
          className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center flex flex-col items-center"
          style={{ padding: 'clamp(64px, 8vw, 128px) 0' }}
        >
          <ScrollReveal>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Parlons de votre dossier.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
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
              Premier échange confidentiel et sans engagement.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="btn-primary-light w-full sm:w-auto"
                style={{ padding: '14px 32px' }}
              >
                Prendre RDV
              </Link>
              <Link
                to="/dossiers"
                className="btn-outline-white w-full sm:w-auto"
                style={{ padding: '14px 32px' }}
              >
                Voir mes dossiers
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="lg:hidden" style={{ height: '64px' }} />
    </>
  );
}
