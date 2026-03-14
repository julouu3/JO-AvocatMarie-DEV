import { Outlet, useLocation } from 'react-router';
import { useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';

// Transition plus douce : fade + léger slide + subtle blur
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
  },
};

const pageTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1], // Custom ease-out plus smooth
  filter: { duration: 0.4 },
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
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], opacity: { delay: 0.5, duration: 0.2 } }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          style={{ willChange: 'opacity, transform, filter' }}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
