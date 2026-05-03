import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { FooterConditional } from "@/components/FooterConditional";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500"],
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
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable} min-h-screen relative overflow-x-hidden`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <FooterConditional />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
