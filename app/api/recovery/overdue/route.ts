import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const overdue = url.searchParams.get("overdue_seconds") || "30";

  const base = process.env.RECOVERY_SERVICE_URL || "http://127.0.0.1:8008";
  const target = \\/admin/admin/collections/overdue?overdue_seconds=\\;

  try {
    const res = await fetch(target, { cache: "no-store" });
    const text = await res.text();
    if (!res.ok) return NextResponse.json({ cases: [], error: text }, { status: 200 });

    // Recovery service may return raw list OR object; normalize.
    let data: any;
    try { data = JSON.parse(text); } catch { data = []; }

    const cases = Array.isArray(data) ? data : (data.cases || data.items || []);
    return NextResponse.json({ cases }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ cases: [], error: e?.message || "proxy failed" }, { status: 200 });
  }
}
