"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { lang } = useLanguage();

    const labels =
        lang === "en"
            ? { about: "About", projects: "Projects" }
            : { about: "Sobre", projects: "Projetos" };

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
            <ul className="nav-links nav-left">
                <li>
                    <Link href="#sobre" onClick={handleSectionClick("sobre")}>{labels.about}</Link>
                </li>
                <li>
                    <Link href="#projetos" onClick={handleSectionClick("projetos")}>{labels.projects}</Link>
                </li>
            </ul>

            <Link href="#hero" className="nav-logo" onClick={handleSectionClick("hero")}>
                oluanmedrado<span>.</span>
            </Link>
           
        </nav>
    );
}