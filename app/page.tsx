"use client";

import { useEffect, useState } from "react";

interface RecoveryCase {
  id: string;
  amount_owed: number;
  status: string;
}

const fallbackData: RecoveryCase[] = [
  { id: "case-1", amount_owed: 1200, status: "OPEN" },
  { id: "case-2", amount_owed: 450, status: "OPEN" }
];

export default function Page() {
  const [cases, setCases] = useState<RecoveryCase[]>(fallbackData);
  const [apiDown, setApiDown] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8008/admin/admin/collections/overdue")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCases(data);
        }
      })
      .catch(() => {
        console.log("Recovery API offline — using fallback");
        setApiDown(true);
      });
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Borrower Dashboard</h1>

      <h2>Recovery Cases</h2>

      {apiDown && (
        <p style={{ color: "orange" }}>
          Recovery service offline — showing local data
        </p>
      )}

      <ul>
        {cases.map((c) => (
          <li key={c.id}>
            Case {c.id} — ${c.amount_owed} — {c.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
