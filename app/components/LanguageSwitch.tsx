"use client";

import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";

function BrazilFlag() {
    return (
        <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <circle cx="13" cy="13" r="13" fill="#009C3B" />
            <polygon points="13,2 24,13 13,24 2,13" fill="#FFDF00" />
            <circle cx="13" cy="13" r="6.5" fill="#002776" />
            <path d="M7.2,11.5 Q13,9 18.8,11.5" stroke="#fff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <circle cx="13" cy="13" r="6.5" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
        </svg>
    );
}

function UsaFlag() {
    return (
        <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <defs>
                <clipPath id="langFlagCircleClip">
                    <circle cx="13" cy="13" r="13" />
                </clipPath>
            </defs>
            <g clipPath="url(#langFlagCircleClip)">
                {Array.from({ length: 13 }).map((_, idx) => (
                    <rect
                        key={idx}
                        x="0"
                        y={idx * 2}
                        width="26"
                        height="2"
                        fill={idx % 2 === 0 ? "#B22234" : "#fff"}
                    />
                ))}
                <rect x="0" y="0" width="11" height="14" fill="#3C3B6E" />
                {Array.from({ length: 5 }).map((_, row) =>
                    Array.from({ length: 5 }).map((__, col) => (
                        <circle
                            key={`${row}-${col}`}
                            cx={1.6 + col * 2.1 + (row % 2 ? 1.05 : 0)}
                            cy={1.8 + row * 2.1}
                            r="0.55"
                            fill="#fff"
                        />
                    )),
                )}
            </g>
        </svg>
    );
}

export default function LanguageSwitch() {
    const { lang, toggleLang } = useLanguage();
    const isEnglish = lang === "en";

    const handleLanguageToggle = () => {
        const nextLang = isEnglish ? "pt" : "en";
        trackEvent("preference_change", {
            eventCategory: "preferences",
            preference: "language",
            from: lang,
            to: nextLang,
        });
        toggleLang();
    };

    return (
        <button
            className="lang-btn"
            id="langBtn"
            onClick={handleLanguageToggle}
            type="button"
            aria-label={isEnglish ? "Trocar idioma" : "Switch language"}
        >
            <span className="lang-flag-wrap" id="langFlag">
                {isEnglish ? <UsaFlag /> : <BrazilFlag />}
            </span>
            <span className="lang-label" id="langLabel">
                {isEnglish ? "EN" : "PT"}
            </span>
        </button>
    );
}
