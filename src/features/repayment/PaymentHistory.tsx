import type { PaymentRecord } from "@/src/types/finance";
import { StatusBadge } from "@/src/components/StatusBadge";

export function PaymentHistory({ payments }: { payments: PaymentRecord[] }) {
  if (!payments.length) return <div style={{ color: "#6b7280" }}>No payment history yet.</div>;

  return (
    <div style={{ marginTop: 8 }}>
      {payments.map(p => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
          <div>
            <div style={{ fontWeight: 800 }}>\</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{new Date(p.created_at).toLocaleString()}</div>
          </div>
          <StatusBadge label={p.status} />
        </div>
      ))}
    </div>
  );
}
