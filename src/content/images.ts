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
  /** TODO(REPLACE): branded placeholder illustration — swap for real RAMZAAR photography. */
  hero: {
    src: '/images/placeholders/hero.png',
    alt: 'Placeholder illustration of a contemporary living room elevation with a custom sofa, curtains and pendant light. Swap with real RAMZAAR photography.',
    focal: 'center',
    tag: 'HERO_IMAGE_REQUIRED',
    tone: 'dark',
  },
  philosophy: {
    src: '/images/placeholders/philosophy.svg',
    alt: 'Close material detail of RAMZAAR upholstery — fabric texture and stitching in warm light',
    focal: 'center',
    tag: 'PHILOSOPHY_IMAGE_REQUIRED',
    tone: 'light',
  },
  space: {
    src: '/images/placeholders/space.svg',
    alt: 'A custom RAMZAAR sofa seen straight on in a contemporary Indian living room',
    focal: 'center',
    tag: 'SOFA_IMAGE_REQUIRED',
    tone: 'dark',
  },
  workSofas: {
    src: '/images/placeholders/work-sofas.svg',
    alt: 'Custom RAMZAAR sectional sofa tailored to the proportions of a living room',
    tag: 'WORK_SOFA_IMAGE_REQUIRED',
    tone: 'light',
  },
  workUpholstery: {
    src: '/images/placeholders/work-upholstery.svg',
    alt: 'A re-upholstered chair with fresh fabric and finished stitching',
    tag: 'WORK_UPHOLSTERY_IMAGE_REQUIRED',
    tone: 'light',
  },
  workCurtains: {
    src: '/images/placeholders/work-curtains.svg',
    alt: 'Custom curtains finished to the architecture of a window',
    tag: 'WORK_CURTAINS_IMAGE_REQUIRED',
    tone: 'light',
  },
  workCushions: {
    src: '/images/placeholders/work-cushions.svg',
    alt: 'Custom cushions and pillows in layered fabrics and finishes',
    tag: 'WORK_CUSHIONS_IMAGE_REQUIRED',
    tone: 'light',
  },
  workBeds: {
    src: '/images/placeholders/work-beds.svg',
    alt: 'A custom upholstered bed and headboard in a proportioned bedroom',
    tag: 'WORK_BEDS_IMAGE_REQUIRED',
    tone: 'light',
  },
  workChairs: {
    src: '/images/placeholders/work-chairs.svg',
    alt: 'A custom accent chair with tailored upholstery',
    tag: 'WORK_CHAIRS_IMAGE_REQUIRED',
    tone: 'light',
  },
  craftMaterial: {
    src: '/images/placeholders/craft-material.svg',
    alt: 'Fabric samples and material textures in the RAMZAAR workshop',
    tag: 'CRAFT_MATERIAL_IMAGE_REQUIRED',
    tone: 'dark',
  },
  craftDetail: {
    src: '/images/placeholders/craft-detail.svg',
    alt: 'Close-up of hand stitching and upholstery detail at the workshop',
    tag: 'CRAFT_DETAIL_IMAGE_REQUIRED',
    tone: 'dark',
  },
  craftConstruction: {
    src: '/images/placeholders/craft-construction.svg',
    alt: 'The wooden frame and structure of a piece under construction',
    tag: 'CRAFT_CONSTRUCTION_IMAGE_REQUIRED',
    tone: 'dark',
  },
  craftFinish: {
    src: '/images/placeholders/craft-finish.svg',
    alt: 'Final finishing and installation of a finished RAMZAAR piece',
    tag: 'CRAFT_FINISH_IMAGE_REQUIRED',
    tone: 'dark',
  },
  finalCta: {
    src: '/images/placeholders/final-cta.svg',
    alt: 'A finished RAMZAAR living space in warm evening light',
    focal: 'center',
    tag: 'CTA_IMAGE_REQUIRED',
    tone: 'dark',
  },
} satisfies Record<string, ImageSlot>;
