import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { siteContent } from '../content/site';
import { Reveal, SectionLabel } from './ui';

export function Process() {
  const { process } = siteContent;
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.55'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(process.stages.length - 1, Math.max(0, Math.floor(v * process.stages.length))));
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-20 border-t border-ivory/10 bg-charcoal text-ivory"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel on="dark">{process.label}</SectionLabel>
              <h2
                id="process-heading"
                className="mt-6 font-serif text-[clamp(2.4rem,5.5vw,5rem)] font-editorial leading-[1.05]"
              >
                {process.headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <p className="eyebrow text-[11px] text-taupe" aria-live="polite">
              0{active + 1} <span className="text-stone">/ 0{process.stages.length}</span>
            </p>
          </div>
        </Reveal>

        {/* Desktop — horizontal editorial timeline driven by scroll */}
        <div className="relative mt-20 hidden md:block">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[-3.5px] h-px bg-ivory/15" />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-[-3.5px] h-px w-full origin-left bg-champagne"
            style={{ scaleX: reduce ? 1 : progress }}
          />
          <ol className="grid grid-cols-5">
            {process.stages.map((stage, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <li key={stage.num} className="relative pl-8 pr-6 pt-8 first:pl-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[-6.5px] h-[7px] w-[7px] rounded-full transition-colors duration-500 ${
                      isActive || isPast ? 'bg-champagne' : 'bg-ivory/30'
                    }`}
                  />
                  <p
                    className={`font-serif text-4xl transition-colors duration-500 ${
                      isActive ? 'text-champagne' : isPast ? 'text-ivory/70' : 'text-ivory/25'
                    }`}
                  >
                    {stage.num}
                  </p>
                  <h3
                    className={`eyebrow mt-4 text-[11px] transition-colors duration-500 ${
                      isActive ? 'text-ivory' : 'text-ivory/40'
                    }`}
                  >
                    {stage.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`mt-4 block h-px transition-all duration-700 ease-editorial ${
                      isActive ? 'w-16 bg-champagne' : 'w-10 bg-ivory/20'
                    }`}
                  />
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-editorial ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 text-[13px] leading-relaxed text-ivory/60">{stage.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile — vertical timeline */}
        <ol className="mt-14 md:hidden">
          {process.stages.map((stage, i) => (
            <Reveal key={stage.num} delay={i * 0.04} y={18}>
              <li className="relative border-l border-ivory/15 pb-10 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3.5px] top-1.5 h-[7px] w-[7px] rounded-full bg-champagne"
                />
                <p className="eyebrow text-[10px] text-champagne">{stage.num}</p>
                <h3 className="mt-2 font-serif text-2xl text-ivory">{stage.name}</h3>
                <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ivory/60">{stage.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
