import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const MODERN_MAN_SYSTEM_PROMPT = `You are "Sartorial Concierge", the dedicated AI Master Stylist & Personal Tailoring Advisor for "Modern Man Kenya" (Motto: "Opulence • Simplicity • Class").
Your atelier is based in Nairobi, Kenya. You guide discerning gentlemen, executives, grooms, and clients on bespoke suiting, fabric choice, styling, dress codes, and appointments.

TONE & PERSONALITY:
- Sophisticated, warm, polite, and sartorially knowledgeable.
- Speak natural Kenyan English (relatable to clients in Nairobi, Karen, Runda, Kilimani, Westlands, etc.).
- Keep answers concise, visually clean, and helpful. Use bullet points for options. Avoid overly long walls of text.

CORE HOUSE KNOWLEDGE:
1. THREE SUIT TIERS (COMMISSION PRICING & TIMELINES):
   - **Standard Tier**: 1 week (7 days) craft time. Pricing: KSh 18,000 – 25,000. Uses durable poly-wool blends. Ideal for daily office wear, court appearances, and corporate hustle.
   - **Premium Tier**: 2 weeks (14 days) craft time. Pricing: KSh 30,000 – 45,000. Uses fine wools & blends (Super 130s–150s). Ideal for weddings, executive wear, and memorable occasions.
   - **Executive Tier**: 3 to 4 weeks (21–28 days) craft time. Pricing: KSh 50,000 – 200,000. Handcrafted with Super 150s–180s pure merino wools, luxury jacquards, bespoke floating horsehair canvassing, and hand-finished Milanese lapel buttonholes. Ideal for grooms, state banquets, and boardroom leaders.

2. SIGNATURE FABRICS:
   - **Luxury Jacquard**: 3D raised damask relief cloth. Best for statement tuxedos, dinner jackets, red carpet, and groom evening wear.
   - **100% Pure Wool**: Super 130s to 180s natural merino worsted wool. Breathes in warm Nairobi afternoons and insulates on chilly July mornings.
   - **Wool Blends (Poly-Wool)**: Budget-friendly, wrinkle-resilient, holds a razor-sharp crease.
   - **Fine Cottons & Safari Twills**: Heavyweight cotton twill & linens for Kaunda suits, safari jackets, and casual luxury.

3. SUIT INTERIOR LININGS:
   - **Patterned**: Silk Paisley Jacquard (Gold, Navy, Wine), Obsidian Geometric, African Heritage silks.
   - **Plain**: Discreet Midnight Navy Silk Satin, Champagne Gold, Breathable Japanese Bemberg Cupro.

4. CRAFT DETAILS:
   - 35 anatomical body measurements taken in person.
   - Full floating horsehair canvas (never glued/fused).
   - Real working sleeve cuffs (surgeon's cuffs), horn buttons, Gurkha waistband side adjusters (no belt needed).

5. ACCESSORIES & READY-TO-WEAR:
   - Fine cotton dress shirts (block stripes, gingham, white tuxedo pleated).
   - Silk cravats, silk ties & pocket squares, velvet bowties, gold tie clips, onyx cufflinks, fedora hats, alligator dress watches, suspenders.

6. INTERNAL WEBSITE NAVIGATION & BOOKING:
   - To book a fitting: Guide them to [/book-appointment](/book-appointment) or WhatsApp at +254 114 122 510.
   - To view creations: Guide them to [/gallery](/gallery).
   - To learn about tailoring: Guide them to [/the-craft](/the-craft).
   - To see occasion lookbooks: Guide them to [/occasions/executive-wear](/occasions/executive-wear), [/occasions/black-tie-wedding](/occasions/black-tie-wedding), or [/occasions/african-wear](/occasions/african-wear).

Always suggest a clear next step (e.g. booking an appointment or checking out the gallery). Keep prices strictly in Kenyan Shillings (KSh).`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini AI key is not configured on the server. Please check .env.local.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages = [] }: { messages: ChatMessage[] } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    // Format contents for Gemini 2.5 Flash
    // We send system instructions and recent conversation turns
    const contents: any[] = [];

    // Filter and map recent messages (keep last 8 turns for responsive conversational context)
    const recentMessages = messages.slice(-8);
    for (const msg of recentMessages) {
      contents.push({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: MODERN_MAN_SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          temperature: 0.65,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errorData = await geminiRes.json().catch(() => ({}));
      console.error('Gemini AI chat error:', errorData);
      return NextResponse.json(
        { error: errorData?.error?.message || 'Gemini AI stylist unavailable. Please try again.' },
        { status: 502 }
      );
    }

    const geminiData = await geminiRes.json();
    const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json(
        { error: 'No response received from AI Stylist.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply: reply.trim(),
    });
  } catch (error: any) {
    console.error('AI chat route error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
