import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { siteContent } from '../content/site';
import { PlaceholderImage } from './ui/PlaceholderImage';
import { Reveal, SectionLabel } from './ui';

export function Craftsmanship() {
  const { craft } = siteContent;
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 0.55', 'end 0.85'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(craft.steps.length - 1, Math.floor(v * craft.steps.length)));
  });

  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="scroll-mt-20 border-t border-ivory/10 bg-charcoal text-ivory"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal>
          <SectionLabel on="dark">{craft.label}</SectionLabel>
          <h2
            id="craft-heading"
            className="mt-6 font-serif text-[clamp(2.4rem,5.5vw,5rem)] font-editorial leading-[1.05]"
          >
            {craft.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/60">{craft.supporting}</p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* pinned photograph that cross-fades between steps (desktop) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-24 h-[72vh]">
              <div className="relative h-full w-full overflow-hidden border border-ivory/10">
                {craft.steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <PlaceholderImage slot={step.image} placeholderTone="dark" className="h-full w-full" />
                  </motion.div>
                ))}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-6 border-t border-ivory/10 bg-charcoal/60 px-6 py-4 backdrop-blur-sm">
                  <span className="eyebrow text-[9px] text-champagne">
                    {craft.steps[active].num} — {craft.steps[active].name}
                  </span>
                  <span className="eyebrow text-[9px] text-ivory/50">{craft.steps[active].description}</span>
                </div>
              </div>
            </div>
          </div>

          {/* step typography — the pinned visual follows this column */}
          <div ref={stepsRef}>
            {craft.steps.map((step, i) => (
              <div
                key={step.num}
                className="flex min-h-[55vh] flex-col justify-center border-t border-ivory/10 py-14 first:border-t-0 lg:min-h-[78vh]"
              >
                <p
                  className={`font-serif text-6xl transition-colors duration-700 ${
                    i === active ? 'text-champagne' : 'text-ivory/20'
                  }`}
                >
                  {step.num}
                </p>
                <h3
                  className={`mt-4 font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-editorial uppercase tracking-[0.04em] transition-colors duration-700 ${
                    i === active ? 'text-ivory' : 'text-ivory/35'
                  }`}
                >
                  {step.name}
                </h3>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ivory/60">{step.description}</p>
                <div className="mt-10 lg:hidden">
                  <PlaceholderImage slot={step.image} aspect="4 / 3" placeholderTone="dark" className="w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
