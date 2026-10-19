export interface BrandCreationItem {
  id: string;
  title: string;
  image: string;
  categoryParam: string;
  badge?: string;
}

export interface OccasionCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  focus: string[];
}

export interface OperationalStandard {
  id: string;
  question: string;
  title: string;
  subtitle: string;
  answer: string;
  iconName: string;
  keyPoints: string[];
}

export const BRAND_INFO = {
  name: 'Modern Man Kenya',
  tagline: 'Where Fit Meets Character',
  philosophy: 'Opulence • Simplicity • Class',
  statement:
    'Modern Man Kenya is a premium custom tailoring house creating made-to-measure menswear for the modern gentleman. Based in Kenya, we combine contemporary design, refined tailoring and personalised service to create suits, tuxedos, shirts, wedding attire and statement pieces defined by exceptional fit and individual character.',
  promise:
    'At Modern Man Kenya, we do more than make suits. We create tailored expressions of identity. Every garment is considered, fitted and finished to help the modern gentleman present himself with confidence, sophistication and authenticity.',
  vision:
    'To establish Modern Man Kenya as a leading African custom tailoring house recognised for exceptional fit, contemporary menswear design, craftsmanship and a distinctive approach to personal style.',
  mission:
    'To create exceptional tailored clothing that enables every client to look refined, feel confident and express his individuality—through personalised service, considered design and uncompromising attention to detail.',
  phone: '+254 718 923082',
  email: 'modernmanke254@gmail.com',
  location: 'Nairobi, Kenya',
};

export const BRAND_PROFILE = BRAND_INFO;

export const WHAT_WE_CREATE: BrandCreationItem[] = [
  {
    id: 'two-three-piece',
    title: '2 & 3-Piece Suits',
    image: '/images/DSC04888.jpg',
    categoryParam: 'suits',
    badge: 'Executive & Ceremony',
  },
  {
    id: 'tuxedos',
    title: 'Tuxedos',
    image: '/images/MOK_2142.jpg',
    categoryParam: 'evening-dinner',
    badge: 'Formal Events',
  },
  {
    id: 'smart-casual',
    title: 'Smart Casual & Blazers',
    image: '/images/Blazer.jpg',
    categoryParam: 'smart-casual',
    badge: 'Tailored Separates',
  },
  {
    id: 'traditional-wear',
    title: 'Traditional Wear',
    image: '/images/LKM_1607.jpg',
    categoryParam: 'traditional',
    badge: 'Heritage & Modernity',
  },
  {
    id: 'kaftan-agbada',
    title: 'Kaftans & Agbada',
    image: '/images/LKM_1755.jpg',
    categoryParam: 'kaftan-agbada',
    badge: 'African Sophistication',
  },
  {
    id: 'senator-suits',
    title: 'Senator Suits',
    image: '/images/LKM_1600.jpg',
    categoryParam: 'senator-suits',
    badge: 'African Sartorial Elegance',
  },
  {
    id: 'shirts',
    title: 'Shirts',
    image: '/images/MOK_2171.jpg',
    categoryParam: 'shirts',
    badge: 'Custom Collars & Fit',
  },
];

export const TAILORING_OCCASIONS: OccasionCategory[] = [
  {
    id: 'business-executive',
    title: 'Business & Executive',
    subtitle: 'Sharp Office & Boardroom Suits',
    description:
      'Clean, comfortable suits made for meetings, daily office wear, and leadership presentations. Tailored to look sharp all day without feeling stiff.',
    image: '/images/MOK_7655.jpg',
    focus: ['Clean sharp cut', 'Breathable fabrics', 'All-day comfort', 'Professional look'],
  },
  {
    id: 'wedding-groom',
    title: 'Wedding & Groom',
    subtitle: 'Suits for Grooms & Groomsmen',
    description:
      'Custom wedding suits made around your personal style, the wedding theme, and your groomsmen. Tailored so you look your best on your big day.',
    image: '/images/DSC04995.jpg',
    focus: ['Custom fit for groom', 'Matching groomsmen suits', 'Photogenic fabrics', 'Made for the big day'],
  },
  {
    id: 'formal-eveningwear',
    title: 'Formal & Eveningwear',
    subtitle: 'Tuxedos & Gala Dinner Suits',
    description:
      'Tuxedos and dinner jackets with satin lapels and clean finishing. Perfect for black-tie galas, awards, and milestone celebrations.',
    image: '/images/MOK_2101.jpg',
    focus: ['Satin lapels', 'Deep black & midnight blue', 'Classic dinner jacket cut', 'Confident posture'],
  },
  {
    id: 'signature-occasion',
    title: 'Signature & Occasion Pieces',
    subtitle: 'Custom Statement Looks',
    description:
      'Distinctive looks made with unique fabrics, bold colours, and personal styling for clients who want something special.',
    image: '/images/MOK_2142.jpg',
    focus: ['Rich textured fabrics', 'Custom collar & lapel details', 'Bold stylish colours', 'Unique personal style'],
  },
];

