import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';
import { Reveal, SectionLabel } from './ui';
import { WhatsAppLink } from './ui/WhatsAppLink';
import { track } from '../lib/analytics';
import { useHoverCapable } from '../lib/hooks';

export interface UnifiedItem {
  id: string;
  patternNumber: string;
  category: 'sofas' | 'chairs' | 'office' | 'beds' | 'pillows' | 'roomsets';
  categoryLabel: string;
  title: string;
  src: string;
  dimensions: string;
  materials: string;
  description: string;
  aspect?: string;
}

export const MASTER_COLLECTION_ITEMS: UnifiedItem[] = [
  // ————— 1. SOFAS (10 Patterns) —————
  {
    id: 'sofa-1',
    patternNumber: 'PATTERN 01',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Arch L-Shape Sectional',
    src: '/images/catalog/sofa_1.jpg',
    dimensions: '3200 MM × 1800 MM × 850 MM',
    materials: 'Warm Ivory Belgian Linen • Kiln-Dried Hardwood Frame',
    description: 'Generous L-shaped sectional sofa with deep seat cushions, tailored French piping, and a low architectural silhouette.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'sofa-2',
    patternNumber: 'PATTERN 02',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Haven Modular Lounge',
    src: '/images/catalog/sofa_2.jpg',
    dimensions: '2800 MM × 1000 MM × 780 MM',
    materials: 'Sand Taupe Textured Weave • Natural Oak Base',
    description: 'Low-profile modular sofa system featuring soft plush cushioning and a solid natural oak structural base.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'sofa-3',
    patternNumber: 'PATTERN 03',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Contour Curved Sofa',
    src: '/images/catalog/sofa_3.jpg',
    dimensions: '2600 MM × 1100 MM × 820 MM',
    materials: 'Cream Off-White Bouclé • Brass Foot Accents',
    description: 'Sculptural organic curved sofa upholstered in tactile bouclé fabric, ideal for modern architectural living rooms.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'sofa-4',
    patternNumber: 'PATTERN 04',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Legacy Leather Chesterfield',
    src: '/images/catalog/sofa_4.jpg',
    dimensions: '2400 MM × 950 MM × 800 MM',
    materials: 'Full-Grain Vintage Tobacco Leather • Hand-Buttoned Tufting',
    description: 'Classic deep button-tufted leather sofa crafted by hand with hand-antiqued leather and hardwood frame.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'sofa-5',
    patternNumber: 'PATTERN 05',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Minimal 3-Seater Bench Sofa',
    src: '/images/catalog/sofa_5.jpg',
    dimensions: '2200 MM × 900 MM × 800 MM',
    materials: 'Deep Charcoal Wool Blend • Black Steel Legs',
    description: 'Clean-lined contemporary 3-seater sofa with slim profile track arms and dark steel stiletto legs.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'sofa-6',
    patternNumber: 'PATTERN 06',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Nordic Oak Frame Sofa',
    src: '/images/catalog/sofa_6.jpg',
    dimensions: '2300 MM × 920 MM × 840 MM',
    materials: 'Solid Natural Oak Chassis • Off-White Linen Blend',
    description: 'Exposed solid oak wooden frame sofa showcasing precision joinery and plush feather-down back cushions.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'sofa-7',
    patternNumber: 'PATTERN 07',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Velvet Tufted Italian Sofa',
    src: '/images/catalog/sofa_7.jpg',
    dimensions: '2500 MM × 960 MM × 820 MM',
    materials: 'Muted Olive Green Velvet • Polished Brass Frame',
    description: 'Luxurious channel-tufted velvet sofa with brushed champagne metallic base and enveloping seat depth.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'sofa-8',
    patternNumber: 'PATTERN 08',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Loft Corner Convertible',
    src: '/images/catalog/sofa_8.jpg',
    dimensions: '2900 MM × 1700 MM × 800 MM',
    materials: 'Soft Taupe Velvet • Multi-Density Ergonomic Foam',
    description: 'Versatile corner sectional sofa offering relaxed seating posture and removable washable slipcovers.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'sofa-9',
    patternNumber: 'PATTERN 09',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Atelier Daybed Lounge',
    src: '/images/catalog/sofa_9.jpg',
    dimensions: '2000 MM × 900 MM × 650 MM',
    materials: 'Natural Linen • Leather Cylindrical Bolsters',
    description: 'Architectural daybed sofa featuring twin leather bolster pillows and a low solid wood plinth.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'sofa-10',
    patternNumber: 'PATTERN 10',
    category: 'sofas',
    categoryLabel: 'Custom Sofa',
    title: 'The Sanctuary Floor Sectional',
    src: '/images/catalog/sofa_10.jpg',
    dimensions: '3000 MM × 1000 MM × 720 MM',
    materials: 'Woven Sand Fabric • Ultra-Soft Down Cushioning',
    description: 'Low-slung floor sofa designed for casual relaxation with deep proportions and modular arrangement.',
    aspect: 'aspect-[16/10]',
  },

  // ————— 2. ACCENT CHAIRS (10 Patterns) —————
  {
    id: 'chair-1',
    patternNumber: 'PATTERN 01',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Sculpted Oak Armchair',
    src: '/images/catalog/chair_1.jpg',
    dimensions: '820 MM × 850 MM × 780 MM',
    materials: 'Dark Oak Shell • Charcoal Upholstery',
    description: 'Sculptural lounge chair with an architectural wooden shell frame and deep seat cushion.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'chair-2',
    patternNumber: 'PATTERN 02',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Bouclé Swivel Barrel Chair',
    src: '/images/catalog/chair_2.jpg',
    dimensions: '880 MM × 880 MM × 760 MM',
    materials: 'Cream Off-White Bouclé • 360° Concealed Swivel',
    description: 'Curved cocoon barrel armchair featuring a smooth 360-degree swivel mechanism and soft bouclé texture.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'chair-3',
    patternNumber: 'PATTERN 03',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Walnut Shell Lounge Chair',
    src: '/images/catalog/chair_3.jpg',
    dimensions: '850 MM × 900 MM × 820 MM',
    materials: 'Solid American Walnut • Black Aniline Leather',
    description: 'Mid-century lounge chair crafted from steam-bent walnut plywood and supple grain leather cushions.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'chair-4',
    patternNumber: 'PATTERN 04',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Cognac Leather Club Chair',
    src: '/images/catalog/chair_4.jpg',
    dimensions: '900 MM × 920 MM × 800 MM',
    materials: 'Full-Grain Cognac Leather • Antiqued Brass Studs',
    description: 'Classic deep-seat club chair with hand-stitched leather seams and warm brass accent detailing.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'chair-5',
    patternNumber: 'PATTERN 05',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The High Wingback Reading Chair',
    src: '/images/catalog/chair_5.jpg',
    dimensions: '860 MM × 900 MM × 1050 MM',
    materials: 'Champagne Linen Blend • Tapered Oak Legs',
    description: 'Elegant wingback lounge chair designed for study reading corners with high backrest lumbar support.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'chair-6',
    patternNumber: 'PATTERN 06',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Minimalist Steel Lounge Chair',
    src: '/images/catalog/chair_6.jpg',
    dimensions: '780 MM × 820 MM × 740 MM',
    materials: 'Black Powder-Coated Steel • Matte Black Leather',
    description: 'Sleek architectural lounge chair with an exposed steel rod frame and suspended leather seat.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'chair-7',
    patternNumber: 'PATTERN 07',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Low Velvet Floor Armchair',
    src: '/images/catalog/chair_7.jpg',
    dimensions: '920 MM × 950 MM × 680 MM',
    materials: 'Soft Taupe Velvet • High-Resilience Foam',
    description: 'Enveloping low floor armchair featuring plush channel tufting and a relaxed seat angle.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'chair-8',
    patternNumber: 'PATTERN 08',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Round Tub Swivel Chair',
    src: '/images/catalog/chair_8.jpg',
    dimensions: '840 MM × 840 MM × 750 MM',
    materials: 'Woven Ivory Fabric • Brushed Gold Swivel Base',
    description: 'Compact tub armchair with curved backrest contour and concealed smooth swivel base.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'chair-9',
    patternNumber: 'PATTERN 09',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Rattan & Solid Oak Armchair',
    src: '/images/catalog/chair_9.jpg',
    dimensions: '750 MM × 800 MM × 820 MM',
    materials: 'Natural Rattan Cane • Solid Oak Frame',
    description: 'Hand-woven cane webbed armchair with solid oak frame and loose seat cushion.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'chair-10',
    patternNumber: 'PATTERN 10',
    category: 'chairs',
    categoryLabel: 'Accent Chair',
    title: 'The Forest Velvet Sculptural Chair',
    src: '/images/catalog/chair_10.jpg',
    dimensions: '860 MM × 880 MM × 850 MM',
    materials: 'Forest Green Velvet • Champagne Metal Frame',
    description: 'Statement lounge chair showcasing sculptural geometric armrests and rich velvet upholstery.',
    aspect: 'aspect-[1/1]',
  },

  // ————— 3. OFFICE CHAIRS (10 Patterns) —————
  {
    id: 'office-1',
    patternNumber: 'PATTERN 01',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The High-Back Executive Leather Chair',
    src: '/images/catalog/office_1.jpg',
    dimensions: '680 MM × 700 MM × 1180 MM',
    materials: 'Black Aniline Leather • Polished Aluminum 5-Star Base',
    description: 'Premium executive office chair with ergonomic lumbar support, tilt control, and pneumatic height adjustment.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'office-2',
    patternNumber: 'PATTERN 02',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Nordic Oak Studio Task Chair',
    src: '/images/catalog/office_2.jpg',
    dimensions: '620 MM × 640 MM × 920 MM',
    materials: 'Solid Oak Shell • Charcoal Upholstered Seat',
    description: 'Ergonomic wooden desk chair designed for home offices and design studios with 360-degree swivel.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'office-3',
    patternNumber: 'PATTERN 03',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Mid-Century Ribbed Desk Chair',
    src: '/images/catalog/office_3.jpg',
    dimensions: '640 MM × 660 MM × 950 MM',
    materials: 'Cognac Leather • Chrome Swivel Base',
    description: 'Iconic ribbed leather task chair with tilt tension mechanism and durable castors.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'office-4',
    patternNumber: 'PATTERN 04',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Upholstered Taupe Swivel Chair',
    src: '/images/catalog/office_4.jpg',
    dimensions: '650 MM × 650 MM × 900 MM',
    materials: 'Warm Taupe Linen Fabric • Black Steel Base',
    description: 'Comfortable upholstered home office chair combining dining chair aesthetics with desk swivel functionality.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'office-5',
    patternNumber: 'PATTERN 05',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Low-Back Leather Executive Chair',
    src: '/images/catalog/office_5.jpg',
    dimensions: '660 MM × 680 MM × 880 MM',
    materials: 'Chestnut Brown Leather • Brushed Brass Base',
    description: 'Refined low-back conference and desk chair featuring padded armrests and smooth leather finish.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'office-6',
    patternNumber: 'PATTERN 06',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Minimalist White & Chrome Chair',
    src: '/images/catalog/office_6.jpg',
    dimensions: '600 MM × 620 MM × 910 MM',
    materials: 'Pure White Leatherette • Polished Chrome Base',
    description: 'Sleek modern office chair ideal for light minimalist work spaces and meeting rooms.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'office-7',
    patternNumber: 'PATTERN 07',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Ergonomic Mesh Executive Chair',
    src: '/images/catalog/office_7.jpg',
    dimensions: '700 MM × 720 MM × 1250 MM',
    materials: 'Breathable High-Tension Mesh • Adjustable Headrest',
    description: 'High-performance ergonomic office chair with adjustable 3D armrests, headrest, and dynamic lumbar lock.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'office-8',
    patternNumber: 'PATTERN 08',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Velvet Home Study Chair',
    src: '/images/catalog/office_8.jpg',
    dimensions: '630 MM × 650 MM × 890 MM',
    materials: 'Slate Blue Velvet • Gold Metal Swivel Legs',
    description: 'Stylish home office swivel chair with soft padded velvet seat and decorative stitching.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'office-9',
    patternNumber: 'PATTERN 09',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Solid Wood Swivel Armchair',
    src: '/images/catalog/office_9.jpg',
    dimensions: '650 MM × 670 MM × 860 MM',
    materials: 'Curved American Walnut • Black Leather Cushion',
    description: 'Handcrafted solid wood executive chair featuring a wooden backrest curve and swivel star base.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'office-10',
    patternNumber: 'PATTERN 10',
    category: 'office',
    categoryLabel: 'Office Chair',
    title: 'The Padded Charcoal Conference Chair',
    src: '/images/catalog/office_10.jpg',
    dimensions: '670 MM × 680 MM × 940 MM',
    materials: 'Deep Charcoal Fabric • Matte Black Base',
    description: 'Enveloping padded desk chair designed for long hours of comfortable working and executive meetings.',
    aspect: 'aspect-[16/10]',
  },

  // ————— 4. BEDS & HEADBOARDS (10 Patterns) —————
  {
    id: 'bed-1',
    patternNumber: 'PATTERN 01',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Channel-Tufted Linen King Bed',
    src: '/images/catalog/bed_1.jpg',
    dimensions: '2100 MM × 2200 MM × 1300 MM',
    materials: 'Belgian Cream Linen • Kiln-Dried Hardwood Structure',
    description: 'Bespoke king bed featuring vertical channel-tufted upholstered headboard and low-profile padded frame.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'bed-2',
    patternNumber: 'PATTERN 02',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Curved Walnut Platform Bed',
    src: '/images/catalog/bed_2.jpg',
    dimensions: '2050 MM × 2150 MM × 1100 MM',
    materials: 'Solid American Walnut • Cream Fabric Headboard',
    description: 'Architectural wooden bed frame with rounded walnut corner legs and a padded linen insert headboard.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'bed-3',
    patternNumber: 'PATTERN 03',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Japanese Low Oak Platform Bed',
    src: '/images/catalog/bed_3.jpg',
    dimensions: '2200 MM × 2300 MM × 750 MM',
    materials: 'Natural Oak Timber • Built-In Side Ledges',
    description: 'Minimalist low-slung platform bed inspired by Japanese aesthetics with extended wooden side ledges.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'bed-4',
    patternNumber: 'PATTERN 04',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Velvet Wingback Master Bed',
    src: '/images/catalog/bed_4.jpg',
    dimensions: '2150 MM × 2250 MM × 1400 MM',
    materials: 'Sand Velvet Upholstery • Brass Nailhead Trim',
    description: 'Grand wingback upholstered bed with deep padding, tactile velvet finish, and subtle brass detail.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'bed-5',
    patternNumber: 'PATTERN 05',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Floating Bed with Integrated Lighting',
    src: '/images/catalog/bed_5.jpg',
    dimensions: '2000 MM × 2100 MM × 1050 MM',
    materials: 'Muted Taupe Upholstery • Warm Concealed LED Base',
    description: 'Modern floating platform bed with concealed underside ambient LED illumination and padded headboard.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'bed-6',
    patternNumber: 'PATTERN 06',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Button-Tufted Charcoal Bed',
    src: '/images/catalog/bed_6.jpg',
    dimensions: '2100 MM × 2200 MM × 1350 MM',
    materials: 'Deep Charcoal Woven Fabric • Hardwood Frame',
    description: 'Classic diamond button-tufted tall headboard bed tailored for luxury master bedroom suites.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'bed-7',
    patternNumber: 'PATTERN 07',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Wood & Upholstered Hybrid Bed',
    src: '/images/catalog/bed_7.jpg',
    dimensions: '2050 MM × 2180 MM × 1150 MM',
    materials: 'Dark Oak Frame • Warm Grey Linen Panels',
    description: 'Sophisticated bed combining dark oak wooden frame borders with soft upholstered headboard panels.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'bed-8',
    patternNumber: 'PATTERN 08',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Bouclé Rounded Platform Bed',
    src: '/images/catalog/bed_8.jpg',
    dimensions: '2120 MM × 2220 MM × 1100 MM',
    materials: 'Off-White Soft Bouclé • Padded Frame Borders',
    description: 'Soft organic bed frame upholstered entirely in plush off-white bouclé fabric with rounded edges.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'bed-9',
    patternNumber: 'PATTERN 09',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Four-Poster Modern Canopy Bed',
    src: '/images/catalog/bed_9.jpg',
    dimensions: '2100 MM × 2200 MM × 2100 MM',
    materials: 'Solid Dark Walnut Posts • Cream Headboard',
    description: 'Contemporary slim-profile four-poster canopy bed in dark walnut timber with upholstered headboard.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'bed-10',
    patternNumber: 'PATTERN 10',
    category: 'beds',
    categoryLabel: 'Custom Bed',
    title: 'The Fluted Wood Wall Headboard Bed',
    src: '/images/catalog/bed_10.jpg',
    dimensions: '2800 MM × 2100 MM × 1200 MM',
    materials: 'Fluted Oak Wall Panel • Integrated Nightstands',
    description: 'Extended architectural wall-mounted fluted oak headboard bed with integrated floating nightstand shelves.',
    aspect: 'aspect-[4/3]',
  },

  // ————— 5. PILLOWS & CUSHIONS (10 Patterns) —————
  {
    id: 'pillow-1',
    patternNumber: 'PATTERN 01',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Layered Silk & Linen Throw Pillow Set',
    src: '/images/catalog/pillow_1.jpg',
    dimensions: '500 MM × 500 MM (Set of 3)',
    materials: 'Belgian Linen & Raw Silk Blend • Feather Down Fill',
    description: 'Curated set of 3 luxury throw pillows in warm taupe, ivory, and sand tones with hidden zippers.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'pillow-2',
    patternNumber: 'PATTERN 02',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Bouclé Cushion with Leather Piping',
    src: '/images/catalog/pillow_2.jpg',
    dimensions: '450 MM × 450 MM',
    materials: 'Cream Bouclé Fabric • Cognac Leather Trim',
    description: 'Tactile square bouclé accent pillow finished with hand-stitched cognac leather border piping.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'pillow-3',
    patternNumber: 'PATTERN 03',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Hand-Piped Velvet Lumbar Pillow',
    src: '/images/catalog/pillow_3.jpg',
    dimensions: '300 MM × 600 MM',
    materials: 'Muted Gold Velvet • Micro-Fiber Core',
    description: 'Ergonomic lumbar support pillow in rich gold velvet with contrast piping for sofas and armchairs.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'pillow-4',
    patternNumber: 'PATTERN 04',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Geometric Woven Accent Cushion',
    src: '/images/catalog/pillow_4.jpg',
    dimensions: '500 MM × 500 MM',
    materials: 'Woven Jacquard Fabric • Charcoal Motif',
    description: 'Architectural patterned accent cushion with subtle geometric jacquard weave in deep charcoal.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'pillow-5',
    patternNumber: 'PATTERN 05',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Embroidered Linen Neutral Pillow',
    src: '/images/catalog/pillow_5.jpg',
    dimensions: '450 MM × 450 MM',
    materials: 'Natural Unbleached Linen • Hand Stitching',
    description: 'Artisanal linen pillow featuring delicate tonal hand-embroidery along the outer borders.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'pillow-6',
    patternNumber: 'PATTERN 06',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Cylindrical Leather Daybed Bolster',
    src: '/images/catalog/pillow_6.jpg',
    dimensions: '200 MM × 800 MM',
    materials: 'Aniline Grain Leather • High-Density Core',
    description: 'Full-grain leather cylinder bolster pillow designed for daybeds, sectionals, and deep armchairs.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'pillow-7',
    patternNumber: 'PATTERN 07',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Flanged Edge Linen Throw Pillow',
    src: '/images/catalog/pillow_7.jpg',
    dimensions: '550 MM × 550 MM',
    materials: 'Washed Pure Linen • Soft Feather Insert',
    description: 'Relaxed throw pillow with raw flanged edge details in warm ivory fabric.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'pillow-8',
    patternNumber: 'PATTERN 08',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Tufted Round Floor Cushion',
    src: '/images/catalog/pillow_8.jpg',
    dimensions: '600 MM × 150 MM',
    materials: 'Sand Woven Fabric • Tufted Center Button',
    description: 'Generous circular floor cushion with central button tufting for lounge seating areas.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'pillow-9',
    patternNumber: 'PATTERN 09',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Ribbed Knit Slate Pillow',
    src: '/images/catalog/pillow_9.jpg',
    dimensions: '400 MM × 400 MM',
    materials: 'Chunky Wool Knit • Slate Stone Tone',
    description: 'Cozy tactile ribbed knit cushion cover with plush feather down insert.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'pillow-10',
    patternNumber: 'PATTERN 10',
    category: 'pillows',
    categoryLabel: 'Cushions & Pillows',
    title: 'Contrast Bordered Decorative Pillow Set',
    src: '/images/catalog/pillow_10.jpg',
    dimensions: '480 MM × 480 MM',
    materials: 'Ivory Linen • Deep Charcoal Border Flange',
    description: 'Pair of structured accent pillows featuring stark charcoal border frames on warm ivory linen.',
    aspect: 'aspect-[4/3]',
  },

  // ————— 6. ROOM SET ELEVATIONS —————
  {
    id: 'roomset-1',
    patternNumber: 'ROOM SET 01',
    category: 'roomsets',
    categoryLabel: 'Room Set Elevation',
    title: 'Contemporary Living Elevation Set',
    src: '/images/gallery/prodoto_roomset_1.jpg',
    dimensions: 'Full Room Elevation',
    materials: 'Belgian Linen • Polished Limestone • Hardwood',
    description: 'Full-scale architectural studio living room set elevation designed around custom deep sectional seating and warm natural light.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'roomset-2',
    patternNumber: 'ROOM SET 02',
    category: 'roomsets',
    categoryLabel: 'Room Set Elevation',
    title: 'Minimalist Lounge & Coffee Table Set',
    src: '/images/gallery/munito_homedeco_2.jpg',
    dimensions: 'Lounge Living Space',
    materials: 'Natural Oak • Matte Stoneware Vases',
    description: 'Minimalist interior lounge room set showcasing low-profile modular seating and handcrafted ceramic decor.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'roomset-3',
    patternNumber: 'ROOM SET 03',
    category: 'roomsets',
    categoryLabel: 'Room Set Elevation',
    title: 'Master Bedroom Suite Set',
    src: '/images/gallery/prodoto_roomset_3.jpg',
    dimensions: 'Master Bedroom Suite',
    materials: 'Tufted Linen Bed • Walnut Tables • Brass Sconces',
    description: 'Aspirational master bedroom room set featuring custom channel-tufted king bed and warm ambient wall sconces.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'roomset-4',
    patternNumber: 'ROOM SET 04',
    category: 'roomsets',
    categoryLabel: 'Room Set Elevation',
    title: 'Curated Home Decor & Ceramic Table Set',
    src: '/images/gallery/munito_homedeco_3.jpg',
    dimensions: 'Table & Nook Setting',
    materials: 'Linen Pillows • Ceramic Crafts • Natural Oak',
    description: 'Curated table setting featuring handcrafted ceramic vessels, layered throw cushions, and natural wood surfaces.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 'roomset-5',
    patternNumber: 'ROOM SET 05',
    category: 'roomsets',
    categoryLabel: 'Room Set Elevation',
    title: 'Architectural Window & Drapery Set',
    src: '/images/gallery/prodoto_roomset_4.jpg',
    dimensions: 'High-Ceiling Window Nook',
    materials: 'Floor-to-Ceiling Linen Curtains • Accent Seating',
    description: 'High-ceiling living room nook with tailored floor-to-ceiling linen drapery, custom armchair, and diffused daylight.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'roomset-6',
    patternNumber: 'ROOM SET 06',
    category: 'roomsets',
    categoryLabel: 'Room Set Elevation',
    title: 'Contemporary Studio Open-Plan Set',
    src: '/images/gallery/prodoto_roomset_5.jpg',
    dimensions: 'Open-Plan Living & Dining',
    materials: 'Custom Sofas • Solid Wood Trim • Architectural Glass',
    description: 'Expansive open-plan architectural living room set with custom upholstery and clean Scandinavian lines.',
    aspect: 'aspect-[16/10]',
  },
];

