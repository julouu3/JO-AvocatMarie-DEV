import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Linkedin, Mail, MapPin, Scale, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const CABINET_NAME = 'Lefebvre Avocats';

// ── Lien de navigation footer avec animation hover ──────────────────────────
function FooterNavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
      animate={{ x: hovered ? 5 : 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tiret indicateur */}
      <motion.span
        style={{
          display: 'block',
          width: '14px',
          height: '1.5px',
          backgroundColor: '#002FA7',
          flexShrink: 0,
        }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style2={{ transformOrigin: 'left' }}
      />
      <Link
        to={href}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 400,
          color: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.78)',
          textDecoration: 'none',
          transition: 'color 200ms ease',
          lineHeight: 1.5,
        }}
      >
        {label}
      </Link>
    </motion.div>
  );
}

// ── Lien externe footer ──────────────────────────────────────────────────────
function FooterExternalLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
      style={{
        color: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
        textDecoration: 'none',
        transition: 'color 200ms ease',
      }}
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={18} style={{ color: hovered ? '#5B8AF5' : '#002FA7', transition: 'color 200ms ease' }} />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
        transition={{ duration: 0.18 }}
      >
        <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
      </motion.span>
    </motion.a>
  );
}

// ── Lien légal du bas ────────────────────────────────────────────────────────
function FooterLegalLink({ to, label }: { to: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        color: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)',
        textDecoration: 'none',
        transition: 'color 200ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

// ── Composant principal ──────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0D1A', position: 'relative' }}>
      {/* Top accent — ligne bleue */}
      <div style={{ height: '2px', backgroundColor: '#002FA7', width: '100%' }} />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-16">

          {/* ── Col 1 : Logo + tagline ─────────────────────────────────── */}
          <ScrollReveal delay={0} y={16}>
            <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#002FA7',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      color: '#fff',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '18px',
                      fontWeight: 700,
                    }}
                  >
                    L
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '21px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {CABINET_NAME}
                </span>
              </div>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.75,
                  maxWidth: '260px',
                }}
              >
                Droit des affaires & droit du travail.
                <br />
                Expertise au service des dirigeants.
              </p>

              {/* LinkedIn */}
              <FooterExternalLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />

              {/* Copyright */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.42)',
                  marginTop: '8px',
                }}
              >
                © {new Date().getFullYear()} {CABINET_NAME}
              </p>
            </div>
          </ScrollReveal>

          {/* ── Col 2 : Navigation ────────────────────────────────────── */}
          <ScrollReveal delay={0.08} y={16}>
            <div className="flex flex-col gap-4">
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#5B8AF5',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: '4px',
                }}
              >
                Navigation
              </h4>
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Profil', href: '/profil' },
                { label: 'Mes Dossiers', href: '/dossiers' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <FooterNavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          </ScrollReveal>

          {/* ── Col 3 : Contact ───────────────────────────────────────── */}
          <ScrollReveal delay={0.14} y={16}>
            <div className="flex flex-col gap-4">
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#5B8AF5',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: '4px',
                }}
              >
                Contact
              </h4>

              {/* Barreau */}
              <div className="flex items-center gap-3">
                <Scale size={15} style={{ color: '#002FA7', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.78)',
                    lineHeight: 1.5,
                  }}
                >
                  Barreau de Paris
                </span>
              </div>

              {/* Localisation */}
              <div className="flex items-center gap-3">
                <MapPin size={15} style={{ color: '#002FA7', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.78)',
                    lineHeight: 1.5,
                  }}
                >
                  Paris, Île-de-France
                </span>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={15} style={{ color: '#002FA7', flexShrink: 0, marginTop: '2px' }} />
                <FooterExternalLink
                  href="mailto:contact@lefebvre-avocats.fr"
                  icon={() => null}
                  label="contact@lefebvre-avocats.fr"
                />
              </div>

              {/* CTA contact */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mt-2">
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,47,167,0.25)',
                    border: '1px solid rgba(0,47,167,0.55)',
                    color: '#FFFFFF',
                    borderRadius: '2px',
                    padding: '10px 22px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    textDecoration: 'none',
                    transition: 'background-color 220ms ease, border-color 220ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = 'rgba(0,47,167,0.55)';
                    el.style.borderColor = 'rgba(0,47,167,0.9)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = 'rgba(0,47,167,0.25)';
                    el.style.borderColor = 'rgba(0,47,167,0.55)';
                  }}
                >
                  Prendre RDV
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bande basse ──────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-3 mt-14 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Cabinet inscrit au Barreau de Paris · N° SIREN : [000 000 000]
          </p>
          <div className="flex gap-6">
            <FooterLegalLink to="/mentions-legales" label="Mentions légales" />
            <FooterLegalLink to="/mentions-legales" label="Politique de confidentialité" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
