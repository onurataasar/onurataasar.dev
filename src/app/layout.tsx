import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onur Ata Asar - Kişisel Notlar ve Blog",
  description: "Kişisel notlar ve blog",
  openGraph: {
    title: "Onur Ata Asar",
    description: "Kişisel notlar ve blog",
    url: "https://onurataasar.vercel.app",
    images: ["/onur_ata_asar_card_v2.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@oenyuar",
    creator: "@oenyuar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50`}
      >
        <div className="max-w-4xl mx-auto px-4 py-2 sm:py-8 h-full min-h-screen flex flex-col">
          <Navigation />
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
