"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { lang } = useLanguage();
    const pathname = usePathname();

    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const isHomeRoute = normalizedPath === "/";
    const showHomeButton = normalizedPath === "/dev" || normalizedPath === "/editing" || normalizedPath === "/edit";
    const logoSuffix =
        normalizedPath === "/dev"
            ? ".dev"
            : normalizedPath === "/edit" || normalizedPath === "/editing"
              ? ".edit"
              : null;

    const labels =
        lang === "en"
            ? { home: "Home", about: "About", projects: "Projects", riffmaker: "RiffMaker", backHome: "Home" }
            : { home: "Inicio", about: "Sobre", projects: "Projetos", riffmaker: "RiffMaker", backHome: "Inicio" };

    const primarySectionId = isHomeRoute ? "hero" : "sobre";
    const primaryLabel = isHomeRoute ? labels.home : labels.about;

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const target = document.getElementById(sectionId);
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });

        const nextHash = `#${sectionId}`;
        if (window.location.hash !== nextHash) {
            window.history.pushState(null, "", nextHash);
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav id="topnav" className={scrolled ? "scrolled" : ""}>
            <div className="nav-left">
                <ul className="nav-links">
                    {showHomeButton ? (
                        <li>
                            <Link href="/" className="nav-home-link" aria-label={labels.backHome}>
                                <span aria-hidden>{"\u2190"}</span>
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
                    {labels.riffmaker}
                </Link>
            </div>

            <Link href="#hero" className="nav-logo" onClick={handleSectionClick("hero")}>
                oluanmedrado
                <span>{logoSuffix ?? "."}</span>
            </Link>

            <div className="nav-right">
                {showHomeButton ? (
                    <Link href="/" className="nav-home-btn-mobile" aria-label={labels.backHome}>
                        <span aria-hidden>{"\u2190"}</span>
                    </Link>
                ) : null}
                <LanguageSwitch />
            </div>
        </nav>
    );
}
