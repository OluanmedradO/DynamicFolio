"use client";

import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";

function TechIcon({ name }: { name: string }) {
    const key = name.toLowerCase();

    if (key.includes("react")) {
        return (
            <svg viewBox="0 0 24 24" aria-hidden>
                <circle cx="12" cy="12" r="2.2" />
                <ellipse cx="12" cy="12" rx="9" ry="3.7" />
                <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(120 12 12)" />
            </svg>
        );
    }

    if (key.includes("figma")) {
        return (
            <svg viewBox="0 0 24 24" aria-hidden>
                <circle cx="9" cy="6" r="3" />
                <circle cx="15" cy="6" r="3" />
                <circle cx="9" cy="12" r="3" />
                <circle cx="15" cy="12" r="3" />
                <circle cx="9" cy="18" r="3" />
            </svg>
        );
    }

    if (key.includes("git")) {
        return (
            <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M7 7h5a4 4 0 0 1 4 4v6" />
                <circle cx="7" cy="7" r="2.2" />
                <circle cx="16" cy="17" r="2.2" />
                <path d="M7 9v8" />
                <circle cx="7" cy="17" r="2.2" />
            </svg>
        );
    }

    if (key.includes("tailwind")) {
        return (
            <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M4 13.2c1.8-3.4 4.4-4 7.8-1.8 1.9 1.2 3.2 1.1 4.2-.4.8-1.2 2-1.7 4-1.3-1.8 3.4-4.4 4-7.8 1.8-1.9-1.2-3.2-1.1-4.2.4-.8 1.2-2 1.7-4 1.3Z" />
            </svg>
        );
    }

    if (key.includes("node")) {
        return (
            <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" />
                <path d="M9 15V9l6 6V9" />
            </svg>
        );
    }

    if (key.includes("expo")) {
        return (
            <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M5 19 11.2 5.4c.4-.9 1.2-.9 1.6 0L19 19" />
                <path d="M8.8 14.2h6.4" />
            </svg>
        );
    }

    if (key.includes("typescript")) {
        return <span className="tech-icon-label" aria-hidden>TS</span>;
    }

    if (key.includes("next")) {
        return <span className="tech-icon-label" aria-hidden>N</span>;
    }

    if (key.includes("framer")) {
        return <span className="tech-icon-label" aria-hidden>F</span>;
    }

    return <span className="tech-icon-label" aria-hidden>{name.slice(0, 2)}</span>;
}

export default function TechStrip() {
    const { mode } = useMode();
    const { lang } = useLanguage();

    const devTechs = [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Figma",
        "Framer Motion",
        "React Native",
        "Git",
        "Expo",
    ];

    const editorTechs = [
        "Adobe Premiere Pro",
        "After Effects",
        "DaVinci Resolve",
        "Eleven Labs",
        "Photoshop",
        "Motion Graphics",
        "Color Grading",
        "Sound Design",
        "Storytelling Visual",
        "Editing Rhythm",
    ];

    const techs = mode === "editor" ? editorTechs : devTechs;

    const track = [...techs, ...techs];

    return (
        <div className="tech-strip" aria-label={lang === "en" ? "Technologies" : "Tecnologias"}>
            <div className="tech-track">
                {track.map((tech, index) => (
                    <span key={`${tech}-${index}`} className="tech-item">
                        <span className="tech-icon">
                            <TechIcon name={tech} />
                        </span>
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}
