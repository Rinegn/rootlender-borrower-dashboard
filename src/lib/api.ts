export const RECOVERY_BASE_URL =
  process.env.NEXT_PUBLIC_RECOVERY_API_BASE_URL || "http://127.0.0.1:8008";

export const LEDGER_BASE_URL =
  process.env.NEXT_PUBLIC_LEDGER_API_BASE_URL || "http://127.0.0.1:8010";

export const LEDGER_ENABLED =
  (process.env.NEXT_PUBLIC_LEDGER_ENABLED || "false").toLowerCase() === "true";

export async function persistRepaymentToRecovery(opts: {
  borrowerId: string;
  caseId: string;
  amount: number;
}): Promise<{ ok: boolean; status: number; data?: any; error?: string }> {
  // We use a safe, configurable endpoint pattern.
  // If your Recovery service uses a different route, change ONLY this file later.
  const url = `${RECOVERY_BASE_URL}/borrower/${encodeURIComponent(
    opts.borrowerId
  )}/repayments`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        case_id: opts.caseId,
        amount: opts.amount
      })
    });

    const text = await res.text();
    let data: any = undefined;
    try {
      data = text ? JSON.parse(text) : undefined;
    } catch {
      data = text;
    }

    if (!res.ok) {
      return { ok: false, status: res.status, data, error: "Recovery API rejected repayment" };
    }
    return { ok: true, status: res.status, data };
  } catch (e: any) {
    return { ok: false, status: 0, error: e?.message || "Network error" };
  }
}

export async function postLedgerTransaction(opts: {
  borrowerId: string;
  caseId: string;
  amount: number;
}): Promise<{ ok: boolean; status: number; data?: any; error?: string }> {
  if (!LEDGER_ENABLED) {
    return { ok: true, status: 200, data: { skipped: true, reason: "LEDGER_DISABLED" } };
  }

  // Scaffold endpoint — your ledger service may differ.
  const url = `${LEDGER_BASE_URL}/transactions`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        borrower_id: opts.borrowerId,
        case_id: opts.caseId,
        amount: opts.amount,
        kind: "BORROWER_REPAYMENT"
      })
    });

    const text = await res.text();
    let data: any = undefined;
    try {
      data = text ? JSON.parse(text) : undefined;
    } catch {
      data = text;
    }

    if (!res.ok) {
      return { ok: false, status: res.status, data, error: "Ledger rejected transaction" };
    }
    return { ok: true, status: res.status, data };
  } catch (e: any) {
    return { ok: false, status: 0, error: e?.message || "Network error" };
  }
}
