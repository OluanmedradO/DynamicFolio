"use client";

import { useMode } from "../context/ModeContext";

export default function TechStrip() {
    const { mode } = useMode();

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
        "Ritmo de Edição",
    ];

    const techs = mode === "editor" ? editorTechs : devTechs;

    const track = [...techs, ...techs];

    return (
        <div className="tech-strip" aria-label="Tecnologias">
            <div className="tech-track">
                {track.map((tech, index) => (
                    <span key={`${tech}-${index}`} className="tech-item">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}
