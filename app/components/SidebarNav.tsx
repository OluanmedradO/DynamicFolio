"use client";

import { useEffect, useState } from "react";

type Section = "hero" | "sobre" | "projetos" | "contato";

const sectionIds: Section[] = ["hero", "sobre", "projetos", "contato"];

export default function SidebarNav() {
    const [active, setActive] = useState<Section>("hero");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateSidebar = () => {
            const sobre = document.getElementById("sobre");
            const modeSwitch = document.getElementById("modeSwitch");

            const sobreTop = sobre ? sobre.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
            const shouldShow = sobreTop < window.innerHeight * 0.85;
            setVisible(shouldShow);

            const mid = window.innerHeight * 0.45;
            let currentSection: Section = "hero";

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= mid) {
                    currentSection = id;
                }
            }

            setActive(currentSection);

            if (modeSwitch) {
                const shouldCollapse = shouldShow;
                const shouldStayMinimal = currentSection === "sobre";

                modeSwitch.classList.toggle("collapsed", shouldCollapse);
                modeSwitch.classList.toggle("minimal", shouldStayMinimal);
            }
        };

        updateSidebar();
        window.addEventListener("scroll", updateSidebar, { passive: true });
        window.addEventListener("resize", updateSidebar);

        return () => {
            window.removeEventListener("scroll", updateSidebar);
            window.removeEventListener("resize", updateSidebar);
        };
    }, []);

    return (
        <nav className={`sidebar-nav${visible ? " visible" : ""}`} id="sidebarNav" aria-label="Navegação de seções">
            {[
                { id: "hero", label: "Início" },
                { id: "sobre", label: "Sobre" },
                { id: "projetos", label: "Projetos" },
                { id: "contato", label: "Contato" },
            ].map((item) => {
                const isActive = active === item.id;
                return (
                    <a
                        key={item.id}
                        className={`snav-item${isActive ? " active" : ""}`}
                        href={`#${item.id}`}
                        data-section={item.id}
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById(item.id);
                            if (target) target.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        <span className="snav-label">{item.label}</span>
                        <span className="snav-dot"></span>
                    </a>
                );
            })}
        </nav>
    );
}
