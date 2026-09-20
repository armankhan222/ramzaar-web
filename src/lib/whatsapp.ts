import { WHATSAPP_NUMBER } from './config';

/* ————————————————————————————————————————————————————————————
   WHATSAPP
   ————————————————————————————————————————————————————————————
   Contextual pre-filled messages (brief §33). The number is
   configured centrally in lib/config.ts — never hardcode one
   anywhere else.
   ———————————————————————————————————————————————————————————— */

export type WhatsAppContext = 'general' | 'sofa' | 'curtains' | 'custom';

const MESSAGES: Record<WhatsAppContext, string> = {
  general: "Hello RAMZAAR, I'd like to discuss a custom furniture project.",
  sofa: "Hello RAMZAAR, I'm interested in creating a custom sofa. I'd like to discuss my space and requirements.",
  curtains: "Hello RAMZAAR, I'd like to discuss custom curtains for my space.",
  custom: "Hello RAMZAAR, I'd like to discuss a custom furniture project. Can we talk about the requirements?",
};

export function whatsappHref(context: WhatsAppContext = 'general'): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGES[context])}`;
}
