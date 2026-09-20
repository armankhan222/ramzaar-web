import { useEffect, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { whatsappHref, type WhatsAppContext } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';
import { isWhatsAppConfigured } from '../../lib/config';

const warnedSources = new Set<string>();

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  context?: WhatsAppContext;
  /** Where in the site the click came from (for analytics). */
  source: string;
  children: ReactNode;
};

/** Every WhatsApp CTA on the site funnels through this link. */
export function WhatsAppLink({ context = 'general', source, children, onClick, ...rest }: Props) {
  useEffect(() => {
    if (!isWhatsAppConfigured() && import.meta.env.DEV && !warnedSources.has(source)) {
      warnedSources.add(source);
      // Visible only in development — set WHATSAPP_NUMBER in src/lib/config.ts.
      // eslint-disable-next-line no-console
      console.warn(`[ramzaar] WhatsApp number not configured yet (source: ${source}).`);
    }
  }, [source]);

  return (
    <a
      {...rest}
      href={whatsappHref(context)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track('whatsapp_click', { context, source });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
