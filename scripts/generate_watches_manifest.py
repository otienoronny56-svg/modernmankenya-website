import json
import os

with open('data/custom_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

watches = [p for p in products if p.get('slug', '').startswith('watch-')]

manifest = []
for i, w in enumerate(watches):
    slug = w['slug']
    local_path = os.path.abspath(f'data/watches_images/{slug}.webp')
    manifest.append({
        'index': i + 1,
        'id': w['id'],
        'slug': slug,
        'current_name': w['name'],
        'current_price_kes': w.get('priceKes'),
        'image_url': w['images'][0],
        'local_path': local_path.replace('\\', '/')
    })

with open('data/watches_manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)

print(f'Wrote {len(manifest)} watches to data/watches_manifest.json')