export function UnifiedMasterGallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sofas' | 'chairs' | 'office' | 'beds' | 'pillows' | 'roomsets'>('all');
  const [selectedItem, setSelectedItem] = useState<UnifiedItem | null>(null);
  const capable = useHoverCapable();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const displayedItems = activeCategory === 'all'
    ? MASTER_COLLECTION_ITEMS
    : MASTER_COLLECTION_ITEMS.filter((item) => item.category === activeCategory);

  const onMove = (e: React.MouseEvent) => {
    if (!capable || !cursorRef.current) return;
    cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  };

  return (
    <section
      id="gallery"
      aria-labelledby="unified-gallery-heading"
      className="scroll-mt-20 bg-charcoal text-ivory py-20 md:py-32 relative overflow-hidden"
      onMouseMove={onMove}
    >
      {/* Subtle Background Architectural Dots */}
      <div className="blueprint-dots absolute inset-0 pointer-events-none opacity-30" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Minimalist Top Heading */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 border-b border-ivory/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <SectionLabel on="dark">RAMZAAR VISUAL ARCHIVE</SectionLabel>
              <h2
                id="unified-gallery-heading"
                className="mt-4 font-serif text-[clamp(3.2rem,8vw,7.5rem)] font-editorial leading-none tracking-tight text-ivory"
              >
                THE GALLERY.
              </h2>
            </div>
            <div className="pb-1 text-right">
              <span className="eyebrow text-[11px] text-champagne tracking-[0.25em] font-medium uppercase">
                {displayedItems.length} PATTERNS &amp; ELEVATIONS
              </span>
            </div>
          </div>
        </Reveal>

        {/* Minimalist Horizontal Filter Tabs */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-ivory/10 pb-8">
            {[
              { id: 'all', label: `ALL (${MASTER_COLLECTION_ITEMS.length})` },
              { id: 'sofas', label: 'SOFAS (10)' },
              { id: 'chairs', label: 'ACCENT CHAIRS (10)' },
              { id: 'office', label: 'OFFICE (10)' },
              { id: 'beds', label: 'BEDS (10)' },
              { id: 'pillows', label: 'CUSHIONS (10)' },
              { id: 'roomsets', label: 'ROOM SETS (6)' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id as any);
                    track('portfolio_interaction', { category: tab.id });
                  }}
                  className={`rounded-full px-5 py-2.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'bg-champagne text-charcoal font-semibold shadow-[0_0_15px_rgba(200,168,117,0.35)] scale-105'
                      : 'border border-ivory/15 text-ivory/70 hover:border-ivory/40 hover:text-ivory bg-charcoal/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Pure Edge-to-Edge Image Grid */}
        <div className="mt-10">
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: idx * 0.02 }}
                  className={`group relative overflow-hidden rounded-sm bg-charcoal/90 border border-ivory/10 cursor-pointer ${
                    item.aspect || 'aspect-[4/3]'
                  }`}
                  onClick={() => {
                    setSelectedItem(item);
                    track('portfolio_interaction', { item: item.id });
                  }}
                  onMouseEnter={() => capable && setHovering(true)}
                  onMouseLeave={() => capable && setHovering(false)}
                >
                  {/* High-Res Image with Smooth Scale Zoom */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Top Badge */}
                  <div className="absolute left-3 top-3 z-10 rounded bg-charcoal/80 px-2.5 py-1 text-[9px] font-semibold tracking-[0.2em] text-champagne uppercase backdrop-blur-md border border-ivory/10">
                    {item.patternNumber}
                  </div>

                  {/* Sleek Minimal Hover Gradient & Title Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-5">
                    <span className="eyebrow text-[9px] text-champagne tracking-[0.25em]">
                      {item.categoryLabel.toUpperCase()}
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-ivory leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-[10px] tracking-widest text-ivory/80 uppercase font-medium">
                      <span>Inspect Design</span>
                      <Maximize2 size={12} className="text-champagne" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Lightbox Inspection Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm border border-ivory/20 bg-charcoal p-6 sm:p-10 text-ivory shadow-2xl"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-champagne hover:text-champagne"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
                  <div className="overflow-hidden rounded bg-black md:col-span-6 border border-ivory/10">
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      className="h-full w-full object-cover max-h-[55vh]"
                    />
                  </div>

                  <div className="flex flex-col justify-center space-y-6 md:col-span-6">
                    <div>
                      <span className="eyebrow text-[10px] text-champagne tracking-[0.25em]">
                        {selectedItem.patternNumber} • {selectedItem.categoryLabel.toUpperCase()}
                      </span>
                      <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-ivory">
                        {selectedItem.title}
                      </h3>
                    </div>

                    <p className="text-xs leading-relaxed text-taupe">
                      {selectedItem.description}
                    </p>

                    <div className="space-y-3 border-y border-ivory/15 py-4 text-xs">
                      <div>
                        <span className="font-semibold text-ivory">DIMENSIONS:</span>{' '}
                        <span className="text-champagne">{selectedItem.dimensions}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-ivory">MATERIALS &amp; BUILD:</span>{' '}
                        <span className="text-taupe">{selectedItem.materials}</span>
                      </div>
                    </div>

                    <div>
                      <WhatsAppLink
                        context="custom"
                        source={`gallery_modal_${selectedItem.id}`}
                        className="inline-flex items-center gap-3 bg-ivory px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal transition-colors hover:bg-champagne"
                      >
                        Inquire About This Design on WhatsApp
                        <ArrowUpRight size={14} />
                      </WhatsAppLink>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Custom Inspect Cursor */}
      {capable && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-champagne bg-charcoal/90 text-ivory shadow-[0_0_20px_rgba(200,168,117,0.4)] transition-opacity duration-300 ${
            hovering ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        >
          <span className="eyebrow text-[9px] text-champagne">View</span>
        </div>
      )}
    </section>
  );
}
