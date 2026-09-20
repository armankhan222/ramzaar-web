import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE: [number, number, number, number] = [0.77, 0, 0.18, 1];

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** One restrained editorial reveal — used sparingly (brief §43). */
export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
