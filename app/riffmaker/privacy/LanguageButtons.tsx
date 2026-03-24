"use client";

import { useLanguage } from "../../context/LanguageContext";

export default function LanguageButtons() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="rounded-lg border border-white/15 bg-[#151515] p-1">
      <button
        onClick={() => setLang("pt")}
        className={`rounded-md px-2.5 py-1.5 font-[var(--font-dm-mono)] text-[10px] font-medium uppercase tracking-[0.16em] transition-colors md:px-3 ${
          lang === "pt"
            ? "bg-[#e64d4d] text-white"
            : "text-[#8a8a9a] hover:text-white"
        }`}
        aria-label="Mudar idioma para portugues (Brasil)"
      >
        BR
      </button>
      <button
        onClick={() => setLang("en")}
        className={`rounded-md px-2.5 py-1.5 font-[var(--font-dm-mono)] text-[10px] font-medium uppercase tracking-[0.16em] transition-colors md:px-3 ${
          lang === "en"
            ? "bg-[#e64d4d] text-white"
            : "text-[#8a8a9a] hover:text-white"
        }`}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  );
}
