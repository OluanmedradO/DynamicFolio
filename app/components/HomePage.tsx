"use client";

import Link from "next/link";
import { useEffect } from "react";
import LanguageSwitch from "./LanguageSwitch";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";
import styles from "./HomePage.module.css";

const content = {
    pt: {
        navAbout: "Sobre",
        navAreas: "Áreas",
        riffmakerCta: "RiffMaker",
        status: "Disponível para projetos",
        eyebrow: "Oi, eu sou",
        subtitle: "Desenvolvedor & Criativo Digital",
        bio: (
            <>
                Trabalho na interseção entre <strong>código</strong> e <strong>imagem</strong> — criando produtos que funcionam tão bem quanto parecem.
            </>
        ),
        cardDevTag: "Desenvolvimento",
        cardDevTitle: "Dev",
        cardDevDescription: (
            <>
                Interfaces rápidas, acessíveis e bem pensadas.
                <br />
                Do conceito ao deploy, com foco obsessivo em performance, usabilidade e detalhe.
            </>
        ),
        cardEditTag: "Edição",
        cardEditTitle: "Editing",
        cardEditDescription: (
            <>
                Vídeos com ritmo, estética e intenção.
                <br />
                Cada corte é pensado para prender atenção e contar uma história do início ao fim.
            </>
        ),
        cardCta: "Ver projetos →",
        aboutLabel: "Sobre mim",
        aboutText: (
            <>
                Sou <strong>Luan Medrado</strong>, desenvolvedor front-end e editor de vídeo baseado no Brasil.
                <br />
                Gosto de criar experiências digitais com o mesmo cuidado técnico e estético — seja uma interface em <strong>React</strong> ou uma narrativa construída na edição.
                <br />
                <br />
                Este portfólio reúne esses dois mundos.
                <br />
                Explore por onde fizer mais sentido.
            </>
        ),
        footerCopy: "© 2026 Luan Medrado — Todos os direitos reservados",
    },
    en: {
        navAbout: "About",
        navAreas: "Areas",
        riffmakerCta: "RiffMaker",
        status: "Available for Projects",
        eyebrow: "Hey! I'm",
        subtitle: "Creative & Developer",
        bio: (
            <>
                I work at the intersection of <strong>code</strong> and <strong>image</strong> -
                building interfaces that work and editing stories that stay.
            </>
        ),
        cardDevTag: "Development",
        cardDevTitle: "Dev",
        cardDevDescription: "Fast, accessible and polished interfaces. From layout to deployment, with attention to every detail.",
        cardEditTag: "Editing",
        cardEditTitle: "Editing",
        cardEditDescription: "Videos with rhythm, color and intention. Every cut tells a story - from raw footage to final delivery.",
        cardCta: "View projects →",
        aboutLabel: "About me",
        aboutText: (
            <>
                I am <strong>Luan Medrado</strong>, a front-end developer and video editor based in Brazil.
                I like building work with both technical and visual care - whether that means a <strong>React</strong> interface
                or a full <strong>Premiere</strong> edit sequence. This portfolio brings both worlds together.
            </>
        ),
        footerCopy: "© 2026 Luan Medrado — All rights reserved",
    },
} as const;

export default function HomePage() {
    const { lang } = useLanguage();
    const c = content[lang];

    useEffect(() => {
        document.body.classList.add("home-landing-active");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 },
        );

        document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
            document.body.classList.remove("home-landing-active");
        };
    }, []);

    return (
        <main className={styles.homeLanding}>
            <header className={styles.topbar}>
                <div className={styles.navLeft}>
                    <div className={styles.navLinks}>
                        <a href="#sobre">{c.navAbout}</a>
                        <a href="#areas">{c.navAreas}</a>
                    </div>
                    <Link href="/riffmaker" className={styles.riffmakerCta}>
                        {c.riffmakerCta}
                    </Link>
                </div>

                <Link href="#hero" className={styles.navLogo} onClick={(e) => { e.preventDefault(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }}>
                    luanmedrado<span>.</span>
                </Link>

                <div className={styles.navRight}>
                    <LanguageSwitch />
                </div>
            </header>

            <div className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                {c.status}
            </div>

            <section className={styles.hero} id="hero">
                <div className={`${styles.dot} ${styles.dot1}`}></div>
                <div className={`${styles.dot} ${styles.dot2}`}></div>
                <div className={`${styles.dot} ${styles.dot3}`}></div>

                <p className={styles.heroEyebrow}>{c.eyebrow}</p>
                <h1 className={styles.heroName}>Luan Medrado</h1>
                <p className={styles.heroSubtitle}>{c.subtitle}</p>
                <p className={styles.heroBio}>{c.bio}</p>

                <div className={styles.scrollHint}>
                    <span>SCROLL ↓</span>
                    <div className={styles.scrollLine}></div>
                </div>
            </section>

            <section className={styles.cardsSection} id="areas">
                <Link
                    href="/dev"
                    className={`${styles.pathCard} ${styles.reveal}`}
                    data-reveal
                    onClick={() => trackEvent("navigation_click", { destination: "/dev", source: "home_card_dev", lang })}
                >
                    <span className={styles.cardTag}>{c.cardDevTag}</span>
                    <h2 className={styles.cardTitle}>{c.cardDevTitle}</h2>
                    <p className={styles.cardDesc}>{c.cardDevDescription}</p>

                    <div className={styles.cardTags}>
                        <span className={styles.cardPill}>React</span>
                        <span className={styles.cardPill}>Next.js</span>
                        <span className={styles.cardPill}>TypeScript</span>
                        <span className={styles.cardPill}>UI/UX</span>
                    </div>

                    <div className={styles.cardArrow}>
                        <span className={styles.arrowLine}></span>
                        {c.cardCta}
                    </div>
                </Link>

                <Link
                    href="/editing"
                    className={`${styles.pathCard} ${styles.reveal} ${styles.delaySm}`}
                    data-reveal
                    onClick={() => trackEvent("navigation_click", { destination: "/editing", source: "home_card_editing", lang })}
                >
                    <span className={styles.cardTag}>{c.cardEditTag}</span>
                    <h2 className={styles.cardTitle}>{c.cardEditTitle}</h2>
                    <p className={styles.cardDesc}>{c.cardEditDescription}</p>

                    <div className={styles.cardTags}>
                        <span className={styles.cardPill}>Premiere</span>
                        <span className={styles.cardPill}>After Effects</span>
                        <span className={styles.cardPill}>Color Grading</span>
                        <span className={styles.cardPill}>Motion</span>
                    </div>

                    <div className={styles.cardArrow}>
                        <span className={styles.arrowLine}></span>
                        {c.cardCta}
                    </div>
                </Link>
            </section>

            <section className={`${styles.aboutStrip} ${styles.reveal}`} data-reveal id="sobre">
                <p className={styles.aboutLabel}>{c.aboutLabel}</p>
                <p className={styles.aboutText}>{c.aboutText}</p>
            </section>

            <footer className={`${styles.footer} ${styles.reveal}`} data-reveal>
                <p>{c.footerCopy}</p>
                <div className={styles.socials}>
                    <a
                        href="https://github.com/oluanmemo"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        onClick={() => trackEvent("social_click", { destination: "github", source: "home_footer", lang })}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/oluanmedrado/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        onClick={() => trackEvent("social_click", { destination: "linkedin", source: "home_footer", lang })}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>

                    <a
                        href="mailto:luanmedradooliveira@gmail.com"
                        aria-label="Email"
                        onClick={() => trackEvent("email_click", { source: "home_footer", lang })}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </a>
                </div>
            </footer>
        </main>
    );
}
