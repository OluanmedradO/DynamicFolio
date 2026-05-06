"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { localizePath, stripLocalePrefix } from "../lib/locale";
import LanguageSwitch from "./LanguageSwitch";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang } = useLanguage();
    const pathname = usePathname();

    const normalizedPath = stripLocalePrefix(pathname).replace(/\/+$/, "") || "/";
    const isHomeRoute = normalizedPath === "/";
    const isDevRoute = normalizedPath === "/dev";
    const isEditingRoute = normalizedPath === "/editing" || normalizedPath === "/edit";
    const showHomeButton = normalizedPath === "/dev" || normalizedPath === "/editing" || normalizedPath === "/edit";
    const logoSuffix = isDevRoute ? "/dev" : isEditingRoute ? "/editing" : ".com";
    const editingReturnStyle = isEditingRoute
        ? {
            top: 22,
            left: "clamp(18px, 3vw, 48px)",
            right: "clamp(18px, 3vw, 48px)",
            width: "auto",
            minHeight: 56,
            padding: "0 18px",
            border: "1px solid rgba(255, 255, 255, 0.075)",
            borderRadius: 999,
            background: "rgba(8, 5, 14, 0.64)",
            boxShadow: "0 18px 60px rgba(0, 0, 0, 0.22)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
        }
        : undefined;
    const labels =
        lang === "en"
            ? { home: "Home", about: "About", projects: "Projects", riffmaker: "RiffMaker", backHome: "Home" }
            : { home: "Inicio", about: "Sobre", projects: "Projetos", riffmaker: "RiffMaker", backHome: "Inicio" };

    const primarySectionId = isHomeRoute ? "hero" : "sobre";
    const primaryLabel = isHomeRoute ? labels.home : labels.about;

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setMenuOpen(false);

        const target = document.getElementById(sectionId);
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });

        const nextHash = `#${sectionId}`;
        if (window.location.hash !== nextHash) {
            window.history.pushState(null, "", nextHash);
        }
    };

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [closeMenu]);

    return (
        <>
            <nav id="topnav" className={`${scrolled ? "scrolled" : ""}${showHomeButton ? " nav-return-route" : ""}`} style={editingReturnStyle}>
                <div className="nav-left">
                    <ul className="nav-links">
                        {showHomeButton ? (
                            <li>
                                <Link href={localizePath("/", lang)} className="nav-home-link" aria-label={labels.backHome}>
                                    <span aria-hidden>{"←"}</span>
                                    <span>{labels.backHome}</span>
                                </Link>
                            </li>
                        ) : null}
                        <li>
                            <Link href={`#${primarySectionId}`} onClick={handleSectionClick(primarySectionId)}>{primaryLabel}</Link>
                        </li>
                        <li>
                            <Link href="#projetos" onClick={handleSectionClick("projetos")}>{labels.projects}</Link>
                        </li>
                    </ul>
                    <Link href="/riffmaker" className="nav-cta">
                        <Image src="/riff-maker/icon.png" alt="" width={24} height={24} className="nav-cta-icon" />
                        {labels.riffmaker}
                    </Link>
                </div>

                {showHomeButton ? (
                    <Link href={localizePath("/", lang)} className="nav-home-btn-mobile" aria-label={labels.backHome}>
                        <span aria-hidden>{"←"}</span>
                    </Link>
                ) : (
                    <button
                        className="nav-hamburger"
                        aria-label={menuOpen ? (lang === "en" ? "Close menu" : "Fechar menu") : (lang === "en" ? "Open menu" : "Abrir menu")}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((o) => !o)}
                    >
                        <span className={menuOpen ? "open" : ""} />
                        <span className={menuOpen ? "open" : ""} />
                        <span className={menuOpen ? "open" : ""} />
                    </button>
                )}

                <Link href="#hero" className="nav-logo" onClick={handleSectionClick("hero")}>
                    oluanmedrado
                    <span>{logoSuffix}</span>
                </Link>

                <div className="nav-right">
                    <LanguageSwitch />
                </div>
            </nav>

            <div
                className={`mobile-nav-overlay${menuOpen ? " open" : ""}`}
                aria-hidden={!menuOpen}
                onClick={closeMenu}
            >
                <div className="mobile-nav-inner" onClick={(e) => e.stopPropagation()}>
                    <button
                        className="mobile-nav-close"
                        aria-label={lang === "en" ? "Close menu" : "Fechar menu"}
                        onClick={closeMenu}
                    >
                        &#215;
                    </button>

                    <nav className="mobile-nav-links" aria-label={lang === "en" ? "Main navigation" : "Navegação principal"}>
                        <Link href={`#${primarySectionId}`} onClick={handleSectionClick(primarySectionId)} tabIndex={menuOpen ? 0 : -1}>
                            {primaryLabel}
                        </Link>
                        <Link href="#projetos" onClick={handleSectionClick("projetos")} tabIndex={menuOpen ? 0 : -1}>
                            {labels.projects}
                        </Link>
                        <Link href="/riffmaker" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} className="mobile-nav-riff">
                            {labels.riffmaker}
                        </Link>
                    </nav>

                    <div className="mobile-nav-footer">
                        <LanguageSwitch />
                    </div>
                </div>
            </div>
        </>
    );
}
