import { NextRequest, NextResponse } from 'next/server';
import { KASUKU_SYSTEM_PROMPT } from '@/lib/ai/kasukuPrompt';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const CANDIDATE_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.5-pro'];

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini AI key is not configured on the server. Please check .env.local.' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Normalize incoming messages whether from floating assistant or account section
    let rawMessages: ChatMessage[] = [];

    if (Array.isArray(body.messages) && body.messages.length > 0) {
      rawMessages = body.messages.map((m: any) => ({
        role: m.role === 'model' ? 'model' : 'user',
        content: String(m.content || ''),
      }));
    } else if (body.message) {
      if (Array.isArray(body.history)) {
        for (const h of body.history) {
          const text = h.parts?.[0]?.text || h.content || '';
          if (text) {
            rawMessages.push({
              role: h.role === 'model' ? 'model' : 'user',
              content: String(text),
            });
          }
        }
      }
      rawMessages.push({
        role: 'user',
        content: String(body.message),
      });
    }

    if (rawMessages.length === 0) {
      return NextResponse.json({ error: 'At least one message is required.' }, { status: 400 });
    }

    // Format contents for Gemini API (keep last 12 messages for rich context)
    const recentMessages = rawMessages.slice(-12);
    const contents: any[] = [];
    for (const msg of recentMessages) {
      contents.push({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      });
    }

    // Attempt generation with candidate models
    let replyText = '';
    let lastError = '';

    for (const model of CANDIDATE_MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: KASUKU_SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              temperature: 0.5,
              topP: 0.9,
              maxOutputTokens: 1200,
            },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) {
            replyText = candidate.trim();
            break;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          lastError = errData?.error?.message || `Model ${model} returned HTTP ${res.status}`;
          console.warn(`Gemini model ${model} failed, trying fallback:`, lastError);
        }
      } catch (callErr: any) {
        lastError = callErr?.message || 'Network error';
        console.warn(`Fetch error for ${model}:`, lastError);
      }
    }

    if (!replyText) {
      return NextResponse.json(
        { error: lastError || 'Kasuku AI is momentarily unavailable. Please try again shortly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reply: replyText,
    });
  } catch (error: any) {
    console.error('Kasuku AI chat route error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
