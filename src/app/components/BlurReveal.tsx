import { useRef, useMemo, CSSProperties } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface BlurRevealProps {
  children: string;
  /** Opacité de base des mots avant révélation (0-1). Défaut : 0.15 */
  baseOpacity?: number;
  /** Activer l'effet de blur sur chaque mot. Défaut : true */
  enableBlur?: boolean;
  /** Force du blur initial en px. Défaut : 5 */
  blurStrength?: number;
  /** Rotation initiale en degrés. Défaut : 0 */
  baseRotation?: number;
  /** Classes CSS du conteneur */
  className?: string;
  /** Style inline du conteneur */
  style?: CSSProperties;
  /** Tag HTML à utiliser. Défaut : 'p' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

// ── Word animé individuel ─────────────────────────────────────────────────
function AnimatedWord({
  word,
  progress,
  range,
  baseOpacity,
  enableBlur,
  blurStrength,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
  enableBlur: boolean;
  blurStrength: number;
}) {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const blur = useTransform(progress, range, [blurStrength, 0]);
  const filter = useTransform(blur, (v) => (enableBlur ? `blur(${v}px)` : 'none'));

  return (
    <motion.span
      style={{
        opacity,
        filter,
        display: 'inline-block',
        willChange: 'opacity, filter',
      }}
    >
      {word}
    </motion.span>
  );
}

// ── Composant principal ───────────────────────────────────────────────────
export default function BlurReveal({
  children,
  baseOpacity = 0.15,
  enableBlur = true,
  blurStrength = 5,
  baseRotation = 0,
  className,
  style,
  as: Tag = 'p',
}: BlurRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end-=15%', 'end start+=25%'],
  });

  // Rotation liée au scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [baseRotation, 0]);

  // Séparer le texte en mots
  const words = useMemo(() => {
    return children.split(/\s+/).filter(Boolean);
  }, [children]);

  // Chaque mot a sa propre tranche de progression
  const wordRanges = useMemo(() => {
    const total = words.length;
    return words.map((_, i) => {
      const start = i / total;
      const end = start + 1 / total;
      return [start, end] as [number, number];
    });
  }, [words]);

  // Le MotionTag correspondant au `as`
  const MotionTag = motion[Tag] || motion.p;

  return (
    <MotionTag
      ref={containerRef}
      className={className}
      style={{
        ...style,
        rotateX: rotation,
        transformOrigin: '0% 50%',
      }}
    >
      {words.map((word, i) => (
        <span key={i}>
          <AnimatedWord
            word={word}
            progress={scrollYProgress}
            range={wordRanges[i]}
            baseOpacity={baseOpacity}
            enableBlur={enableBlur}
            blurStrength={blurStrength}
          />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  );
}
