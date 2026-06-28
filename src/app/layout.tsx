import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getProfile } from "@/lib/site-content";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-white text-[#111111] font-[family-name:var(--font-geist)]">
        <Nav name={profile.name} />
        <main className="flex-1">{children}</main>
        <Footer email={profile.email} linkedin={profile.linkedin} />
      </body>
    </html>
  );
}