export const THE_EXPERIENCE_STEPS = [
  {
    step: '01',
    title: 'Consultation',
    subtitle: 'Understanding Your Needs',
    description:
      'We sit down to talk about what you need, your style, and the occasion you are dressing for.',
  },
  {
    step: '02',
    title: 'Fabric & Design',
    subtitle: 'Choosing Your Cloth & Style',
    description:
      'Choose your favourite fabric, lining, buttons, lapels, and pockets from our curated swatches.',
  },
  {
    step: '03',
    title: 'Measurements',
    subtitle: 'Fitting Your Body Shape',
    description:
      'We take exact measurements of your posture, shoulders, and chest so the suit fits you naturally.',
  },
  {
    step: '04',
    title: 'Fitting Session',
    subtitle: 'Adjusting for Clean Fit',
    description:
      'You try on the half-stitched suit. We adjust the seams until it drapes cleanly and feels comfortable.',
  },
  {
    step: '05',
    title: 'Final Handover',
    subtitle: 'Inspected & Ready to Wear',
    description:
      'Your finished suit is pressed, checked for quality, and handed over ready for your big day or meeting.',
  },
];

/* Information answering client questions inspired by the operational documents (WhatsApp images): SOPs, Quality Control Checklist, Client Tracker, Roles, Agreements */
export const OPERATIONAL_STANDARDS: OperationalStandard[] = [
  {
    id: 'quality-control-checklist',
    question: 'How does Modern Man guarantee flawless fit and eliminate mistakes before delivery?',
    title: 'Multi-Point Quality Control Checklist',
    subtitle: 'Standardized Pre-Delivery Inspection',
    answer:
      'We never deliver a garment based on assumption. Every single commission undergoes our systematic Quality Control Checklist prior to final presentation. Every seam, shoulder pitch, lapel symmetry, chest balance, and trouser break is thoroughly inspected to guarantee zero defects and total precision.',
    iconName: 'ClipboardCheck',
    keyPoints: [
      'Shoulder line & chest balance verification',
      'Sleeve pitch and cuff buttonhole tension',
      'Trouser break and waistband accuracy',
      'Final hand-pressing & flawless finishing check',
    ],
  },
  {
    id: 'client-record-tracker',
    question: 'Will I need to start from scratch and remeasure for my future orders?',
    title: 'Dedicated Client Record & Measurement Archive',
    subtitle: 'Individual Profile & Preference Tracking',
    answer:
      'No. Through our dedicated Client Record Tracker, we maintain a secure, comprehensive profile of every patron. Your precise anatomical proportions, historical adjustments, fabric preferences, and style nuances are permanently archived. Reordering or building your seasonal wardrobe is as effortless as a single consultation.',
    iconName: 'UserCheck',
    keyPoints: [
      'Archived anatomical measurement blueprint',
      'Full record of previous commissions & cloth selections',
      'Recorded posture nuances & stylistic preferences',
      'Fast-track reordering for traveling & VIP executives',
    ],
  },
  {
    id: 'standard-operating-procedures',
    question: 'How do you ensure consistent quality across every single commission?',
    title: 'Standard Operating Procedures (SOPs)',
    subtitle: 'Disciplined Tailoring Workflow',
    answer:
      'Excellence at Modern Man is a repeatable discipline, not an accident. Our atelier adheres to documented Standard Operating Procedures (SOPs) governing every phase: from initial client consultation and cloth handling to pattern development, basting, and hand-finishing. This ensures that every tailor on our team executes to the exact same uncompromising benchmark.',
    iconName: 'FileCheck',
    keyPoints: [
      'Clear, repeatable step-by-step drafting protocols',
      'Standardized seam allowances and canvas basting',
      'Consistent client consultation protocols',
      'Structured timeline and delivery adherence',
    ],
  },
  {
    id: 'specialized-craft-roles',
    question: 'Who makes my clothes and how is accountability maintained?',
    title: 'Master Craftsman Role Clarity & Accountability',
    subtitle: 'Specialized Expertise at Every Stage',
    answer:
      'Rather than one tailor attempting to do everything, our atelier maintains clear role specialization and agreements. Cutting, internal canvas construction, assembly, and fine hand-finishing are handled by artisans trained specifically in those disciplines, backed by strict accountability at each handover.',
    iconName: 'ShieldCheck',
    keyPoints: [
      'Master cutters dedicated solely to proportion & pattern drafting',
      'Coatmakers focused on internal canvas balance & structure',
      'Finishing specialists handling buttonholes, monograms & hand-stitching',
      'Mutual agreements and clear delivery commitments',
    ],
  },
];

