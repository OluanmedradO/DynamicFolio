"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, PointerEvent } from "react";
import LanguageSwitch from "./LanguageSwitch";
import { useLanguage } from "../context/LanguageContext";
import { localizePath } from "../lib/locale";
import { trackEvent } from "../lib/analytics";
import styles from "./HomePage.module.css";

const content = {
    pt: {
        navWork: "Projetos",
        navAbout: "Sobre",
        navContact: "Contato",
        brandName: "Luan Medrado",
        brandDescriptor: "Sites • Interfaces • Vídeos",
        eyebrow: "Sites, interfaces e edição de vídeo",
        heroTitleLines: ["Sites que convertem.", "Vídeos que prendem atenção."],
        subtitle: "Edição e páginas pensadas para transformar atenção em cliente.",
        heroScrollCue: "Descubra mais",
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
        heroVideoCta: "Editar meus vídeos",
        heroWebCta: "Criar meu site ou landing page",
        proof: [
            ["+1M", "de views em vídeos editados"],
            ["Produtos", "digitais e interfaces reais"],
        ],
        servicesLabel: "Escolha seu caminho",
        servicesTitle: "Dois caminhos claros para começar",
        services: [
            {
                title: "Edição de vídeo",
                text: "Mais retenção, ritmo e vídeos prontos para postar.",
                tags: ["YouTube", "Reels", "TikTok"],
                cta: "Ver projetos de vídeo",
                href: "/editing",
                source: "home_path_card_video",
                variant: "video",
            },
            {
                title: "Sites e landing pages",
                text: "Páginas, interfaces e experiências digitais com foco em clareza, performance e conversão.",
                tags: ["Landing pages", "Interfaces", "Apps"],
                cta: "Ver sites e interfaces",
                href: "/dev",
                source: "home_path_card_web",
                variant: "web",
            },
        ],
        pathsLabel: "Escolha seu caminho",
        pathsTitle: "Encontre o que faz sentido para você",
        clientPathTitle: "Para empresas e clientes",
        clientPathText: "Precisa de um site, landing page, interface ou vídeo com acabamento profissional?",
        clientPrimaryCta: "Pedir orçamento",
        clientSecondaryCta: "Falar comigo",
        recruiterPathTitle: "Para recrutadores",
        recruiterPathText: "Quer avaliar minha experiência técnica, projetos reais e stack?",
        recruiterDevCta: "Ver projetos dev",
        recruiterGithubCta: "Ver GitHub",
        recruiterLinkedinCta: "Ver LinkedIn",
        productLabel: "Produto autoral",
        productTitle: "Riff Maker",
        productText: "Um app mobile para músicos capturarem riffs, ideias e versões sem perder o fluxo criativo. Ele prova minha capacidade de transformar uma necessidade real em produto publicado.",
        productBullets: ["Android-first", "React Native + Expo", "SQLite offline-first", "Google Drive backup", "RevenueCat/PRO", "Publicado na Google Play"],
        productLandingCta: "Ver landing do Riff Maker",
        productCaseCta: "Ver case técnico",
        workLabel: "Projetos em produção",
        workTitle: "Interfaces reais, produtos publicados",
        workCta: "Ver case →",
        visualDev: "Interfaces",
        visualEdit: "Edições",
        visualMetric: "+1M views",
        aboutLabel: "Sobre mim",
        personaTitle: "Quem está por trás",
        personaName: "Luan Medrado",
        personaRole: "Frontend, UI e edição de vídeo",
        personaBody: "Eu combino design, frontend e edição para criar sites, interfaces e vídeos com boa aparência, carregamento rápido e foco em resultado, de páginas que convertem a conteúdos que prendem atenção.",
        personaProofs: ["+1M de views somadas em vídeos editados", "Criador do Riff Maker, app publicado na Google Play", "Sites, landing pages e interfaces reais"],
        personaCta: "Falar comigo",
        finalCtaLabel: "Contato",
        finalCtaTitle: "Quer começar por onde?",
        finalCtaText: "Me diga se você precisa de edição, site, landing page ou interface. Eu te respondo com o melhor próximo passo.",
        finalCtaPrimary: "Falar sobre projeto",
        finalCtaWhatsapp: "Chamar no WhatsApp",
        finalCtaEmail: "Enviar e-mail",
        finalCtaHint: "Resposta objetiva, sem compromisso.",
        authorityLine: "Escolha o caminho mais direto para o que você precisa agora.",
        footerCopy: "© 2026 Luan Medrado · Todos os direitos reservados",
    },
    en: {
        navWork: "Projects",
        navAbout: "About",
        navContact: "Contact",
        brandName: "Luan Medrado",
        brandDescriptor: "Websites • UI • Video Editing",
        eyebrow: "Websites, interfaces and video editing",
        heroTitleLines: ["Websites that convert.", "Videos that hold attention."],
        subtitle: "Editing and pages built to turn attention into clients.",
        heroScrollCue: "Discover more",
        cardDevTag: "Development",
        cardDevTitle: "Dev",
        cardDevDescription: "Fast, accessible and polished interfaces. From layout to deployment, with attention to every detail.",
        cardEditTag: "Editing",
        cardEditTitle: "Editing",
        cardEditDescription: "Videos with rhythm, color and intention. Every cut tells a story - from raw footage to final delivery.",
        cardCta: "View projects →",
        heroVideoCta: "Edit my videos",
        heroWebCta: "Build my website or landing page",
        proof: [
            ["+1M", "views on edited videos"],
            ["Products", "digital products and real interfaces"],
        ],
        servicesLabel: "Choose your path",
        servicesTitle: "Two clear ways to start",
        services: [
            {
                title: "Video editing",
                text: "Stronger retention, better pacing and videos ready to publish.",
                tags: ["YouTube", "Reels", "TikTok"],
                cta: "View video work",
                href: "/editing",
                source: "home_path_card_video",
                variant: "video",
            },
            {
                title: "Websites and landing pages",
                text: "Pages, interfaces and digital experiences focused on clarity, performance and conversion.",
                tags: ["Landing pages", "Interfaces", "Apps"],
                cta: "View web work",
                href: "/dev",
                source: "home_path_card_web",
                variant: "web",
            },
        ],
        pathsLabel: "Remote hiring paths",
        pathsTitle: "Start from the proof that matters to you",
        clientPathTitle: "International clients",
        clientPathText: "Need a product page, interface, app flow or YouTube edit delivered with clear scope and premium finish?",
        clientPrimaryCta: "Start a project",
        clientSecondaryCta: "Request availability",
        recruiterPathTitle: "Recruiters & startups",
        recruiterPathText: "Evaluate shipped products, production systems, technical stack and remote collaboration style.",
        recruiterDevCta: "View dev projects",
        recruiterGithubCta: "View GitHub",
        recruiterLinkedinCta: "View LinkedIn",
        productLabel: "Shipped product",
        productTitle: "Riff Maker",
        productText: "A Google Play published mobile app for musicians to capture riffs, ideas and versions without losing creative flow. It demonstrates product thinking, mobile execution and ownership beyond portfolio mockups.",
        productBullets: ["Android-first", "React Native + Expo", "SQLite offline-first", "Google Drive backup", "RevenueCat/PRO", "Published on Google Play"],
        productLandingCta: "Open Google Play listing",
        productCaseCta: "View product case",
        workLabel: "Shipped proof",
        workTitle: "Published products and production systems",
        workCta: "View case →",
        visualDev: "Interfaces",
        visualEdit: "Edits",
        visualMetric: "+1M views",
        aboutLabel: "About me",
        personaTitle: "Who’s behind the work",
        personaName: "Luan Medrado",
        personaRole: "Frontend, UI and video editing",
        personaBody: "I combine design, frontend and editing to create sharp websites, interfaces and videos with fast performance and a clear focus on results, from pages that convert to content that holds attention.",
        personaProofs: ["1M+ total views on edited videos", "Creator of Riff Maker, an app published on Google Play", "Real websites, landing pages and interfaces"],
        personaCta: "Work with me",
        finalCtaLabel: "Contact",
        finalCtaTitle: "Where do you want to start?",
        finalCtaText: "Tell me if you need editing, a website, a landing page or an interface. I reply with the clearest next step.",
        finalCtaPrimary: "Talk about a project",
        finalCtaWhatsapp: "Open WhatsApp",
        finalCtaEmail: "Send email",
        finalCtaHint: "Clear reply, no commitment.",
        authorityLine: "Choose the most direct path for what you need now.",
        footerCopy: "© 2026 Luan Medrado · All rights reserved",
    },
} as const;

