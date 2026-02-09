"use client";

type RecoveryCase = {
  id: string;
  amount_owed: number;
  status: string;
};

const MOCK_CASES: RecoveryCase[] = [
  { id: "case-1", amount_owed: 1000, status: "OPEN" },
  { id: "case-2", amount_owed: 450, status: "OPEN" },
];

export function RecoveryCaseList() {
  return (
    <section>
      <h2>Recovery Cases</h2>
      <ul>
        {MOCK_CASES.map((c) => (
          <li key={c.id}>
            Case {c.id} — ${c.amount_owed} — {c.status}
          </li>
        ))}
      </ul>
    </section>
  );
}