export const WHY_MODERN_MAN = [
  {
    number: '01',
    title: 'Custom Fit, Not Off-The-Rack',
    description: 'Every suit is cut specifically for your body shape, height, and shoulders — never generic factory sizes.',
  },
  {
    number: '02',
    title: 'Clear Tailoring Guidance',
    description: 'We advise you on fabrics, lapels, and styling from day one until your final fitting.',
  },
  {
    number: '03',
    title: 'Attention to Every Detail',
    description: 'We check shoulder lines, chest balance, sleeve length, and trouser break so everything sits right.',
  },
  {
    number: '04',
    title: 'Classic Meets Modern',
    description: 'Timeless tailoring quality combined with fresh, modern cuts that suit today’s gentleman.',
  },
  {
    number: '05',
    title: 'Designed Around You',
    description: 'Every piece reflects your personal style, taste, and the event you are attending.',
  },
  {
    number: '06',
    title: 'Proudly Kenyan',
    description: 'Crafted right here in Nairobi with world-class quality for African and global gentlemen.',
  },
  {
    number: '07',
    title: 'Suits for Every Occasion',
    description: 'From office meetings and black-tie galas to weddings and weekend events.',
  },
];

export const CORE_VALUES = [
  {
    title: 'Craftsmanship',
    description: 'We respect the discipline and detail behind exceptional tailoring.',
  },
  {
    title: 'Individuality',
    description: 'Every client has a distinct identity, and every garment should reflect it.',
  },
  {
    title: 'Precision',
    description: 'Fit, proportion and finishing are treated as essential, not optional.',
  },
  {
    title: 'Elegance',
    description: 'We pursue sophistication that feels confident, contemporary and enduring.',
  },
  {
    title: 'Service',
    description: 'We build lasting relationships through personal attention and professional guidance.',
  },
  {
    title: 'Innovation',
    description: 'We continually explore new fabrics, silhouettes, styling ideas and techniques while respecting the foundations of menswear.',
  },
];

export const CRAFTSMANSHIP_DETAILS = {
  philosophy: 'Our tailoring philosophy places equal importance on structure, comfort and finish. We pay close attention to the elements that define a well-made garment: proportion, shoulder line, chest balance, sleeve length, trouser break, collar placement, lapel shape and finishing details.',
  personalizationOptions: [
    'Lapel style (Peak, Notch, Shawl)',
    'Button selection & configuration (Single & Double Breasted)',
    'Pocket configuration (Flap, Jetted, Patch, Ticket)',
    'Custom interior lining & piping',
    'Hand-stitched pick accents & Milanese buttonholes',
    'Personalised monograms & initials',
    'Functional sleeve surgeon cuffs',
    'Trouser finishing (Side adjusters, pleats, cuff breaks)',
  ],
  fabricGuidance:
    'Fabric is the foundation of every tailored garment. We help clients select cloth according to season, climate, occasion, drape, texture, durability and desired aesthetic. From sophisticated solids and subtle textures to expressive checks, stripes and statement cloths, the fabric choice sets the tone for the finished piece.',
};

export const OCCASIONS = TAILORING_OCCASIONS.map((occ) => ({
  ...occ,
  highlights: occ.focus,
}));

export const EXPERIENCE_STEPS = THE_EXPERIENCE_STEPS;

export const OPERATIONAL_QA = OPERATIONAL_STANDARDS;

export const CRAFTSMANSHIP_PILLARS = [
  {
    title: 'Floating Canvas',
    icon: 'Layers',
    description:
      'Natural horsehair canvas inside the chest that breathes and molds to your body over time, with zero stiff glue.',
  },
  {
    title: 'Hand-Finished Detailing',
    icon: 'Sparkles',
    description:
      'Clean hand stitching on lapels, collar edges, fine silk buttonholes, and functional cuffs.',
  },
  {
    title: 'Custom Pattern Cut',
    icon: 'Scissors',
    description:
      'Every pattern is drawn from scratch to match your exact posture, chest, and shoulder slope.',
  },
  {
    title: 'Carefully Selected Fabrics',
    icon: 'ShieldCheck',
    description:
      'Quality fine wools, linens, and breathable fabrics chosen to keep you comfortable in Kenyan weather.',
  },
];
