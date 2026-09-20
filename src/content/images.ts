/* ————————————————————————————————————————————————————————————
   IMAGE MANIFEST
   ————————————————————————————————————————————————————————————
   · Every visual slot on the site is declared here.
   · Slots currently point at branded architectural placeholder
     illustrations in /public/images/placeholders/ — swap in a real
     photograph path (one line) once RAMZAAR photography is supplied.
   · The `tag` (e.g. HERO_IMAGE_REQUIRED) is kept on every slot as the
     search key for what still needs real photography.
   · `focal` controls object-position so furniture is never
     cropped out of frame.
   ———————————————————————————————————————————————————————————— */

export type ImageSlot = {
  /** Path to the image, or null to render the branded placeholder. */
  src: string | null;
  /** Meaningful alt text — describe the intended real photograph. */
  alt: string;
  /** object-position value, e.g. "center 30%". */
  focal?: string;
  /** Marker shown on the placeholder until real photography arrives. */
  tag: string;
  /** Placeholder tone. */
  tone?: 'dark' | 'light';
};

export const IMAGES = {
  /** High-resolution photograph of RAMZAAR living room hero elevation. */
  hero: {
    src: '/images/placeholders/hero.png',
    alt: 'High-resolution photograph of a contemporary living room elevation with a custom sofa, curtains and pendant light.',
    focal: 'center',
    tag: 'HERO_IMAGE',
    tone: 'dark',
  },
  philosophy: {
    src: '/images/philosophy.jpg',
    alt: 'Close material detail of RAMZAAR upholstery — fabric texture and hand stitching in warm natural light',
    focal: 'center',
    tag: 'PHILOSOPHY_IMAGE',
    tone: 'light',
  },
  space: {
    src: '/images/space.jpg',
    alt: 'A custom luxury RAMZAAR sectional sofa in a modern architectural living room',
    focal: 'center',
    tag: 'SOFA_IMAGE',
    tone: 'dark',
  },
  workSofas: {
    src: '/images/work-sofas.jpg',
    alt: 'Custom RAMZAAR sectional sofa tailored to the proportions of a living room',
    tag: 'WORK_SOFA_IMAGE',
    tone: 'light',
  },
  workUpholstery: {
    src: '/images/work-upholstery.jpg',
    alt: 'A re-upholstered lounge chair with fresh textured fabric and finished stitching',
    tag: 'WORK_UPHOLSTERY_IMAGE',
    tone: 'light',
  },
  workCurtains: {
    src: '/images/work-curtains.jpg',
    alt: 'Custom floor-to-ceiling silk and linen curtains finished to the architecture of a window',
    tag: 'WORK_CURTAINS_IMAGE',
    tone: 'light',
  },
  workCushions: {
    src: '/images/work-cushions.jpg',
    alt: 'Custom cushions and pillows in layered fabrics and finishes',
    tag: 'WORK_CUSHIONS_IMAGE',
    tone: 'light',
  },
  workBeds: {
    src: '/images/work-beds.jpg',
    alt: 'A custom channel-tufted upholstered bed and headboard in a master bedroom',
    tag: 'WORK_BEDS_IMAGE',
    tone: 'light',
  },
  workChairs: {
    src: '/images/work-chairs.jpg',
    alt: 'A custom accent lounge chair with tailored upholstery',
    tag: 'WORK_CHAIRS_IMAGE',
    tone: 'light',
  },
  craftMaterial: {
    src: '/images/craft-material.jpg',
    alt: 'Premium fabric swatches, leather samples, and material textures in the RAMZAAR workshop',
    tag: 'CRAFT_MATERIAL_IMAGE',
    tone: 'dark',
  },
  craftDetail: {
    src: '/images/craft-detail.jpg',
    alt: 'Close-up of artisan hands stitching and hand-piping upholstery detail at the workshop',
    tag: 'CRAFT_DETAIL_IMAGE',
    tone: 'dark',
  },
  craftConstruction: {
    src: '/images/craft-construction.jpg',
    alt: 'The wooden frame, high-density foam, and webbing structure under construction',
    tag: 'CRAFT_CONSTRUCTION_IMAGE',
    tone: 'dark',
  },
  craftFinish: {
    src: '/images/craft-finish.jpg',
    alt: 'Final quality inspection and finishing touches on a custom RAMZAAR sofa',
    tag: 'CRAFT_FINISH_IMAGE',
    tone: 'dark',
  },
  finalCta: {
    src: '/images/final-cta.jpg',
    alt: 'A finished RAMZAAR living space in warm dusk architectural light',
    focal: 'center',
    tag: 'CTA_IMAGE',
    tone: 'dark',
  },
} satisfies Record<string, ImageSlot>;
