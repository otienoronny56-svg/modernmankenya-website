export interface BrandCreationItem {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
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
  subheading: 'Custom Tailoring • Bespoke Menswear • Kenyan Craftsmanship',
  statement:
    'Modern Man Kenya is a premium custom tailoring house creating bespoke and made-to-measure menswear for the modern gentleman. Based in Kenya, we combine contemporary design, refined tailoring and personalised service to create suits, tuxedos, shirts, wedding attire and statement pieces defined by exceptional fit and individual character.',
  brandStatement:
    'Modern Man Kenya is a premium custom tailoring house creating bespoke and made-to-measure menswear for the modern gentleman. Based in Kenya, we combine contemporary design, refined tailoring and personalised service to create suits, tuxedos, shirts, wedding attire and statement pieces defined by exceptional fit and individual character.',
  brandOverview:
    'Modern Man Kenya is a contemporary custom tailoring house based in Kenya, dedicated to creating refined menswear that combines impeccable fit, timeless style and modern sophistication. We specialise in made-to-measure and bespoke garments designed around the individual—his proportions, personality, lifestyle and occasion.',
  overviewContinuation:
    'From boardroom tailoring and elevated business attire to wedding suits, formalwear and statement pieces, Modern Man Kenya brings together thoughtful design, premium fabric selection and meticulous craftsmanship to create garments that look distinctive and feel personal.',
  positioning:
    'Custom Tailoring • Bespoke Menswear • Kenyan Craftsmanship',
  philosophyBody:
    'We believe great style begins with the right fit. A well-tailored garment should not simply follow fashion; it should express character, enhance confidence and remain relevant beyond a single season. Our approach is rooted in the balance between classic tailoring codes and contemporary menswear. Clean silhouettes, considered proportions, refined detailing and fabric-led design come together to create clothing that is polished without being predictable.',
  promise:
    'At Modern Man Kenya, we do more than make suits. We create tailored expressions of identity. Every garment is considered, fitted and finished to help the modern gentleman present himself with confidence, sophistication and authenticity.',
  brandPromise:
    'At Modern Man Kenya, we do more than make suits. We create tailored expressions of identity. Every garment is considered, fitted and finished to help the modern gentleman present himself with confidence, sophistication and authenticity.',
  vision:
    'To establish Modern Man Kenya as a leading African custom tailoring house recognised for exceptional fit, contemporary menswear design, craftsmanship and a distinctive approach to personal style.',
  mission:
    'To create exceptional tailored clothing that enables every client to look refined, feel confident and express his individuality—through personalised service, considered design and uncompromising attention to detail.',
  phone: '+254 718 923082',
  email: 'modernmanke254@gmail.com',
  location: 'Nairobi, Kenya',
  contact: {
    phone: '+254 718 923082',
    phoneFormatted: '+254 718 923082',
    email: 'modernmanke254@gmail.com',
    location: 'Nairobi, Kenya',
    hours: 'Monday – Saturday: By Appointment',
  },
};

export const BRAND_PROFILE = BRAND_INFO;

