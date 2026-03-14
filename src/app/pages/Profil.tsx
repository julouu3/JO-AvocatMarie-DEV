import { Link } from 'react-router';
import { ArrowRight, GraduationCap, Award, Globe, Scale } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from '../components/ScrollReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const PROFIL_IMG =
  'https://images.unsplash.com/photo-1758600587730-a11917c13b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3dvbWFuJTIwcHJvZmVzc2lvbmFsJTIwY29uZmlkZW50JTIwcG9ydHJhaXQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzM0OTAwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080';

const timelineItems = [
  {
    year: '2007',
    title: 'Master I — Droit privé',
    institution: 'Université Paris I Panthéon-Sorbonne',
  },
  {
    year: '2009',
    title: 'Master II — Droit des affaires et fiscalité',
    institution: 'Université Paris II Panthéon-Assas',
  },
  {
    year: '2011',
    title: 'Serment d\'avocat',
    institution: 'Barreau de Paris — École de Formation du Barreau (EFB)',
  },
  {
    year: '2011–2018',
    title: 'Collaboratrice senior',
    institution: 'Cabinet Gide Loyrette Nouel, Paris',
    description: 'Spécialisée droit social et restructurations',
  },
  {
    year: '2019',
    title: 'Création de Lefebvre Avocats',
    institution: 'Cabinet libéral, Paris',
    description: 'Droit des affaires & droit du travail',
  },
];

const certifications = [
  { icon: GraduationCap, label: 'Université Paris I Panthéon-Sorbonne' },
  { icon: GraduationCap, label: 'Université Paris II Panthéon-Assas' },
  { icon: Award, label: 'CAPA — École de Formation du Barreau' },
  { icon: Scale, label: 'Barreau de Paris — Avocat inscrit' },
  { icon: Award, label: 'Médiation — Institut de Médiation' },
  { icon: Globe, label: 'Français · Anglais professionnel' },
];

const valeurs = [
  {
    icon: '⚖',
    title: 'Rigueur',
    desc: 'Chaque détail compte. J\'analyse chaque dossier avec une précision d\'orfèvre pour ne laisser aucun risque non anticipé.',
  },
  {
    icon: '◈',
    title: 'Clarté',
    desc: 'Le droit peut être complexe, ma communication ne l\'est pas. Je m\'engage à vous expliquer chaque étape clairement.',
  },
  {
    icon: '◎',
    title: 'Engagement',
    desc: 'Je m\'implique personnellement sur chaque dossier, de la première consultation jusqu\'au résultat obtenu.',
  },
];

