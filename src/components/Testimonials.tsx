import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Reveal, SectionLabel } from './ui';

export function Testimonials() {
  const { testimonials } = siteContent;
  // Duplicate array to create a seamless, infinite loop marquee
  const marqueeItems = [...testimonials.items, ...testimonials.items];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="scroll-mt-20 border-t border-ivory/10 bg-charcoal text-ivory overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-32 lg:px-12">
        <Reveal>
          <SectionLabel on="dark">{testimonials.label}</SectionLabel>
          <h2
            id="testimonials-heading"
            className="mt-6 max-w-3xl font-serif text-[clamp(2.2rem,4.5vw,4rem)] font-editorial leading-[1.08]"
          >
            {testimonials.headline}
          </h2>
        </Reveal>
      </div>

      {/* Infinite Auto-Scrolling Multi-Column Marquee Track */}
      <div className="group relative mt-16 pb-24 sm:pb-32">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-charcoal to-transparent sm:w-24 lg:w-36" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-charcoal to-transparent sm:w-24 lg:w-36" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 lg:gap-12 shrink-0 group-hover:[animation-play-state:paused]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {marqueeItems.map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className="w-[85vw] sm:w-[45vw] lg:w-[calc((1600px-6rem)/3)] shrink-0 rounded-xl border border-ivory/10 bg-ivory/[0.02] p-8 sm:p-10 transition-colors duration-500 hover:border-champagne/40 hover:bg-ivory/[0.04]"
              >
                <span aria-hidden="true" className="block font-serif text-5xl leading-none text-champagne">
                  “
                </span>
                <blockquote className="mt-3 font-serif text-[clamp(1.15rem,1.4vw,1.45rem)] font-editorial italic leading-relaxed text-ivory/90 min-h-[140px]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-ivory/10 pt-6">
                  <span aria-hidden="true" className="h-px w-8 bg-champagne/70" />
                  <div>
                    <span className="eyebrow block text-[11px] text-ivory">{t.name}</span>
                    <span className="mt-1 block text-[12px] text-champagne/80 font-medium">{t.location}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
