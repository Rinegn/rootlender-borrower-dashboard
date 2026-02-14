import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.LEDGER_SERVICE_URL || "http://127.0.0.1:8010";
  try {
    const res = await fetch(\\/health\, { cache: "no-store" });
    const text = await res.text();
    return NextResponse.json({ ok: res.ok, ledger: text });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "ledger unreachable" });
  }
}
