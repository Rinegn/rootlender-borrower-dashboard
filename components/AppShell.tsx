export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <strong>RootLender</strong>
      </header>
      <main>{children}</main>
    </div>
  );
}
