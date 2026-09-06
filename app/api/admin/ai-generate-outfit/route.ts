import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';

interface ImagePart {
  inlineData: {
    mimeType: string;
    data: string;
  };
}

/**
 * Resolves an image input (data URL, remote URL, or local relative path) to an inline base64 part
 */
async function resolveImagePart(img: string): Promise<ImagePart | null> {
  try {
    // 1. Data URL: data:image/jpeg;base64,....
    if (img.startsWith('data:')) {
      const match = img.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        return {
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        };
      }
    }

    // 2. Local relative static path: /images/...
    if (img.startsWith('/')) {
      const cleanPath = img.split('?')[0];
      const localFilePath = path.join(process.cwd(), 'public', cleanPath);
      if (fs.existsSync(localFilePath)) {
        const fileBuffer = fs.readFileSync(localFilePath);
        const ext = path.extname(cleanPath).toLowerCase();
        let mimeType = 'image/jpeg';
        if (ext === '.png') mimeType = 'image/png';
        if (ext === '.webp') mimeType = 'image/webp';
        if (ext === '.svg') mimeType = 'image/svg+xml';
        return {
          inlineData: {
            mimeType,
            data: fileBuffer.toString('base64'),
          },
        };
      }
    }

    // 3. Remote URL: https://...
    if (img.startsWith('http://') || img.startsWith('https://')) {
      const res = await fetch(img, { headers: { 'User-Agent': 'ModernManKenya-AI/1.0' } });
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        const contentType = res.headers.get('content-type') || 'image/jpeg';
        return {
          inlineData: {
            mimeType: contentType.split(';')[0],
            data: Buffer.from(arrayBuffer).toString('base64'),
          },
        };
      }
    }
  } catch (err) {
    console.warn('Could not process image for Gemini AI analysis:', err);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Admin Session
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Unauthorized: Staff admin session required.' },
        { status: 401 }
      );
    }

    // 2. Retrieve Gemini API Key from Server Environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured on the server. Please check .env.local.' },
        { status: 500 }
      );
    }

    // 3. Parse Request Payload
    const body = await req.json();
    const { images = [], hint = '' } = body;

    // 4. Convert images into Gemini Multimodal Parts
    const imageParts: ImagePart[] = [];
    if (Array.isArray(images) && images.length > 0) {
      // Analyze up to 4 images
      for (const imgUrl of images.slice(0, 4)) {
        if (typeof imgUrl === 'string' && imgUrl.trim() !== '') {
          const part = await resolveImagePart(imgUrl.trim());
          if (part) {
            imageParts.push(part);
          }
        }
      }
    }

    // 5. Formulate High-End Sartorial Prompt
    const systemPrompt = `You are the Master Creative & Style Director at "Modern Man Kenya 254", an ultra-luxury bespoke tailoring house in Nairobi operating at Savile Row standards (Opulence, Simplicity, Class).

Your task is to analyze the provided garment photograph(s) (or styling concept hint) and generate complete, polished luxury menswear catalog metadata.

EXACT REQUIREMENTS:
- Category MUST be one of: "suits", "jackets", "velvets", "evening-dinner", "fragrances", "accessories".
  - If it is a velvet dinner or smoking jacket, select "velvets".
  - If it is a 2-piece or 3-piece formal suit, select "suits".
  - If it is a sport coat, blazer, or casual jacket, select "jackets".
  - If it is a tuxedo, dinner suit, or black-tie attire, select "evening-dinner".
- "audience": MUST be one of: "modernman", "modernwoman", "modernchild".
  - If tailored for gentlemen, output "modernman".
  - If tailored for ladies / women (e.g. women's suit, tailored women's blazer, pantsuit), output "modernwoman".
  - If tailored for children / juniors / boys / girls, output "modernchild".
- "name": An evocative, aristocratic title following the brand's naming convention (e.g. "The Sovereign Midnight Velvet Shawl Dinner Jacket", "The Biella Glen Check Three-Piece Worsted Suit", "The Royal Savoy Double-Breasted Cashmere Blazer", "The Baroness Sculpted Wool Trouser Suit").
- "tagline": A concise headline under 10 words describing the stance or cloth (e.g. "6x2 Button Stance in 320g British Cotton Velvet", "Hand-Drafted Two-Piece in Scabal Super 150s Worsted Wool").
- "description": CRITICAL CONSTRAINT: Keep it brief, refined, and punchy — strictly 1 to 2 short sentences (maximum 35 to 50 words total). Do NOT output long paragraphs, filler, or walls of text. Focus cleanly on the silhouette, cloth essence, and occasion versatility.
- "fabricDetails": Mill provenance, cloth weight, and composition (e.g., "Holland & Sherry Royal Emerald Cotton Velvet (320g/m)", "Loro Piana Tasmanian Super 150s Fine Merino & Cashmere (260g/m)", "Scabal Super 150s Midnight Navy Worsted Wool (270g/m)").
- "construction": Internal craftsmanship architecture (e.g., "Full Floating Horsehair Canvas with Hand-Padded Lapels", "Half Canvas Soft Tailoring with Quilted Silk Interior").
- "detailsList": An array of 3 to 5 concise bullet points (each under 10 words) highlighting specific craftsmanship elements visible in the photo or tailored for this garment (e.g. "Hand-sewn Milanese lapel buttonhole in pure silk", "Deep jetted pockets with matching silk facings", "Real horn buttons with brand engraving", "Made to measure in our Nairobi Atelier").
- "suggestedPriceKes": Realistic luxury bespoke price in Kenyan Shillings (e.g. 125000 to 195000 depending on complexity).
- "suggestedPriceUsd": Corresponding USD price (rounded, ~1 USD = 129.5 KES).
- "suggestedSizes": Default sizing array (e.g. ["38R", "40R", "42R", "44R"]).

Return ONLY a valid JSON object matching this schema. Keep description strictly to 1-2 short sentences. Return pure raw JSON without markdown code fences.`;

    const userTextPrompt = `Please analyze the provided garment image(s)${hint ? ` with this additional curator guidance: "${hint}"` : ''} and output the complete luxury product specification in strict JSON format.`;

    // 6. Build Gemini API Request
    const contents = [
      {
        role: 'user',
        parts: [
          { text: `${systemPrompt}\n\n${userTextPrompt}` },
          ...imageParts,
        ],
      },
    ];

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.35,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!geminiRes.ok) {
      const errorData = await geminiRes.json().catch(() => ({}));
      console.error('Gemini API error response:', errorData);
      return NextResponse.json(
        { error: errorData?.error?.message || 'Gemini AI analysis failed. Please try again.' },
        { status: 502 }
      );
    }

    const geminiData = await geminiRes.json();
    const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return NextResponse.json(
        { error: 'Gemini did not return any analysis text.' },
        { status: 500 }
      );
    }

    // 7. Parse and Validate JSON
    let parsedResult: any;
    try {
      const cleanJson = candidateText
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      parsedResult = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('Failed to parse Gemini output as JSON:', candidateText);
      return NextResponse.json(
        { error: 'Failed to parse AI output. Please retry.' },
        { status: 500 }
      );
    }

    // Helper to format string fields that might be returned as nested objects
    const stringifyVal = (val: any, fallback: string = ''): string => {
      if (!val) return fallback;
      if (typeof val === 'string') return val;
      if (typeof val === 'object') {
        if (Array.isArray(val)) return val.join(' • ');
        return Object.entries(val)
          .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').trim()}: ${v}`)
          .join(' • ');
      }
      return String(val);
    };

    // Category mapping fallback
    let normalizedCategory = 'suits';
    const rawCat = (parsedResult.category || '').toLowerCase();
    if (rawCat.includes('velvet')) normalizedCategory = 'velvets';
    else if (rawCat.includes('dinner') || rawCat.includes('tux') || rawCat.includes('evening')) normalizedCategory = 'evening-dinner';
    else if (rawCat.includes('jacket') || rawCat.includes('blazer') || rawCat.includes('coat')) normalizedCategory = 'jackets';
    else if (rawCat.includes('fragrance') || rawCat.includes('perfume')) normalizedCategory = 'fragrances';
    else if (rawCat.includes('access')) normalizedCategory = 'accessories';
    else normalizedCategory = 'suits';

    // Audience mapping fallback
    let normalizedAudience: 'modernman' | 'modernwoman' | 'modernchild' = 'modernman';
    const rawAud = (parsedResult.audience || '').toLowerCase();
    if (rawAud.includes('woman') || rawAud.includes('wom') || rawAud.includes('lad') || rawAud.includes('female')) {
      normalizedAudience = 'modernwoman';
    } else if (rawAud.includes('child') || rawAud.includes('kid') || rawAud.includes('junior') || rawAud.includes('boy') || rawAud.includes('girl')) {
      normalizedAudience = 'modernchild';
    } else {
      normalizedAudience = 'modernman';
    }

    let rawDesc = stringifyVal(parsedResult.description, '').trim();
    if (rawDesc.includes('\n')) {
      rawDesc = rawDesc.split(/\r?\n/)[0].trim();
    }
    const sentences = rawDesc.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length > 2) {
      rawDesc = sentences.slice(0, 2).join(' ').trim();
    }

    const normalizedOutfit = {
      name: stringifyVal(parsedResult.name, 'The Modern Man Bespoke Masterwork'),
      category: normalizedCategory,
      audience: normalizedAudience,
      tagline: stringifyVal(parsedResult.tagline, 'Handcrafted Full Canvas Tailoring in Nairobi'),
      description: rawDesc,
      fabricDetails: stringifyVal(parsedResult.fabricDetails, 'Super 150s Fine Worsted Wool (England)'),
      construction: stringifyVal(parsedResult.construction, 'Full Floating Horsehair Canvas'),
      detailsList: Array.isArray(parsedResult.detailsList) 
        ? parsedResult.detailsList.map((item: any) => typeof item === 'string' ? item : JSON.stringify(item))
        : [
            'Full Floating Canvas interior for anatomical drape',
            'Hand-finished lapel buttonhole and pick stitching',
            'Made to measure in our Nairobi Flagship Atelier'
          ],
      priceKes: Number(parsedResult.suggestedPriceKes || parsedResult.priceKes || 165000),
      priceUsd: Number(parsedResult.suggestedPriceUsd || parsedResult.priceUsd || 1275),
      suggestedPriceKes: Number(parsedResult.suggestedPriceKes || parsedResult.priceKes || 165000),
      suggestedPriceUsd: Number(parsedResult.suggestedPriceUsd || parsedResult.priceUsd || 1275),
      slug: stringifyVal(parsedResult.slug, '') || stringifyVal(parsedResult.name, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    return NextResponse.json({ success: true, outfit: normalizedOutfit, product: normalizedOutfit }, { status: 200 });
  } catch (err: any) {
    console.error('Server error in /api/admin/ai-generate-outfit:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error processing AI garment analysis.' },
      { status: 500 }
    );
  }
}
