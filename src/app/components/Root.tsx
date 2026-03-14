import { Outlet, useLocation } from 'react-router';
import { useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';

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

      <main>
        <Suspense
          fallback={
            <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2.5px solid #E0E0E8',
                  borderTopColor: '#002FA7',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
