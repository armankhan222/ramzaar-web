# RAMZAAR — Made Around You.

Cinematic single-page site for the RAMZAAR custom furniture & home furnishing studio.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
```

## Replacing placeholders before launch

All editable content lives in **one place per concern**:

| What                     | Where                                                      |
| ------------------------ | ---------------------------------------------------------- |
| WhatsApp number          | `src/lib/config.ts` → `WHATSAPP_NUMBER` (digits only, international format, no `+`) |
| Phone / email / Instagram| `src/lib/config.ts` → `CONTACT`                            |
| Photography              | `src/content/images.ts` → swap `src: null` for a path under `public/images/`, adjust `alt` / `focal` |
| All copy                 | `src/content/site.ts`                                      |
| Testimonial quotes       | `src/content/site.ts` → `testimonials` (currently **placeholders** — replace with real client words) |
| Hero stand-in image      | `public/images/hero/hero-living-room.png` is an **AI-generated stand-in** — replace with real RAMZAAR photography |

Every image slot renders a branded placeholder block (tagged `*_IMAGE_REQUIRED`) until a real photo is supplied, so nothing on the page pretends to be RAMZAAR work.
