"use client";

import BehanceGrid from "./BehanceGrid";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import YouTubeGrid from "./YouTubeGrid";
import { useMode } from "../context/ModeContext";
import riff1 from "@/public/riff-1.jpg";
import riff2 from "@/public/riff-2.jpg";
import riff3 from "@/public/riff-3.jpg";
import revendedorPrint from "@/public/revendedor-prints/revendedor.png";
import notifyPrint from "@/public/notify-prints/dashboard.png";

function PhoneCarousel() {
    const imageArr = [riff1, riff2, riff3];
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        // Preload once so slide changes reuse in-memory assets.
        imageArr.forEach((img) => {
            const preloadImg = new window.Image();
            preloadImg.src = img.src;
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % imageArr.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [imageArr.length]);

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % imageArr.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + imageArr.length) % imageArr.length);
    const goToSlide = (i: number) => setActiveIdx(i);

    const leftIdx = (activeIdx - 1 + imageArr.length) % imageArr.length;
    const rightIdx = (activeIdx + 1) % imageArr.length;

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
                    <Image key={`left-${leftIdx}`} src={imageArr[leftIdx]} alt="Riff Maker" width={360} height={780} sizes="140px" className="phone-image" />
                </div>
                <div className="phone phone-center" onClick={nextSlide}>
                    <div className="phone-notch"></div>
                    <Image key={`center-${activeIdx}`} src={imageArr[activeIdx]} alt="Riff Maker" width={360} height={780} sizes="180px" priority={activeIdx === 0} className="phone-image" />
                </div>
                <div className="phone phone-right">
                    <div className="phone-dim"></div>
                    <Image key={`right-${rightIdx}`} src={imageArr[rightIdx]} alt="Riff Maker" width={360} height={780} sizes="140px" className="phone-image" />
                </div>
            </div>
            <div className="carousel-dots">
                {imageArr.map((_, i) => (
                    <div key={i} className={`dot ${i === activeIdx ? "active" : ""}`} onClick={() => goToSlide(i)}></div>
                ))}
            </div>
        </div>
    );
}

function DevProjects() {
    return (
        <div id="devProjects">
            <div className="section-header">
                <div>
                    <p className="section-label">Trabalhos Selecionados</p>
                    <h2 className="section-title">Projetos em Destaque</h2>
                    <div style={{ height: "4px", width: "56px", background: "var(--accent)", borderRadius: "100px", marginTop: "12px" }}></div>
                </div>
            </div>

            <div className="featured-card">
                <div className="featured-content">
                    <div className="featured-badge">
                        <span className="ping-dot"></span>
                        Em produção em breve
                    </div>
                    <h3 className="featured-title">Riff Maker</h3>
                    <p className="featured-desc">RiffMaker é um app mobile para músicos capturarem riffs e ideias musicais no momento em que elas surgem. <br/> Com gravação rápida e organização inteligente, ele transforma inspirações espontâneas em material criativo estruturado.</p>
                    <div className="tag-list">
                        <span className="tag">React Native</span>
                        <span className="tag">Expo</span>
                        <span className="tag">SQLite</span>
                        <span className="tag">Reanimated</span>
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
                    <div className="multilaser-sub">Experiência Corporativa</div>
                </div>
                <div className="multi-grid">
                    <div className="multi-card">
                        <div className="multi-card-glow"></div>
                        <div className="multi-card-img">
                            <Image src={revendedorPrint} alt="Portal do Revendedor" fill sizes="(min-width: 700px) 50vw, 100vw" className="multi-card-photo" />
                        </div>
                        <div className="multi-card-body">
                            <div className="tag-list" style={{ marginBottom: "10px" }}>
                                <span className="tag blue">React</span>
                                <span className="tag blue">B2B</span>
                                <span className="tag blue">UI/UX</span>
                            </div>
                            <h3 className="multi-card-title">Portal do Revendedor Multilaser</h3>
                            <p className="multi-card-desc">Hub de acesso para boletos, devoluções e rastreio de pedidos.</p>
                            <div className="multi-card-footer">
                                <Link href="https://revendedor.grupomultilaser.com.br/" target="_blank" className="multi-card-link">Ver Detalhes <span>↗</span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="multi-card">
                        <div className="multi-card-glow"></div>
                        <div className="multi-card-img">
                            <Image src={notifyPrint} alt="Multi Notify" fill sizes="(min-width: 700px) 50vw, 100vw" className="multi-card-photo" />
                        </div>
                        <div className="multi-card-body">
                            <div className="tag-list" style={{ marginBottom: "10px" }}>
                                <span className="tag blue">React</span>
                                <span className="tag blue">TypeScript</span>
                                <span className="tag blue">Tailwind CSS</span>
                            </div>
                            <h3 className="multi-card-title">Multi Notify</h3>
                            <p className="multi-card-desc">Refatoração completa do frontend B2B focado em gestão e disparo de notificações.</p>
                            <div className="multi-card-footer">
                                <span style={{ fontSize: "0.82rem", color: "var(--grey)" }}>Projeto interno</span>
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

    return (
        <section className="projects" id="projetos">
            {mode === "dev" ? <DevProjects /> : <EditorProjects />}
        </section>
    );
}


