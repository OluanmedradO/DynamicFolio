"use client";

import Image from "next/image";
import styles from "./BehanceGrid.module.css";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";

// Tiny dark placeholder para blur-up enquanto as imagens carregam
const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=";

const behanceProjects = [
  {
    title: "Guitarra Gospel",
    thumbnail: "/guitarragospel.jpg",
    background: "#0a0a0a",
    url: "https://www.behance.net/gallery/245289239/Aulas-de-Guitarra",
  },
  {
    title: "Apresentação E-Multitech",
    thumbnail: "/emultitech.webp",
    background: "#0d1520",
    url: "https://www.behance.net/gallery/243412563/Apresentacao-E-Multitech",
  },
  {
    title: "Testes Criativos",
    thumbnail: "/testes.webp",
    background: "#180520",
    url: "https://www.behance.net/gallery/208794979/Testes",
  },
  {
    title: "Novato - YouTube",
    thumbnail: "/novato.webp",
    background: "#3d0a08",
    url: "https://www.behance.net/gallery/207809217/Gameplays",
  },
  {
    title: "Smart Fit",
    thumbnail: "/smartfit.webp",
    background: "#0f1622",
    url: "https://www.behance.net/gallery/200154929/Apresentacao-de-colaboradores",
  },
  {
    title: "Logo - Loja de Suplementos",
    thumbnail: "/jef.webp",
    background: "#171117",
    url: "https://www.behance.net/gallery/210403079/Logo-Loja-de-Suplementos-J-F",
  },
] as const;

export default function BehanceGrid() {
  const { lang } = useLanguage();
  const behanceProfileUrl = "https://www.behance.net/oluanmedrado";

  const copy =
    lang === "en"
      ? {
        selectedWorks: "Selected Works",
        title: "Edits and Design",
        cta: "View on Behance",
        openLabel: "Open",
      }
      : {
        selectedWorks: "Trabalhos Selecionados",
        title: "Edições e Designs",
        cta: "Ver no Behance",
        openLabel: "Abrir",
      };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>{copy.selectedWorks}</p>
          <h2 className={styles.title}>{copy.title}</h2>
          <div className={styles.accentLine}></div>
        </div>
        <a
          href={behanceProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaLink}
          onClick={() => trackEvent("project_click", { project: "Behance Profile", category: "editor", platform: "behance", lang })}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.971 2.11 1.971.55 0 1.045-.167 1.246-.63h2.4zm-5.183-7c-1.06 0-1.954.69-2.078 1.98h4.004c-.035-1.176-.738-1.98-1.926-1.98zM3 3h5.348c2.562 0 4.879.876 4.879 3.445 0 1.252-.578 2.31-1.697 3.002C13.1 10.04 13.9 11.34 13.9 13c0 3.01-2.483 4-5.13 4H3V3zm3 5.5h2.16c1.083 0 1.79-.545 1.79-1.41 0-.905-.682-1.39-1.808-1.39H6V8.5zm0 5h2.303c1.27 0 2.099-.604 2.099-1.66 0-1.11-.972-1.59-2.175-1.59H6V13.5z" />
          </svg>
          {copy.cta}
        </a>
      </div>

      <div className={styles.grid}>
        {behanceProjects.map((project) => (
          <a
            key={project.title}
            className={styles.item}
            style={{ background: project.background }}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.openLabel} ${project.title} no Behance`}
            onClick={() => trackEvent("project_click", { project: project.title, category: "editor", platform: "behance", lang })}
          >
            <div className={styles.thumb} aria-hidden="true">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 440px) 100vw, 50vw"
                className={styles.thumbImage}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className={styles.cardArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
            <div className={styles.overlay}>
              <span className={styles.itemLabel}>{project.title}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}