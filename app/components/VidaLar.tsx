"use client";

import Link from "next/link";
import Image from "next/image";
import { useMode } from "../context/ModeContext";
import vidaLarAntes from "@/public/vidalar-prints/antes.png";
import vidaLarDepois from "@/public/vidalar-prints/depois.png";

export default function VidaLar() {
    const { mode } = useMode();

    if (mode !== "dev") {
        return null;
    }

    return (
        <section className="vidalarsection" id="vidalarsec">
            <div className="vl-inner">

                {/* Header */}
                <div className="vl-header">
                    <div className="vl-wip-badge">
                        <span className="ping-dot" style={{ "--pc": "#f59e0b" } as React.CSSProperties}></span>
                        Em progresso
                    </div>
                    <p className="section-label">Case de Redesign</p>
                    <h2 className="section-title">
                        Vida Lar Saúde<br />
                        <em style={{ color: "var(--accent)", fontStyle: "normal" }}>Antes &amp; Depois</em>
                    </h2>
                    <p className="vl-subtitle">
                        Redesign completo da identidade digital de uma empresa de cuidados domiciliares.
                        <br />
                        O projeto está ativamente em desenvolvimento.
                    </p>
                </div>

                {/* Comparison */}
                <div className="vl-compare">

                    {/* BEFORE */}
                    <div className="vl-card vl-before">
                        <div className="vl-card-label vl-label-before">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 14l-4-4 4-4" />
                                <path d="M5 10h11a4 4 0 0 1 0 8h-1" />
                            </svg>
                            Antes
                        </div>
                        <div className="vl-screen">
                            <Image src={vidaLarAntes} alt="Vida Lar — antes do redesign" className="vl-img" sizes="(max-width: 900px) 100vw, 50vw" />
                         </div>
                        <div className="vl-card-footer">
                            <span className="vl-tag-bad">Design datado</span>
                            <span className="vl-tag-bad">Hierarquia confusa</span>
                            <span className="vl-tag-bad">Baixa conversão</span>
                        </div>
                    </div>

                    {/* VS divider */}
                    <div className="vl-vs">
                        <div className="vl-vs-line"></div>
                        <div className="vl-vs-circle">VS</div>
                        <div className="vl-vs-line"></div>
                    </div>

                    {/* AFTER */}
                    <div className="vl-card vl-after">
                        <div className="vl-card-label vl-label-after">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                            Depois
                        </div>
                        <div className="vl-screen">
                           
                            <Image src={vidaLarDepois} alt="Vida Lar — redesign em progresso" className="vl-img" sizes="(max-width: 900px) 100vw, 50vw" />
                            {/* WIP overlay */}
                            <div className="vl-wip-overlay">
                                <div className="vl-wip-content">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    <span>Em desenvolvimento</span>
                                </div>
                            </div>
                        </div>
                        <div className="vl-card-footer">
                            <span className="vl-tag-good">Identidade moderna</span>
                            <span className="vl-tag-good">UX clara</span>
                            <span className="vl-tag-good">Foco em conversão</span>
                        </div>
                    </div>

                </div>

                {/* Bottom CTA / tech stack */}
                <div className="vl-stack">
                    <div className="vl-stack-tags">
                        <span className="tag">React</span>
                        <span className="tag">Next.js</span>
                        <span className="tag">Tailwind CSS</span>
                        <span className="tag">Figma</span>
                        <span className="tag">UI/UX</span>
                    </div>
                    <Link href="#contato" className="vl-cta">Quer algo assim? Me chama →</Link>
                </div>

            </div>
        </section>
    );
}
