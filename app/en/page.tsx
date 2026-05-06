import type { Metadata } from "next";
import HomePage from "../components/HomePage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Luan Medrado - Websites, Interfaces and Video Editing",
    description:
        "Websites that convert. Videos that hold attention. Editing and pages built to turn attention into clients.",
    alternates: {
        canonical: `${BASE_URL}/en`,
        languages: {
            "pt-BR": BASE_URL,
            "en-US": `${BASE_URL}/en`,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        alternateLocale: "pt_BR",
        url: `${BASE_URL}/en`,
        siteName: "Luan Medrado",
        title: "Luan Medrado - Websites, Interfaces and Video Editing",
        description:
            "Websites that convert. Videos that hold attention. Editing and pages built to turn attention into clients.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Luan Medrado - Websites, Interfaces and Video Editing" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Luan Medrado - Websites, Interfaces and Video Editing",
        description:
            "Websites that convert. Videos that hold attention. Editing and pages built to turn attention into clients.",
        images: ["/opengraph-image"],
    },
};

export default function EnglishHome() {
    return <HomePage />;
}
