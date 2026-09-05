// Modern Man Kenya 254 - Core Type Definitions

export type Currency = 'KES' | 'USD' | 'GBP';

export interface ProductVariant {
  id: string;
  size: string; // '38R', '40R', '42R', '44R', '46R', etc.
  color: string;
  stockQuantity: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'suits' | 'jackets' | 'velvets' | 'evening-dinner' | 'fragrances' | 'accessories';
  fabricDetails: string;
  construction: string; // e.g. "Full Floating Canvas", "Unstructured Deconstructed"
  priceKes: number;
  priceUsd: number;
  images: string[];
  isFeatured?: boolean;
  isInStock?: boolean;
  variants: ProductVariant[];
  detailsList: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  priceKes: number;
  priceUsd: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export type LapelStyle = 'Peak' | 'Notch' | 'Shawl';
export type PocketStyle = 'Flap' | 'Jetted' | 'Patch';
export type ButtonConfiguration = '1-Button' | '2-Button' | 'Double-Breasted (6x2)';
export type VentStyle = 'Double Vent' | 'Single Vent' | 'No Vent';

export interface FabricOption {
  id: string;
  name: string;
  mill: string; // e.g. "Scabal, Huddersfield", "Dormeuil, Paris", "Loro Piana, Italy"
  composition: string; // e.g. "Super 150s Merino Wool with Silk"
  weight: string; // e.g. "280g/m"
  colorHex: string;
  image: string;
  priceKes: number;
}

export interface LiningOption {
  id: string;
  name: string;
  type: string;
  colorHex: string;
  pattern: string;
}

export interface BespokeConfiguration {
  category: string;
  fabric: FabricOption;
  lapel: LapelStyle;
  pockets: PocketStyle;
  buttons: ButtonConfiguration;
  vents: VentStyle;
  lining: LiningOption;
  monogramText?: string;
  monogramColor?: string;
  monogramFont?: string;
  specialNotes?: string;
  estimatedPriceKes: number;
}

export interface AppointmentBooking {
  fittingType: 'Initial Bespoke Consultation' | 'Basting Fitting' | 'Wedding Party Wardrobe' | 'Ready-to-Wear Alteration';
  locationType: 'Flagship Atelier Nairobi' | 'Private Residence / Luxury Suite' | 'Virtual Master Consultation';
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  bespokeReference?: Partial<BespokeConfiguration>;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  image: string;
  quote?: string;
  favoriteCloth?: string;
  isLeadership?: boolean;
  order?: number;
}
