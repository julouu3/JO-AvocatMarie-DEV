import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { CABINET_NAME, navLinks } from '@/data/navigation';

// ── NavLink desktop avec underline animé ────────────────────────────────────
function NavLink({ href, label, scrolled, lightHero }: { href: string; label: string; scrolled: boolean; lightHero: boolean }) {
  const location = useLocation();
  const isActive = href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  // On light hero (before scroll): dark text. After scroll or on dark hero: white text.
  const useDark = lightHero && !scrolled;
  const baseColor = isActive
    ? (useDark ? '#002FA7' : '#5B8AF5')
    : useDark
      ? 'rgba(6,6,8,0.70)'
      : scrolled ? 'rgba(255,255,255,0.88)' : '#FFFFFF';
  const hoverColor = useDark ? '#060608' : '#FFFFFF';

  return (
    <Link
      to={href}
      className="group relative font-body"
      style={{
        fontSize: '14px',
        fontWeight: isActive ? 600 : 450,
        letterSpacing: '0.03em',
        color: baseColor,
        textDecoration: 'none',
        paddingBottom: '4px',
        display: 'inline-block',
        transition: 'color 250ms ease',
      }}
    >
      <motion.span
        whileHover={{ color: hoverColor }}
        style={{ display: 'inline-block', position: 'relative' }}
      >
        {label}
      </motion.span>

      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1.5px',
          width: '100%',
          overflow: 'hidden',
          display: 'block',
        }}
      >
        <motion.span
          style={{
            display: 'block',
            height: '100%',
            backgroundColor: isActive ? (useDark ? '#002FA7' : '#5B8AF5') : '#002FA7',
            originX: 0,
          }}
          initial={{ scaleX: isActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </Link>
  );
}

// ── CTA Button navbar ────────────────────────────────────────────────────────
function NavCTA() {
  return (
    <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }}>
      <Link
        to="/contact"
        className="btn-primary"
        style={{
          padding: '11px 26px',
          letterSpacing: '0.07em',
          boxShadow: '0 0 0 0 rgba(0,47,167,0)',
        }}
      >
        Prendre RDV
      </Link>
    </motion.div>
  );
}

// ── Composant principal ──────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  // Home page has a light hero — navbar needs dark text before scroll
  const isHomePage = location.pathname === '/';
  const lightHero = isHomePage && !scrolled;

  return (
    <>
      {/* ── Header principal ─────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: scrolled || mobileOpen
            ? 'rgba(10, 13, 26, 0.92)'
            : 'rgba(10, 13, 26, 0)',
          backdropFilter: scrolled || mobileOpen ? 'blur(18px) saturate(160%)' : 'blur(0px)',
          borderBottomColor: scrolled
            ? 'rgba(255, 255, 255, 0.07)'
            : 'rgba(255, 255, 255, 0)',
          boxShadow: scrolled
            ? '0 1px 48px rgba(0,0,0,0.3)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ borderBottom: '1px solid rgba(255,255,255,0)' }}
      >
        <div
          className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 flex items-center justify-between"
          style={{ height: '72px' }}
        >
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <motion.div
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#002FA7',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                whileHover={{
                  backgroundColor: '#0038CC',
                  boxShadow: '0 4px 16px rgba(0,47,167,0.5)',
                }}
                transition={{ duration: 0.22 }}
              >
                <span className="font-heading" style={{ color: '#fff', fontSize: '17px', fontWeight: 700 }}>
                  M
                </span>
              </motion.div>
              <span
                className="font-heading"
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: (lightHero && !mobileOpen) ? '#060608' : '#FFFFFF',
                  letterSpacing: '-0.01em',
                  transition: 'color 300ms ease',
                }}
              >
                {CABINET_NAME}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} scrolled={scrolled} lightHero={lightHero} />
            ))}
            <NavCTA />
          </nav>

          {/* Hamburger mobile */}
          <motion.button
            className="lg:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} color={lightHero && !mobileOpen ? '#060608' : '#FFFFFF'} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} color={lightHero ? '#060608' : '#FFFFFF'} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Menu mobile fullscreen (splash-style blue panels reveal) ──── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={false}
          >
            {/* Panneaux bleus — du plus clair au plus foncé, descendent en cascade */}
            {[
              { color: '#B3C4F5', opacity: 0.15 },
              { color: '#6B8FE8', opacity: 0.35 },
              { color: '#3A64D0', opacity: 0.6 },
              { color: '#1A47B8', opacity: 0.85 },
              { color: '#0A0D1A', opacity: 1 },
            ].map((panel, i, arr) => (
              <motion.div
                key={`panel-${i}`}
                className="absolute inset-0"
                style={{
                  backgroundColor: panel.color,
                  opacity: panel.opacity,
                  zIndex: 1 + i,
                }}
                variants={{
                  hidden: { y: '-100%' },
                  visible: {
                    y: '0%',
                    transition: { duration: 0.55, delay: i * 0.06, ease: [0.65, 0, 0.35, 1] },
                  },
                  exit: {
                    y: '-100%',
                    transition: { duration: 0.45, delay: 0.2 + (arr.length - 1 - i) * 0.05, ease: [0.65, 0, 0.35, 1] },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            ))}

            {/* Contenu par-dessus les panneaux */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ zIndex: 10 }}
            >
              {/* Navigation links — slide-up from overflow-hidden */}
              <nav className="flex flex-col items-center gap-1">
                {navLinks.map((link, i) => (
                  <div key={link.href} className="overflow-hidden" style={{ paddingBottom: '0.15em' }}>
                    <motion.div
                      variants={{
                        hidden: { y: '110%' },
                        visible: {
                          y: '0%',
                          transition: { duration: 0.6, delay: 0.35 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
                        },
                        exit: {
                          y: '-110%',
                          transition: { duration: 0.25, delay: i * 0.03, ease: [0.65, 0, 0.35, 1] },
                        },
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        to={link.href}
                        className="font-heading"
                        style={{
                          fontSize: '28px',
                          fontWeight: isActive(link.href) ? 700 : 400,
                          color: isActive(link.href) ? '#5B8AF5' : '#FFFFFF',
                          textDecoration: 'none',
                          letterSpacing: '-0.01em',
                          minHeight: '52px',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'color 200ms ease',
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              {/* Ligne séparatrice */}
              <motion.div
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: {
                    scaleX: 1, opacity: 0.4,
                    transition: { duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                  exit: {
                    scaleX: 0, opacity: 0,
                    transition: { duration: 0.15, ease: [0.65, 0, 0.35, 1] },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  width: '60px',
                  height: '1px',
                  backgroundColor: '#5B8AF5',
                  marginTop: '28px',
                  marginBottom: '28px',
                  transformOrigin: 'center',
                }}
              />

              {/* CTA — fade-in */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.5, delay: 0.35 + navLinks.length * 0.07 + 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                  exit: {
                    opacity: 0, y: -10,
                    transition: { duration: 0.15, ease: [0.65, 0, 0.35, 1] },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  to="/contact"
                  className="btn-primary"
                  style={{
                    padding: '14px 48px',
                    letterSpacing: '0.07em',
                    minHeight: '44px',
                  }}
                >
                  Prendre RDV
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile sticky CTA bar ─────────────────────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 mobile-cta-bar"
        style={{
          backgroundColor: 'rgba(10,13,26,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Link
          to="/contact"
          className="btn-primary w-full"
          style={{
            padding: '14px',
            letterSpacing: '0.07em',
            minHeight: '44px',
          }}
        >
          Prendre RDV
        </Link>
      </div>
    </>
  );
}
