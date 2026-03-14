import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

// Logo carré bleu avec "M" (même style que Navbar/Footer)
function LogoMark() {
  return (
    <div
      style={{
        width: '52px',
        height: '52px',
        backgroundColor: '#002FA7',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '30px',
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        M
      </span>
    </div>
  );
}

// Panneaux — du plus foncé au plus clair (le dernier est quasi transparent)
const panels = [
  { color: '#002FA7', opacity: 1 },
  { color: '#1A47B8', opacity: 0.85 },
  { color: '#3A64D0', opacity: 0.6 },
  { color: '#6B8FE8', opacity: 0.35 },
  { color: '#B3C4F5', opacity: 0.15 },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('exit'), 2000);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      (window as any).__splashPlayed = true;
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Layer 0 — Panneaux bleu derrière le blanc, visibles quand le blanc monte */}
          {panels.map((panel, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute inset-0"
              style={{
                backgroundColor: panel.color,
                opacity: panel.opacity,
                zIndex: 1 + i,
              }}
              initial={{ y: 0 }}
              animate={
                phase === 'exit'
                  ? { y: '-100%' }
                  : { y: 0 }
              }
              transition={
                phase === 'exit'
                  ? {
                      // Premier panneau (foncé) part en dernier, le plus clair part en premier
                      duration: 1.1,
                      delay: 0.6 + (panels.length - 1 - i) * 0.1,
                      ease: [0.65, 0, 0.35, 1],
                    }
                  : { duration: 0 }
              }
            />
          ))}

          {/* Layer 1 — Fond blanc + contenu, slide up en premier */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: '#FFFFFF', zIndex: 10 }}
            animate={
              phase === 'exit'
                ? { y: '-100%' }
                : { y: 0 }
            }
            transition={
              phase === 'exit'
                ? {
                    duration: 1.0,
                    delay: 0.25,
                    ease: [0.65, 0, 0.35, 1],
                  }
                : { duration: 0 }
            }
          >
            {/* Contenu centré */}
            <div className="flex flex-col items-center select-none" style={{ gap: '0' }}>
              {/* Logo mark */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ marginBottom: '28px' }}
              >
                <LogoMark />
              </motion.div>

              {/* Nom du cabinet */}
              <div style={{ overflow: 'hidden', marginBottom: '18px' }}>
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(32px, 5vw, 46px)',
                    fontWeight: 600,
                    color: '#002FA7',
                    letterSpacing: '0.01em',
                    lineHeight: 1,
                    margin: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Marie Odin
                </motion.h1>
              </div>

              {/* Ligne séparatrice */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  width: '120px',
                  height: '1px',
                  backgroundColor: '#002FA7',
                  marginBottom: '18px',
                  transformOrigin: 'center',
                  opacity: 0.4,
                }}
              />

              {/* Sous-titre */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#002FA7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  opacity: 0.65,
                  margin: 0,
                }}
              >
                Avocate au Barreau de Paris
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
