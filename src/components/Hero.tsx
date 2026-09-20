import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../content/images';
import { siteContent, type HeroCallout } from '../content/site';
import { WhatsAppLink } from './ui/WhatsAppLink';
import { track } from '../lib/analytics';
import { useHoverCapable, useScrolled } from '../lib/hooks';
import { EASE } from './ui/Reveal';

/* ————————————————————————————————————————————————————————————
   HERO — layers (brief §10):
   0 charcoal base · 1 photograph · 2 atmospheric gradients ·
   3 editorial typography · 4 architectural callouts ·
   5 navigation (fixed, in Navigation.tsx) · 6 CTA
   ———————————————————————————————————————————————————————————— */

/** Soft radial spotlight that follows the cursor with a slow lerp. */
function Spotlight({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const container = containerRef.current;
    if (!el || !container) return;

    let raf = 0;
    const pos = { x: -600, y: -600, tx: -600, ty: -600 };

    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.08;
      pos.y += (pos.ty - pos.y) * 0.08;
      el.style.transform = `translate3d(${pos.x - 280}px, ${pos.y - 280}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pos.tx = e.clientX - rect.left;
      pos.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      pos.tx = -600;
      pos.ty = -600;
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-[3] h-[560px] w-[560px] rounded-full"
      style={{
        background:
          'radial-gradient(circle, rgba(244,240,231,0.09) 0%, rgba(244,240,231,0.04) 38%, rgba(244,240,231,0) 68%)',
      }}
    />
  );
}

/** Architectural drawing annotation anchored to an object in the photograph. */
function Callout({ c, index, onHover }: { c: HeroCallout; index: number; onHover: (id: string | null) => void }) {
  const up = c.direction === 'up';
  const connector = 'h-10 w-px';

  return (
    <motion.div
      className="group absolute"
      style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 + index * 0.28, ease: EASE }}
      onMouseEnter={() => onHover(c.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* enlarged, invisible hit area */}
      <div className="relative left-[-3.5px] top-[-3.5px] p-4 after:absolute after:-inset-4 after:content-['']">
        {/* champagne point */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-1.75 w-1.75 rounded-full bg-champagne shadow-[0_0_0_3px_rgba(200,168,117,0.22)] transition-transform duration-500 ease-editorial group-hover:scale-150"
        />
        {/* connecting line */}
        <span
          aria-hidden="true"
          className={`absolute left-0.75 ${connector} bg-ivory/45 transition-colors duration-500 group-hover:bg-champagne/80 ${
            up ? 'bottom-1.75' : 'top-1.75'
          }`}
        />
        {/* label */}
        <div
          className={`absolute left-0.75 flex w-max items-center gap-2.5 ${up ? 'bottom-[calc(7px+2.5rem)]' : 'top-[calc(7px+2.5rem)]'}`}
        >
          <span
            aria-hidden="true"
            className="h-px w-6 bg-ivory/45 transition-colors duration-500 group-hover:bg-champagne/80"
          />
          <span className="block">
            <span className="eyebrow block text-[10px] leading-none text-ivory/90 transition-opacity duration-500 group-hover:text-ivory">
              {c.label}
            </span>
            <span className="mt-1.5 block text-[11px] leading-tight text-ivory/55 transition-colors duration-500 group-hover:text-ivory/80">
              {c.note}
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const capable = useHoverCapable();
  const scrolled = useScrolled(80);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCallout, setHoveredCallout] = useState<string | null>(null);
  const { hero } = siteContent;
  const img = IMAGES.hero;
  const mobileCallouts = hero.callouts.filter((c) => c.onMobile);
  const hovered = hero.callouts.find((c) => c.id === hoveredCallout);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label={`${siteContent.brand.name} — ${siteContent.brand.tagline}`}
      className="relative flex h-svh min-h-[600px] flex-col overflow-hidden bg-charcoal text-ivory md:min-h-[720px]"
    >
      {/* Layer 1 — photograph with a slow scale correction on load */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.04, opacity: 0.55 }}
        animate={reduce ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        {img.src ? (
          <img
            src={img.src}
            alt={img.alt}
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: img.focal }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div role="img" aria-label={img.alt} className="blueprint-dots h-full w-full bg-charcoal" />
        )}
      </motion.div>

      {/* Layer 2 — atmospheric gradients: darker at the base, gentle region behind the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1"
        style={{
          background:
            'linear-gradient(to top, rgba(32,34,35,0.9) 0%, rgba(32,34,35,0.38) 30%, rgba(32,34,35,0.12) 55%, rgba(32,34,35,0.55) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1"
        style={{
          background: 'radial-gradient(90% 70% at 16% 74%, rgba(32,34,35,0.52) 0%, rgba(32,34,35,0) 62%)',
        }}
      />

      {/* local brightening beneath a hovered callout — almost felt, not seen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-700"
        style={{
          opacity: hovered ? 1 : 0,
          background: hovered
            ? `radial-gradient(340px circle at ${hovered.x * 100}% ${hovered.y * 100}%, rgba(244,240,231,0.09), rgba(244,240,231,0) 70%)`
            : 'none',
        }}
      />

      {/* cursor spotlight (Layer 3.5) — desktop, motion-capable only */}
      {capable && !reduce && <Spotlight containerRef={sectionRef} />}

      {/* Layer 3 — editorial typography */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-28 sm:px-8 sm:pb-32 lg:px-12 lg:pb-36">
        <motion.p
          className="eyebrow max-w-md text-[10px] leading-relaxed text-ivory/60"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        >
          {hero.label}
        </motion.p>

        <h1 className="mt-5 font-serif text-[clamp(3.4rem,8.5vw,8.5rem)] font-editorial leading-[0.94]">
          {hero.headlineLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? undefined : { y: '112%' }}
                animate={reduce ? undefined : { y: '0%' }}
                transition={{ duration: 1.1, delay: (reduce ? 0 : 0.7) + i * 0.14, ease: EASE }}
              >
                {line.endsWith('.') ? (
                  <>
                    {line.slice(0, -1)}
                    <span className="text-champagne">.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-md text-[15px] leading-relaxed text-ivory/75"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: EASE }}
        >
          {hero.supporting}
        </motion.p>

        {/* Mobile annotation markers — inline so they never collide with type */}
        <motion.div
          className="mt-6 flex flex-wrap gap-3 md:hidden"
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
        >
          {mobileCallouts.map((c) => (
            <span
              key={c.id}
              className="flex items-center gap-2 rounded-full border border-ivory/25 bg-charcoal/35 px-3.5 py-2 backdrop-blur-sm"
            >
              <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full bg-champagne" />
              <span className="eyebrow text-[9px] text-ivory">{c.label}</span>
            </span>
          ))}
        </motion.div>

        {/* Layer 6 — CTA */}
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: EASE }}
        >
          <WhatsAppLink
            context={hero.cta.waContext}
            source="hero_cta"
            onClick={() => track('hero_cta_click', { source: 'hero' })}
            className="group inline-flex items-center gap-3 bg-ivory px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal transition-colors duration-500 hover:bg-ivory/85"
          >
            {hero.cta.label}
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
            />
          </WhatsAppLink>
          <a
            href={hero.secondary.href}
            className="eyebrow border-b border-ivory/30 pb-1 text-[11px] text-ivory/75 transition-colors duration-300 hover:border-ivory hover:text-ivory"
          >
            {hero.secondary.label}
          </a>
        </motion.div>
      </div>

      {/* Layer 4 — architectural callouts (desktop: hover-annotated, mobile: compact markers) */}
      {/* <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        {hero.callouts.map((c, i) => (
          <Callout key={c.id} c={c} index={i} onHover={setHoveredCallout} />
        ))}
      </div> */}
      {/* Scroll indicator — disappears once the visitor moves */}
      <div
        aria-hidden={scrolled}
        className={`absolute bottom-7 left-5 z-10 transition-opacity duration-700 sm:left-8 lg:left-12 ${
          scrolled ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.3, ease: EASE }}
        >
          <p className="eyebrow text-[9px] text-ivory/50">{hero.scrollIndicator}</p>
          <span className="mt-3 block h-px w-14 overflow-hidden bg-ivory/20">
            <motion.span
              className="block h-full w-full bg-champagne"
              animate={reduce ? undefined : { x: ['-100%', '100%'] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
