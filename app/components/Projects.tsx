"use client";

import BehanceGrid from "./BehanceGrid";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import YouTubeGrid from "./YouTubeGrid";
import { useMode } from "../context/ModeContext";
import { localizePath } from "../lib/locale";
import { trackEvent } from "../lib/analytics";
import riff1 from "@/public/riff-1.jpg";
import riff2 from "@/public/riff-2.jpg";
import riff3 from "@/public/riff-3.jpg";
import revendedorPrint from "@/public/revendedor-prints/revendedor.png";
import notifyPrint from "@/public/notify-prints/dashboard.png";

const carouselImages = [riff1, riff2, riff3];

function PhoneCarousel() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        // Preload once so slide changes reuse in-memory assets.
        carouselImages.forEach((img) => {
            const preloadImg = new window.Image();
            preloadImg.src = img.src;
        });
    }, []);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % carouselImages.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [paused]);

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % carouselImages.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    const goToSlide = (i: number) => setActiveIdx(i);

    const leftIdx = (activeIdx - 1 + carouselImages.length) % carouselImages.length;
    const rightIdx = (activeIdx + 1) % carouselImages.length;

    return (
        <div
            className="phone-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const delta = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(delta) > 40) {
                    if (delta < 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
                touchStartX.current = null;
            }}
        >
            <div className="phone-glow"></div>
            <div className="carousel-nav">
                <button className="carousel-btn" type="button" aria-label="Slide anterior do Riff Maker" onClick={prevSlide}>&#8249;</button>
                <button className="carousel-btn" type="button" aria-label="Próximo slide do Riff Maker" onClick={nextSlide}>&#8250;</button>
            </div>
            <div className="phones-wrapper">
                <div className="phone phone-left">
                    <div className="phone-dim"></div>
                    <Image key={`left-${leftIdx}`} src={carouselImages[leftIdx]} alt="Screenshot do app Riff Maker" width={360} height={780} sizes="140px" className="phone-image" placeholder="blur" />
                </div>
                <div className="phone phone-center" onClick={nextSlide}>
                    <div className="phone-notch"></div>
                    <Image key={`center-${activeIdx}`} src={carouselImages[activeIdx]} alt="Screenshot do app Riff Maker na tela de ideias" width={360} height={780} sizes="180px" priority={activeIdx === 0} className="phone-image" placeholder="blur" />
                </div>
                <div className="phone phone-right">
                    <div className="phone-dim"></div>
                    <Image key={`right-${rightIdx}`} src={carouselImages[rightIdx]} alt="Screenshot do app Riff Maker" width={360} height={780} sizes="140px" className="phone-image" placeholder="blur" />
                </div>
            </div>
            <div className="carousel-dots">
                {carouselImages.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        className={`dot ${i === activeIdx ? "active" : ""}`}
                        aria-label={`Mostrar tela ${i + 1} do Riff Maker`}
                        aria-current={i === activeIdx ? "true" : undefined}
                        onClick={() => goToSlide(i)}
                    />
                ))}
            </div>
        </div>
    );
}

interface DevCopy {
    sectionLabel: string;
    sectionTitle: string;
    featuredBadge: string;
    featuredImpact: string;
    featuredDesc: string;
    featuredCta: string;
    featuredCaseCta: string;
    corpExperience: string;
    internalProject: string;
    viewDetails: string;
    portalImpact: string;
    portalDesc: string;
    portalRole: string;
    notifyImpact: string;
    notifyDesc: string;
    notifyRole: string;
}

