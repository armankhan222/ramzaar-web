import { siteContent } from '../content/site';
import { PlaceholderImage } from './ui/PlaceholderImage';
import { Reveal, SectionLabel } from './ui';

/** A small architectural cross tick. */
function Cross({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute h-4 w-4 ${className}`}>
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-champagne/60" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-champagne/60" />
    </span>
  );
}

export function SpaceSection() {
  const { space } = siteContent;

  return (
    <section
      id="dimensions"
      aria-labelledby="space-heading"
      className="scroll-mt-20 bg-charcoal text-ivory"
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-44 sm:px-8 sm:pt-56 md:pb-32 lg:px-12 lg:pt-72">
        <Reveal>
          <SectionLabel on="dark">{space.label}</SectionLabel>
          <h2
            id="space-heading"
            className="mt-6 font-serif text-[clamp(2.4rem,5.5vw,5rem)] font-editorial leading-[1.05]"
          >
            {space.headlineLines.map((line, i) => (
              <span key={line} className={`block ${i === 2 ? 'text-taupe' : ''}`}>
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/60">{space.copy}</p>
        </Reveal>

        {/* Architect's sheet: dotted grid, measurement lines, specification column */}
        <div className="blueprint-dots relative mt-16 border border-ivory/10 p-5 sm:p-10 lg:mt-24 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* specification column */}
            <dl className="order-2 self-start lg:order-1 lg:col-span-3 lg:pt-2">
              {space.specs.map((spec, i) => (
                <Reveal key={spec.label} delay={i * 0.05} y={14}>
                  <div className="border-t border-ivory/12 py-4">
                    <dt className="eyebrow text-[10px] text-stone">{spec.label}</dt>
                    <dd className="mt-1.5 font-serif text-xl text-ivory">{spec.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            {/* photograph with dimension lines */}
            <div className="order-1 lg:order-2 lg:col-span-9">
              <Reveal>
                <figure className="relative">
                  {/* width measurement */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-8 left-0 right-0 hidden items-center gap-3 sm:flex"
                  >
                    <span className="h-3 w-px bg-champagne/80" />
                    <span className="h-px flex-1 bg-champagne/45" />
                    <span className="eyebrow text-[9px] text-champagne">{space.measurements.width}</span>
                    <span className="h-px flex-1 bg-champagne/45" />
                    <span className="h-3 w-px bg-champagne/80" />
                  </div>
                  {/* depth measurement */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-8 bottom-0 top-0 hidden flex-col items-center gap-3 sm:flex"
                  >
                    <span className="h-px w-3 bg-champagne/80" />
                    <span className="w-px flex-1 bg-champagne/45" />
                    <span className="eyebrow text-[9px] text-champagne [writing-mode:vertical-rl]">
                      {space.measurements.depth}
                    </span>
                    <span className="w-px flex-1 bg-champagne/45" />
                    <span className="h-px w-3 bg-champagne/80" />
                  </div>
                  {/* corner cross ticks */}
                  <Cross className="-left-2 -top-2" />
                  <Cross className="-right-2 -top-2" />
                  <Cross className="-bottom-2 -left-2" />
                  <Cross className="-bottom-2 -right-2" />

                  <PlaceholderImage slot={space.image} aspect="16 / 10" placeholderTone="dark" className="w-full" />
                </figure>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow mt-8 text-[9px] text-stone">{space.caption}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
