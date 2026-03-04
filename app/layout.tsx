import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Scraper",
  description: "Image scraping application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 flex gap-6 px-6 py-3 bg-black/60 backdrop-blur-sm border-b border-zinc-800">
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            Scraper
          </Link>
          <Link
            href="/downloads"
            className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            Downloads
          </Link>
        </nav>
        <div className="pt-12">{children}</div>
      </body>
    </html>
  );
}
