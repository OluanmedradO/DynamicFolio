"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import vidaLarAntes from "@/public/vidalar-prints/antes.png";
import vidaLarDepois from "@/public/vidalar-prints/depois.png";

export default function VidaLar() {
    const { mode } = useMode();
    const { lang } = useLanguage();

    const copy =
        lang === "en"
            ? {
                inProgress: "In progress",
                redesignCase: "Redesign Case",
                beforeAfter: "Before & After",
                subtitle: "Complete redesign of the digital identity for a home care company.",
                subtitle2: "The project is actively in development.",
                before: "Before",
                after: "After",
                afterWip: "In development",
                tag1Bad: "Outdated design",
                tag2Bad: "Confusing hierarchy",
                tag3Bad: "Low conversion",
                tag1Good: "Modern identity",
                tag2Good: "Clear UX",
                tag3Good: "Conversion focused",
                cta: "Want something like this? Let us talk ->",
                altBefore: "Vida Lar - before redesign",
                altAfter: "Vida Lar - redesign in progress",
            }
            : {
                inProgress: "Em progresso",
                redesignCase: "Case de Redesign",
                beforeAfter: "Antes & Depois",
                subtitle: "Redesign completo da identidade digital de uma empresa de cuidados domiciliares.",
                subtitle2: "O projeto está ativamente em desenvolvimento.",
                before: "Antes",
                after: "Depois",
                afterWip: "Em desenvolvimento",
                tag1Bad: "Design datado",
                tag2Bad: "Hierarquia confusa",
                tag3Bad: "Baixa conversão",
                tag1Good: "Identidade moderna",
                tag2Good: "UX clara",
                tag3Good: "Foco em conversão",
                cta: "Quer algo assim? Me chama ->",
                altBefore: "Vida Lar - antes do redesign",
                altAfter: "Vida Lar - redesign em progresso",
            };

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
                        {copy.inProgress}
                    </div>
                    <p className="section-label">{copy.redesignCase}</p>
                    <h2 className="section-title">
                        Vida Lar Saúde<br />
                        <em style={{ color: "var(--accent)", fontStyle: "normal" }}>{copy.beforeAfter}</em>
                    </h2>
                    <p className="vl-subtitle">
                        {copy.subtitle}
                        <br />
                        {copy.subtitle2}
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
                            {copy.before}
                        </div>
                        <div className="vl-screen">
                            <Image src={vidaLarAntes} alt={copy.altBefore} className="vl-img" sizes="(max-width: 900px) 100vw, 50vw" />
                         </div>
                        <div className="vl-card-footer">
                            <span className="vl-tag-bad">{copy.tag1Bad}</span>
                            <span className="vl-tag-bad">{copy.tag2Bad}</span>
                            <span className="vl-tag-bad">{copy.tag3Bad}</span>
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
                            {copy.after}
                        </div>
                        <div className="vl-screen">
                           
                            <Image src={vidaLarDepois} alt={copy.altAfter} className="vl-img" sizes="(max-width: 900px) 100vw, 50vw" />
                            {/* WIP overlay */}
                            <div className="vl-wip-overlay">
                                <div className="vl-wip-content">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    <span>{copy.afterWip}</span>
                                </div>
                            </div>
                        </div>
                        <div className="vl-card-footer">
                            <span className="vl-tag-good">{copy.tag1Good}</span>
                            <span className="vl-tag-good">{copy.tag2Good}</span>
                            <span className="vl-tag-good">{copy.tag3Good}</span>
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
                    <Link href="#contato" className="vl-cta">{copy.cta}</Link>
                </div>

            </div>
        </section>
    );
}
