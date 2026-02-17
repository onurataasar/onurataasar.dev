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
        className={`${inter.className} min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 relative overflow-x-hidden`}
      >
        {/* Decorative background blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-200 dark:bg-violet-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-fuchsia-200 dark:bg-fuchsia-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="sticky top-0 z-50 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4">
            <Navigation />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-2 sm:py-8 h-full min-h-screen flex flex-col relative">
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
