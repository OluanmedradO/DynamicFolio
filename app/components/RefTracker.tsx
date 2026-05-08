"use client";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { trackEvent } from "../lib/analytics";

const SOURCE_MAP: Record<string, string> = {
    cv: "cv",
    linkedin: "linkedin",
    whatsapp: "whatsapp",
    behance: "behance",
    github: "github",
    direct: "direct",
};

function sanitizeRef(raw: string) {
    return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 60);
}

function getSourceType(ref: string) {
    const lower = ref.toLowerCase();
    for (const [key, type] of Object.entries(SOURCE_MAP)) {
        if (lower.includes(key)) return type;
    }
    return "other";
}

export function RefTracker() {
    const { lang } = useLanguage();
    const { mode } = useMode();

    useEffect(() => {
        const rawRef = new URLSearchParams(window.location.search).get("ref");
        if (!rawRef) return;

        const ref = sanitizeRef(rawRef);
        if (!ref) return;

        const sessionKey = `portfolio_ref_tracked_${ref}`;
        try {
            if (sessionStorage.getItem(sessionKey)) return;
            sessionStorage.setItem("portfolio_ref", ref);
            sessionStorage.setItem(sessionKey, "1");
        } catch { return; }

        trackEvent("portfolio_open", {
            ref,
            source_type: getSourceType(ref),
            lang,
            mode,
        });
    }, [lang, mode]);

    return null;
}
