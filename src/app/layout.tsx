import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Declan Malone — Product / UX Designer",
  description:
    "Portfolio of Declan Malone, Product and UX Designer with 6+ years of experience in ecommerce, wealth management, and SaaS.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="min-h-dvh bg-white text-[#111111] font-[family-name:var(--font-geist)]">
        {children}
      </body>
    </html>
  );
}
