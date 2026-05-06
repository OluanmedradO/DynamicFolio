"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { localizePath } from "../lib/locale";

type VidaLarCopy = {
    eyebrow: string;
    title: string;
    subtitle: string;
    value: string;
    changedLabel: string;
    changed: string[];
    beforeHref: string;
    afterHref: string;
    currentCta: string;
    caseCta: string;
    oldCta: string;
    beforeLabel: string;
    afterLabel: string;
};

export default function VidaLar() {
    const { mode } = useMode();
    const { lang } = useLanguage();

    const copy: VidaLarCopy =
        lang === "en"
            ? {
                eyebrow: "REDESIGN CASE",
                title: "VidaLar Saúde",
                subtitle: "Institutional redesign for a home care company.",
                value: "I transformed an outdated digital presence into a clearer, more trustworthy experience focused on contact and conversion.",
                changedLabel: "What changed",
                changed: ["Modern identity", "Clearer UX", "Conversion focus", "Responsive", "Editorial structure"],
                beforeHref: "https://vidalarsaude.com.br/",
                afterHref: "https://vida-lar.vercel.app/",
                currentCta: "View current site",
                caseCta: "View full case",
                oldCta: "Old site",
                beforeLabel: "Before",
                afterLabel: "After",
            }
            : {
                eyebrow: "CASE DE REDESIGN",
                title: "VidaLar Saúde",
                subtitle: "Redesign institucional para uma empresa de cuidados domiciliares.",
                value: "Transformei uma presença digital datada em uma experiência mais clara, confiável e orientada a contato.",
                changedLabel: "O que mudou",
                changed: ["Identidade moderna", "UX mais clara", "Foco em conversão", "Responsivo", "Estrutura editorial"],
                beforeHref: "https://vidalarsaude.com.br/",
                afterHref: "https://vida-lar.vercel.app/",
                currentCta: "Ver site atual",
                caseCta: "Ver case completo",
                oldCta: "Site antigo",
                beforeLabel: "Antes",
                afterLabel: "Depois",
            };

    if (mode !== "dev") {
        return null;
    }

    return (
        <section className="vidalarsection" id="vidalarsec">
            <div className="vl-inner">
                <div className="vl-header">
                    <p className="section-label">{copy.eyebrow}</p>
                    <h2 className="section-title">{copy.title}</h2>
                    <p className="vl-subtitle">{copy.subtitle}</p>
                    <p className="vl-value">{copy.value}</p>
                </div>

                <div
                    className="vl-comparison"
                    aria-label={lang === "en" ? "VidaLar before and after" : "Comparação antes e depois VidaLar"}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                        gap: "clamp(14px, 2vw, 22px)",
                        alignItems: "stretch",
                    }}
                >
                    <figure
                        className="vl-proof-frame"
                        style={{
                            position: "relative",
                            width: "100%",
                            margin: 0,
                            aspectRatio: "16 / 10",
                            overflow: "hidden",
                            borderRadius: 18,
                            background: "#000",
                        }}
                    >
                        <span
                            className="vl-proof-label"
                            style={{
                                position: "absolute",
                                top: 14,
                                left: 14,
                                zIndex: 2,
                            }}
                        >
                            {copy.beforeLabel}
                        </span>
                        <Image
                            src="/vidalar-prints/Vidalar_Antes.png"
                            alt={lang === "en" ? "Old VidaLar Saúde website screenshot" : "Print do site antigo da VidaLar Saúde"}
                            width={1440}
                            height={920}
                            sizes="(max-width: 860px) 100vw, 50vw"
                            className="vl-proof-image"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "top center",
                                display: "block",
                            }}
                        />
                    </figure>
                    <figure
                        className="vl-proof-frame"
                        style={{
                            position: "relative",
                            width: "100%",
                            margin: 0,
                            aspectRatio: "16 / 10",
                            overflow: "hidden",
                            borderRadius: 18,
                            background: "#000",
                        }}
                    >
                        <span
                            className="vl-proof-label vl-proof-label-after"
                            style={{
                                position: "absolute",
                                top: 14,
                                left: 14,
                                zIndex: 2,
                            }}
                        >
                            {copy.afterLabel}
                        </span>
                        <video
                            src="/vidalar-redesign-preview.optimized.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="vl-video-demo"
                            aria-label={lang === "en" ? "VidaLar Saúde redesign walkthrough" : "Demonstração do redesign VidaLar Saúde"}
                        />
                    </figure>
                </div>

                <div className="vl-change-row" aria-label={copy.changedLabel}>
                    <strong>{copy.changedLabel}</strong>
                    {copy.changed.map((item) => (
                        <span key={item}>{item}</span>
                    ))}
                </div>

                <div className="vl-stack">
                    <div className="vl-stack-tags">
                        <span className="tag">React</span>
                        <span className="tag">Next.js</span>
                        <span className="tag">Tailwind CSS</span>
                        <span className="tag">Figma</span>
                        <span className="tag">UI/UX</span>
                    </div>
                    <div className="vl-stack-actions">
                        <Link href={copy.afterHref} target="_blank" rel="noopener noreferrer" className="vl-cta vl-cta-primary">{copy.currentCta}</Link>
                        <Link href={localizePath("/projects/vidalar-saude", lang)} className="vl-cta vl-cta-secondary">{copy.caseCta}</Link>
                        <Link href={copy.beforeHref} target="_blank" rel="noopener noreferrer" className="vl-cta vl-cta-tertiary">{copy.oldCta}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
