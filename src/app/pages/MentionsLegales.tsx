import { motion } from 'motion/react';
import ScrollReveal from '../components/ScrollReveal';

const sections = [
  {
    title: 'Éditeur du site',
    content: [
      'Lefebvre Avocats — Avocat au Barreau de Paris',
      'Sophie Lefebvre, avocate inscrite au Barreau de Paris',
      'N° RPVA : [PLACEHOLDER]',
      'N° SIREN : [000 000 000]',
      'Adresse : [Adresse complète, Paris 8e]',
      'Email : contact@lefebvre-avocats.fr',
      'Assurance responsabilité civile professionnelle : [Nom assureur]',
    ],
  },
  {
    title: 'Hébergement',
    content: [
      'Ce site est hébergé par : [Nom hébergeur]',
      'Adresse hébergeur : [Adresse hébergeur]',
      'Site hébergeur : [URL hébergeur]',
    ],
  },
  {
    title: 'Règles professionnelles',
    content: [
      'Sophie Lefebvre est avocate inscrite au Barreau de Paris, régie par le Règlement Intérieur National (RIN) de la profession d\'avocat.',
      'Elle est soumise au secret professionnel absolu en vertu de l\'article 66-5 de la loi du 31 décembre 1971 et de l\'article 2.1 du Règlement Intérieur National.',
      'Toute communication entre un avocat et son client est couverte par le secret professionnel.',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    content: [
      'L\'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de Lefebvre Avocats.',
      'Toute reproduction, représentation, modification ou utilisation, en tout ou en partie, de ce contenu est interdite sans autorisation préalable.',
      'Les images utilisées sur ce site sont soit la propriété du cabinet, soit issues de banques d\'images libres de droits.',
    ],
  },
  {
    title: 'Protection des données personnelles (RGPD)',
    content: [
      'Lefebvre Avocats traite les données personnelles collectées via le formulaire de contact conformément au Règlement (UE) 2016/679 (RGPD).',
      'Responsable de traitement : Sophie Lefebvre, contact@lefebvre-avocats.fr',
      'Données collectées : nom, email, entreprise, message (finalité : répondre à votre demande).',
      'Durée de conservation : 3 ans à compter du dernier contact.',
      'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, d\'effacement et de portabilité de vos données.',
      'Pour exercer ces droits : contact@lefebvre-avocats.fr',
      'Droit de réclamation auprès de la CNIL : www.cnil.fr',
    ],
  },
  {
    title: 'Cookies',
    content: [
      'Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement.',
      'Aucun cookie publicitaire ou de traçage n\'est utilisé sans votre consentement préalable.',
      'Vous pouvez paramétrer votre navigateur pour refuser les cookies.',
    ],
  },
  {
    title: 'Limitation de responsabilité',
    content: [
      'Les informations publiées sur ce site ont un caractère général et ne constituent pas des conseils juridiques personnalisés.',
      'Lefebvre Avocats ne saurait être tenue responsable des conséquences découlant d\'une utilisation des informations publiées sur ce site sans consultation préalable.',
      'Le cabinet se réserve le droit de modifier les informations figurant sur ce site à tout moment et sans préavis.',
    ],
  },
  {
    title: 'Droit applicable',
    content: [
      'Ce site et les présentes mentions légales sont soumis au droit français.',
      'Tout litige relatif à l\'utilisation de ce site sera soumis à la compétence exclusive des tribunaux français.',
    ],
  },
];

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
            Informations légales
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
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
          {sections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className="pb-10 mb-10"
                style={{ borderBottom: i < sections.length - 1 ? '1px solid #E0E0E8' : 'none' }}
              >
                <h2
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
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
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '15px',
                        color: '#6B6C7A',
                        lineHeight: 1.65,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                color: '#6B6C7A',
                marginTop: '8px',
              }}
            >
              Dernière mise à jour : mars 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mobile sticky spacer */}
      <div className="lg:hidden" style={{ height: '64px' }} />
    </>
  );
}
