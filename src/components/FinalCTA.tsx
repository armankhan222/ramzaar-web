import { ArrowRight, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../lib/config';
import { siteContent } from '../content/site';
import { WhatsAppLink } from './ui/WhatsAppLink';
import { Reveal, SectionLabel } from './ui';
import { track } from '../lib/analytics';

const channelClass =
  'eyebrow inline-flex items-center gap-2 text-[10px] text-ivory/65 transition-colors duration-300 hover:text-ivory';

export function FinalCTA() {
  const { finalCta } = siteContent;
  const image = finalCta.image;

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-20 overflow-hidden bg-charcoal text-ivory"
    >
      {/* Photographic backdrop — renders only once CTA_IMAGE_REQUIRED is filled */}
      {image.src && (
        <>
          <img
            src={image.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(32,34,35,0.72) 0%, rgba(32,34,35,0.82) 50%, rgba(32,34,35,0.95) 100%)',
            }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-[1600px] px-5 py-28 text-center sm:px-8 md:py-40 lg:px-12">
        <Reveal>
          <SectionLabel on="dark" className="justify-center">
            {finalCta.label}
          </SectionLabel>
          <h2
            id="cta-heading"
            className="mx-auto mt-8 font-serif text-[clamp(3rem,8vw,7.5rem)] font-editorial leading-[0.98]"
          >
            {finalCta.headlineLines.map((line, i) => (
              <span key={line} className={`block ${i === 1 ? 'italic text-ivory/95' : ''}`}>
                {line.endsWith('.') ? (
                  <>
                    {line.slice(0, -1)}
                    <span className="text-champagne">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-ivory/70">
            {finalCta.supporting}
          </p>

          <div className="mt-12 flex justify-center">
            <WhatsAppLink
              context={finalCta.primary.waContext}
              source="final_cta"
              className="group inline-flex items-center gap-3 bg-ivory px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal transition-colors duration-500 hover:bg-ivory/85"
            >
              {finalCta.primary.label}
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
              />
            </WhatsAppLink>
          </div>

          <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-ivory/15 pt-8">
            <WhatsAppLink context="general" source="final_cta_row" className={channelClass}>
              <MessageCircle size={13} strokeWidth={1.5} aria-hidden="true" />
              WhatsApp
            </WhatsAppLink>
            <a
              href={CONTACT.phoneHref}
              onClick={() => track('phone_click', { source: 'final_cta' })}
              className={channelClass}
            >
              <Phone size={13} strokeWidth={1.5} aria-hidden="true" />
              Phone
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              onClick={() => track('email_click', { source: 'final_cta' })}
              className={channelClass}
            >
              <Mail size={13} strokeWidth={1.5} aria-hidden="true" />
              Email
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('instagram_click', { source: 'final_cta' })}
              className={channelClass}
            >
              <Instagram size={13} strokeWidth={1.5} aria-hidden="true" />
              Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
