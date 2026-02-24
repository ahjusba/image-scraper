import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
