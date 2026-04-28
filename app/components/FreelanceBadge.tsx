"use client";

import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { usePathname } from "next/navigation";

export default function FreelanceBadge() {
    const pathname = usePathname();
    const { lang } = useLanguage();
    const { mode } = useMode();

    if (pathname?.startsWith("/riffmaker")) {
        return null;
    }

    const isHome = pathname === "/";
    const targetHref = isHome ? "/dev#contato" : "#contato";

    const text =
        lang === "en"
            ? mode === "editor"
                ? "Open for projects"
                : "Open for projects"
            : mode === "editor"
                ? "Aberto a projetos"
                : "Aberto a projetos";

    return (
        <a
            href={targetHref}
            className="freelance-badge"
            id="freelanceBadge"
            onClick={(event) => {
                if (isHome) return;

                const contato = document.getElementById("contato");
                if (!contato) return;

                event.preventDefault();
                contato.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
        >
            <span className="freelance-dot"></span>
            <span className="freelance-text">{text}</span>
            <span className="freelance-arrow">↗</span>
        </a>
    );
}
