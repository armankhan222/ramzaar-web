import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WhatsAppLink } from './WhatsAppLink';

export function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      <WhatsAppLink
        context="general"
        source="floating_badge"
        aria-label="Chat with RAMZAAR on WhatsApp"
        className="group flex items-center gap-3 rounded-full border border-champagne/40 bg-charcoal/90 px-4 py-3 text-ivory shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-champagne hover:bg-charcoal hover:scale-105"
      >
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-champagne"></span>
        </span>
        <MessageCircle size={18} className="text-champagne transition-transform duration-300 group-hover:scale-110" />
        <span className="eyebrow hidden text-[10px] tracking-wider text-ivory sm:inline-block">
          Chat on WhatsApp
        </span>
      </WhatsAppLink>
    </motion.div>
  );
}
