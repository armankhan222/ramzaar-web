import { useRef, useState } from 'react';
import { siteContent } from '../content/site';
import { PlaceholderImage } from './ui/PlaceholderImage';
import { WhatsAppLink } from './ui/WhatsAppLink';
import { Reveal, SectionLabel } from './ui';
import { track } from '../lib/analytics';
import { useHoverCapable } from '../lib/hooks';

/** Per-item rhythm offsets so the masonry never reads as a uniform grid. */
const OFFSETS = ['', 'sm:mt-16', '', 'sm:mt-10 lg:mt-16', 'sm:mt-0 lg:mt-10', 'sm:mt-14 lg:mt-0'];

export function WorkGallery() {
  const { work } = siteContent;
  const capable = useHoverCapable();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [viewing, setViewing] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!capable || !cursorRef.current) return;
    cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-20 bg-ivory text-charcoal"
      onMouseMove={onMove}
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionLabel on="light">{work.label}</SectionLabel>
              <h2
                id="work-heading"
                className="mt-6 font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-editorial leading-none"
              >
                {work.headline}
              </h2>
            </div>
            <p className="max-w-xs pb-2 text-[14px] leading-relaxed text-charcoal/60">{work.supporting}</p>
          </div>
        </Reveal>

        {/* Editorial masonry with scroll-to-reveal on every item & hover specs overlay */}
        <div className="mt-16 columns-1 gap-10 sm:columns-2 lg:columns-3 lg:gap-12">
          {work.items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.12} y={32} className="break-inside-avoid">
              <WhatsAppLink
                context={item.waContext}
                source={`portfolio_${item.id}`}
                aria-label={`${item.category} — discuss your project on WhatsApp`}
                onClick={() => track('portfolio_interaction', { item: item.id, context: item.waContext })}
                onMouseEnter={() => capable && setViewing(true)}
                onMouseLeave={() => capable && setViewing(false)}
                className={`group mb-14 block ${capable ? 'cursor-none' : ''} ${OFFSETS[i % OFFSETS.length] ?? ''}`}
              >
                <div className="relative overflow-hidden rounded-sm">
                  <PlaceholderImage
                    slot={item.image}
                    aspect={item.aspect}
                    placeholderTone="light"
                    className="w-full"
                    imgClassName="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.05]"
                  />
                  {/* Subtle luxury hover specs overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end p-6">
                    <span className="eyebrow text-[10px] text-ivory/90 tracking-wider">
                      Tailored Dimensions • Hand Craftsmanship
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between gap-5">
                  <div>
                    <h3 className="eyebrow text-[11px] text-charcoal/70 transition-colors duration-500 group-hover:text-charcoal">
                      {item.category}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-charcoal/55">{item.description}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden h-px w-8 shrink-0 self-center bg-charcoal/30 transition-all duration-700 ease-editorial group-hover:w-16 group-hover:bg-champagne sm:block"
                  />
                </div>
              </WhatsAppLink>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-6 border-t border-charcoal/15 pt-8">
            <p className="eyebrow text-[10px] text-stone">Something specific in mind?</p>
            <WhatsAppLink
              context="general"
              source="work_footer"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal transition-colors duration-300 hover:text-brown"
            >
              Start Your Project
              <span
                aria-hidden="true"
                className="h-px w-8 bg-charcoal/40 transition-all duration-500 ease-editorial group-hover:w-12 group-hover:bg-champagne"
              />
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>

      {/* Minimal VIEW cursor — desktop, hover-capable devices only */}
      {capable && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-[60] flex h-16 w-16 items-center justify-center rounded-full border border-ivory/80 bg-charcoal/85 text-ivory transition-opacity duration-300 ${
            viewing ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        >
          <span className="eyebrow text-[9px]">View</span>
        </div>
      )}
    </section>
  );
}
