import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Final Exam",
  description: "Secure Final Exam Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased select-none">{children}</body>
    </html>
  );
}
