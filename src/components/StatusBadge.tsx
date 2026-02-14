export function StatusBadge({ label }: { label: string }) {
  const map: Record<string, { bg: string; fg: string }> = {
    OPEN: { bg: "#eef2ff", fg: "#3730a3" },
    PARTIAL: { bg: "#ecfeff", fg: "#155e75" },
    ESCALATED: { bg: "#fef2f2", fg: "#991b1b" },
    PAID: { bg: "#ecfdf5", fg: "#065f46" },
    CLOSED: { bg: "#f3f4f6", fg: "#111827" },
    SCHEDULED: { bg: "#fff7ed", fg: "#9a3412" },
    COMPLETED: { bg: "#ecfdf5", fg: "#065f46" },
    FAILED: { bg: "#fef2f2", fg: "#991b1b" },
  };

  const c = map[label] || { bg: "#f3f4f6", fg: "#111827" };

  return (
    <span style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      background: c.bg,
      color: c.fg,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 0.2
    }}>
      {label}
    </span>
  );
}
