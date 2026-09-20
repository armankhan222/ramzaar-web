import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Which background the label sits on. */
  on?: 'light' | 'dark';
  className?: string;
};

/** Tiny uppercase section label with an architectural rule. */
export function SectionLabel({ children, on = 'light', className = '' }: Props) {
  const onDark = on === 'dark';
  return (
    <p className={`eyebrow flex items-center gap-3 text-[10px] ${onDark ? 'text-taupe' : 'text-stone'} ${className}`}>
      <span
        aria-hidden="true"
        className={`h-px w-8 ${onDark ? 'bg-champagne/70' : 'bg-stone/60'}`}
      />
      {children}
    </p>
  );
}
