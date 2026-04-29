"use client";

import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface FreelanceBadgeProps {
    variant?: "floating" | "hero";
}

export default function FreelanceBadge({ variant = "floating" }: FreelanceBadgeProps) {
    const pathname = usePathname();
    const { lang } = useLanguage();
    const { mode } = useMode();
    const [heroPassed, setHeroPassed] = useState(false);

    const isHome = pathname === "/";
    const targetHref = isHome ? "/dev#contato" : "#contato";
    const isFloating = variant === "floating";

    useEffect(() => {
        if (!isFloating || pathname?.startsWith("/riffmaker")) return;

        const updateVisibility = () => {
            const hero = document.getElementById("hero");

            if (!hero) {
                setHeroPassed(true);
                return;
            }

            const rect = hero.getBoundingClientRect();
            setHeroPassed(rect.bottom <= Math.min(120, window.innerHeight * 0.18));
        };

        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });
        window.addEventListener("resize", updateVisibility);

        return () => {
            window.removeEventListener("scroll", updateVisibility);
            window.removeEventListener("resize", updateVisibility);
        };
    }, [isFloating, pathname]);

    if (pathname?.startsWith("/riffmaker")) {
        return null;
    }

    const text =
        lang === "en"
            ? mode === "editor"
                ? "Available for video"
                : "Open for projects"
            : mode === "editor"
                ? "Disponível para vídeos"
                : "Aberto a projetos";

    return (
        <a
            href={targetHref}
            className={`freelance-badge freelance-badge--${variant}${isFloating && !heroPassed ? " is-hidden" : ""}`}
            id={isFloating ? "freelanceBadge" : "freelanceBadgeHero"}
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
