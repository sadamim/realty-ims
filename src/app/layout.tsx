import type { Metadata } from "next";
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
  title: "Realty Focus - Real Estate in Bangalore",
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
