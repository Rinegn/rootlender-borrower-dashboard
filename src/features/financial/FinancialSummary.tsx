"use client";

export function FinancialSummary({
  totalOwed,
  totalPaid,
  activeCases,
  creditScore
}: {
  totalOwed: number;
  totalPaid: number;
  activeCases: number;
  creditScore: number;
}) {
  const remaining = Math.max(0, totalOwed - totalPaid);

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 14,
        marginBottom: 16
      }}
    >
      <h2 style={{ marginTop: 0 }}>Financial Summary</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontWeight: 800 }}>Total Owed</div>
          <div>${totalOwed}</div>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Total Paid</div>
          <div>${totalPaid}</div>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Remaining</div>
          <div>${remaining}</div>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Active Cases</div>
          <div>{activeCases}</div>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Credit Score (Simulated)</div>
          <div>{creditScore}</div>
        </div>
      </div>
    </section>
  );
}
