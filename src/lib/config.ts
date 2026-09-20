/* ————————————————————————————————————————————————————————————
   CENTRAL CONFIGURATION
   ————————————————————————————————————————————————————————————
   Replace every TODO(REPLACE) value before launch.
   ———————————————————————————————————————————————————————————— */

/**
 * WhatsApp number in international format — digits only.
 * No "+", spaces or dashes. e.g. "919820123456"
 */
// TODO(REPLACE): client's real WhatsApp number.
export const WHATSAPP_NUMBER = 'REPLACE_WITH_CLIENT_NUMBER';

export const CONTACT = {
  // TODO(REPLACE): real phone number before launch.
  phoneDisplay: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  // TODO(REPLACE): real email before launch.
  email: 'hello@ramzaar.com',
  // TODO(REPLACE): real Instagram profile before launch.
  instagram: 'https://www.instagram.com/ramzaar',
  instagramHandle: '@ramzaar',
} as const;

export function isWhatsAppConfigured(): boolean {
  return !WHATSAPP_NUMBER.includes('REPLACE');
}
