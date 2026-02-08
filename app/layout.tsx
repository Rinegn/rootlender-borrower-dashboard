import "./globals.css";

export const metadata = {
  title: "RootLender Borrower Dashboard",
  description: "Borrower-facing dashboard UI scaffold",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
