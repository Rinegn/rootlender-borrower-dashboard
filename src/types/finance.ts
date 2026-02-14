export type RecoveryCaseStatus = "OPEN" | "PARTIAL" | "ESCALATED" | "PAID" | "CLOSED";

export interface RecoveryCase {
  id: string;
  borrower_id: string;
  amount_owed: number;
  status: RecoveryCaseStatus;
  created_at?: string;
  borrower_action_required?: boolean;
}

export interface PaymentRecord {
  id: string;
  case_id: string;
  amount: number;
  status: "SCHEDULED" | "COMPLETED" | "FAILED";
  created_at: string;
}

export interface BorrowerFinancialState {
  borrowerId: string;
  totalOutstanding: number;
  totalPaid: number;
  totalEscalated: number;
  creditScore: number;
  cases: RecoveryCase[];
  paymentsByCase: Record<string, PaymentRecord[]>;
}
