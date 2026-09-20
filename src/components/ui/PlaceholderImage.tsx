import type { CSSProperties } from 'react';
import type { ImageSlot } from '../../content/images';

type Props = {
  slot: ImageSlot;
  /** CSS aspect-ratio, e.g. "4 / 3". Ignored when the slot renders as <img> with a fixed parent height. */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  highPriority?: boolean;
  placeholderTone?: 'dark' | 'light';
};

/**
 * Renders the real photograph when the slot has a `src`,
 * or a clearly-marked branded placeholder when it doesn't —
 * so nothing on the page pretends to be RAMZAAR work (brief §46).
 */
export function PlaceholderImage({
  slot,
  aspect,
  className = '',
  imgClassName = '',
  eager = false,
  highPriority = false,
  placeholderTone,
}: Props) {
  if (!slot.src) {
    const dark = (placeholderTone ?? slot.tone ?? 'dark') === 'dark';
    return (
      <div
        role="img"
        aria-label={slot.alt}
        style={aspect ? { aspectRatio: aspect } : undefined}
        className={`flex flex-col items-center justify-center gap-3 border px-6 text-center ${
          dark
            ? 'blueprint-dots border-ivory/15 bg-charcoal text-taupe'
            : 'border-charcoal/15 bg-ivory text-stone'
        } ${className}`}
      >
        <span className="eyebrow text-[10px]">{slot.tag}</span>
        <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
        <span className="eyebrow text-[9px] opacity-60">Replace with real RAMZAAR photography</span>
      </div>
    );
  }

  const style: CSSProperties = {
    objectPosition: slot.focal ?? 'center',
  };

  return (
    <img
      src={slot.src}
      alt={slot.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={highPriority ? 'high' : undefined}
      style={style}
      className={`object-cover ${imgClassName} ${className}`}
    />
  );
}
