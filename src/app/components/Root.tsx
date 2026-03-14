import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';

// Variants de transition pour les pages
const pageVariants = {
  initial: { opacity: 0, y: 22, scale: 0.992 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: -14, scale: 0.995 },
};

const pageTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

export default function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: '#FFFFFF',
        overflowX: 'hidden',
      }}
    >
      <Navbar />

      {/* Ligne de progression de page */}
      <motion.div
        key={location.pathname + '-bar'}
        className="fixed top-0 left-0 z-[60] h-[2px] pointer-events-none"
        style={{ backgroundColor: '#002FA7', transformOrigin: 'left center' }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], opacity: { delay: 0.4 } }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          style={{ willChange: 'opacity, transform' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
