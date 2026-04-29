"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, PointerEvent } from "react";
import LanguageSwitch from "./LanguageSwitch";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";
import styles from "./HomePage.module.css";

const content = {
    pt: {
        riffmakerCta: "RiffMaker",
        eyebrow: "Desenvolvedor Front-End · Editor de Vídeo",
        subtitle: "Interfaces que funcionam. Vídeos que ficam.",
        bio: (
            <>
                Especializado em <strong>React / Next.js</strong> e edição de vídeo. Trabalho com marcas que levam resultado a sério.
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
        heroDevCta: "Dev",
        heroEditCta: "Edit",
        heroContactCta: "Falar comigo",
        proof: [
            ["3+", "projetos em produção"],
            ["3 anos", "criando produto digital"],
            ["Multilaser", "experiência corporativa"],
        ],
        workLabel: "Projetos em produção",
        workTitle: "Interfaces reais, produtos publicados",
        workCta: "Ver case →",
        visualDev: "Interfaces",
        visualEdit: "Edições",
        visualMetric: "27.9M+ views",
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
        riffmakerCta: "RiffMaker",
        eyebrow: "Front-End Developer · Video Editor",
        subtitle: "Interfaces that work. Videos that stay.",
        bio: (
            <>
                Specialized in <strong>React / Next.js</strong> and video editing. I work with brands that take results seriously.
            </>
        ),
        cardDevTag: "Development",
        cardDevTitle: "Dev",
        cardDevDescription: "Fast, accessible and polished interfaces. From layout to deployment, with attention to every detail.",
        cardEditTag: "Editing",
        cardEditTitle: "Editing",
        cardEditDescription: "Videos with rhythm, color and intention. Every cut tells a story - from raw footage to final delivery.",
        cardCta: "View projects →",
        heroDevCta: "Dev",
        heroEditCta: "Edit",
        heroContactCta: "Contact me",
        proof: [
            ["3+", "production projects"],
            ["3 years", "building digital products"],
            ["Multilaser", "corporate experience"],
        ],
        workLabel: "Production projects",
        workTitle: "Real interfaces, published products",
        workCta: "View case →",
        visualDev: "Interfaces",
        visualEdit: "Edits",
        visualMetric: "27.9M+ views",
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

const contactCopy = {
    pt: {
        eyebrow: "Contato",
        title: "Me conte sobre o projeto",
        sub: "Respondo em ate 24h com proximos passos claros.",
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        projectType: "Tipo de projeto",
        projectTypePlaceholder: "Selecione...",
        projectTypes: ["Site / landing page", "Dashboard / app", "Video social", "Ambos", "Outro"],
        message: "Mensagem",
        messagePlaceholder: "Qual e o contexto? Pode ser curto.",
        submit: "Enviar mensagem",
        sending: "Enviando...",
        successTitle: "Mensagem recebida.",
        successText: "Vou ler com atencao e te responder em breve.",
        reset: "Enviar outra",
        errorFallback: "Erro ao enviar. Tente novamente.",
        close: "Fechar contato",
    },
    en: {
        eyebrow: "Contact",
        title: "Tell me about the project",
        sub: "I reply within 24h with clear next steps.",
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        projectType: "Project type",
        projectTypePlaceholder: "Select...",
        projectTypes: ["Site / landing page", "Dashboard / app", "Social video", "Both", "Other"],
        message: "Message",
        messagePlaceholder: "What is the context? Short is fine.",
        submit: "Send message",
        sending: "Sending...",
        successTitle: "Message received.",
        successText: "I will read it carefully and reply soon.",
        reset: "Send another",
        errorFallback: "Error sending. Please try again.",
        close: "Close contact",
    },
} as const;

type ContactStatus = "idle" | "loading" | "success" | "error";

export default function HomePage() {
    const { lang } = useLanguage();
    const c = content[lang];
    const contact = contactCopy[lang];
    const homeRef = useRef<HTMLElement | null>(null);
    const [contactOpen, setContactOpen] = useState(false);
    const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");
    const [contactError, setContactError] = useState("");
    const [contactForm, setContactForm] = useState({ name: "", email: "", projectType: "", message: "" });
    const trackedContactFocus = useRef(new Set<string>());
    const closeContact = useCallback(() => setContactOpen(false), []);

    useEffect(() => {
        if (contactOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [contactOpen]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeContact();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [closeContact]);

    const openContact = (source = "home_topbar") => {
        setContactOpen(true);
        trackEvent("contact_modal_open", { source, lang });
    };

    const handleContactChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setContactForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleContactFocus = (field: string) => {
        if (trackedContactFocus.current.has(field)) return;
        trackedContactFocus.current.add(field);
        trackEvent("form_field_focus", { field, lang, source: "home_contact_modal" });
    };

    const handleContactSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setContactStatus("loading");
        setContactError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactForm),
            });
            const data = await response.json();

            if (!response.ok) {
                setContactError(data.error ?? contact.errorFallback);
                setContactStatus("error");
                return;
            }

            setContactStatus("success");
            trackEvent("contact_form_submit", { lang, source: "home_contact_modal", projectType: contactForm.projectType });
        } catch {
            setContactError(contact.errorFallback);
            setContactStatus("error");
        }
    };

    const resetContactForm = () => {
        setContactStatus("idle");
        setContactError("");
        setContactForm({ name: "", email: "", projectType: "", message: "" });
        trackedContactFocus.current.clear();
    };

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const normalizedX = (x - 0.5) * 2;
        const normalizedY = (y - 0.5) * 2;

        event.currentTarget.style.setProperty("--pointer-x", normalizedX.toFixed(4));
        event.currentTarget.style.setProperty("--pointer-y", normalizedY.toFixed(4));
        event.currentTarget.style.setProperty("--spotlight-x", `${(x * 100).toFixed(2)}%`);
        event.currentTarget.style.setProperty("--spotlight-y", `${(y * 100).toFixed(2)}%`);
        event.currentTarget.style.setProperty("--atmosphere-x", `${(-8 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--atmosphere-y", `${(-8 * normalizedY).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--revendedor-x", `${(-18 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--revendedor-y", `${(-12 * normalizedY).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--notify-x", `${(-8 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--notify-y", `${(8 * normalizedY).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--riff-x", `${(14 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--riff-y", `${(-14 * normalizedY).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--gospel-x", `${(20 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--gospel-y", `${(12 * normalizedY).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--youtube-x", `${(10 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--youtube-y", `${(18 * normalizedY).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--metric-x", `${(12 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--metric-y", `${(-10 * normalizedY).toFixed(2)}px`);
    };

    const handlePointerLeave = () => {
        const home = homeRef.current;
        if (!home) return;

        home.style.setProperty("--pointer-x", "0");
        home.style.setProperty("--pointer-y", "0");
        home.style.setProperty("--spotlight-x", "50%");
        home.style.setProperty("--spotlight-y", "46%");
        [
            "--atmosphere-x",
            "--atmosphere-y",
            "--revendedor-x",
            "--revendedor-y",
            "--notify-x",
            "--notify-y",
            "--riff-x",
            "--riff-y",
            "--gospel-x",
            "--gospel-y",
            "--youtube-x",
            "--youtube-y",
            "--metric-x",
            "--metric-y",
        ].forEach((property) => home.style.setProperty(property, "0px"));
    };

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
        <main
            className={styles.homeLanding}
            ref={homeRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <header className={styles.topbar}>
                <div className={styles.navLeft}>
                    <Link href="/riffmaker" className={styles.riffmakerCta} aria-label={c.riffmakerCta}>
                        <span className={styles.riffmakerLogoMark} aria-hidden="true">
                            <Image src="/riff-maker/icon.png" alt="" fill sizes="26px" className={styles.riffmakerLogoImage} />
                        </span>
                        <span className={styles.riffmakerLogoText}>{c.riffmakerCta}</span>
                    </Link>
                </div>

                <div className={styles.navRight}>
                    <LanguageSwitch />
                </div>
            </header>


            {contactOpen && (
                <div className={styles.contactModal} role="dialog" aria-modal="true" aria-labelledby="home-contact-title" onClick={closeContact}>
                    <div className={styles.contactModalPanel} onClick={(event) => event.stopPropagation()}>
                        <button type="button" className={styles.contactModalClose} aria-label={contact.close} onClick={closeContact}>
                            &#215;
                        </button>
                        <div className={styles.contactModalHeader}>
                            <span>{contact.eyebrow}</span>
                            <h2 id="home-contact-title">{contact.title}</h2>
                            <p>{contact.sub}</p>
                        </div>

                        {contactStatus === "success" ? (
                            <div className={styles.contactModalSuccess}>
                                <strong>{contact.successTitle}</strong>
                                <p>{contact.successText}</p>
                                <button type="button" onClick={resetContactForm}>{contact.reset}</button>
                            </div>
                        ) : (
                            <form className={styles.contactModalForm} onSubmit={handleContactSubmit} noValidate>
                                <div className={styles.contactModalRow}>
                                    <label>
                                        <span>{contact.name}</span>
                                        <input name="name" type="text" placeholder={contact.namePlaceholder} value={contactForm.name} onChange={handleContactChange} onFocus={() => handleContactFocus("name")} autoComplete="name" />
                                    </label>
                                    <label>
                                        <span>{contact.email}</span>
                                        <input name="email" type="email" placeholder={contact.emailPlaceholder} value={contactForm.email} onChange={handleContactChange} onFocus={() => handleContactFocus("email")} autoComplete="email" />
                                    </label>
                                </div>
                                <label>
                                    <span>{contact.projectType}</span>
                                    <select name="projectType" value={contactForm.projectType} onChange={handleContactChange} onFocus={() => handleContactFocus("projectType")}>
                                        <option value="">{contact.projectTypePlaceholder}</option>
                                        {contact.projectTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    <span>{contact.message}</span>
                                    <textarea name="message" placeholder={contact.messagePlaceholder} value={contactForm.message} onChange={handleContactChange} onFocus={() => handleContactFocus("message")} rows={4} />
                                </label>
                                {contactStatus === "error" && <p className={styles.contactModalError}>{contactError}</p>}
                                <button type="submit" className={styles.contactModalSubmit} disabled={contactStatus === "loading"}>
                                    {contactStatus === "loading" ? contact.sending : contact.submit}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <section className={styles.hero} id="hero">
                <div className={styles.heroVisual} aria-hidden="true">
                    <div className={styles.visualAtmosphere}></div>
                    <div className={`${styles.visualPanel} ${styles.visualRevendedor}`}>
                        <Image src="/revendedor-prints/revendedor.png" alt="" fill sizes="(min-width: 900px) 360px, 48vw" className={styles.visualImage} priority />
                        <span>{c.visualDev}</span>
                    </div>
                    <div className={`${styles.visualPanel} ${styles.visualNotify}`}>
                        <Image src="/notify-prints/dashboard.png" alt="" fill sizes="(min-width: 900px) 320px, 46vw" className={styles.visualImage} />
                    </div>
                    <div className={`${styles.visualPanel} ${styles.visualRiff}`}>
                        <Image src="/riff-1.jpg" alt="" fill sizes="(min-width: 900px) 170px, 28vw" className={styles.visualImage} />
                    </div>
                    <div className={`${styles.visualPanel} ${styles.visualGospel}`}>
                        <Image src="/guitarragospel.jpg" alt="" fill sizes="(min-width: 900px) 280px, 34vw" className={styles.visualImage} priority />
                        <span>{c.visualEdit}</span>
                    </div>
                    <div className={`${styles.visualPanel} ${styles.visualYoutube}`}>
                        <Image src="/Switch Game List.jpg" alt="" fill sizes="(min-width: 900px) 150px, 28vw" className={styles.visualImage} />
                    </div>
                    <div className={styles.visualMetric}>{c.visualMetric}</div>
                </div>

                <p className={styles.heroEyebrow}>{c.eyebrow}</p>
                <h1 className={styles.heroName} data-text="Luan Medrado">Luan Medrado</h1>
                <p className={styles.heroSubtitle}>{c.subtitle}</p>
                <p className={styles.heroBio}>{c.bio}</p>

                <div className={styles.heroActions}>
                    <Link
                        href="/editing"
                        className={styles.heroSecondaryCta}
                        onClick={() => trackEvent("navigation_click", { destination: "/editing", source: "home_hero_edit", lang })}
                    >
                        <span className={styles.ctaIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <rect x="4" y="6" width="16" height="12" rx="2" />
                                <path d="m10 9 5 3-5 3V9Z" />
                            </svg>
                        </span>
                        {c.heroEditCta}
                    </Link>
                    <Link
                        href="/dev"
                        className={styles.heroPrimaryCta}
                        onClick={() => trackEvent("navigation_click", { destination: "/dev", source: "home_hero_dev", lang })}
                    >
                        <span className={styles.ctaIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="m8 9-4 3 4 3" />
                                <path d="m16 9 4 3-4 3" />
                                <path d="m14 5-4 14" />
                            </svg>
                        </span>
                        {c.heroDevCta}
                    </Link>
                </div>
                <button type="button" className={styles.heroContactCta} onClick={() => openContact("home_hero")}>
                    <span className={styles.heroContactIcon} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v7A2.5 2.5 0 0 1 17.5 17H9l-4 3v-3.5A2.5 2.5 0 0 1 3 14V7.5Z" />
                            <path d="m7 8 5 4 5-4" />
                        </svg>
                    </span>
                    {c.heroContactCta}
                </button>

                <div className={styles.scrollHint} aria-hidden="true">
                    <span>Scroll</span>
                    <span className={styles.scrollLine} />
                </div>

            </section>

            <section className={`${styles.proofBand} ${styles.reveal}`} data-reveal aria-label={lang === "en" ? "Credibility numbers" : "Números de credibilidade"}>
                {c.proof.map(([value, label]) => (
                    <div className={styles.proofItem} key={value}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                    </div>
                ))}
            </section>

            <section className={`${styles.workPreview} ${styles.reveal}`} data-reveal id="trabalhos">
                <div className={styles.sectionHeading}>
                    <p>{c.workLabel}</p>
                    <h2>{c.workTitle}</h2>
                </div>

                <div className={styles.workShowcase}>
                    <Link href="/riffmaker" className={`${styles.workCard} ${styles.workCardFeatured}`} onClick={() => trackEvent("project_click", { project: "RiffMaker", source: "home_preview", lang })}>
                        <div className={styles.workRiffSplash} aria-hidden="true">
                            <Image src="/riff-maker/riff.png" alt="" width={1024} height={1024} className={styles.workRiffLogo} />
                        </div>
                        <div className={styles.workCardChrome} aria-hidden="true">
                            <span>01</span>
                            <span>Play Store</span>
                        </div>
                        <div className={styles.workCardBody}>
                            <span>Riff Maker</span>
                            <strong>{lang === "en" ? "Mobile app published on Google Play" : "App mobile publicado no Google Play"}</strong>
                            <p>{lang === "en" ? "Offline-first product design, mobile flow and landing page." : "Produto autoral com fluxo mobile, design e landing page."}</p>
                            <em>{c.workCta}</em>
                        </div>
                    </Link>

                    <div className={styles.workStack}>
                        <Link href="/projects/revendedor-multilaser" className={`${styles.workCard} ${styles.workCardCompact}`} onClick={() => trackEvent("project_click", { project: "Portal Multilaser", source: "home_preview", lang })}>
                            <Image src="/revendedor-prints/revendedor.png" alt="" fill sizes="(min-width: 900px) 30vw, 92vw" className={styles.workImage} />
                            <div className={styles.workCardBody}>
                                <span>Grupo Multilaser</span>
                                <strong>{lang === "en" ? "B2B hub for reseller support" : "Hub B2B para suporte a revendedores"}</strong>
                                <em>{c.workCta}</em>
                            </div>
                        </Link>
                        <Link href="/dev#vidalarsec" className={`${styles.workCard} ${styles.workCardCompact}`} onClick={() => trackEvent("project_click", { project: "Vida Lar", source: "home_preview", lang })}>
                            <Image src="/vidalar-prints/depois.png" alt="" fill sizes="(min-width: 900px) 30vw, 92vw" className={styles.workImage} />
                            <div className={styles.workCardBody}>
                                <span>Vida Lar</span>
                                <strong>{lang === "en" ? "Published redesign available online" : "Redesign publicado e acessível online"}</strong>
                                <em>{c.workCta}</em>
                            </div>
                        </Link>
                    </div>
                </div>
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
