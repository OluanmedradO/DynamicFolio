import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Cursor from "./components/Cursor";
import ContactIntentBar from "./components/ContactIntentBar";
import FreelanceBadge from "./components/FreelanceBadge";
import ModeSwitch from "./components/ModeSwitch";
import ScrollDepthTracker from "./components/ScrollDepthTracker";
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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Luan Medrado | Sites, Interfaces e Edição de Vídeo",
    template: "%s | Luan Medrado",
  },
  description:
    "Sites que convertem. Vídeos que prendem atenção. Edição e páginas pensadas para transformar atenção em cliente.",
  keywords: ["sites que convertem", "edição de vídeo", "landing page", "React", "Next.js", "TypeScript", "portfólio", "UI/UX", "front-end developer"],
  alternates: {
    canonical: BASE_URL,
    languages: {
      "pt-BR": BASE_URL,
      "en-US": `${BASE_URL}/en`,
    },
  },
  authors: [{ name: "Luan Medrado", url: BASE_URL }],
  creator: "Luan Medrado",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "Luan Medrado",
    title: "Luan Medrado | Sites, Interfaces e Edição de Vídeo",
    description:
      "Sites que convertem. Vídeos que prendem atenção. Edição e páginas pensadas para transformar atenção em cliente.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Luan Medrado | Sites, Interfaces e Edição de Vídeo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luan Medrado | Sites, Interfaces e Edição de Vídeo",
    description:
      "Sites que convertem. Vídeos que prendem atenção. Edição e páginas pensadas para transformar atenção em cliente.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${bebas.variable} ${syne.variable} ${dmMono.variable} ${dmSans.variable}`}
      >
        <LanguageProvider>
          <ModeProvider>
            <Cursor />
            <div className="mode-flash" id="modeFlash"></div>
            <ModeSwitch />
            <FreelanceBadge />
            <ScrollDepthTracker />
            <ContactIntentBar />
            <div style={{ overflowX: "clip" }}>
              {children}
            </div>
          </ModeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
