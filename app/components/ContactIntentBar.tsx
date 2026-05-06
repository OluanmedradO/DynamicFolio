"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { stripLocalePrefix } from "../lib/locale";
import { trackEvent } from "../lib/analytics";

const STORAGE_KEY = "luan-contact-intent-dismissed";

export default function ContactIntentBar() {
    const pathname = usePathname();
    const { lang } = useLanguage();
    const { mode } = useMode();
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState<boolean | null>(() =>
        typeof window === "undefined" ? null : window.localStorage.getItem(STORAGE_KEY) === "true",
    );

    const normalizedPathname = stripLocalePrefix(pathname ?? "/");
    const isRiffmaker = normalizedPathname.startsWith("/riffmaker");
    const isPortfolioRoute = normalizedPathname === "/dev" || normalizedPathname === "/editing";
    const target = normalizedPathname === "/" ? "#servicos" : "#contato";

    useEffect(() => {
        if (isRiffmaker || isPortfolioRoute || dismissed !== false) return;

        const handleScroll = () => {
            const contact = document.getElementById("contato");
            if (contact) {
                const rect = contact.getBoundingClientRect();
                const contactInView = rect.top < window.innerHeight * 0.86 && rect.bottom > 0;
                if (contactInView) {
                    setVisible(false);
                    return;
                }
            }

            if (normalizedPathname === "/") {
                const work = document.getElementById("trabalhos");
                if (work) {
                    const rect = work.getBoundingClientRect();
                    const workInView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.08;
                    if (workInView) {
                        setVisible(false);
                        return;
                    }
                }
            }

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll <= 0) return;

            const depth = window.scrollY / maxScroll;
            const threshold = normalizedPathname === "/" ? 0.65 : 0.55;
            if (depth >= threshold) {
                setVisible((current) => {
                    if (!current) {
                        trackEvent("contact_intent_shown", { source: "bottom_bar", lang, mode });
                    }
                    return true;
                });
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [dismissed, isPortfolioRoute, isRiffmaker, lang, mode, normalizedPathname]);

    if (isRiffmaker || isPortfolioRoute || dismissed !== false || !visible) {
        return null;
    }

    const copy =
        lang === "en"
            ? { text: "Where do you want to start?", cta: "Choose a path" }
            : { text: "Por onde você quer começar?", cta: "Escolher caminho" };

    return (
        <div className="contact-intent-bar" role="region" aria-label={lang === "en" ? "Contact shortcut" : "Atalho de contato"}>
            <span className="contact-intent-copy">{copy.text}</span>
            <Link
                href={target}
                onClick={() => trackEvent("contact_intent_clicked", { source: "bottom_bar", lang, mode })}
            >
                {copy.cta} →
            </Link>
            <button
                type="button"
                aria-label={lang === "en" ? "Dismiss contact shortcut" : "Fechar atalho de contato"}
                onClick={() => {
                    window.localStorage.setItem(STORAGE_KEY, "true");
                    setDismissed(true);
                    trackEvent("contact_intent_dismissed", { source: "bottom_bar", lang, mode });
                }}
            >
                ×
            </button>
        </div>
    );
}
