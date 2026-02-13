"use client";

import { useState } from "react";

export function RepaymentButton({
  caseId,
  onSubmit
}: {
  caseId: string;
  onSubmit: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(100);

  return (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={() => onSubmit(amount)}>
        Make Repayment
      </button>
    </div>
  );
}
