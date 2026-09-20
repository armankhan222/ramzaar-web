import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Reveal, SectionLabel, EASE } from './ui';

export function Sectors() {
  const { sectors } = siteContent;

  return (
    <section id="spaces" aria-labelledby="sectors-heading" className="scroll-mt-20 bg-ivory text-charcoal">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal>
          <SectionLabel on="light">{sectors.label}</SectionLabel>
          <h2
            id="sectors-heading"
            className="mt-6 max-w-3xl font-serif text-[clamp(2.2rem,4.5vw,4rem)] font-editorial leading-[1.08]"
          >
            {sectors.headline}
          </h2>
        </Reveal>

        {/* Thin rules and typography — no cards (brief §28) */}
        <ul className="mt-14 border-t border-charcoal/15">
          {sectors.items.map((sector, i) => (
            <motion.li
              key={sector.name}
              className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-charcoal/15 py-6 md:py-8"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: EASE }}
            >
              <span className="eyebrow col-span-2 text-[9px] text-stone md:col-span-1">0{i + 1}</span>
              <h3 className="col-span-10 font-serif text-2xl tracking-[0.04em] transition-transform duration-500 ease-editorial group-hover:translate-x-2 md:col-span-4 md:text-3xl">
                {sector.name}
              </h3>
              <p className="col-span-12 pl-7 text-[13px] leading-relaxed text-charcoal/60 md:col-span-7 md:pl-0">
                {sector.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