export const WHAT_WE_CREATE: BrandCreationItem[] = [
  {
    id: 'bespoke-suits',
    title: 'Bespoke & Made-to-Measure Suits',
    description: 'Garments sculpted around individual anatomy and lifestyle, offering unmatched comfort, proportion, and personalized silhouette.',
    image: '/images/MOK_7655.jpg',
    badge: 'Core House Specialty',
  },
  {
    id: 'two-three-piece',
    title: 'Two-Piece & Three-Piece Suits',
    description: 'Impeccably balanced lounge and executive suits, with optional custom horseshoe or single-breasted waistcoats for elevated formality.',
    image: '/images/MOK_7660.jpg',
    badge: 'Timeless Silhouette',
  },
  {
    id: 'tuxedos-black-tie',
    title: 'Tuxedos & Black-Tie Formalwear',
    description: 'Elevated dinner jackets, satin or velvet lapels, formal trousers, and black-tie attire designed for red-carpet and milestone events.',
    image: '/images/MOK_2101.jpg',
    badge: 'Black-Tie Mastery',
  },
  {
    id: 'wedding-groom',
    title: 'Wedding Suits & Groom’s Tailoring',
    description: 'Personalized wedding ensembles harmonized with ceremony aesthetics, ensuring the groom commands his landmark day with poise.',
    image: '/images/DSC04995.jpg',
    badge: 'Ceremonial Elegance',
  },
  {
    id: 'corporate-wardrobe',
    title: 'Corporate & Executive Wardrobes',
    description: 'Sharp, confident tailoring curated for boardrooms, leadership summits, and professional presence without sacrificing personal flair.',
    image: '/images/DSC04888.jpg',
    badge: 'Leadership Attire',
  },
  {
    id: 'custom-shirts',
    title: 'Custom Shirts & Coordinated Separates',
    description: 'Individually measured shirts with customized collar spread, cuff styles, and fabrics coordinated with tailored trousers and blazers.',
    image: '/images/MOK_1920.jpg',
    badge: 'Tailored Separates',
  },
  {
    id: 'occasion-wear',
    title: 'Traditional & Contemporary Occasion Wear',
    description: 'Culturally conscious luxury tailoring that fuses timeless Kenyan heritage with modern bespoke cutting techniques.',
    image: '/images/LKM_1745.jpg',
    badge: 'Heritage & Modernity',
  },
  {
    id: 'statement-jackets',
    title: 'Statement Jackets & Special-Event Tailoring',
    description: 'Expressive textiles, textured velvets, distinctive trims, and courageous palettes for gentlemen who celebrate distinctiveness.',
    image: '/images/MOK_2142.jpg',
    badge: 'Signature Commissions',
  },
  {
    id: 'wardrobe-solutions',
    title: 'Personalised Wardrobe & Styling Solutions',
    description: 'End-to-end wardrobe curation and style advisement tailored to your professional calendar, seasonal travel, and aesthetic goals.',
    image: '/images/MOK_2204.jpg',
    badge: 'Bespoke Advisory',
  },
];

export const TAILORING_OCCASIONS: OccasionCategory[] = [
  {
    id: 'business-executive',
    title: 'Business & Executive',
    subtitle: 'Boardroom Authority & Professional Wardrobes',
    description:
      'Sharp, confident tailoring for boardrooms, leadership settings, client meetings and everyday professional wardrobes. Our approach focuses on clean lines, versatile colour palettes and refined details that communicate professionalism without sacrificing personal style.',
    image: '/images/MOK_7655.jpg',
    focus: ['Clean architectural lines', 'Versatile classic palettes', 'Breathable all-day comfort', 'Leadership presence'],
  },
  {
    id: 'wedding-groom',
    title: 'Wedding & Groom',
    subtitle: 'Ceremony Elegance & Nuptial Distinction',
    description:
      'Personalised wedding tailoring created around the groom, the ceremony and the overall wedding aesthetic. From timeless black-tie elegance to contemporary colour, texture and cultural influences, we create looks designed to make the occasion memorable.',
    image: '/images/DSC04995.jpg',
    focus: ['Custom groom palettes', 'Groomsmen coordination', 'Cultural & formal fusion', 'Photogenic drape'],
  },
  {
    id: 'formal-eveningwear',
    title: 'Formal & Eveningwear',
    subtitle: 'Galas, Milestone Celebrations & Black Tie',
    description:
      'Tuxedos, dinner suits and elevated evening pieces with considered lapels, refined shirting, polished accessories and sophisticated finishing. Designed for black-tie events, galas, celebrations and milestone occasions.',
    image: '/images/MOK_2101.jpg',
    focus: ['Satin & grosgrain lapels', 'Deep midnight & black tones', 'Impeccable dinner jackets', 'Commanding posture'],
  },
  {
    id: 'signature-occasion',
    title: 'Signature & Occasion Pieces',
    subtitle: 'Distinctive Character & Expressive Cloths',
    description:
      'For clients who want something more distinctive, we develop statement garments through expressive fabrics, bold colour combinations, unique trims, contrasting textures and personalised design details.',
    image: '/images/MOK_2142.jpg',
    focus: ['Expressive textures & jacquards', 'Hand-selected contrast trims', 'Unique lapel silhouettes', 'Personal statement styling'],
  },
];

