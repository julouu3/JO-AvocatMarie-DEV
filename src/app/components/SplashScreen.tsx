import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

// Monogram SVG stylisé "L·A" (Lefebvre Avocats) inspiré du style de l'image
function LogoMark() {
  return (
    <svg
      width="72"
      height="64"
      viewBox="0 0 72 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lettre L — barre verticale + horizontale */}
      <path
        d="M8 4 L8 52 L34 52"
        stroke="#002FA7"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Lettre A — triangle avec barre transversale */}
      <path
        d="M38 52 L54 6 L70 52"
        stroke="#002FA7"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M43 36 L65 36"
        stroke="#002FA7"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Point de séparation */}
      <circle cx="34.5" cy="52" r="2.5" fill="#002FA7" />
    </svg>
  );
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Après 2.6s, on déclenche la sortie
    const holdTimer = setTimeout(() => setPhase('exit'), 2600);
    // Après la sortie (~0.9s d'animation), on masque le splash
    const doneTimer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        // Conteneur principal — voile blanc qui remonte pour révéler l'app
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#FFFFFF' }}
          initial={{ y: 0 }}
          animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
          transition={
            phase === 'exit'
              ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
              : { duration: 0 }
          }
        >
          {/* Ligne de progression discrète en bas */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ backgroundColor: '#002FA7' }}
            initial={{ width: '0%' }}
            animate={phase !== 'exit' ? { width: '100%' } : { width: '100%' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />

          {/* Contenu centré */}
          <div className="flex flex-col items-center select-none" style={{ gap: '0' }}>

            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.85 }}
              animate={
                phase === 'exit'
                  ? { opacity: 0, y: -20, scale: 0.9 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={
                phase === 'exit'
                  ? { duration: 0.4, ease: [0.55, 0, 1, 0.45] }
                  : { duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              style={{ marginBottom: '24px' }}
            >
              <LogoMark />
            </motion.div>

            {/* Nom du cabinet */}
            <div style={{ overflow: 'hidden', marginBottom: '14px' }}>
              <motion.h1
                initial={{ y: '110%', opacity: 0 }}
                animate={
                  phase === 'exit'
                    ? { y: '-110%', opacity: 0 }
                    : { y: '0%', opacity: 1 }
                }
                transition={
                  phase === 'exit'
                    ? { duration: 0.38, ease: [0.55, 0, 1, 0.45], delay: 0.05 }
                    : { duration: 0.65, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
                }
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(26px, 4vw, 36px)',
                  fontWeight: 600,
                  color: '#002FA7',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                Lefebvre Avocats
              </motion.h1>
            </div>

            {/* Ligne séparatrice */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                phase === 'exit'
                  ? { scaleX: 0, opacity: 0 }
                  : { scaleX: 1, opacity: 1 }
              }
              transition={
                phase === 'exit'
                  ? { duration: 0.3, ease: 'easeIn', delay: 0 }
                  : { duration: 0.5, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              style={{
                width: '100px',
                height: '1px',
                backgroundColor: '#002FA7',
                marginBottom: '14px',
                transformOrigin: 'center',
                opacity: 0.4,
              }}
            />

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={
                phase === 'exit'
                  ? { opacity: 0, y: -8 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                phase === 'exit'
                  ? { duration: 0.3, ease: 'easeIn' }
                  : { duration: 0.55, delay: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
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
      )}
    </AnimatePresence>
  );
}
