import { motion } from 'motion/react';
import ScrollReveal from '../components/ScrollReveal';
import { legalSections } from '@/data/mentions-legales';

export default function MentionsLegales() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#0A0D1A', padding: 'clamp(100px, 12vw, 128px) 0 clamp(48px, 6vw, 72px)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="eyebrow"
            style={{ marginBottom: '12px' }}
          >
            Informations légales
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
