"use client";

import { useEffect, useRef } from "react";

type StatConfig = {
    value: number;
    suffix?: string;
    label: string;
};

const stats: StatConfig[] = [
    { value: 3, suffix: "+", label: "Anos de experiência" },
    { value: 20, suffix: "+", label: "Projetos entregues" },
    { value: 2, label: "Empresas atendidas" },
];

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const numberEls = Array.from(section.querySelectorAll<HTMLElement>("[data-count]"));
        let hasAnimated = false;

        const animateNumbers = () => {
            if (hasAnimated) return;
            hasAnimated = true;

            numberEls.forEach((el) => {
                const target = Number(el.dataset.count || 0);
                const duration = 1100;
                const start = performance.now();

                const tick = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = `${Math.round(target * eased)}`;
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    }
                };

                requestAnimationFrame(tick);
            });
        };

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    section.querySelectorAll(".stat-item").forEach((item) => item.classList.add("visible"));
                    animateNumbers();
                    io.disconnect();
                });
            },
            { threshold: 0.25 }
        );

        io.observe(section);
        return () => io.disconnect();
    }, []);

    return (
        <div className="stats" ref={sectionRef}>
            {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                    <div className="stat-num">
                        <span data-count={stat.value}>0</span>
                        {stat.suffix ? <span className="plus">{stat.suffix}</span> : null}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}
