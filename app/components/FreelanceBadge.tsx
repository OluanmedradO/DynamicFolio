"use client";

import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localizePath, stripLocalePrefix } from "../lib/locale";

interface FreelanceBadgeProps {
    variant?: "floating" | "hero";
}

export default function FreelanceBadge({ variant = "floating" }: FreelanceBadgeProps) {
    const pathname = usePathname();
    const { lang } = useLanguage();
    const { mode } = useMode();
    const [isFloatingHidden, setIsFloatingHidden] = useState(true);

    const normalizedPathname = stripLocalePrefix(pathname ?? "/");
    const isHome = normalizedPathname === "/";
    const isDevPortfolioRoute = normalizedPathname === "/dev";
    const isEditingPortfolioRoute = normalizedPathname === "/editing";
    const isRiffmakerRoute = normalizedPathname.startsWith("/riffmaker");
    const targetHref = isHome ? localizePath("/editing", lang) : "#contato";
    const isFloating = variant === "floating";

    useEffect(() => {
        if (!isFloating || isRiffmakerRoute) return;

        const updateVisibility = () => {
            const hero = document.getElementById("hero");
            const isElementInView = (element: Element | null) => {
                if (!element) return false;

                const rect = element.getBoundingClientRect();
                return rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;
            };

            const contactOrFooterInView =
                isElementInView(document.getElementById("contato")) ||
                isElementInView(document.querySelector(".site-footer"));
            const contactIntent = document.querySelector(".contact-intent-bar");
            const contactIntentVisible = contactIntent
                ? getComputedStyle(contactIntent).visibility !== "hidden" &&
                getComputedStyle(contactIntent).opacity !== "0" &&
                getComputedStyle(contactIntent).display !== "none"
                : false;

            if (!hero) {
                setIsFloatingHidden(contactOrFooterInView || contactIntentVisible);
                return;
            }

            const rect = hero.getBoundingClientRect();
            const heroPassed = rect.bottom <= Math.min(120, window.innerHeight * 0.18);

            if (!heroPassed) {
                setIsFloatingHidden(true);
                return;
            }

            if (contactOrFooterInView) {
                setIsFloatingHidden(true);
                return;
            }

            if (contactIntentVisible) {
                setIsFloatingHidden(true);
                return;
            }

            if (isEditingPortfolioRoute && window.innerWidth <= 960 && isElementInView(document.getElementById("projetos"))) {
                setIsFloatingHidden(true);
                return;
            }

            if (isDevPortfolioRoute) {
                const competingSections = ["contato", "projetos", "vidalarsec"];
                const sectionInView = competingSections.some((id) => {
                    const section = document.getElementById(id);
                    if (!section) return false;

                    const sectionRect = section.getBoundingClientRect();
                    return sectionRect.top < window.innerHeight * 0.88 && sectionRect.bottom > window.innerHeight * 0.12;
                });

                setIsFloatingHidden(sectionInView);
                return;
            }

            setIsFloatingHidden(false);
        };

        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });
        window.addEventListener("resize", updateVisibility);

        return () => {
            window.removeEventListener("scroll", updateVisibility);
            window.removeEventListener("resize", updateVisibility);
        };
    }, [isDevPortfolioRoute, isEditingPortfolioRoute, isFloating, isRiffmakerRoute, pathname]);

    if (isRiffmakerRoute) {
        return null;
    }

    const text =
        lang === "en"
            ? isHome
                ? "I want my videos edited"
                : mode === "editor"
                    ? "Talk about my video"
                    : "Talk about my project"
            : isHome
                ? "Quero editar meus vídeos"
                : mode === "editor"
                    ? "Falar sobre meu vídeo"
                    : "Falar sobre meu projeto";

    return (
        <a
            href={targetHref}
            className={`freelance-badge freelance-badge--${variant}${isFloating && isFloatingHidden ? " is-hidden" : ""}`}
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
