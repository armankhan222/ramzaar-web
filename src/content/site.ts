import { IMAGES } from './images';
import type { WhatsAppContext } from '../lib/whatsapp';

/* ————————————————————————————————————————————————————————————
   SITE CONTENT (brief §47)
   ————————————————————————————————————————————————————————————
   The single source of truth for every word on the page.
   Components never hardcode copy — they read from here.
   ———————————————————————————————————————————————————————————— */

export type HeroCallout = {
  id: string;
  /** Anchor point as a fraction of the hero's width / height (0–1). */
  x: number;
  y: number;
  label: string;
  note: string;
  /** Which way the annotation line points. */
  direction: 'up' | 'down';
  /** Shown on mobile as a compact marker. */
  onMobile: boolean;
};

export const siteContent = {
  brand: {
    name: 'RAMZAAR',
    tagline: 'Made Around You.',
    description: 'Custom Furniture & Home Furnishing Studio',
  },

  nav: {
    links: [
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'Craft', href: '#craft' },
      { label: 'Spaces', href: '#spaces' },
      { label: 'About', href: '#about' },
    ],
    cta: { label: 'Start Your Project', waContext: 'general' as WhatsAppContext },
  },

  hero: {
    label: 'RAMZAAR — Custom Furniture & Home Furnishing Studio',
    headlineLines: ['MADE', 'AROUND', 'YOU.'],
    supporting: 'Custom furniture and furnishing, considered around your space and the way you live.',
    cta: { label: 'Start Your Project', waContext: 'general' as WhatsAppContext },
    secondary: { label: 'Explore Our Work', href: '#work' },
    scrollIndicator: 'Scroll to explore',
    /** Annotation anchors — % positions tuned to the hero photograph. */
    callouts: [
      { id: 'sofa', x: 0.32, y: 0.66, label: 'Custom Sofa', note: 'Made to your dimensions', direction: 'up', onMobile: true },
      { id: 'upholstery', x: 0.44, y: 0.56, label: 'Upholstery', note: 'Selected around your space', direction: 'up', onMobile: false },
      { id: 'curtains', x: 0.86, y: 0.26, label: 'Curtains', note: 'Finished to the architecture', direction: 'down', onMobile: false },
    ] as HeroCallout[],
  },

  philosophy: {
    label: 'Philosophy',
    headlineLines: ['Furniture', 'should begin', 'with the', 'space.'],
    supporting:
      'It should begin with the people who use it, the dimensions of the room, and the way that space is lived in.',
    secondLine: 'RAMZAAR creates custom furniture and home furnishings around those details.',
    pullQuote:
      'Designed for spaces where mornings are quiet, evenings are shared, and furniture becomes part of everyday life.',
    image: IMAGES.philosophy,
  },

  space: {
    label: 'Made Around Your Space',
    headlineLines: ['YOUR ROOM.', 'YOUR DIMENSIONS.', 'YOUR PIECE.'],
    copy: 'Every piece starts as a drawing of your room — its dimensions, its light, its rhythm — and becomes furniture that belongs there.',
    measurements: { width: '2400 MM', depth: '900 MM' },
    specs: [
      { label: 'Width', value: '2400 mm' },
      { label: 'Depth', value: '900 mm' },
      { label: 'Fabric', value: 'Custom selection' },
      { label: 'Comfort', value: 'Tailored' },
      { label: 'Finish', value: 'Selected around space' },
    ],
    caption: 'Every piece begins with measurement',
    image: IMAGES.space,
  },

  process: {
    label: 'The Process',
    headlineLines: ['FROM SPACE', 'TO FINISHED PIECE.'],
    stages: [
      {
        num: '01',
        name: 'MEASURE',
        description:
          'We study your room — its dimensions, light and rhythm — so the piece is designed around the space it will live in.',
      },
      {
        num: '02',
        name: 'CHOOSE',
        description:
          'Together we select materials, colours and fabrics that suit the room, the way you use it, and your character.',
      },
      {
        num: '03',
        name: 'CUSTOMIZE',
        description:
          'Dimensions, comfort, shape and finish are tailored precisely to your requirements. Nothing comes off a shelf.',
      },
      {
        num: '04',
        name: 'CRAFT',
        description:
          'The piece is built with care in our workshop — structure, stitching and finishing, checked at every step.',
      },
      {
        num: '05',
        name: 'DELIVER',
        description:
          'We deliver, place and install the finished piece — and make sure it sits exactly as it should in your space.',
      },
    ],
  },

  work: {
    label: 'Portfolio',
    headline: 'OUR WORK',
    supporting: 'Made for individual spaces, not mass-produced for a catalogue.',
    items: [
      {
        id: 'sofas',
        category: 'Custom Sofas & Sectionals',
        description: 'Made around dimensions, comfort and character.',
        waContext: 'sofa' as WhatsAppContext,
        image: IMAGES.workSofas,
        aspect: '4 / 3',
      },
      {
        id: 'upholstery',
        category: 'Upholstery & Re-upholstery',
        description: 'Existing furniture given a considered new life.',
        waContext: 'custom' as WhatsAppContext,
        image: IMAGES.workUpholstery,
        aspect: '3 / 4',
      },
      {
        id: 'curtains',
        category: 'Curtains & Pardas',
        description: 'Window treatments shaped around architecture and light.',
        waContext: 'curtains' as WhatsAppContext,
        image: IMAGES.workCurtains,
        aspect: '3 / 4',
      },
      {
        id: 'cushions',
        category: 'Cushions & Pillows',
        description: 'Custom shapes, fabrics and finishing details.',
        waContext: 'custom' as WhatsAppContext,
        image: IMAGES.workCushions,
        aspect: '1 / 1',
      },
      {
        id: 'beds',
        category: 'Beds & Headboards',
        description: 'Designed around room proportions and everyday comfort.',
        waContext: 'custom' as WhatsAppContext,
        image: IMAGES.workBeds,
        aspect: '4 / 5',
      },
      {
        id: 'chairs',
        category: 'Accent & Office Chairs',
        description: 'Comfortable pieces designed for function and character.',
        waContext: 'custom' as WhatsAppContext,
        image: IMAGES.workChairs,
        aspect: '4 / 3',
      },
    ],
  },

  craft: {
    label: 'Craftsmanship',
    headlineLines: ['CRAFTED,', 'NOT MASS-PRODUCED.'],
    supporting:
      'The finished piece is only part of the story. The difference is in what happens between the design and the final installation.',
    steps: [
      {
        num: '01',
        name: 'MATERIAL',
        description: 'Fabric, texture and colour — selected around the space and the way it is used.',
        image: IMAGES.craftMaterial,
      },
      {
        num: '02',
        name: 'DETAIL',
        description: 'Stitching and upholstery, measured and finished by hand.',
        image: IMAGES.craftDetail,
      },
      {
        num: '03',
        name: 'CONSTRUCTION',
        description: 'Structure and build — the part of the piece you will never see, and always feel.',
        image: IMAGES.craftConstruction,
      },
      {
        num: '04',
        name: 'FINISH',
        description: 'Final preparation and installation, until the piece belongs to the room.',
        image: IMAGES.craftFinish,
      },
    ],
  },

  sectors: {
    label: 'Sectors',
    headline: 'MADE FOR DIFFERENT SPACES.',
    items: [
      { name: 'HOMES', description: 'Living rooms, bedrooms and family spaces, made around the way you live.' },
      { name: 'OFFICES', description: 'Workspaces that balance comfort, character and professionalism.' },
      { name: 'HOTELS', description: 'Furniture and furnishing built for hospitality-grade durability.' },
      { name: 'RESTAURANTS', description: 'Seating and interiors shaped around service and atmosphere.' },
      { name: 'CAFÉS', description: 'Compact, characterful pieces for everyday gathering spaces.' },
    ],
  },

  // ————————————————————————————————————————————————————————————
  // NOTE: PLACEHOLDER QUOTES — replace with real client words
  // before launch (brief §30: never publish invented testimonials).
  // ————————————————————————————————————————————————————————————
  testimonials: {
    label: 'Testimonials',
    headline: 'FROM THE PEOPLE WHO LIVE WITH IT.',
    items: [
      {
        quote:
          'We had a very specific size requirement for our living room. RAMZAAR understood the space and got the proportions exactly right.',
        name: 'Client Name',
        location: 'Mumbai',
      },
      {
        quote:
          'The sofa and curtains feel made for this home — because they were. The whole process was clear, unhurried and precise.',
        name: 'Client Name',
        location: 'Thane',
      },
    ],
  },

  faq: {
    label: 'FAQ',
    headline: 'QUESTIONS, ANSWERED.',
    note: 'Anything else you would like to ask?',
    noteCta: 'Ask on WhatsApp',
    items: [
      {
        q: 'How does customization work?',
        a: 'Every project begins with your space — its dimensions, light and how you use it. We recommend designs, materials and finishes, then tailor dimensions, comfort and details to your requirements before anything is made.',
      },
      {
        q: 'How do you take measurements?',
        a: 'Our team visits your space to measure and study the room directly. Where a visit is not possible, we guide you through accurate measurements over WhatsApp, with photos.',
      },
      {
        q: 'How long does a custom piece take?',
        a: 'Timelines depend on the piece and the materials. Most custom furniture takes a few weeks from confirmation to installation — and you get a clear schedule before work begins.',
      },
      {
        q: 'Can I choose my own fabric?',
        a: 'Yes. Choose from our curated selection, or share a fabric you have in mind. We advise on durability, texture and colour so the material suits both the piece and the space.',
      },
      {
        q: 'Do you deliver and install?',
        a: 'Yes. Every piece is delivered, placed and installed by our team — and we make sure it sits exactly as it should in your room.',
      },
      {
        q: 'Which locations do you serve?',
        a: 'We serve Mumbai, Thane and Navi Mumbai. For anywhere else, message us on WhatsApp and we will let you know what is possible.',
      },
    ],
  },

  finalCta: {
    label: 'Start Your Project',
    headlineLines: ['TELL US', 'ABOUT YOUR SPACE.'],
    supporting: 'Tell us what you’re looking to create. We’ll take it from there.',
    primary: { label: 'Start Your Project', waContext: 'general' as WhatsAppContext },
    image: IMAGES.finalCta,
  },

  footer: {
    blurb: 'Custom furniture & home furnishing studio — made around your space, your dimensions and your way of living.',
    exploreHeading: 'Explore',
    contactHeading: 'Contact',
    locationsHeading: 'Serving',
    locations: ['Mumbai', 'Thane', 'Navi Mumbai'],
    studioLine: 'Custom Furniture & Home Furnishing Studio',
  },
} as const;
