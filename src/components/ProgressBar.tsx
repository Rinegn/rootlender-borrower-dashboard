export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={{ width: "100%", background: "#e5e7eb", borderRadius: 10, height: 10, overflow: "hidden" }}>
      <div style={{ width: v + "%", height: 10, background: "#2563eb" }} />
    </div>
  );
}
