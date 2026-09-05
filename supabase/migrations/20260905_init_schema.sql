-- Modern Man Kenya 254: Database Schema
-- Production Schema for Luxury Bespoke Tailoring & E-Commerce

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'suits', 'jackets', 'velvets', 'evening_dinner', 'fragrances', 'accessories'
    fabric_details TEXT NOT NULL,
    construction TEXT DEFAULT 'Full Floating Canvas',
    price_kes NUMERIC(12, 2) NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    is_in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Product Variants Table
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    size TEXT NOT NULL, -- '38R', '40R', '42R', '44R', '46L', etc.
    color TEXT NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 5,
    sku TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    fitting_type TEXT NOT NULL, -- 'Initial Bespoke Consultation', 'Basting Fitting', 'Wedding Party Wardrobe', 'Ready-to-Wear Alterations'
    location_type TEXT NOT NULL, -- 'Flagship Atelier Nairobi', 'Private Residence / Suite', 'Virtual Master Consultation'
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
    notes TEXT,
    sartorial_preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    total_amount_kes NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'KES',
    payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    fulfillment_status TEXT NOT NULL DEFAULT 'unfulfilled', -- 'unfulfilled', 'crafting', 'shipped', 'delivered'
    white_glove_delivery BOOLEAN DEFAULT true,
    gift_wrap BOOLEAN DEFAULT false,
    special_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price_kes NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Bespoke Custom Inquiries Table
CREATE TABLE IF NOT EXISTS public.bespoke_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    category TEXT NOT NULL,
    garment_specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    estimated_price_kes NUMERIC(12, 2),
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('bespoke-assets', 'bespoke-assets', true) ON CONFLICT DO NOTHING;

-- 9. Row Level Security (RLS) Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bespoke_inquiries ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read
CREATE POLICY "Public read access for products" 
ON public.products FOR SELECT USING (true);

-- Product Variants: Everyone can read
CREATE POLICY "Public read access for product variants" 
ON public.product_variants FOR SELECT USING (true);

-- Appointments: Public can insert their appointment requests
CREATE POLICY "Public insert access for appointments" 
ON public.appointments FOR INSERT WITH CHECK (true);

-- Appointments: Authenticated/Service Role can view
CREATE POLICY "Service role full access for appointments" 
ON public.appointments FOR ALL USING (auth.role() = 'service_role');

-- Bespoke Inquiries: Public can insert
CREATE POLICY "Public insert access for bespoke inquiries" 
ON public.bespoke_inquiries FOR INSERT WITH CHECK (true);

-- Orders: Public can insert orders
CREATE POLICY "Public insert access for orders" 
ON public.orders FOR INSERT WITH CHECK (true);

-- Order Items: Public can insert
CREATE POLICY "Public insert access for order items" 
ON public.order_items FOR INSERT WITH CHECK (true);
