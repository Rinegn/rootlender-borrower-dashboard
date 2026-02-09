"use client";

import { useState } from "react";
import { RepaymentModal } from "./RepaymentModal";

export function RepaymentButton({ caseId }: { caseId: string }) {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<"idle" | "scheduled" | "error">("idle");

  const handleConfirm = (amount: number) => {
    setShowModal(false);

    // Mock logic
    if (amount > 0) {
      setStatus("scheduled");
    } else {
      setStatus("error");
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <button onClick={() => setShowModal(true)}>
        Make Repayment
      </button>

      {showModal && (
        <RepaymentModal
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}

      {status === "scheduled" && (
        <p style={{ color: "green" }}>
          ✅ Payment scheduled successfully
        </p>
      )}

      {status === "error" && (
        <p style={{ color: "red" }}>
          ❌ Payment failed (mock)
        </p>
      )}
    </div>
  );
}
