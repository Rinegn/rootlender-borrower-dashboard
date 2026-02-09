import { RecoveryCaseList } from "../src/features/recovery/RecoveryCaseList";
import { RepaymentButton } from "../src/features/repayment/RepaymentButton";

export default function Page() {
  return (
    <main>
      <h1>Borrower Dashboard</h1>

      <h2>Recovery Cases</h2>
      <RecoveryCaseList />

      <RepaymentButton caseId="case-1" />
    </main>
  );
}
