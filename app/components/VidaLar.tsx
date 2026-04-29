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
                redesignCase: "Redesign Case",
                beforeAfter: "Before & After",
                subtitle: "Complete redesign of the digital identity for a home care company.",
                before: "Before",
                after: "After",
                beforeUrl: "vidalarsaude.com.br",
                afterUrl: "vida-lar.vercel.app",
                beforeTitle: "Legacy website",
                afterTitle: "New website",
                beforeNote: "Fragmented navigation, dated visual hierarchy and weak conversion cues.",
                afterNote: "Editorial homepage, cleaner service journey and stronger contact paths.",
                tag1Bad: "Outdated design",
                tag2Bad: "Confusing hierarchy",
                tag3Bad: "Low conversion",
                tag1Good: "Modern identity",
                tag2Good: "Clear UX",
                tag3Good: "Conversion focused",
                beforeHref: "https://vidalarsaude.com.br/",
                afterHref: "https://vida-lar.vercel.app/",
                beforeCta: "Open legacy site ->",
                afterCta: "View live site ->",
                altBefore: "Vida Lar - before redesign",
                altAfter: "Vida Lar - new website",
            }
            : {
                redesignCase: "Case de Redesign",
                beforeAfter: "Antes & Depois",
                subtitle: "Redesign completo da identidade digital de uma empresa de cuidados domiciliares.",
                before: "Antes",
                after: "Depois",
                beforeUrl: "vidalarsaude.com.br",
                afterUrl: "vida-lar.vercel.app",
                beforeTitle: "Site antigo",
                afterTitle: "Site novo",
                beforeNote: "Navegação fragmentada, hierarquia visual datada e pouca força de conversão.",
                afterNote: "Home editorial, jornada de serviços mais clara e caminhos de contato em destaque.",
                tag1Bad: "Design datado",
                tag2Bad: "Hierarquia confusa",
                tag3Bad: "Baixa conversão",
                tag1Good: "Identidade moderna",
                tag2Good: "UX clara",
                tag3Good: "Foco em conversão",
                beforeHref: "https://vidalarsaude.com.br/",
                afterHref: "https://vida-lar.vercel.app/",
                beforeCta: "Acessar site antigo ->",
                afterCta: "Ver site atual ->",
                altBefore: "Vida Lar - antes do redesign",
                altAfter: "Vida Lar - site novo",
            };

    if (mode !== "dev") {
        return null;
    }

    return (
        <section className="vidalarsection" id="vidalarsec">
            <div className="vl-inner">

                {/* Header */}
                <div className="vl-header">
                    <p className="section-label">{copy.redesignCase}</p>
                    <h2 className="section-title">
                        Vida Lar Saúde<br />
                        <em style={{ color: "var(--accent)", fontStyle: "normal" }}>{copy.beforeAfter}</em>
                    </h2>
                    <p className="vl-subtitle">{copy.subtitle}</p>
                </div>

                {/* Comparison */}
                <div className="vl-compare vl-compare-featured">

                    {/* BEFORE */}
                    <div className="vl-card vl-before">
                        <div className="vl-card-label vl-label-before">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 14l-4-4 4-4" />
                                <path d="M5 10h11a4 4 0 0 1 0 8h-1" />
                            </svg>
                            {copy.before}
                        </div>
                        <h3 className="vl-card-title">{copy.beforeTitle}</h3>
                        <p className="vl-card-note">{copy.beforeNote}</p>
                        <Link href={copy.beforeHref} target="_blank" rel="noopener noreferrer" className="vl-card-link vl-card-link-before">
                            {copy.beforeCta}
                        </Link>
                        <Link href={copy.beforeHref} target="_blank" rel="noopener noreferrer" className="vl-screen vl-screen-link" aria-label={copy.beforeCta}>
                            <div className="vl-browser-bar">
                                <div className="vl-dots"><span></span><span></span><span></span></div>
                                <div className="vl-url">{copy.beforeUrl}</div>
                            </div>
                            <Image src={vidaLarAntes} alt={copy.altBefore} className="vl-img" sizes="(max-width: 900px) 100vw, 50vw" />
                         </Link>
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
                        <h3 className="vl-card-title">{copy.afterTitle}</h3>
                        <p className="vl-card-note">{copy.afterNote}</p>
                        <Link href={copy.afterHref} target="_blank" rel="noopener noreferrer" className="vl-card-link vl-card-link-after">
                            {copy.afterCta}
                        </Link>
                        <Link href={copy.afterHref} target="_blank" rel="noopener noreferrer" className="vl-screen vl-screen-link" aria-label={copy.afterCta}>
                            <div className="vl-browser-bar">
                                <div className="vl-dots"><span></span><span></span><span></span></div>
                                <div className="vl-url">{copy.afterUrl}</div>
                            </div>
                            <Image src={vidaLarDepois} alt={copy.altAfter} className="vl-img" sizes="(max-width: 900px) 100vw, 50vw" />
                        </Link>
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
                    <div className="vl-stack-actions">
                        <Link href={copy.beforeHref} target="_blank" rel="noopener noreferrer" className="vl-cta vl-cta-secondary">{copy.beforeCta}</Link>
                        <Link href={copy.afterHref} target="_blank" rel="noopener noreferrer" className="vl-cta">{copy.afterCta}</Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
