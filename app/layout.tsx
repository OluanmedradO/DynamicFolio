import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Cursor from "./components/Cursor";
import FreelanceBadge from "./components/FreelanceBadge";
import ModeSwitch from "./components/ModeSwitch";
import { LanguageProvider } from "./context/LanguageContext";
import { ModeProvider } from "./context/ModeContext";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Luan Medrado - Desenvolvedor Front-End",
  description: "Desenvolvedor front-end focado em criar experiências digitais incríveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${bebas.variable} ${syne.variable} ${dmMono.variable} ${dmSans.variable} antialiased`}
      >
        <LanguageProvider>
          <ModeProvider>
            <Cursor />
            <div className="mode-flash" id="modeFlash"></div>
            <ModeSwitch />
            <FreelanceBadge />
            <div style={{ overflowX: "clip" }}>
              {children}
            </div>
          </ModeProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
