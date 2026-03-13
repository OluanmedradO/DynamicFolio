"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";

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

export default function Hero() {
    const { mode } = useMode();
    const { lang } = useLanguage();
    const c = content[lang][mode];

    return (
        <section className="hero" id="hero">
            <div className="hero-grid"></div>
            <div className="hero-glow"></div>
            <div className="hero-ring"></div>
            <div className="hero-ring hero-ring-2"></div>

            <p className="hero-eyebrow">{content[lang].eyebrow}</p>

            <h1 className="hero-name">
                <span className="glitch" data-text="LUAN">LUAN</span>&nbsp;<span className="glitch" data-text="MEDRADO">MEDRADO</span>
            </h1>

            <div className="hero-role">
                <span className="line"></span>
                <span key={`role-${mode}`} id="heroRole" className="mode-fade">{c.role}</span>
                <span className="line right"></span>
            </div>

              <p className="hero-desc">
                <span key={`desc-${mode}`} className="mode-fade hero-desc-text" id="heroDesc">{c.desc}</span>
            </p>

            <div className="hero-actions">
                <Link href="#contato" className="btn-primary">
                    {content[lang].cta}
                    <span className="arrow">↗</span>
                </Link>
                <div className="social-icons">
                    <Link href="https://www.linkedin.com/in/oluanmedrado/" target="_blank" className="social-icon" title="LinkedIn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </Link>
                    <a href="mailto:luanmedradooliveira@gmail.com" className="social-icon" title="Email">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                        </svg>
                    </a>
                </div>
            </div>

            <div className="scroll-indicator">
                <span>{content[lang].scroll}</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}