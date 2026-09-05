-- Modern Man Kenya 254: Seed Initial Catalog Products & Variants
-- Optional: Run this after 20260905_init_schema.sql to populate initial database records

-- 1. Insert Products
INSERT INTO public.products (id, name, slug, tagline, description, category, fabric_details, construction, price_kes, price_usd, images, is_featured, is_in_stock)
VALUES
(
  'e2d30800-4b5b-4351-a5bf-8f929bb0cb01',
  'The Mayfair Midnight Two-Piece Suit',
  'the-mayfair-midnight-two-piece-suit',
  'Bespoke Master Silhouette in Super 140s Wool',
  'Masterfully tailored with a full floating canvas chest piece, roped shoulders, and handcrafted horn buttons. Designed for the discerning gentleman commanding high-level boardrooms and exclusive evenings in Nairobi and beyond.',
  'suits',
  'Super 140s English Worsted Wool from Huddersfield Fine Worsteds (280g/m).',
  'Full Floating Horsehair Canvas Construction',
  145000,
  1120,
  ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'],
  true,
  true
),
(
  'e2d30800-4b5b-4351-a5bf-8f929bb0cb02',
  'The St. James Royal Emerald Velvet Smoking Jacket',
  'the-st-james-royal-emerald-velvet-smoking-jacket',
  'Lustrous Cotton Velvet with Satin Quilted Shawl Collar',
  'An ode to classic British evening grandeur. Hand-cut from 320g Holland & Sherry cotton velvet, featuring deep black satin peak-shawl lapels and silk frog closures.',
  'velvets',
  'Holland & Sherry Royal Emerald Cotton Velvet (320g/m).',
  'Half Canvas with Quilted Silk Interior',
  125000,
  965,
  ARRAY['https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85'],
  true,
  true
),
(
  'e2d30800-4b5b-4351-a5bf-8f929bb0cb03',
  'The Sovereign Double-Breasted Cashmere Blazer',
  'the-sovereign-double-breasted-cashmere-blazer',
  '6x2 Button Stance in Loro Piana Pure Cashmere',
  'Cut with broad peak lapels that accentuate a commanding V-taper. Paired with custom antique gold brass buttons bearing the Modern Man Kenya monogram crest.',
  'jackets',
  'Loro Piana 100% Cashmere (300g/m) in Deep Sartorial Navy.',
  'Full Canvas Soft Tailoring',
  158000,
  1220,
  ARRAY['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'],
  true,
  true
),
(
  'e2d30800-4b5b-4351-a5bf-8f929bb0cb04',
  'Black Tie Grosgrain Dinner Tuxedo',
  'black-tie-grosgrain-dinner-tuxedo',
  'Formal Red-Carpet Silhouette with Silk Grosgrain Facings',
  'The pinnacle of black-tie sophistication. Made from pure barathea wool that absorbs ambient light, framed by matte ribbed silk grosgrain on lapels and trouser braid.',
  'evening_dinner',
  'British 300g Barathea Pure Virgin Wool.',
  'Full Floating Canvas',
  185000,
  1430,
  ARRAY['https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=1200&q=85'],
  true,
  true
),
(
  'e2d30800-4b5b-4351-a5bf-8f929bb0cb05',
  'Modern Man Private Reserve Extrait de Parfum (100ml)',
  'modern-man-private-reserve-extrait-de-parfum',
  'Rare Kenyan Frankincense, Aged Oud & Warm Amber',
  'Conceived exclusively for Modern Man Kenya. Notes of Kenyan resinous frankincense, smoky Cambodian oud, and spiced cardamom encased in a weighty French glass flacon with a heavy gold brass cap.',
  'fragrances',
  'Pure Extrait de Parfum (32% Fragrance Concentration).',
  'Artisanal Batch Bottling in Grasse & Nairobi',
  24500,
  190,
  ARRAY['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85'],
  true,
  true
),
(
  'e2d30800-4b5b-4351-a5bf-8f929bb0cb06',
  'Sartorial Silk Grenadine Necktie & Pocket Square Set',
  'sartorial-silk-grenadine-necktie-pocket-square-set',
  'Woven on Historic 19th-Century Wooden Looms in Como',
  'Garza Grossa grenadine silk featuring an open, three-dimensional textured weave. Accompanying pure silk twill pocket square with hand-rolled shoemaker hems.',
  'accessories',
  '100% Como Silk Grenadine Garza Grossa.',
  'Unlined 3-Fold Construction with Hand-Rolled Edges',
  16500,
  128,
  ARRAY['https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=1200&q=85'],
  false,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Sample Variants
INSERT INTO public.product_variants (product_id, size, color, stock_quantity, sku)
VALUES
('e2d30800-4b5b-4351-a5bf-8f929bb0cb01', '38R', 'Midnight Navy', 5, 'MMK-SUIT-38R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb01', '40R', 'Midnight Navy', 6, 'MMK-SUIT-40R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb01', '42R', 'Midnight Navy', 5, 'MMK-SUIT-42R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb01', '44R', 'Midnight Navy', 3, 'MMK-SUIT-44R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb02', '38R', 'Royal Emerald', 3, 'MMK-VLVT-38R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb02', '40R', 'Royal Emerald', 4, 'MMK-VLVT-40R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb02', '42R', 'Royal Emerald', 4, 'MMK-VLVT-42R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb03', '40R', 'Sartorial Navy', 5, 'MMK-DB-40R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb03', '42R', 'Sartorial Navy', 5, 'MMK-DB-42R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb04', '40R', 'Pitch Black', 4, 'MMK-TUX-40R'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb05', '100ml Flacon', 'Amber Gold', 20, 'MMK-FRAG-100ML'),
('e2d30800-4b5b-4351-a5bf-8f929bb0cb06', '8.5cm Width', 'Sartorial Navy & Gold', 15, 'MMK-TIE-NAVY')
ON CONFLICT (sku) DO NOTHING;
