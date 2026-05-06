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
};

export default function EnglishDevPage() {
    return <PortfolioPage />;
}
