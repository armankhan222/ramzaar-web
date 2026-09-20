import { ArrowUpRight, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../lib/config';
import { siteContent } from '../content/site';
import { WhatsAppLink } from './ui/WhatsAppLink';
import { track } from '../lib/analytics';

export function Footer() {
  const { footer, nav, brand } = siteContent;
  const year = new Date().getFullYear();

  const exploreLinks = [...nav.links, { label: 'Contact', href: '#contact' }];

  return (
    <footer className="border-t border-ivory/10 bg-charcoal text-ivory">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <p className="font-serif text-2xl tracking-[0.22em]">{brand.name}</p>
            <p className="mt-3 font-serif text-lg italic text-champagne">{brand.tagline}</p>
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-ivory/55">{footer.blurb}</p>
          </div>

          {/* Explore */}
          <nav className="md:col-span-2" aria-label="Footer">
            <p className="eyebrow text-[9px] text-stone">{footer.exploreHeading}</p>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="eyebrow text-[9px] text-stone">{footer.contactHeading}</p>
            <ul className="mt-5 space-y-3 text-[13px]">
              <li>
                <WhatsAppLink
                  context="general"
                  source="footer"
                  className="inline-flex items-center gap-2 text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  <MessageCircle size={13} strokeWidth={1.5} aria-hidden="true" />
                  WhatsApp
                </WhatsAppLink>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => track('phone_click', { source: 'footer' })}
                  className="inline-flex items-center gap-2 text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  <Phone size={13} strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  onClick={() => track('email_click', { source: 'footer' })}
                  className="inline-flex items-center gap-2 text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  <Mail size={13} strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('instagram_click', { source: 'footer' })}
                  className="inline-flex items-center gap-2 text-ivory/70 transition-colors duration-300 hover:text-ivory"
                >
                  <Instagram size={13} strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT.instagramHandle}
                  <ArrowUpRight size={11} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="md:col-span-2">
            <p className="eyebrow text-[9px] text-stone">{footer.locationsHeading}</p>
            <p className="mt-5 text-[13px] leading-loose text-ivory/70">
              {footer.locations.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[11px] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p className="eyebrow text-[9px]">{footer.studioLine}</p>
        </div>
      </div>
    </footer>
  );
}
