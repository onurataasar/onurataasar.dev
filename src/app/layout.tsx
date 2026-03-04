import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onur Ata Asar - Kisisel Notlar ve Blog",
  description: "Kisisel notlar ve blog",
  openGraph: {
    title: "Onur Ata Asar",
    description: "Kisisel notlar ve blog",
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
    <html
      lang="tr"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] relative overflow-x-hidden font-[family-name:var(--font-instrument-sans)]"
      >
        {/* Dot grid background */}
        <div className="fixed inset-0 -z-10 dot-grid opacity-[0.04]" />
        {/* Top light band */}
        <div className="fixed top-0 left-0 right-0 -z-10 light-band" />

        <div className="sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navigation />
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-8 min-h-screen flex flex-col relative">
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
