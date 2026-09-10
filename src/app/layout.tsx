import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Fraunces gives headings an editorial, high-end feel while staying legible.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  // metadataBase lets every page give a path-only canonical and still emit an
  // absolute URL. The template appends the site name once, so a page sets only
  // its own title and no page ends up "Realty Focus | Realty Focus".
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Realty Focus - Real Estate in Bangalore",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Bangalore's Top Real Estate Site - RealtyFocus showcases real estate properties in Bangalore that fit your requirements. Find Property Info, Prices, Reviews, etc",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
