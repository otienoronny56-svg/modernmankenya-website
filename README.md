# Modern Man Kenya 254 🇰🇪
### Bespoke Tailoring & Luxury Menswear House
*opulence • simplicity • class*

---

Modern Man Kenya 254 is a bespoke tailoring and luxury menswear e-commerce platform engineered for modern prestige. It combines the heritage, discipline, and architectural precision of master craft tailoring with cutting-edge web architecture.

## ✨ Core Pillars & Features

- **Master Tailoring Discipline**: Full floating horsehair canvas construction, individual hand-drafted anatomical patterns (35+ measurement data points), and European cloths from world-renowned mills (Scabal, Dormeuil, Loro Piana).
- **Interactive Three.js 3D Silk Mesh**: Real-time waving sartorial silk canvas and gold dust particle flow on the hero section.
- **Interactive Tailor Studio Customizer**: Dynamic selection of lapels (Peak, Notch, Shawl), pockets (British Flap with ticket, Minimalist Jetted, Neapolitan Patch), and interior silk linings with live commission pricing.
- **Ready-to-Wear Wardrobe**: Filterable catalog by category, size, price, and curated sorting with quick-add sizing drawers and real-time cart synchronization.
- **Slide-Over Wardrobe Drawer & Cart**: KES/USD/GBP multi-currency pricing, white-glove complimentary delivery progress meter (threshold KES 50,000), and checkout simulation.
- **Private Nairobi Fitting Wizard**: 4-step appointment booking system persisted to Supabase PostgreSQL database for master fitting sessions in Westlands, Karen, or private suites across Nairobi.
- **Mobile-First Luxury Experience**: Fully responsive touch UI with horizontal scroll category bars, accordion drawers, and tap-to-call concierge integration.

---

## 🛠 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Client Workbenches)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom luxury color tokens:
  - Deep Sartorial Navy: `#1B1464`
  - Warm Muted Gold / Brass: `#A88A00`
  - Charcoal Slate: `#0F172A`
  - Pure Canvas: `#FFFFFF` / `#F8FAFC`
- **3D Graphics**: [Three.js](https://threejs.org/) (`three` & `@types/three`)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (`cartStore`, `bespokeStore`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Storage**: [Supabase](https://supabase.com/) (PostgreSQL DDL, RLS security policies, and storage buckets)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/otienoronny56-svg/modernmankenya-website.git
cd modernmankenya-website
npm install
```

### 2. Configure Environment Variables

Copy the example configuration file:

```bash
cp .env.example .env.local
```

Fill in your Supabase project credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Server-only keys (NEVER expose to browser)
SUPABASE_PROJECT_ID=your-project-id
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 3. Database Setup (Supabase)

Run the SQL migration scripts located in the `/supabase/migrations/` directory inside your Supabase SQL Editor:
1. `20260905_init_schema.sql` - Creates tables (`products`, `product_variants`, `appointments`, `orders`, `order_items`, `newsletter_subscribers`), RLS policies, and storage buckets.
2. `20260905_seed_data.sql` - Populates initial luxury bespoke collections, suits, velvets, blazers, and accessories.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push code to your GitHub repository.
2. Import repository on Vercel.
3. Configure the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) under Project Settings.
4. Deploy!

---

## 🏛 Atelier Concierge & Contact

- **Flagship Atelier**: Nairobi, Kenya
- **Direct Telephone & WhatsApp**: +254 718 923082
- **Official Email**: modernmanke254@gmail.com
- **Hours**: Tuesday – Saturday: 09:30 – 18:30 (By Private Appointment Only)

© 2026 Modern Man Kenya 254. All rights reserved.
