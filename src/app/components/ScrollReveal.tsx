import { motion } from 'motion/react';
import { ReactNode, CSSProperties } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Translation verticale initiale (px) */
  y?: number;
  /** Translation horizontale initiale (px) — utile pour reveals latéraux */
  x?: number;
  /** Scale initial (ex: 0.92 pour un léger zoom-in) */
  scale?: number;
  /** Ajoute un blur initial pour un effet premium */
  blur?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  style,
  y = 28,
  x = 0,
  scale,
  blur = false,
}: ScrollRevealProps) {
  const initial: Record<string, unknown> = { opacity: 0, y, x };
  const animate: Record<string, unknown> = { opacity: 1, y: 0, x: 0 };

  if (scale !== undefined) {
    initial.scale = scale;
    animate.scale = 1;
  }
  if (blur) {
    initial.filter = 'blur(8px)';
    animate.filter = 'blur(0px)';
  }

  return (
    <motion.div
      initial={initial as any}
      whileInView={animate as any}
      viewport={{ once: true, margin: '-52px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
        // Blur se termine légèrement plus tôt pour ne pas traîner
        ...(blur ? { filter: { duration: 0.55, delay } } : {}),
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
