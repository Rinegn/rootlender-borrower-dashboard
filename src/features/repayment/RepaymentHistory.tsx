"use client";

export type Repayment = {
  id: string;
  amount: number;
  status: "SCHEDULED" | "COMPLETED";
};

export function RepaymentHistory({
  repayments,
}: {
  repayments: Repayment[];
}) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Repayment History</h2>
      <ul>
        {repayments.map((r) => (
          <li key={r.id} style={{ marginBottom: "0.5rem" }}>
            ${r.amount} —{" "}
            <StatusBadge status={r.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "SCHEDULED" | "COMPLETED";
}) {
  const baseStyle: React.CSSProperties = {
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };

  if (status === "SCHEDULED") {
    return (
      <span
        style={{
          ...baseStyle,
          backgroundColor: "#fff3cd",
          color: "#856404",
        }}
      >
        <Spinner />
        Processing
      </span>
    );
  }

  return (
    <span
      style={{
        ...baseStyle,
        backgroundColor: "#d4edda",
        color: "#155724",
      }}
    >
      Completed
    </span>
  );
}

function Spinner() {
  return (
    <span
      style={{
        width: "12px",
        height: "12px",
        border: "2px solid #856404",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        display: "inline-block",
      }}
    />
  );
}
