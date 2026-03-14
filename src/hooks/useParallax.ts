import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'motion/react';
import { useMobile } from './useMobile';

interface ParallaxOptions {
  /** Intensité du parallax (px). Défaut : 80 */
  distance?: number;
  /** Offset de départ du scroll. Défaut : 'start end' */
  startOffset?: string;
  /** Offset de fin du scroll. Défaut : 'end start' */
  endOffset?: string;
  /** Désactiver sur mobile. Défaut : true */
  disableOnMobile?: boolean;
}

/**
 * Hook réutilisable pour créer un effet de parallax au scroll.
 * Retourne un ref à attacher à la section cible et une MotionValue `y`.
 */
export function useParallax(options: ParallaxOptions = {}) {
  const {
    distance = 80,
    startOffset = 'start end',
    endOffset = 'end start',
    disableOnMobile = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const disabled = disableOnMobile && isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset as any, endOffset as any],
  });

  const y: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [0, 0] : [-distance / 2, distance / 2],
  );

  const yReverse: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [0, 0] : [distance / 2, -distance / 2],
  );

  const opacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 1, 0.6],
  );

  const scale: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    disabled ? [1, 1, 1] : [0.97, 1, 0.97],
  );

  return { ref, y, yReverse, opacity, scale, scrollYProgress, isMobile };
}