const contactCopy = {
    pt: {
        eyebrow: "Contato",
        title: "Me conte o que você precisa",
        sub: "Pode ser edição, site, landing page ou interface. Respondo com o melhor próximo passo.",
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        projectType: "Tipo de projeto",
        projectTypePlaceholder: "Selecione...",
        projectTypes: ["Edição de vídeo", "Site / landing page", "Interface web", "App / produto", "Outro"],
        message: "Mensagem",
        messagePlaceholder: "Me diga o objetivo, prazo e qualquer referência.",
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
        title: "Tell me what you need",
        sub: "It can be editing, a website, a landing page or an interface. I reply with the clearest next step.",
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        projectType: "Project type",
        projectTypePlaceholder: "Select...",
        projectTypes: ["Video editing", "Website / landing page", "Web interface", "App / product", "Other"],
        message: "Message",
        messagePlaceholder: "Tell me the goal, deadline and any reference.",
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

const WHATSAPP_NUMBER = "5511945764672";

export default function HomePage() {
    const { lang } = useLanguage();
    const c = content[lang];
    const contact = contactCopy[lang];
    const devHref = localizePath("/dev", lang);
    const editingHref = localizePath("/editing", lang);
    const riffCaseHref = localizePath("/projects/riffmaker", lang);
    const revendedorHref = localizePath("/projects/revendedor-multilaser", lang);
    const vidalarHref = localizePath("/projects/vidalar-saude", lang);
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
        event.currentTarget.style.setProperty("--gospel-x", `${(20 * normalizedX).toFixed(2)}px`);
        event.currentTarget.style.setProperty("--gospel-y", `${(12 * normalizedY).toFixed(2)}px`);
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
            "--gospel-x",
            "--gospel-y",
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
                    <Link href={localizePath("/", lang)} className={styles.brandLockup} aria-label={c.brandName}>
                        <span className={styles.brandName}>{c.brandName}</span>
                        <span className={styles.brandDescriptor}>{c.brandDescriptor}</span>
                    </Link>
                </div>

                <div className={styles.navRight}>
                    <nav className={styles.navLinks} aria-label={lang === "en" ? "Home sections" : "Seções da home"}>
                        <Link href="#trabalhos">{c.navWork}</Link>
                        <Link href="#sobre">{c.navAbout}</Link>
                        <button type="button" className={styles.navContactButton} onClick={() => openContact("home_topbar")}>
                            {c.navContact}
                        </button>
                    </nav>
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
                    <div className={`${styles.visualPanel} ${styles.visualGospel}`}>
                        <Image src="/guitarragospel.jpg" alt="" fill sizes="(min-width: 900px) 280px, 34vw" className={styles.visualImage} priority />
                        <span>{c.visualEdit}</span>
                    </div>
                    <div className={styles.visualMetric}>{c.visualMetric}</div>
                </div>

                <p className={styles.heroEyebrow}>{c.eyebrow}</p>
                <h1 className={styles.heroName} data-text={c.heroTitleLines.join(" ")}>
                    {c.heroTitleLines.map((line) => (
                        <span className={styles.heroTitleLine} key={line}>{line}</span>
                    ))}
                </h1>
                <p className={styles.heroSubtitle}>{c.subtitle}</p>

                <div className={styles.heroPathActions}>
                    <Link
                        href={editingHref}
                        className={`${styles.heroPathCta} ${styles.heroPathCtaVideo}`}
                        onClick={() => trackEvent("navigation_click", { destination: "/editing", source: "home_hero_video", lang })}
                    >
                        <span className={styles.heroPathIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <rect x="4.5" y="6.5" width="15" height="11" rx="2.5" />
                                <path d="M10.2 9.4 14.8 12l-4.6 2.6V9.4Z" />
                            </svg>
                        </span>
                        {c.heroVideoCta}
                    </Link>
                    <Link
                        href={devHref}
                        className={`${styles.heroPathCta} ${styles.heroPathCtaWeb}`}
                        onClick={() => trackEvent("navigation_click", { destination: "/dev", source: "home_hero_web", lang })}
                    >
                        <span className={styles.heroPathIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M8.3 9.2 5 12l3.3 2.8" />
                                <path d="M15.7 9.2 19 12l-3.3 2.8" />
                                <path d="m13.4 6.2-2.8 11.6" />
                            </svg>
                        </span>
                        {c.heroWebCta}
                    </Link>
                </div>
                <div className={styles.heroScrollCue} aria-hidden="true">
                    <span>{c.heroScrollCue}</span>
                    <i />
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

            <section className={`${styles.servicesSection} ${styles.reveal}`} data-reveal id="servicos">
                <div className={styles.sectionHeading}>
                    <p>{c.servicesLabel}</p>
                    <h2>{c.servicesTitle}</h2>
                </div>
                <div className={styles.servicesGrid}>
                    {c.services.map((service) => (
                        <Link
                            href={localizePath(service.href, lang)}
                            className={`${styles.serviceCard} ${service.variant === "video" ? styles.serviceCardVideo : styles.serviceCardWeb}`}
                            key={service.title}
                            onClick={() => trackEvent("navigation_click", { destination: service.href, source: service.source, lang })}
                        >
                            <span className={styles.serviceIcon} aria-hidden="true">
                                {service.variant === "video" ? (
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="4" y="5.5" width="16" height="13" rx="3" />
                                        <path d="M10.4 9.2 15.2 12l-4.8 2.8V9.2Z" />
                                        <path d="M7 19.5h10" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="4" y="5" width="16" height="14" rx="3" />
                                        <path d="M4 9h16" />
                                        <path d="M8 13h3.4" />
                                        <path d="M8 16h8" />
                                        <path d="M14 13h2" />
                                    </svg>
                                )}
                            </span>
                            <h3>{service.title}</h3>
                            <p>{service.text}</p>
                            <div className={styles.serviceTags}>
                                {service.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>
                            <span className={styles.serviceCta}>
                                {service.cta} <span>→</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className={`${styles.productFeature} ${styles.reveal}`} data-reveal>
                <Link
                    href="/riffmaker"
                    className={`${styles.productVisual} ${styles.productVisualLink}`}
                    aria-label={lang === "en" ? "Open Riff Maker landing page" : "Abrir landing page do Riff Maker"}
                    onClick={() => trackEvent("project_click", { project: "Riff Maker", source: "home_product_visual", lang })}
                >
                    <div className={styles.productDevice} aria-hidden="true">
                        <span className={styles.productDeviceNotch} />
                        <span className={styles.productDeviceButton} />
                        <div className={styles.productCarousel}>
                            {["/riff-1.jpg", "/riff-2.jpg", "/riff-3.jpg"].map((src, index) => (
                                <Image
                                    key={src}
                                    src={src}
                                    alt=""
                                    fill
                                    sizes="(min-width: 900px) 220px, 190px"
                                    className={`${styles.productSlide} ${styles[`productSlide${index + 1}` as keyof typeof styles]}`}
                                />
                            ))}
                        </div>
                    </div>
                </Link>
                <div className={styles.productCopy}>
                    <p>{c.productLabel}</p>
                    <h2>{c.productTitle}</h2>
                    <span>{c.productText}</span>
                    <div className={styles.productBullets}>
                        {c.productBullets.map((item) => (
                            <strong key={item}>{item}</strong>
                        ))}
                    </div>
                    <div className={styles.productActions}>
                        {lang === "en" ? (
                            <a href="https://play.google.com/store/apps/details?id=com.oluanmedrado.riffmaker" target="_blank" rel="noreferrer" onClick={() => trackEvent("project_click", { project: "Riff Maker", source: "home_product_play_store", lang })}>{c.productLandingCta}</a>
                        ) : (
                            <Link href="/riffmaker" onClick={() => trackEvent("project_click", { project: "Riff Maker", source: "home_product_landing", lang })}>{c.productLandingCta}</Link>
                        )}
                        <Link href={riffCaseHref} className={styles.productSecondaryLink} onClick={() => trackEvent("project_click", { project: "Riff Maker", source: "home_product_case", lang })}>{c.productCaseCta}</Link>
                    </div>
                </div>
            </section>

            <section className={`${styles.workPreview} ${styles.reveal}`} data-reveal id="trabalhos">
                <div className={styles.sectionHeading}>
                    <p>{c.workLabel}</p>
                    <h2>{c.workTitle}</h2>
                </div>

                <div className={styles.workShowcase}>
                    <Link href={lang === "en" ? riffCaseHref : "/riffmaker"} className={`${styles.workCard} ${styles.workCardFeatured}`} onClick={() => trackEvent("project_click", { project: "RiffMaker", source: "home_preview", lang })}>
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
                        <Link href={revendedorHref} className={`${styles.workCard} ${styles.workCardCompact}`} onClick={() => trackEvent("project_click", { project: "Portal Multilaser", source: "home_preview", lang })}>
                            <Image src="/revendedor-prints/revendedor.png" alt="" fill sizes="(min-width: 900px) 30vw, 92vw" className={styles.workImage} />
                            <div className={styles.workCardBody}>
                                <span>Grupo Multilaser</span>
                                <strong>{lang === "en" ? "B2B hub for reseller support" : "Hub B2B para suporte a revendedores"}</strong>
                                <em>{c.workCta}</em>
                            </div>
                        </Link>
                        <Link href={vidalarHref} className={`${styles.workCard} ${styles.workCardCompact}`} onClick={() => trackEvent("project_click", { project: "Vida Lar", source: "home_preview", lang })}>
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
                <article className={styles.personaCard}>
                    <div className={styles.personaPhotoWrap} aria-hidden="true">
                        <Image
                            src="/profile-pic.png"
                            alt=""
                            fill
                            sizes="(max-width: 768px) 112px, 148px"
                            className={styles.personaPhoto}
                        />
                    </div>
                    <div className={styles.personaCopy}>
                        <p className={styles.personaSectionLabel}>{c.aboutLabel}</p>
                        <p className={styles.personaEyebrow}>{c.personaTitle}</p>
                        <h2>{c.personaName}</h2>
                        <strong>{c.personaRole}</strong>
                        <span>{c.personaBody}</span>
                        <div className={styles.personaProofs}>
                            {c.personaProofs.map((proof) => (
                                <em key={proof}>{proof}</em>
                            ))}
                        </div>
                        <button type="button" onClick={() => openContact("home_about_persona")}>
                            {c.personaCta}
                        </button>
                    </div>
                </article>
            </section>

            <section className={`${styles.finalContact} ${styles.reveal}`} data-reveal id="contato">
                <p>{c.finalCtaLabel}</p>
                <h2>{c.finalCtaTitle}</h2>
                <span>{c.finalCtaText}</span>
                <div className={styles.finalContactActions}>
                    <button type="button" onClick={() => openContact("home_final_cta")}>{c.finalCtaPrimary}</button>
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === "en" ? "Hi Luan! I saw your portfolio and want to talk about a project." : "Oi Luan! Vi seu portfólio e quero falar sobre um projeto.")}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("whatsapp_click", { source: "home_final_cta", lang })}
                    >
                        {c.finalCtaWhatsapp}
                    </a>
                    <a href="mailto:luanmedradooliveira@gmail.com" onClick={() => trackEvent("email_click", { source: "home_final_cta", lang })}>
                        {c.finalCtaEmail}
                    </a>
                </div>
                <em>{c.finalCtaHint}</em>
                <small>{c.authorityLine}</small>
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
