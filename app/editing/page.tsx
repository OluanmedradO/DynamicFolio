import type { Metadata } from "next";
import PortfolioPage from "../components/PortfolioPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Edição de Vídeo para YouTube e Reels",
    description: "Transformo seus vídeos em conteúdo que prende atenção e cresce, com edição focada em retenção, ritmo e entrega pronta para postar.",
    alternates: {
        canonical: `${BASE_URL}/editing`,
        languages: {
            "pt-BR": `${BASE_URL}/editing`,
            "en-US": `${BASE_URL}/en/editing`,
        },
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: `${BASE_URL}/editing`,
        siteName: "Luan Medrado",
        title: "Edição de Vídeo para YouTube e Reels",
        description: "Transformo seus vídeos em conteúdo que prende atenção e cresce, com edição focada em retenção, ritmo e entrega pronta para postar.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Luan Medrado" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Edição de Vídeo para YouTube e Reels",
        description: "Transformo seus vídeos em conteúdo que prende atenção e cresce, com edição focada em retenção, ritmo e entrega pronta para postar.",
    },
};

export default function EditingPage() {
    return <PortfolioPage />;
}
