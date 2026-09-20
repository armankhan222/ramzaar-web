import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { siteContent } from '../content/site';
import { WhatsAppLink } from './ui/WhatsAppLink';
import { useScrolled } from '../lib/hooks';
import { EASE } from './ui/Reveal';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(40);
  const { nav, brand, footer } = siteContent;

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ease-editorial ${
          scrolled && !open
            ? 'border-b border-ivory/10 bg-charcoal/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-[padding] duration-500 ease-editorial sm:px-8 lg:px-12 ${
            scrolled ? 'py-3' : 'py-5 lg:py-7'
          }`}
        >
          <a
            href="#top"
            aria-label={`${brand.name} — back to top`}
            className="font-serif text-xl tracking-[0.22em] text-ivory"
          >
            {brand.name}
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-500 ease-editorial group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <WhatsAppLink
              context={nav.cta.waContext}
              source="navigation"
              className="hidden items-center gap-2 border border-ivory/30 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-500 hover:border-champagne hover:text-champagne sm:inline-flex"
            >
              {nav.cta.label}
              <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
            </WhatsAppLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne lg:hidden"
            >
              {open ? <X size={18} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-charcoal lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="blueprint-dots flex flex-1 flex-col justify-center px-8 pb-24 pt-28 sm:px-12">
              <p className="eyebrow text-[9px] text-stone">Menu</p>
              <nav aria-label="Mobile" className="mt-8">
                <ul className="space-y-2">
                  {nav.links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.12 + i * 0.06, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-2 font-serif text-4xl text-ivory transition-colors duration-300 hover:text-champagne sm:text-5xl"
                      >
                        <span className="eyebrow text-[9px] text-stone">0{i + 1}</span>
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <motion.div
              className="border-t border-ivory/10 px-8 py-6 sm:px-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            >
              <WhatsAppLink
                context={nav.cta.waContext}
                source="mobile_menu"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 bg-ivory px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal transition-colors duration-500 hover:bg-ivory/85"
              >
                {nav.cta.label}
                <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
              </WhatsAppLink>
              <p className="mt-4 text-[12px] text-ivory/45">{footer.studioLine}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
