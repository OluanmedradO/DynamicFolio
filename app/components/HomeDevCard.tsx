"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";

const content = {
    pt: {
        number: "01",
        category: "Desenvolvimento",
        title: "Dev",
        description: "Interfaces rápidas, acessíveis e bem pensadas. Do layout ao deploy, com atenção a cada detalhe.",
        cta: "Ver projetos →",
    },
    en: {
        number: "01",
        category: "Development",
        title: "Dev",
        description: "Fast, accessible and well-crafted interfaces. From layout to deploy, with attention to every detail.",
        cta: "View projects →",
    },
};

export default function HomeDevCard() {
    const { lang } = useLanguage();
    const c = content[lang];

    return (
        <section className="projects" id="projetos">
            <div className="section-header">
                <div>
                    <p className="section-label">{c.number}</p>
                </div>
            </div>

            <div className="featured-card visible">
                <div className="featured-content">
                    <div className="featured-badge">
                        <span className="ping-dot"></span>
                        {c.category}
                    </div>
                    <h3 className="featured-title">{c.title}</h3>
                    <p className="featured-desc">{c.description}</p>
                    <div className="tag-list">
                        <span className="tag">React</span>
                        <span className="tag">Next.js</span>
                        <span className="tag">TypeScript</span>
                        <span className="tag">UI/UX</span>
                    </div>
                    <div className="featured-actions">
                        <Link
                            href="/dev"
                            className="btn-red"
                            onClick={() => trackEvent("navigation_click", { destination: "/dev", source: "home_dev_card", lang })}
                        >
                            {c.cta}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