function DevProjects({ copy, lang }: { copy: DevCopy; lang: "pt" | "en" }) {
    const riffCaseHref = localizePath("/projects/riffmaker", lang);
    const revendedorHref = localizePath("/projects/revendedor-multilaser", lang);
    const notifyHref = localizePath("/projects/multi-notify", lang);

    return (
        <div id="devProjects">
            <div className="section-header">
                <div>
                    <p className="section-label">{copy.sectionLabel}</p>
                    <h2 className="section-title">{copy.sectionTitle}</h2>
                    <div style={{ height: "4px", width: "56px", background: "var(--accent)", borderRadius: "100px", marginTop: "12px" }}></div>
                </div>
            </div>

            <div className="featured-card">
                <div className="featured-content">
                    <div className="featured-badge">
                        <span className="ping-dot"></span>
                        {copy.featuredBadge}
                    </div>
                    <h3 className="featured-title">Riff Maker</h3>
                    <p className="project-impact">{copy.featuredImpact}</p>
                    <p className="featured-desc">{copy.featuredDesc}</p>
                    <div className="tag-list">
                        <span className="tag">React Native</span>
                        <span className="tag">Expo</span>
                        <span className="tag">SQLite</span>
                        <span className="tag">Reanimated</span>
                    </div>
                    <div className="featured-actions">
                        {lang === "en" ? (
                            <Link
                                href={riffCaseHref}
                                className="btn-red"
                                onClick={() => trackEvent("project_click", { project: "Riff Maker", category: "dev", lang, destination: "case" })}
                            >
                                {copy.featuredCta} <span>→</span>
                            </Link>
                        ) : (
                            <Link
                                href={localizePath("/riffmaker", lang)}
                                className="btn-red"
                                onClick={() => trackEvent("project_click", { project: "Riff Maker", category: "dev", lang, destination: "/riffmaker" })}
                            >
                                {copy.featuredCta} <span>↗</span>
                            </Link>
                        )}
                        <Link
                            href={lang === "en" ? "https://play.google.com/store/apps/details?id=com.oluanmedrado.riffmaker" : riffCaseHref}
                            className="btn-secondary"
                            target={lang === "en" ? "_blank" : undefined}
                            rel={lang === "en" ? "noreferrer" : undefined}
                            onClick={() => trackEvent("project_click", { project: "Riff Maker", category: "dev", lang, destination: lang === "en" ? "play_store" : "case" })}
                        >
                            {copy.featuredCaseCta} <span>→</span>
                        </Link>
                    </div>
                </div>
                <PhoneCarousel />
            </div>

            <div className="multilaser-section">
                <div className="multilaser-glow"></div>
                <div className="multilaser-header">
                    <Image
                        src="/logo-multilaser.svg"
                        alt="Grupo Multilaser"
                        width={180}
                        height={36}
                        style={{ marginBottom: "8px", filter: "brightness(0) invert(1)", opacity: 0.9 }}
                    />
                    <div className="multilaser-sub">{copy.corpExperience}</div>
                </div>
                <div className="multi-grid">
                    <div className="multi-card">
                        <div className="multi-card-glow"></div>
                        <div className="multi-card-img">
                            <Image src={revendedorPrint} alt="Interface do Portal do Revendedor Multilaser" fill sizes="(min-width: 700px) 50vw, 100vw" className="multi-card-photo" placeholder="blur" />
                        </div>
                        <div className="multi-card-body">
                            <div className="tag-list" style={{ marginBottom: "10px" }}>
                                <span className="tag blue">React</span>
                                <span className="tag blue">B2B</span>
                                <span className="tag blue">UI/UX</span>
                            </div>
                            <p className="multi-card-role">{copy.portalRole}</p>
                            <h3 className="multi-card-title">Portal do Revendedor Multilaser</h3>
                            <p className="project-impact multi-impact">{copy.portalImpact}</p>
                            <p className="multi-card-desc">{copy.portalDesc}</p>
                            <div className="multi-card-footer" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                <Link
                                    href={revendedorHref}
                                    className="multi-card-link"
                                    onClick={() => trackEvent("project_click", { project: "Portal do Revendedor Multilaser", category: "dev", lang, destination: "detail" })}
                                >
                                    {copy.viewDetails} <span>→</span>
                                </Link>
                                <Link
                                    href="https://revendedor.grupomultilaser.com.br/"
                                    target="_blank"
                                    className="multi-card-link"
                                    style={{ opacity: 0.6 }}
                                    onClick={() => trackEvent("project_click", { project: "Portal do Revendedor Multilaser", category: "dev", lang, destination: "live" })}
                                >
                                    Live <span>↗</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="multi-card">
                        <div className="multi-card-glow"></div>
                        <div className="multi-card-img">
                            <Image src={notifyPrint} alt="Dashboard do projeto Multi Notify" fill sizes="(min-width: 700px) 50vw, 100vw" className="multi-card-photo" placeholder="blur" />
                        </div>
                        <div className="multi-card-body">
                            <div className="tag-list" style={{ marginBottom: "10px" }}>
                                <span className="tag blue">React</span>
                                <span className="tag blue">TypeScript</span>
                                <span className="tag blue">Tailwind CSS</span>
                            </div>
                            <p className="multi-card-role">{copy.notifyRole}</p>
                            <h3 className="multi-card-title">Multi Notify</h3>
                            <p className="project-impact multi-impact">{copy.notifyImpact}</p>
                            <p className="multi-card-desc">{copy.notifyDesc}</p>
                            <div className="multi-card-footer">
                                <Link
                                    href={notifyHref}
                                    className="multi-card-link"
                                    onClick={() => trackEvent("project_click", { project: "Multi Notify", category: "dev", lang, destination: "detail" })}
                                >
                                    {copy.viewDetails} <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditorServiceIcon({ index }: { index: number }) {
    const iconProps = {
        width: 20,
        height: 20,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    if (index === 0) {
        return (
            <svg {...iconProps}>
                <path d="M4 17h16" />
                <path d="M5 15c3.2 0 4.2-7 7.1-7 2 0 2.4 3.9 4.2 3.9 1 0 1.6-.9 2.2-2.3" />
                <path d="m15.8 8.3 3.2 1.3-1.3 3.2" />
                <path d="M8 19h8" />
            </svg>
        );
    }

    if (index === 1) {
        return (
            <svg {...iconProps}>
                <rect x="5" y="6" width="12" height="9" rx="2" />
                <path d="M8 4h9a2 2 0 0 1 2 2v7" />
                <path d="m8.5 11 2 2 3.8-4" />
                <path d="M7 19h10" />
            </svg>
        );
    }

    return (
        <svg {...iconProps}>
            <path d="M12 4v10" />
            <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
            <rect x="5" y="16" width="14" height="4" rx="1.5" />
            <path d="m8.5 18 1.5 1.5L13 16.5" />
        </svg>
    );
}

function EditorProjects({ lang }: { lang: "pt" | "en" }) {
    const proofCopy =
        lang === "en"
            ? {
                views: "views on edited videos",
                likes: "Reels and social",
                partners: "retention-first edit",
                note: "Content for YouTube, Reels and social with a retention-first edit.",
                ideal: "If you already create content but feel the editing is not matching the level, I fix that.",
                servicesTitle: "What you get",
                services: [
                    ["More retention", "Your videos hold attention with clearer pacing, cuts and structure."],
                    ["Channel consistency", "Content with a visual standard, cadence and professional finish."],
                    ["Ready to post", "You just publish, without worrying about format, review and export."],
                ],
            }
            : {
                views: "de views em vídeos editados",
                likes: "Reels e social",
                partners: "edição focada em retenção",
                note: "Conteúdos para YouTube, Reels e social com foco em retenção.",
                ideal: "Se você já cria conteúdo, mas sente que a edição não acompanha o nível, eu resolvo isso.",
                servicesTitle: "O que você ganha",
                services: [
                    ["Mais retenção", "Seus vídeos seguram mais atenção com ritmo, cortes e estrutura."],
                    ["Consistência no canal", "Conteúdo com padrão visual, frequência e acabamento profissional."],
                    ["Pronto pra postar", "Você só publica, sem dor de cabeça com formato, revisão e exportação."],
                ],
            };

    return (
        <div id="editorProjects" className="editor-projects-stack">
            <div className="editor-proof-band" aria-label="Resultados de edição">
                <div>
                    <strong>+1M</strong>
                    <span>{proofCopy.views}</span>
                </div>
                <div>
                    <strong>YouTube</strong>
                    <span>{proofCopy.likes}</span>
                </div>
                <div>
                    <strong>{lang === "en" ? "Retention" : "Retenção"}</strong>
                    <span>{proofCopy.partners}</span>
                </div>
            </div>
            <p className="editor-proof-note">{proofCopy.note}</p>
            <p className="editor-ideal-line">{proofCopy.ideal}</p>
            <section className="editor-services">
                <div className="section-header">
                    <div>
                        <p className="section-label">Editing</p>
                        <h2 className="section-title">{proofCopy.servicesTitle}</h2>
                        <div style={{ height: "4px", width: "56px", background: "var(--accent)", borderRadius: "100px", marginTop: "12px" }}></div>
                    </div>
                </div>
                <div className="editor-services-grid">
                    {proofCopy.services.map(([title, text], index) => (
                        <article className="editor-service-card" key={title}>
                            <span className="editor-service-icon" aria-hidden="true">
                                <EditorServiceIcon index={index} />
                            </span>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </article>
                    ))}
                </div>
            </section>
            <div className="editor-projects-block">
                <YouTubeGrid />
            </div>
            <div className="editor-projects-block">
                <BehanceGrid />
            </div>
        </div>
    );
}

export default function Projects() {
    const { mode } = useMode();
    const { lang } = useLanguage();
    const pathname = usePathname();
    const isHomeRoute = pathname === "/";

    const devCopy: DevCopy =
        lang === "en"
            ? {
                sectionLabel: "Shipped work",
                sectionTitle: "Products and interfaces in production",
                featuredBadge: "Available on Google Play",
                featuredImpact: "Published mobile product for musicians, built from product strategy to Android release.",
                featuredDesc: "RiffMaker turns spontaneous riffs and musical ideas into organized creative material with a low-friction, offline-first mobile flow.",
                featuredCta: "View product case",
                featuredCaseCta: "Google Play listing",
                corpExperience: "Production systems",
                internalProject: "Internal project",
                viewDetails: "View Details",
                portalImpact: "B2B access hub redesigned for reseller support and operational self-service.",
                portalDesc: "Production portal for invoices, returns and order tracking in a reseller self-service flow.",
                portalRole: "Front-end · B2B · 2024",
                notifyImpact: "Legacy frontend refactor into a clearer notification management workflow.",
                notifyDesc: "Internal frontend modernization with React, TypeScript and clearer campaign management.",
                notifyRole: "Front-end refactor · Internal · 2024",
            }
            : {
                sectionLabel: "Trabalhos Selecionados",
                sectionTitle: "Produtos e interfaces em produção",
                featuredBadge: "Disponível na Play Store",
                featuredImpact: "Produto mobile publicado para músicos, do conceito ao release Android.",
                featuredDesc: "RiffMaker transforma riffs e ideias musicais espontâneas em material criativo organizado, com um fluxo mobile rápido e offline-first.",
                featuredCta: "Ver landing page",
                featuredCaseCta: "Ver case técnico",
                corpExperience: "Experiência Corporativa",
                internalProject: "Projeto interno",
                viewDetails: "Ver Detalhes",
                portalImpact: "Hub B2B redesenhado para suporte a revendedores e autosserviço operacional.",
                portalDesc: "Portal de produção para boletos, devoluções e rastreio em fluxo de autosserviço.",
                portalRole: "Front-end · B2B · 2024",
                notifyImpact: "Refatoração de frontend legado para um fluxo mais claro de notificações.",
                notifyDesc: "Modernização de frontend com React, TypeScript e gestão de campanhas mais clara.",
                notifyRole: "Refatoração front-end · Interno · 2024",
            };

    return (
        <section className="projects" id="projetos">
            {isHomeRoute ? (
                <div className="home-mixed-projects">
                    <div className="section-header">
                        <div>
                            <p className="section-label">{lang === "en" ? "Mixed Portfolio" : "Portfolio Misto"}</p>
                            <h2 className="section-title">{lang === "en" ? "TI + Edit Highlights" : "Destaques TI + Edit"}</h2>
                            <div style={{ height: "4px", width: "56px", background: "var(--accent)", borderRadius: "100px", marginTop: "12px" }}></div>
                        </div>
                    </div>
                    <DevProjects copy={devCopy} lang={lang} />
                    <EditorProjects lang={lang} />
                </div>
            ) : mode === "dev" ? (
                <DevProjects copy={devCopy} lang={lang} />
            ) : (
                <EditorProjects lang={lang} />
            )}
        </section>
    );
}
