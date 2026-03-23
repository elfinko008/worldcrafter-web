import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const promptText = body.prompt;
    
    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1500,
        messages: [{ role: 'user', content: `Du bist die Nexyra Engine. Erstelle ein fertiges Roblox Script für: ${promptText}. Antworte NUR mit dem Code.` }]
      })
    });

    const data = await apiResponse.json();
    
    if (!data.content || !data.content[0]) {
       return NextResponse.json({ result: "-- Fehler in der KI-Antwort" });
    }

    return NextResponse.json({ result: data.content[0].text });
  } catch (error: any) {
    return NextResponse.json({ error: "Nexyra Engine Timeout" }, { status: 500 });
  }
}