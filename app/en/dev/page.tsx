import type { Metadata } from "next";
import PortfolioPage from "../../components/PortfolioPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Websites, Landing Pages and Interfaces",
    description:
        "I build websites and interfaces focused on performance, clarity and conversion with React, Next.js, TypeScript and real shipped product work.",
    alternates: {
        canonical: `${BASE_URL}/en/dev`,
        languages: {
            "pt-BR": `${BASE_URL}/dev`,
            "en-US": `${BASE_URL}/en/dev`,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${BASE_URL}/en/dev`,
        siteName: "Luan Medrado",
        title: "Websites, Landing Pages and Interfaces",
        description: "I build websites and interfaces focused on performance, clarity and conversion with React, Next.js, TypeScript and real shipped product work.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Luan Medrado" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Websites, Landing Pages and Interfaces",
        description: "I build websites and interfaces focused on performance, clarity and conversion with React, Next.js, TypeScript and real shipped product work.",
    },
};

export default function EnglishDevPage() {
    return <PortfolioPage />;
}
