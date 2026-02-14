import { useEffect, useState } from "react";

export interface RecoveryCase {
  id: string;
  amount_owed: number;
  status: string;
  borrower_action_required: boolean;
  created_at: string;
}

export interface FinancialSummary {
  totalOwed: number;
  totalPaid: number;
  creditScore: number;
}

export function useBorrowerFinancialState() {
  const [cases, setCases] = useState<RecoveryCase[]>([]);
  const [loading, setLoading] = useState(true);

  const [financialState, setFinancialState] = useState<FinancialSummary>({
    totalOwed: 0,
    totalPaid: 0,
    creditScore: 680
  });

  useEffect(() => {
    async function loadCases() {
      try {
        const res = await fetch("http://127.0.0.1:8003/admin/collections/overdue");
        const data = await res.json();

        setCases(data || []);

        const totalOwed = (data || []).reduce(
          (sum: number, c: RecoveryCase) => sum + c.amount_owed,
          0
        );

        setFinancialState({
          totalOwed,
          totalPaid: 0,
          creditScore: totalOwed > 0 ? 640 : 720
        });

      } catch {
        setCases([]);
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);

  return {
    cases,
    financialState,
    loading
  };
}
