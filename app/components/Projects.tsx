"use client";

import BehanceGrid from "./BehanceGrid";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import YouTubeGrid from "./YouTubeGrid";
import { useMode } from "../context/ModeContext";
import { trackEvent } from "../lib/analytics";
import riff1 from "@/public/riff-1.jpg";
import riff2 from "@/public/riff-2.jpg";
import riff3 from "@/public/riff-3.jpg";
import revendedorPrint from "@/public/revendedor-prints/revendedor.png";
import notifyPrint from "@/public/notify-prints/dashboard.png";

const carouselImages = [riff1, riff2, riff3];

function PhoneCarousel() {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        // Preload once so slide changes reuse in-memory assets.
        carouselImages.forEach((img) => {
            const preloadImg = new window.Image();
            preloadImg.src = img.src;
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % carouselImages.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % carouselImages.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    const goToSlide = (i: number) => setActiveIdx(i);

    const leftIdx = (activeIdx - 1 + carouselImages.length) % carouselImages.length;
    const rightIdx = (activeIdx + 1) % carouselImages.length;

    return (
        <div className="phone-stage">
            <div className="phone-glow"></div>
            <div className="carousel-nav">
                <button className="carousel-btn" onClick={prevSlide}>&#8249;</button>
                <button className="carousel-btn" onClick={nextSlide}>&#8250;</button>
            </div>
            <div className="phones-wrapper">
                <div className="phone phone-left">
                    <div className="phone-dim"></div>
                    <Image key={`left-${leftIdx}`} src={carouselImages[leftIdx]} alt="Riff Maker" width={360} height={780} sizes="140px" className="phone-image" placeholder="blur" />
                </div>
                <div className="phone phone-center" onClick={nextSlide}>
                    <div className="phone-notch"></div>
                    <Image key={`center-${activeIdx}`} src={carouselImages[activeIdx]} alt="Riff Maker" width={360} height={780} sizes="180px" priority={activeIdx === 0} className="phone-image" placeholder="blur" />
                </div>
                <div className="phone phone-right">
                    <div className="phone-dim"></div>
                    <Image key={`right-${rightIdx}`} src={carouselImages[rightIdx]} alt="Riff Maker" width={360} height={780} sizes="140px" className="phone-image" placeholder="blur" />
                </div>
            </div>
            <div className="carousel-dots">
                {carouselImages.map((_, i) => (
                    <div key={i} className={`dot ${i === activeIdx ? "active" : ""}`} onClick={() => goToSlide(i)}></div>
                ))}
            </div>
        </div>
    );
}

interface DevCopy {
    sectionLabel: string;
    sectionTitle: string;
    featuredBadge: string;
    featuredDesc: string;
    featuredCta: string;
    corpExperience: string;
    internalProject: string;
    viewDetails: string;
    portalDesc: string;
    notifyDesc: string;
}

function DevProjects({ copy, lang }: { copy: DevCopy; lang: "pt" | "en" }) {
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
                    <p className="featured-desc">{copy.featuredDesc}</p>
                    <div className="tag-list">
                        <span className="tag">React Native</span>
                        <span className="tag">Expo</span>
                        <span className="tag">SQLite</span>
                        <span className="tag">Reanimated</span>
                    </div>
                    <div className="featured-actions">
                        <Link
                            href="/riffmaker"
                            className="btn-red"
                            onClick={() => trackEvent("project_click", { project: "Riff Maker", category: "dev", lang, destination: "/riffmaker" })}
                        >
                            {copy.featuredCta} <span>↗</span>
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
                        style={{ height: "36px", width: "auto", marginBottom: "8px", filter: "brightness(0) invert(1)", opacity: 0.9 }}
                    />
                    <div className="multilaser-sub">{copy.corpExperience}</div>
                </div>
                <div className="multi-grid">
                    <div className="multi-card">
                        <div className="multi-card-glow"></div>
                        <div className="multi-card-img">
                            <Image src={revendedorPrint} alt="Portal do Revendedor" fill sizes="(min-width: 700px) 50vw, 100vw" className="multi-card-photo" placeholder="blur" />
                        </div>
                        <div className="multi-card-body">
                            <div className="tag-list" style={{ marginBottom: "10px" }}>
                                <span className="tag blue">React</span>
                                <span className="tag blue">B2B</span>
                                <span className="tag blue">UI/UX</span>
                            </div>
                            <h3 className="multi-card-title">Portal do Revendedor Multilaser</h3>
                            <p className="multi-card-desc">{copy.portalDesc}</p>
                            <div className="multi-card-footer" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                <Link
                                    href="/projects/revendedor-multilaser"
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
                            <Image src={notifyPrint} alt="Multi Notify" fill sizes="(min-width: 700px) 50vw, 100vw" className="multi-card-photo" placeholder="blur" />
                        </div>
                        <div className="multi-card-body">
                            <div className="tag-list" style={{ marginBottom: "10px" }}>
                                <span className="tag blue">React</span>
                                <span className="tag blue">TypeScript</span>
                                <span className="tag blue">Tailwind CSS</span>
                            </div>
                            <h3 className="multi-card-title">Multi Notify</h3>
                            <p className="multi-card-desc">{copy.notifyDesc}</p>
                            <div className="multi-card-footer">
                                <Link
                                    href="/projects/multi-notify"
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

function EditorProjects() {
    return (
        <div id="editorProjects" className="editor-projects-stack">
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
                sectionLabel: "Selected Works",
                sectionTitle: "Featured Projects",
                featuredBadge: "In production soon",
                featuredDesc: "RiffMaker is a mobile app for musicians to capture riffs and musical ideas the moment they appear. With quick recording and smart organization, it turns spontaneous inspiration into structured creative material.",
                featuredCta: "Open Riff Maker",
                corpExperience: "Corporate Experience",
                internalProject: "Internal project",
                viewDetails: "View Details",
                portalDesc: "Access hub for invoices, returns and order tracking.",
                notifyDesc: "Complete B2B frontend refactor focused on notification management and dispatch.",
            }
            : {
                sectionLabel: "Trabalhos Selecionados",
                sectionTitle: "Projetos em Destaque",
                featuredBadge: "Em produção em breve",
                featuredDesc: "RiffMaker é um app mobile para músicos capturarem riffs e ideias musicais no momento em que elas surgem. Com gravação rápida e organização inteligente, ele transforma inspirações espontâneas em material criativo estruturado.",
                featuredCta: "Abrir Riff Maker",
                corpExperience: "Experiência Corporativa",
                internalProject: "Projeto interno",
                viewDetails: "Ver Detalhes",
                portalDesc: "Hub de acesso para boletos, devoluções e rastreio de pedidos.",
                notifyDesc: "Refatoração completa do frontend B2B focado em gestão e disparo de notificações.",
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
                    <EditorProjects />
                </div>
            ) : mode === "dev" ? (
                <DevProjects copy={devCopy} lang={lang} />
            ) : (
                <EditorProjects />
            )}
        </section>
    );
}

