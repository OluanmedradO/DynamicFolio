import type { Metadata } from "next";
import PortfolioPage from "../../components/PortfolioPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Video Editing for YouTube and Reels",
    description:
        "I turn your videos into content that holds attention and grows, with retention-focused editing, pacing and ready-to-post delivery.",
    alternates: {
        canonical: `${BASE_URL}/en/editing`,
        languages: {
            "pt-BR": `${BASE_URL}/editing`,
            "en-US": `${BASE_URL}/en/editing`,
        },
    },
};

export default function EnglishEditingPage() {
    return <PortfolioPage />;
}
