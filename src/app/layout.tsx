import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gemora | Rare Gemstones",
  description: "A curated collection of rare and responsibly sourced gemstones.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
