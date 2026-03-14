import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const CABINET_NAME = 'Lefebvre Avocats';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Mes Dossiers', href: '/dossiers' },
  { label: 'Contact', href: '/contact' },
];

// ── NavLink desktop avec underline animé ────────────────────────────────────
function NavLink({ href, label, scrolled }: { href: string; label: string; scrolled: boolean }) {
  const location = useLocation();
  const isActive = href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <Link
      to={href}
      className="group relative"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        fontWeight: isActive ? 600 : 450,
        letterSpacing: '0.03em',
        color: isActive ? '#5B8AF5' : scrolled ? 'rgba(255,255,255,0.88)' : '#FFFFFF',
        textDecoration: 'none',
        paddingBottom: '4px',
        display: 'inline-block',
        transition: 'color 250ms ease',
      }}
    >
      <motion.span
        whileHover={{ color: '#FFFFFF' }}
        style={{ display: 'inline-block', position: 'relative' }}
      >
        {label}
      </motion.span>

      {/* Underline animée via motion layout */}
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
            backgroundColor: isActive ? '#5B8AF5' : '#002FA7',
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
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#002FA7',
          color: '#FFFFFF',
          borderRadius: '2px',
          padding: '11px 26px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          textDecoration: 'none',
          transition: 'background-color 220ms ease, box-shadow 220ms ease',
          boxShadow: '0 0 0 0 rgba(0,47,167,0)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = '#0038CC';
          el.style.boxShadow = '0 4px 20px rgba(0,47,167,0.45)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = '#002FA7';
          el.style.boxShadow = '0 0 0 0 rgba(0,47,167,0)';
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
                <span
                  style={{
                    color: '#fff',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '17px',
                    fontWeight: 700,
                  }}
                >
                  L
                </span>
              </motion.div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                }}
              >
                {CABINET_NAME}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} scrolled={scrolled} />
            ))}
            <NavCTA />
          </nav>

          {/* Hamburger mobile */}
          <motion.button
            className="lg:hidden flex items-center justify-center text-white"
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
                  <X size={24} color="#FFFFFF" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} color="#FFFFFF" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Menu mobile fullscreen (slide depuis le haut) ─────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: '#0A0D1A' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: '#002FA7',
              }}
            />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  delay: i * 0.06 + 0.15,
                  duration: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={link.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '22px',
                    fontWeight: isActive(link.href) ? 600 : 400,
                    color: isActive(link.href) ? '#5B8AF5' : '#FFFFFF',
                    textDecoration: 'none',
                    letterSpacing: '0.01em',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 200ms ease',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: navLinks.length * 0.06 + 0.2,
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4"
            >
              <Link
                to="/contact"
                style={{
                  backgroundColor: '#002FA7',
                  color: '#FFFFFF',
                  borderRadius: '2px',
                  padding: '14px 48px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                }}
              >
                Prendre RDV
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile sticky CTA bar ─────────────────────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3"
        style={{
          backgroundColor: 'rgba(10,13,26,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Link
          to="/contact"
          style={{
            backgroundColor: '#002FA7',
            color: '#FFFFFF',
            borderRadius: '2px',
            padding: '14px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            textDecoration: 'none',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 200ms ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0038CC'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#002FA7'; }}
        >
          Prendre RDV
        </Link>
      </div>
    </>
  );
}
