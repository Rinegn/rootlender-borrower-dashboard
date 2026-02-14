"use client";

import { useState } from "react";
import { useBorrowerFinancialState } from "@/src/hooks/useBorrowerFinancialState";
import { RecoveryCaseList } from "@/src/features/recovery/RecoveryCaseList";
import { Toast } from "@/src/components/Toast";
import { StatusBadge } from "@/src/components/StatusBadge";

export default function Page() {
  const borrowerId = "borrower-1"; // later comes from auth/session
  const { loading, error, financialState, submitPayment, refresh } = useBorrowerFinancialState(borrowerId);

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function onPay(caseId: string, amount: number) {
    try {
      await submitPayment(caseId, amount);
      setToast({ type: "success", message: "Payment recorded." });
      refresh();
    } catch (e: any) {
      setToast({ type: "error", message: e?.message || "Payment failed." });
    }
  }

  return (
    <main style={{ padding: 18, maxWidth: 980 }}>
      <h1 style={{ marginTop: 0 }}>Borrower Dashboard</h1>

      <section style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 800 }}>Total Outstanding</div>
            <div style={{ fontSize: 22, fontWeight: 950 }}>\</div>
          </div>

          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 800 }}>Total Paid</div>
            <div style={{ fontSize: 22, fontWeight: 950 }}>\</div>
          </div>

          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 800 }}>Escalated Exposure</div>
            <div style={{ fontSize: 22, fontWeight: 950 }}>\</div>
          </div>

          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 800 }}>Credit Score (sim)</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 950 }}>{financialState.creditScore}</div>
              <StatusBadge label={financialState.creditScore >= 700 ? "GOOD" : "FAIR"} />
            </div>
          </div>
        </div>
      </section>

      <h2 style={{ marginTop: 18 }}>Recovery Cases</h2>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "red", fontWeight: 800 }}>Error: {error}</div>}

      {!loading && (
        <RecoveryCaseList
          cases={financialState.cases}
          paymentsByCase={financialState.paymentsByCase}
          onPay={onPay}
        />
      )}

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </main>
  );
}
