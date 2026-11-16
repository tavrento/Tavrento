import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, type: "website", locale: "en_US", images: [site.banner] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, logo: site.url + site.logo,
    ...(site.email ? { email: site.email } : {}), ...(Object.values(site.social).filter(Boolean).length ? { sameAs: Object.values(site.social).filter(Boolean) } : {}) };
  return (
    <html lang="en"><body className={`${inter.className} antialiased`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-black focus:text-white">Skip to content</a>
      <Header /><main id="main">{children}</main><Footer />
    </body></html>
  );
}
