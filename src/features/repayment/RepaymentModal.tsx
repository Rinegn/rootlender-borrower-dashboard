"use client";

import { useState } from "react";

export function RepaymentModal({
  caseId,
  remaining,
  onConfirm,
  onCancel,
}: {
  caseId: string;
  remaining: number;
  onConfirm: (amount: number) => void;
  onCancel: () => void;
}) {
  const [amount, setAmount] = useState<number>(Math.min(50, remaining));

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9998
    }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, width: 360 }}>
        <h3 style={{ marginTop: 0 }}>Confirm Payment</h3>
        <div style={{ marginBottom: 10, fontSize: 13, color: "#374151" }}>
          Case: <b>{caseId}</b><br />
          Remaining: <b>\</b>
        </div>

        <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
          Amount
        </label>
        <input
          type="number"
          min={1}
          max={remaining}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #d1d5db" }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={onCancel} style={{ padding: "10px 12px", width: "100%" }}>
            Cancel
          </button>
          <button
            onClick={() => onConfirm(amount)}
            style={{ padding: "10px 12px", width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8 }}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
