import type { Metadata } from "next";
import { Syne, DM_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-code",
});

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
        className={`${dmSans.variable} ${syne.variable} ${firaCode.variable} font-[family-name:var(--font-body)] min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-x-hidden`}
      >
        <ThemeProvider>
          <div className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md">
            <div className="max-w-4xl mx-auto px-4">
              <Navigation />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-2 sm:py-8 h-full min-h-screen flex flex-col relative">
            {children}
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
