"use client";

import { useState } from "react";

export interface RecoveryCase {
  id: string;
  amount: number;
  status: string;
}

export interface PaymentRecord {
  caseId: string;
  amount: number;
  createdAtIso: string;
  status: "SCHEDULED" | "COMPLETED";
}

export interface InstallmentPlan {
  enabled: boolean;
  installmentAmount: number;
  frequencyDays: number;
  nextDueIso: string;
}

interface Props {
  cases: RecoveryCase[];
  payments: PaymentRecord[];
  plans: Record<string, InstallmentPlan | undefined>;
  onPay: (caseId: string, amount: number) => void;
  onPlanChange: (caseId: string, plan: InstallmentPlan) => void;
}

function ProgressBar({ pct }: { pct: number }) {
  const safe = Math.max(0, Math.min(100, pct));
  return (
    <div style={{ width: "100%", background: "#eee", borderRadius: 8, height: 10 }}>
      <div
        style={{
          width: safe + "%",
          height: 10,
          borderRadius: 8,
          background: safe >= 100 ? "#28a745" : "#007bff"
        }}
      />
    </div>
  );
}

export function RecoveryCaseList({ cases, payments, plans, onPay, onPlanChange }: Props) {

  const [inputAmounts, setInputAmounts] = useState<Record<string, number>>({});

  return (
    <div>
      <h2>Recovery Cases</h2>

      {cases.map(c => {

        const casePayments = payments.filter(p => p.caseId === c.id);

        const paidForCase = casePayments
          .reduce((sum, p) => sum + p.amount, 0);

        const remaining = Math.max(0, c.amount - paidForCase);

        const pctPaid = c.amount <= 0 ? 0 : (paidForCase / c.amount) * 100;

        const plan = plans[c.id];

        return (
          <div
            key={c.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 12,
              borderRadius: 8
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 800 }}>{c.id}</div>
                <div>Original: ${c.amount}</div>
                <div>Paid: ${paidForCase}</div>
                <div>Remaining: ${remaining}</div>
                <div>Status: <strong>{c.status}</strong></div>
              </div>

              <div style={{ minWidth: 240, flex: 1 }}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Progress</div>
                <ProgressBar pct={pctPaid} />
                <div style={{ marginTop: 6, fontSize: 12 }}>{Math.floor(pctPaid)}% paid</div>
              </div>
            </div>

            <hr style={{ margin: "12px 0" }} />

            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <div style={{ minWidth: 320 }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Installment Plan (UI-only)</div>

                <label style={{ display: "block", marginBottom: 8 }}>
                  <input
                    type="checkbox"
                    checked={!!plan?.enabled}
                    onChange={(e) => {
                      const enabled = e.target.checked;
                      const next = plan?.nextDueIso || new Date(Date.now() + 7 * 86400000).toISOString();
                      onPlanChange(c.id, {
                        enabled,
                        installmentAmount: plan?.installmentAmount || 50,
                        frequencyDays: plan?.frequencyDays || 7,
                        nextDueIso: next
                      });
                    }}
                  />{" "}
                  Enable plan
                </label>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <label>
                    Installment $
                    <input
                      type="number"
                      value={plan?.installmentAmount || 50}
                      onChange={(e) => {
                        onPlanChange(c.id, {
                          enabled: plan?.enabled || false,
                          installmentAmount: Number(e.target.value),
                          frequencyDays: plan?.frequencyDays || 7,
                          nextDueIso: plan?.nextDueIso || new Date(Date.now() + 7 * 86400000).toISOString()
                        });
                      }}
                      style={{ marginLeft: 6, width: 90 }}
                    />
                  </label>

                  <label>
                    Every (days)
                    <input
                      type="number"
                      value={plan?.frequencyDays || 7}
                      onChange={(e) => {
                        onPlanChange(c.id, {
                          enabled: plan?.enabled || false,
                          installmentAmount: plan?.installmentAmount || 50,
                          frequencyDays: Number(e.target.value),
                          nextDueIso: plan?.nextDueIso || new Date(Date.now() + 7 * 86400000).toISOString()
                        });
                      }}
                      style={{ marginLeft: 6, width: 70 }}
                    />
                  </label>
                </div>

                {plan?.enabled && (
                  <div style={{ marginTop: 10, fontSize: 13 }}>
                    Next due: <strong>{new Date(plan.nextDueIso).toLocaleString()}</strong>
                  </div>
                )}
              </div>

              <div style={{ minWidth: 360, flex: 1 }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Repayment History</div>

                {casePayments.length === 0 ? (
                  <div style={{ fontSize: 13 }}>No payments yet.</div>
                ) : (
                  <ul style={{ marginTop: 0 }}>
                    {casePayments.map((p, idx) => (
                      <li key={idx}>
                        ${p.amount} — {p.status} — {new Date(p.createdAtIso).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {c.status === "OPEN" && (
              <div style={{ marginTop: 12 }}>
                <input
                  type="number"
                  placeholder="Enter payment amount"
                  value={inputAmounts[c.id] || ""}
                  onChange={e =>
                    setInputAmounts({
                      ...inputAmounts,
                      [c.id]: Number(e.target.value)
                    })
                  }
                />

                <button
                  onClick={() => {
                    const amount = inputAmounts[c.id];
                    if (!amount || amount <= 0) return;
                    onPay(c.id, amount);
                    setInputAmounts({
                      ...inputAmounts,
                      [c.id]: 0
                    });
                  }}
                  style={{ marginLeft: 10 }}
                >
                  Submit Payment
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
