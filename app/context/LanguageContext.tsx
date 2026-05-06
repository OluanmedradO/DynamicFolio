"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getLanguageFromPathname } from "../lib/locale";

export type Language = "pt" | "en";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "pt",
    setLang: () => {},
    toggleLang: () => {},
});

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const routeLang = getLanguageFromPathname(pathname);
    const [lang, setLangState] = useState<Language>(() => routeLang);

    useEffect(() => {
        setLangState(routeLang);
    }, [routeLang]);

    useEffect(() => {
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        window.localStorage.setItem(STORAGE_KEY, lang);
    }, [lang]);

    const setLang = (nextLang: Language) => setLangState(nextLang);
    const toggleLang = () => setLangState((prev) => (prev === "pt" ? "en" : "pt"));

    const value = useMemo(
        () => ({ lang, setLang, toggleLang }),
        [lang],
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}
