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
};

export default function DevPage() {
    return <PortfolioPage />;
}
