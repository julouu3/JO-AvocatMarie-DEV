import { useState, useEffect, type RefObject } from 'react';

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options?: { once?: boolean; threshold?: number }
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once) observer.disconnect();
        } else if (!options?.once) {
          setInView(false);
        }
      },
      { threshold: options?.threshold ?? 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.threshold]);

  return inView;
}
