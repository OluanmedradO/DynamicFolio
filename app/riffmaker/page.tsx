import type { Metadata } from "next";
import RiffMakerContent from "./RiffMakerContent";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Riff Maker — App de Captura de Riffs para Músicos",
    description: "App mobile para músicos capturarem riffs, ideias e versões sem perder o fluxo criativo. Publicado na Google Play.",
    alternates: {
        canonical: `${BASE_URL}/riffmaker`,
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: `${BASE_URL}/riffmaker`,
        siteName: "Luan Medrado",
        title: "Riff Maker — App de Captura de Riffs para Músicos",
        description: "App mobile para músicos capturarem riffs, ideias e versões sem perder o fluxo criativo. Publicado na Google Play.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Riff Maker" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Riff Maker — App de Captura de Riffs para Músicos",
        description: "App mobile para músicos capturarem riffs, ideias e versões sem perder o fluxo criativo. Publicado na Google Play.",
    },
};

export default function RiffMakerPage() {
    return <RiffMakerContent />;
}
