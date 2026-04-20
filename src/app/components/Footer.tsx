import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Linkedin, Mail, MapPin, Scale, Phone, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { CABINET_NAME, navLinks } from '@/data/navigation';
import { CONTACT_INFO } from '@/data/contact-info';

// ── Lien de navigation footer avec animation hover ──────────────────────────
function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-1.5 cursor-pointer group"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <motion.span
        className="block flex-shrink-0"
        style={{
          width: '14px',
          height: '1.5px',
          backgroundColor: '#002FA7',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <Link
        to={href}
        className="font-body group-hover:text-white"
        style={{
          fontSize: '15px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.78)',
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
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 group"
      style={{
        color: 'rgba(255,255,255,0.72)',
        textDecoration: 'none',
        transition: 'color 200ms ease',
      }}
      whileHover={{ x: 3, color: '#FFFFFF' }}
      transition={{ duration: 0.2 }}
    >
      <Icon size={18} className="transition-colors duration-200 text-[#002FA7] group-hover:text-[#5B8AF5]" />
      <span className="font-body" style={{ fontSize: '14px', fontWeight: 500 }}>
        {label}
      </span>
      <span className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200">
        <ArrowUpRight size={13} />
      </span>
    </motion.a>
  );
}

// ── Lien légal du bas ────────────────────────────────────────────────────────
function FooterLegalLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="font-body hover:text-white/75"
      style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.5)',
        textDecoration: 'none',
        transition: 'color 200ms ease',
      }}
    >
      {label}
    </Link>
  );
}

// ── Composant principal ──────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0D1A', position: 'relative' }} className="pb-16 lg:pb-0">
      <div style={{ height: '2px', backgroundColor: '#002FA7', width: '100%' }} />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-16">

          {/* ── Col 1 : Logo + tagline ─────────────────────────────────── */}
          <ScrollReveal delay={0} y={16}>
            <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#002FA7',
                    borderRadius: '2px',
                  }}
                >
                  <span className="font-heading" style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>
                    M
                  </span>
                </div>
                <span className="font-heading" style={{ fontSize: '21px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                  {CABINET_NAME}
                </span>
              </div>

              <p className="font-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: '280px' }}>
                {CONTACT_INFO.tagline}
                <br />
                Conseil et représentation des sociétés et dirigeants.
              </p>

              <FooterExternalLink href={CONTACT_INFO.linkedin} icon={Linkedin} label="LinkedIn" />

              <p className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', marginTop: '8px' }}>
                © {new Date().getFullYear()} {CABINET_NAME}
              </p>
            </div>
          </ScrollReveal>

          {/* ── Col 2 : Navigation ────────────────────────────────────── */}
          <ScrollReveal delay={0.08} y={16}>
            <nav aria-label="Navigation footer" className="flex flex-col gap-4">
              <h4
                className="font-body"
                style={{
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
              {navLinks.map((link) => (
                <FooterNavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
          </ScrollReveal>

          {/* ── Col 3 : Contact ───────────────────────────────────────── */}
          <ScrollReveal delay={0.14} y={16}>
            <div className="flex flex-col gap-4">
              <h4
                className="font-body"
                style={{
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

              <div className="flex items-center gap-3">
                <Scale size={15} style={{ color: '#002FA7', flexShrink: 0 }} />
                <span className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>
                  {CONTACT_INFO.barreau}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={15} style={{ color: '#002FA7', flexShrink: 0 }} />
                <span className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>
                  {CONTACT_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={15} style={{ color: '#002FA7', flexShrink: 0 }} />
                <a
                  href={`tel:+33${CONTACT_INFO.phone.replace(/\s/g, '').slice(1)}`}
                  className="font-body"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.78)', textDecoration: 'none', transition: 'color 200ms ease' }}
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={15} style={{ color: '#002FA7', flexShrink: 0, marginTop: '2px' }} />
                <FooterExternalLink
                  href={`mailto:${CONTACT_INFO.email}`}
                  icon={() => null}
                  label={CONTACT_INFO.email}
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mt-2">
                <Link
                  to="/contact"
                  className="footer-cta"
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
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
            Cabinet inscrit au Barreau de Paris · N° SIREN : en attente
          </p>
          <div className="flex gap-6">
            <FooterLegalLink to="/mentions-legales" label="Mentions légales" />
            <FooterLegalLink to="/mentions-legales#confidentialite" label="Politique de confidentialité" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
