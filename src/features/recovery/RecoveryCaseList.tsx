"use client";

import { useState } from "react";
import { RecoveryCase } from "@/src/hooks/useBorrowerFinancialState";

interface Props {
  cases?: RecoveryCase[];
}

export function RecoveryCaseList({ cases = [] }: Props) {
  const [activePayCase, setActivePayCase] = useState<string | null>(null);

  if (!cases || cases.length === 0) {
    return <div style={{ color: "#888" }}>No recovery cases.</div>;
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {cases.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #eee",
            padding: 16,
            borderRadius: 8
          }}
        >
          <div style={{ fontWeight: 600 }}>Case ID: {c.id}</div>
          <div>Amount Owed: </div>
          <div>Status: {c.status}</div>

          {c.borrower_action_required && (
            <div style={{ color: "#d9534f", fontSize: 12 }}>
              Action Required
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
