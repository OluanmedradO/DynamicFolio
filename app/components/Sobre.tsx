"use client";

import { Atom, Clapperboard, FileCode2, Film, Mic, Music, Palette, PenTool, Server, Smartphone, Sparkles, Zap } from "lucide-react";
import { useMode } from "../context/ModeContext";

const devSkills = [
    { icon: <Atom size={18} />, name: "React / Next.js" },
    { icon: <FileCode2 size={18} />, name: "TypeScript" },
    { icon: <Palette size={18} />, name: "CSS / Tailwind" },
    { icon: <PenTool size={18} />, name: "Figma / UI Design" },
    { icon: <Server size={18} />, name: "Node.js / APIs" },
    { icon: <Smartphone size={18} />, name: "React Native" },
];

const editorSkills = [
    { icon: <Clapperboard size={18} />, name: "Premiere Pro" },
    { icon: <Sparkles size={18} />, name: "After Effects" },
    { icon: <Film size={18} />, name: "DaVinci Resolve" },
    { icon: <Music size={18} />, name: "Sound Design" },
    { icon: <Mic size={18} />, name: "Eleven Labs" },
    { icon: <Zap size={18} />, name: "Motion Design" },
];

const modeContent = {
    dev: {
        title: (<>Código com <em>intenção</em> e design com <em>propósito</em></>),
        text: (
            <>
                Gosto de transformar ideias em interfaces claras, rápidas e agradáveis de usar.
                <br />
                Trabalho principalmente com React e Next.js, sempre buscando equilíbrio entre design, performance e experiência do usuário.
            </>
        ),
        skills: devSkills,
    },
    editor: {
        title: (<>Narrativa com <em>ritmo</em> e imagem com <em>emoção</em></>),
        text: (
            <>
                Cada corte é uma decisão. Cada transição, uma intenção. <br />
                Sempre buscando dar vida à visão de cada cliente com um toque único e envolvente.
            </>
        ),
        skills: editorSkills,
    },
};

export default function Sobre() {
    const { mode } = useMode();
    const c = modeContent[mode];

    return (
        <section className="about" id="sobre">
            <div className="about-left">
                <p className="about-label">Sobre mim</p>
                <h2 key={`title-${mode}`} className="about-title mode-fade">{c.title}</h2>
                <p key={`text-${mode}`} className="about-text mode-fade">{c.text}</p>
            </div>
            <div className="about-right" id="skills">
                <div className="skills-grid" id="skillsGrid">
                    {c.skills.map((skill, i) => (
                        <div key={i} className="skill-pill">
                            <span className="skill-pill-icon">{skill.icon}</span>
                            <span className="skill-pill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
