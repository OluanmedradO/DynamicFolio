"use client";

import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";

export default function FreelanceBadge() {
    const { lang } = useLanguage();
    const { mode } = useMode();

    const text =
        lang === "en"
            ? mode === "editor"
                ? "Available for Projects"
                : "Available for Projects"
            : mode === "editor"
                ? "Disponível para Projetos"
                : "Disponível para Projects";

    return (
        <a
            href="#contato"
            className="freelance-badge"
            id="freelanceBadge"
            onClick={(event) => {
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
