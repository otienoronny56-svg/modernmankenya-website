import json
import os

files = [
    'data/watches_analyzed_1_to_40.json',
    'data/watches_analyzed_41_to_80.json',
    'data/watches_analyzed_81_to_120.json',
    'data/watches_analyzed_121_to_160.json',
    'data/watches_analyzed_161_to_200.json'
]

total = 0
all_watches = []
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        items = json.load(fp)
        total += len(items)
        all_watches.extend(items)
        start_idx = items[0].get('index')
        end_idx = items[-1].get('index')
        print(f"{f}: {len(items)} items (index {start_idx} to {end_idx})")

print(f"\nTotal watches verified: {total} / 200")

# Check for duplicates or missing indices
indices = set(w.get('index') for w in all_watches)
missing = [i for i in range(1, 201) if i not in indices]
print(f"Missing indices: {missing}")

# Check brand distribution
brands = {}
for w in all_watches:
    b = w.get('brand', 'Unknown')
    brands[b] = brands.get(b, 0) + 1

print("\nIdentified Brands Summary:")
for b, count in sorted(brands.items(), key=lambda x: -x[1]):
    print(f"  {b}: {count}")
