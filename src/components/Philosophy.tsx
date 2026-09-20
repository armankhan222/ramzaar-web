import { siteContent } from '../content/site';
import { PlaceholderImage } from './ui/PlaceholderImage';
import { Reveal, SectionLabel } from './ui';

export function Philosophy() {
  const { philosophy } = siteContent;

  return (
    <section id="about" aria-labelledby="philosophy-heading" className="scroll-mt-20 bg-ivory text-charcoal">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-36 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* headline column — first on mobile, right column on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-8 lg:pl-10">
            <h2
              id="philosophy-heading"
              className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-editorial leading-[1.04]"
            >
              {philosophy.headlineLines.map((line, i) => (
                <Reveal key={line} delay={i * 0.08} y={20}>
                  <span
                    className={`block ${i === philosophy.headlineLines.length - 1 ? 'italic text-brown' : ''}`}
                    style={{ paddingLeft: `${i * 5}%` }}
                  >
                    {line}
                  </span>
                </Reveal>
              ))}
            </h2>
          </div>

          {/* supporting column */}
          <div className="order-2 lg:order-1 lg:col-span-4">
            <Reveal>
              <SectionLabel on="light">{philosophy.label}</SectionLabel>
              <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-charcoal/70">
                {philosophy.supporting}
              </p>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-charcoal/70">
                {philosophy.secondLine}
              </p>
              <span aria-hidden="true" className="mt-10 block h-px w-16 bg-charcoal/25" />
              <p className="mt-8 max-w-xs font-serif text-lg italic leading-snug text-brown">
                “{philosophy.pullQuote}”
              </p>
            </Reveal>
          </div>
        </div>

        {/* large tactile image, overlapping the next (charcoal) chapter */}
        <Reveal className="relative z-10 -mb-24 mt-16 sm:-mb-32 md:-mb-40 lg:-mb-48 lg:mt-24">
          <div className="lg:ml-[25%]">
            <PlaceholderImage slot={philosophy.image} aspect="16 / 10" placeholderTone="light" className="w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
