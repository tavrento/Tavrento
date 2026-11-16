import { NextResponse } from "next/server";
const hits = new Map<string, number[]>();
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const now = Date.now(); const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  if (recent.length >= 5) return NextResponse.json({ message: "Too many requests. Please try later." }, { status: 429 });
  hits.set(ip, [...recent, now]);
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  if (b.website) return NextResponse.json({ message: "Thank you." });
  const { name, email, subject, message } = b as Record<string, string>;
  if (!name || !/^\S+@\S+\.\S+$/.test(email ?? "") || !subject || (message ?? "").length < 10)
    return NextResponse.json({ message: "Please complete all fields correctly." }, { status: 400 });
  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return NextResponse.json({ message: "Contact form email delivery is not configured yet." }, { status: 503 });
  const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, reply_to: email, subject: `[Tavrento] ${subject}`.slice(0, 200), text: `From: ${name} <${email}>\n\n${message}` }) });
  return r.ok ? NextResponse.json({ message: "Thank you — your message has been sent." }) : NextResponse.json({ message: "Could not send your message. Please try again." }, { status: 502 });
}
