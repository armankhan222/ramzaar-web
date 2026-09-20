import { useState } from 'react';
import { Plus } from 'lucide-react';
import { siteContent } from '../content/site';
import { WhatsAppLink } from './ui/WhatsAppLink';
import { Reveal, SectionLabel } from './ui';
import { track } from '../lib/analytics';

export function FAQ() {
  const { faq } = siteContent;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string, question: string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next !== null) track('faq_open', { question });
      return next;
    });
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 bg-ivory text-charcoal">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel on="light">{faq.label}</SectionLabel>
              <h2
                id="faq-heading"
                className="mt-6 font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-editorial leading-[1.08]"
              >
                {faq.headline}
              </h2>
              <p className="mt-8 max-w-xs text-[14px] leading-relaxed text-charcoal/60">{faq.note}</p>
              <WhatsAppLink
                context="general"
                source="faq"
                className="group mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal transition-colors duration-300 hover:text-brown"
              >
                {faq.noteCta}
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-charcoal/40 transition-all duration-500 ease-editorial group-hover:w-12 group-hover:bg-champagne"
                />
              </WhatsAppLink>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-charcoal/15">
              {faq.items.map((item, i) => {
                const id = `faq-${i}`;
                const open = openId === id;
                return (
                  <Reveal key={id} delay={i * 0.05} y={16}>
                    <div className="border-b border-charcoal/15">
                      <h3>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`${id}-panel`}
                          id={`${id}-button`}
                          onClick={() => toggle(id, item.q)}
                          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                        >
                          <span className="font-serif text-xl font-editorial md:text-2xl">{item.q}</span>
                          <span
                            aria-hidden="true"
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-editorial ${
                              open
                                ? 'rotate-45 border-champagne text-champagne'
                                : 'border-charcoal/25 text-charcoal/60 group-hover:border-charcoal/50'
                            }`}
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-button`}
                        className={`grid transition-[grid-template-rows] duration-500 ease-editorial ${
                          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-xl pb-7 text-[14px] leading-relaxed text-charcoal/70">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
