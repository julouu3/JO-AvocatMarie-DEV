import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ScrollReveal from '../components/ScrollReveal';
import { legalSections } from '@/data/mentions-legales';
import { useMobile } from '@/hooks/useMobile';

export default function MentionsLegales() {
  const isMobile = useMobile();

  // Parallax hero
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', isMobile ? '0%' : '15%']);
  const heroContentY = useTransform(heroProgress, [0, 1], ['0%', isMobile ? '0%' : '10%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* Hero (parallax) */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0A0D1A' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroBgY,
            background: 'radial-gradient(ellipse at 40% 50%, rgba(0,47,167,0.10) 0%, transparent 60%)',
          }}
        />
        <motion.div
          className="relative z-10"
          style={{
            y: heroContentY,
            opacity: heroOpacity,
            padding: 'clamp(100px, 12vw, 128px) 0 clamp(48px, 6vw, 72px)',
          }}
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow"
              style={{ marginBottom: '12px' }}
            >
              Informations légales
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#FFFFFF',
              }}
            >
              Mentions légales
            </motion.h1>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(48px, 6vw, 80px) 0 clamp(64px, 8vw, 96px)' }}>
        <div className="max-w-[800px] mx-auto px-5 md:px-10">
          {legalSections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className="pb-10 mb-10"
                style={{ borderBottom: i < legalSections.length - 1 ? '1px solid #E0E0E8' : 'none' }}
              >
                <h2
                  className="font-body"
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
                    fontWeight: 600,
                    color: '#060608',
                    lineHeight: 1.3,
                    marginBottom: '14px',
                  }}
                >
                  {section.title}
                </h2>
                <div className="flex flex-col gap-2">
                  {section.content.map((line, j) => (
                    <p
                      key={j}
                      className="font-body"
                      style={{ fontSize: '15px', color: '#6B6C7A', lineHeight: 1.65 }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <p className="font-body" style={{ fontSize: '13px', color: '#6B6C7A', marginTop: '8px' }}>
              Dernière mise à jour : mars 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="lg:hidden" style={{ height: '64px' }} />
    </>
  );
}
