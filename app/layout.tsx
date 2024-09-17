import type { Metadata } from "next";
import "./globals.css";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";
import UIShell from "./components/ui-shell";

export const metadata: Metadata = {
  title: "Carbon App",
  description: "A Next.js app with Carbon Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <UIShell>{children}</UIShell>
      </body>
    </html>
  );
}
