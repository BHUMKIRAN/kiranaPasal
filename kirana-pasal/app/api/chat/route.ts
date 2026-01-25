// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (!message || !message.trim()) {
      console.error("❌ Empty message received");
      return NextResponse.json({ error: "Message is empty" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("❌ GOOGLE_API_KEY missing");
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    console.log("✅ Sending to Google AI:", message);

    // ✅ Initialize the new Google GenAI client
    const ai = new GoogleGenAI({ apiKey });

    // ✅ Generate content using the new SDK
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
    });

    const reply = response.text;
    console.log("✅ AI reply:", reply);

    return NextResponse.json({ reply });
    
  } catch (err: any) {
    console.error("❌ AI SERVER ERROR:", err.message || err);
    return NextResponse.json(
      { error: "AI server error", details: err.message || err.toString() },
      { status: 500 }
    );
  }
}