export const THE_EXPERIENCE_STEPS = [
  {
    step: '01',
    title: 'Personal Consultation',
    subtitle: 'Aesthetic Discovery & Lifestyle Analysis',
    description:
      'Every client begins with a personal consultation where we understand his preferred aesthetic, intended occasion, lifestyle and fit requirements.',
  },
  {
    step: '02',
    title: 'Fabric & Design Direction',
    subtitle: 'Cloth Selection According to Season & Drape',
    description:
      'We guide the client through fabric, colour, construction, silhouette and detailing choices to develop a garment that is distinctly his. Cloth is selected according to climate, occasion, drape, texture, and durability.',
  },
  {
    step: '03',
    title: 'Measurement & Proportion Mapping',
    subtitle: 'Cut for Your Physical Anatomy',
    description:
      'Measurements and proportions are carefully considered. Clothing is engineered around the individual wearer rather than a generic off-the-rack size chart.',
  },
  {
    step: '04',
    title: 'Fitting & Architectural Refinements',
    subtitle: 'Achieving Balance & Balance of Silhouette',
    description:
      'The garment is assessed through physical fittings, and refinements are made to achieve a clean, balanced silhouette, balanced shoulder line, and precise trouser break.',
  },
  {
    step: '05',
    title: 'Multi-Point Quality Control & Presentation',
    subtitle: 'Flawless Finish Before Handover',
    description:
      'Every garment undergoes our rigorous pre-delivery Quality Control Checklist, verifying seam tension, lapel roll, and finishing details before final presentation.',
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
    title: 'Personalised Tailoring Rather Than Off-The-Rack',
    description: 'Every piece is drafted around the individual rather than constrained to generic factory size charts.',
  },
  {
    number: '02',
    title: 'Design Guidance from Consultation Through Final Fitting',
    description: 'Professional sartorial advisory on cloth, silhouette, lapel proportions, and styling at every phase.',
  },
  {
    number: '03',
    title: 'Attention to Proportion, Silhouette & Finishing',
    description: 'Equal focus placed on shoulder line, chest balance, sleeve length, collar placement, and trouser break.',
  },
  {
    number: '04',
    title: 'A Balance of Classic Tailoring & Contemporary Style',
    description: 'Rooted in the timeless discipline of classic menswear, modernized with clean, contemporary silhouettes.',
  },
  {
    number: '05',
    title: 'Garments Designed Around the Individual Client',
    description: 'Shaped to reflect your personality, anatomical posture, daily lifestyle, and specific occasion.',
  },
  {
    number: '06',
    title: 'A Distinctly Kenyan Luxury Fashion Perspective',
    description: 'Proudly rooted in Kenyan craftsmanship, delivering high-level sartorial elegance for African and global gentlemen.',
  },
  {
    number: '07',
    title: 'Tailoring Suitable for Professional, Formal & Special Occasions',
    description: 'From boardroom leadership and galas to nuptials and personal statement pieces.',
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
    title: 'Canvas Construction',
    icon: 'Layers',
    description:
      'Floating horsehair and camel-hair canvas chest pieces that breathe and shape permanently to individual contours with zero stiff glue.',
  },
  {
    title: 'Hand-Finished Detailing',
    icon: 'Sparkles',
    description:
      'Pick stitching along lapels, hand-set collars, fine silk buttonholes, and functional surgeon cuffs.',
  },
  {
    title: 'Precision Cutting',
    icon: 'Scissors',
    description:
      'Every pattern is drafted from scratch per individual anatomy, shoulder pitch, and stance.',
  },
  {
    title: 'Curated Premium Cloth',
    icon: 'ShieldCheck',
    description:
      'Selected fine wools, silks, linens, and performance blends curated according to climate, drape, and durability.',
  },
];
