import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "SSR Realty | Premium Real Estate & Commercial Platform",
  description:
    "Find the right property. Build the right opportunity. SSR Realty connects residential homebuyers with luxury developments, and commercial landlords with top retail, QSR, and enterprise brands.",
  keywords: [
    "SSR Realty",
    "Bengaluru real estate",
    "Luxury apartments Bangalore",
    "Commercial real estate",
    "QSR location Bangalore",
    "High street retail Indiranagar",
    "Whitefield luxury villas",
    "Commercial leasing Bangalore",
  ],
  authors: [{ name: "SSR Realty Technologies" }],
  openGraph: {
    title: "SSR Realty | Premium Real Estate & Commercial Platform",
    description:
      "Residential properties, commercial opportunities, and strategic real-estate solutions connected through SSR Realty.",
    url: "https://ssrrealty.com",
    siteName: "SSR Realty",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "SSR Realty Luxury Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
