"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { trackEvent } from "../lib/analytics";

const content = {
    pt: {
        eyebrow: "Oi! Eu sou",
        cta: "Entre em Contato",
        scroll: "scroll",
        dev: {
            role: "Desenvolvedor Front-End",
            desc: <>Especializado em <strong>React</strong> e <strong>Next.js</strong>, criando interfaces rápidas, intuitivas e bem pensadas.</>,
        },
        editor: {
            role: "Editor de Vídeo",
            desc: "Especializado em contar histórias através de muita criatividade, com foco em retenção, impacto, qualidade e ritmo.",
        },
    },
    en: {
        eyebrow: "Hey! I'm",
        cta: "Get in Touch",
        scroll: "scroll",
        dev: {
            role: "Front-End Developer",
            desc: <>Specialized in <strong>React</strong> and <strong>Next.js</strong>, building fast, intuitive and polished interfaces.</>,
        },
        editor: {
            role: "Video Editor",
            desc: "Specialized in visual storytelling with creativity, focused on retention, impact, quality and rhythm.",
        },
    },
};

const devCodeSnippets = [
    "const ui = accessible && fast",
    "render(<Experience />)",
    "await deploy({ zeroFriction: true })",
    "type Motion = 'clean' | 'useful'",
    "if (detail) polish()",
    "state -> interface -> conversion",
];

function HeroWorkPreview({ mode }: { mode: "dev" | "editor" }) {
    if (mode === "editor") {
        return (
            <div className="hero-work-preview hero-work-preview-editor" aria-hidden="true">
                <div className="hero-preview-card hero-preview-card-large">
                    <Image src="/guitarragospel.jpg" alt="" fill sizes="260px" className="hero-preview-image" priority />
                </div>
                <div className="hero-preview-card hero-preview-card-small">
                    <Image src="/Switch Game List.jpg" alt="" fill sizes="150px" className="hero-preview-image" />
                </div>
                <div className="hero-preview-card hero-preview-card-tall">
                    <Image src="/True Sailing Life.jpg" alt="" fill sizes="170px" className="hero-preview-image" />
                </div>
            </div>
        );
    }

    return (
        <div className="hero-work-preview hero-work-preview-dev" aria-hidden="true">
            <div className="hero-code-cloud">
                {devCodeSnippets.map((snippet, index) => (
                    <span className={`hero-code-chip hero-code-chip-${index + 1}`} key={snippet}>{snippet}</span>
                ))}
            </div>
        </div>
    );
}

interface HeroOverrides {
    ptDesc?: ReactNode;
    enDesc?: ReactNode;
    scrollLabel?: string;
}

interface HeroProps {
    overrides?: HeroOverrides;
}

export default function Hero({ overrides }: HeroProps) {
    const { mode } = useMode();
    const { lang } = useLanguage();
    const c = content[lang][mode];
    const desc = lang === "pt" ? overrides?.ptDesc ?? c.desc : overrides?.enDesc ?? c.desc;
    const scrollLabel = overrides?.scrollLabel ?? content[lang].scroll;

    return (
        <section className="hero" id="hero">
            <div className="hero-grid"></div>
            <div className="hero-glow"></div>
            <div className="hero-ring"></div>
            <div className="hero-ring hero-ring-2"></div>
            <HeroWorkPreview mode={mode} />

            <div className="hero-copy">
            <p className="hero-eyebrow">{content[lang].eyebrow}</p>

            <h1 className="hero-name" aria-label="Luan Medrado">
                <span className="glitch" data-text="LUAN" aria-hidden="true">LUAN</span>&nbsp;<span className="glitch" data-text="MEDRADO" aria-hidden="true">MEDRADO</span>
            </h1>

            <div className="hero-role">
                <span className="line"></span>
                <span key={`role-${mode}`} id="heroRole" className="mode-fade">{c.role}</span>
                <span className="line right"></span>
            </div>

            <p className="hero-desc">
                <span key={`desc-${mode}`} className="mode-fade hero-desc-text" id="heroDesc">{desc}</span>
            </p>

            <div className="hero-actions">
                <Link
                    href="#contato"
                    className="btn-primary"
                    onClick={() => trackEvent("contact_cta_click", { source: "hero", lang, mode })}
                >
                    {content[lang].cta}
                    <span className="arrow">↗</span>
                </Link>
                <div className="social-icons">
                    {/*
                    <a
                        href="/cv-luan-medrado.pdf"
                        className="social-icon"
                        title={lang === "en" ? "Download CV" : "Baixar CV"}
                        download
                        onClick={() => trackEvent("cv_download_click", { source: "hero", lang, mode })}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 3v11" />
                            <path d="m7 11 5 5 5-5" />
                            <path d="M5 21h14" />
                        </svg>
                    </a>
                    */}
                    <Link
                        href="https://github.com/oluanmemo"
                        target="_blank"
                        className="social-icon"
                        title="GitHub"
                        onClick={() =>
                            trackEvent("github_click", {
                                eventCategory: "social",
                                destination: "github",
                                source: "hero",
                                lang,
                                mode,
                            })
                        }
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 4.64 3.01 8.577 7.188 9.965.526.098.72-.228.72-.507 0-.25-.01-1.08-.014-1.958-2.923.636-3.54-1.24-3.54-1.24-.478-1.214-1.168-1.537-1.168-1.537-.955-.654.072-.64.072-.64 1.056.075 1.611 1.085 1.611 1.085.938 1.607 2.46 1.143 3.06.874.094-.68.367-1.143.667-1.406-2.334-.266-4.786-1.167-4.786-5.194 0-1.147.41-2.086 1.082-2.822-.109-.266-.469-1.337.102-2.787 0 0 .883-.282 2.893 1.078a10.06 10.06 0 0 1 5.268 0c2.01-1.36 2.892-1.078 2.892-1.078.571 1.45.211 2.521.103 2.787.673.736 1.081 1.675 1.081 2.822 0 4.037-2.456 4.925-4.797 5.186.377.325.713.964.713 1.944 0 1.404-.012 2.536-.012 2.882 0 .281.19.61.726.506A10.504 10.504 0 0 0 22.5 12c0-5.799-4.701-10.5-10.5-10.5Z" />
                        </svg>
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/oluanmedrado/"
                        target="_blank"
                        className="social-icon"
                        title="LinkedIn"
                        onClick={() =>
                            trackEvent("social_click", {
                                eventCategory: "social",
                                destination: "linkedin",
                                source: "hero",
                                lang,
                                mode,
                            })
                        }
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </Link>
                    <a
                        href="mailto:luanmedradooliveira@gmail.com"
                        className="social-icon"
                        title="Email"
                        onClick={() =>
                            trackEvent("email_click", {
                                eventCategory: "contact",
                                source: "hero",
                                lang,
                                mode,
                            })
                        }
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                        </svg>
                    </a>
                </div>
            </div>

            </div>

            <div className="scroll-indicator">
                <span>{scrollLabel}</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}
