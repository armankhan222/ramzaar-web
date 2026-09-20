import { siteContent } from '../content/site';
import { Reveal, SectionLabel } from './ui';

export function Testimonials() {
  const { testimonials } = siteContent;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="scroll-mt-20 border-t border-ivory/10 bg-charcoal text-ivory"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal>
          <SectionLabel on="dark">{testimonials.label}</SectionLabel>
          <h2
            id="testimonials-heading"
            className="mt-6 max-w-3xl font-serif text-[clamp(2.2rem,4.5vw,4rem)] font-editorial leading-[1.08]"
          >
            {testimonials.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          {testimonials.items.map((t, i) => (
            <Reveal
              key={`${t.name}-${i}`}
              delay={i * 0.1}
              className={i === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-24'}
            >
              <figure>
                <span aria-hidden="true" className="block font-serif text-6xl leading-none text-champagne">
                  “
                </span>
                <blockquote className="mt-4 font-serif text-[clamp(1.35rem,2.2vw,1.85rem)] font-editorial italic leading-snug text-ivory/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-10 bg-champagne/70" />
                  <span>
                    <span className="eyebrow block text-[10px] text-ivory">{t.name}</span>
                    <span className="mt-1 block text-[12px] text-stone">{t.location}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
