/* ————————————————————————————————————————————————————————————
   CENTRAL CONFIGURATION
   ————————————————————————————————————————————————————————————
   Replace every TODO(REPLACE) value before launch.
   ———————————————————————————————————————————————————————————— */

/**
 * WhatsApp number in international format — digits only.
 * No "+", spaces or dashes. e.g. "919869134207"
 */
export const WHATSAPP_NUMBER = '919869134207';

export const CONTACT = {
  phoneDisplay: '+91 98691 34207',
  phoneHref: 'tel:+919869134207',
  // TODO(REPLACE): real email before launch.
  email: 'hello@ramzaar.com',
  // TODO(REPLACE): real Instagram profile before launch.
  instagram: 'https://www.instagram.com/ramzaar',
  instagramHandle: '@ramzaar',
} as const;

export function isWhatsAppConfigured(): boolean {
  return !WHATSAPP_NUMBER.includes('REPLACE');
}
