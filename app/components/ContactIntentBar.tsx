"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
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

    const isRiffmaker = pathname?.startsWith("/riffmaker");
    const target = pathname === "/" ? "/dev#contato" : "#contato";

    useEffect(() => {
        if (isRiffmaker || dismissed !== false) return;

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

            if (pathname === "/") {
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
            const threshold = pathname === "/" ? 0.86 : 0.7;
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
    }, [dismissed, isRiffmaker, lang, mode, pathname]);

    if (isRiffmaker || dismissed !== false || !visible) {
        return null;
    }

    const copy =
        lang === "en"
            ? { text: "Like what you saw?", cta: "Talk to me" }
            : { text: "Gostou do que viu?", cta: "Fala comigo" };

    return (
        <div className="contact-intent-bar" role="region" aria-label={lang === "en" ? "Contact shortcut" : "Atalho de contato"}>
            <span>{copy.text}</span>
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
