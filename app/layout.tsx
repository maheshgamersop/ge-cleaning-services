import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GE Cleaning Services | Premium Cleaning in the UAE",
  description:
    "GE Cleaning Services provides premium home and office cleaning solutions across the UAE. Book quickly via WhatsApp, call, or Instagram.",
  openGraph: {
    title: "GE Cleaning Services",
    description:
      "Premium home and office cleaning services in the UAE with simple WhatsApp booking.",
    siteName: "GE Cleaning Services",
    locale: "en_AE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-zinc-900">{children}</body>
    </html>
  );
}
