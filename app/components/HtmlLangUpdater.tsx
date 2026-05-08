"use client";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export function HtmlLangUpdater() {
    const { lang } = useLanguage();
    useEffect(() => {
        document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    }, [lang]);
    return null;
}