export default function Profil() {
  return (
    <>
      {/* === A — HERO PROFIL === */}
      <section style={{ backgroundColor: '#0A0D1A', minHeight: '520px' }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Photo */}
          <div className="relative overflow-hidden" style={{ minHeight: 'clamp(320px, 45vw, 560px)' }}>
            <ImageWithFallback
              src={PROFIL_IMG}
              alt="Sophie Lefebvre, avocate"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'top center', minHeight: 'clamp(320px, 45vw, 560px)' }}
            />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{ background: 'linear-gradient(to right, transparent 65%, #0A0D1A)' }}
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{ background: 'linear-gradient(to bottom, transparent 70%, #0A0D1A)' }}
            />
          </div>

          {/* Texte */}
          <div
            className="flex flex-col justify-center"
            style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px)' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                color: '#002FA7',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '16px',
              }}
            >
              L'Avocate
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
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
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '18px',
                color: 'rgba(255,255,255,0.70)',
                marginBottom: '24px',
              }}
            >
              Avocate au Barreau de Paris
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {['Droit des affaires', 'Droit du travail', 'Contentieux'].map((pill) => (
                <span
                  key={pill}
                  style={{
                    backgroundColor: 'rgba(0,47,167,0.40)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(0,47,167,0.60)',
                    fontFamily: "'DM Sans', sans-serif",
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
          </div>
        </div>
      </section>

      {/* === B — PHILOSOPHIE & APPROCHE === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[760px] mx-auto px-5 md:px-10">
          <ScrollReveal>
            <p
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
              Mon Approche
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
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
          {[
            `Depuis le début de ma carrière, j'ai fait le choix de travailler en cabinet libéral, au plus proche de mes clients. Cette proximité n'est pas un hasard : elle correspond à ma vision de l'exercice juridique. Un avocat doit comprendre l'entreprise de son client, ses enjeux, sa culture, avant de lui proposer une stratégie.`,
            `En droit des affaires, j'accompagne les dirigeants dans leurs opérations les plus stratégiques : acquisitions, cessions, restructurations, contentieux commerciaux. Chaque opération est unique, chaque solution doit l'être aussi.`,
            `En droit du travail, mon approche est préventive autant que défensive. Je travaille en amont pour identifier les risques, construire des process robustes, et former les équipes dirigeantes. Quand le contentieux est inévitable, je m'engage avec détermination.`,
            `Ce qui me distingue, c'est mon engagement personnel. Je connais mes clients, leurs équipes, leurs contraintes. Cette connaissance intime est ce qui me permet de défendre leurs intérêts avec la précision et la force qui font la différence.`,
          ].map((para, i) => (
            <ScrollReveal key={i} delay={0.08 + i * 0.06}>
              <p
                className="mb-6"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#060608',
                  lineHeight: 1.75,
                }}
              >
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* === C — PARCOURS TIMELINE === */}
      <section style={{ backgroundColor: '#F5F5F7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <div className="text-center mb-14">
            <ScrollReveal>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#002FA7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                }}
              >
                Parcours
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.07}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
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

          {/* Timeline */}
          <div className="relative max-w-[720px] mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-[18px] md:left-[80px] top-0 bottom-0 w-[2px]"
              style={{ backgroundColor: '#002FA7', opacity: 0.2 }}
            />

            <div className="flex flex-col gap-10">
              {timelineItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-10 items-start pl-12 md:pl-0">
                    {/* Year */}
                    <div
                      className="hidden md:block flex-shrink-0 text-right"
                      style={{ width: '64px' }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#002FA7',
                          lineHeight: 1,
                          paddingTop: '2px',
                          display: 'block',
                        }}
                      >
                        {item.year}
                      </span>
                    </div>

                    {/* Dot */}
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

                    {/* Content */}
                    <div className="pl-2 md:pl-0">
                      <span
                        className="md:hidden block mb-1"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#002FA7',
                        }}
                      >
                        {item.year}
                      </span>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#060608',
                          lineHeight: 1.4,
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '14px',
                          color: '#6B6C7A',
                          marginTop: '3px',
                        }}
                      >
                        {item.institution}
                      </p>
                      {item.description && (
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '13px',
                            color: '#6B6C7A',
                            marginTop: '2px',
                          }}
                        >
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
              className="mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 600,
                color: '#060608',
                lineHeight: 1.3,
              }}
            >
              Formations & Certifications
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div
                  className="flex items-center gap-3 transition-all duration-200"
                  style={{
                    backgroundColor: '#F0F0F5',
                    border: '1px solid #E0E0E8',
                    borderRadius: '4px',
                    padding: '14px 18px',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#002FA7'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#E0E0E8'; }}
                >
                  <cert.icon size={16} style={{ color: '#002FA7', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#060608',
                    }}
                  >
                    {cert.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* === E — VALEURS === */}
      <section style={{ backgroundColor: '#F5F5F7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <ScrollReveal>
            <h3
              className="text-center mb-12"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 600,
                color: '#060608',
                lineHeight: 1.3,
              }}
            >
              Ce qui guide mon travail
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valeurs.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      border: '2px solid #002FA7',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      color: '#002FA7',
                    }}
                  >
                    {v.icon}
                  </div>
                  <h4
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      fontWeight: 600,
                      color: '#060608',
                      lineHeight: 1.3,
                    }}
                  >
                    {v.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15px',
                      color: '#6B6C7A',
                      lineHeight: 1.6,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* === F — CTA FINAL === */}
      <section style={{ backgroundColor: '#002FA7', padding: 'clamp(64px, 8vw, 128px) 0' }}>
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
              Parlons de votre dossier.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
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
              Premier échange confidentiel et sans engagement.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center transition-all hover:scale-[1.01] w-full sm:w-auto"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#002FA7',
                  borderRadius: '2px',
                  padding: '14px 32px',
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
              </Link>
              <Link
                to="/dossiers"
                className="inline-flex items-center justify-center transition-all hover:bg-white/10 w-full sm:w-auto"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255,255,255,0.40)',
                  borderRadius: '2px',
                  padding: '14px 32px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  transition: 'background-color 200ms ease, border-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = 'rgba(255,255,255,0.10)';
                  el.style.borderColor = 'rgba(255,255,255,0.70)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = 'transparent';
                  el.style.borderColor = 'rgba(255,255,255,0.40)';
                }}
              >
                Voir mes dossiers
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mobile sticky spacer */}
      <div className="lg:hidden" style={{ height: '64px' }} />
    </>
  );
}
