import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1. Auth & User Check
    const { data: { user } } = await supabase.auth.getUser();
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) return NextResponse.json({ result: "-- No prompt provided" }, { status: 400 });

    // 2. Credits Check (Optional, falls du Testen willst, nimm das kurz raus)
    if (user) {
      const { data: profile } = await supabase.from("profiles").select("credits").eq("id", user.id).single();
      if (profile && profile.credits <= 0) {
        return NextResponse.json({ result: "-- Insufficient Credits" }, { status: 402 });
      }
    }

    // 3. Anthropic API Call
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      console.error("ANTHROPIC_API_KEY is missing in Env Variables!");
      return NextResponse.json({ result: "-- API Key Missing" }, { status: 503 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 2048,
        system: "You are Nexyra Engine. Output ONLY pure Luau code. No markdown, no text.",
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API Error Details:", errorText);
      return NextResponse.json({ result: "-- Claude Engine Error (502)" }, { status: 502 });
    }

    const data = await response.json();
    const result = data.content[0]?.text || "-- Error generating code";

    // 4. Credits abziehen
    if (user && result) {
      await supabase.rpc("decrement_credits", { user_id: user.id });
    }

    return NextResponse.json({ result });

  } catch (err: any) {
    console.error("Fatal API Error:", err);
    return NextResponse.json({ result: "-- Neural Link Offline" }, { status: 500 });
  }
}