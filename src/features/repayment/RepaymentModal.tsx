"use client";

import { useState } from "react";

export function RepaymentModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: (amount: number) => void;
  onCancel: () => void;
}) {
  const [amount, setAmount] = useState("");

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, marginTop: 12 }}>
      <h3>Confirm Repayment</h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div style={{ marginTop: 8 }}>
        <button onClick={() => onConfirm(Number(amount))}>
          Confirm
        </button>

        <button onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
