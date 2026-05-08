import type { Metadata } from "next";
import PortfolioPage from "../components/PortfolioPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Sites, Landing Pages e Interfaces",
    description: "Crio sites e interfaces focadas em performance, clareza e conversão com React, Next.js, TypeScript e produto real em produção.",
    alternates: {
        canonical: `${BASE_URL}/dev`,
        languages: {
            "pt-BR": `${BASE_URL}/dev`,
            "en-US": `${BASE_URL}/en/dev`,
        },
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: `${BASE_URL}/dev`,
        siteName: "Luan Medrado",
        title: "Sites, Landing Pages e Interfaces",
        description: "Crio sites e interfaces focadas em performance, clareza e conversão com React, Next.js, TypeScript e produto real em produção.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Luan Medrado" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sites, Landing Pages e Interfaces",
        description: "Crio sites e interfaces focadas em performance, clareza e conversão com React, Next.js, TypeScript e produto real em produção.",
    },
};

export default function DevPage() {
    return <PortfolioPage />;
}
