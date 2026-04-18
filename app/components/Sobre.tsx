"use client";

import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";

/* ── Brand logos as inline SVGs ───────────────────────────── */
const ReactLogo = () => (
    <svg width="18" height="18" viewBox="0 0 100 100" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" fill="none"/>
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" fill="none" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" fill="none" transform="rotate(120 50 50)"/>
        <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
    </svg>
);

const TypeScriptLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="2" fill="#3178C6"/>
        <text x="2.2" y="13.8" fontFamily="system-ui,sans-serif" fontWeight="800" fontSize="9" fill="white">TS</text>
    </svg>
);

const TailwindLogo = () => (
    <svg width="18" height="18" viewBox="0 0 54 33" aria-hidden="true" fill="#38BDF8">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.264 26.472 8.753 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.936 41.028 7.447 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.953 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.136 27.528 23.647 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z"/>
    </svg>
);

const FigmaLogo = () => (
    <svg width="18" height="18" viewBox="0 0 38 57" aria-hidden="true">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
    </svg>
);

const NodeLogo = () => (
    <svg width="18" height="18" viewBox="0 0 100 115" aria-hidden="true">
        <path d="M50 4L96 30v55L50 111L4 85V30L50 4z" fill="#5FA04E"/>
        <text x="50" y="74" fontFamily="system-ui,sans-serif" fontWeight="900" fontSize="54" fill="white" textAnchor="middle">N</text>
    </svg>
);

const PremiereLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#0D0B1E"/>
        <text x="2" y="13.5" fontFamily="system-ui,sans-serif" fontWeight="800" fontSize="9.5" fill="#9999FF">Pr</text>
    </svg>
);

const AfterEffectsLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#00005B"/>
        <text x="1.8" y="13.5" fontFamily="system-ui,sans-serif" fontWeight="800" fontSize="9.5" fill="#9999FF">Ae</text>
    </svg>
);

const DaVinciLogo = () => (
    /* 3 teardrops em triângulo + anel arco-íris — logo real do DaVinci Resolve */
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <defs>
            <linearGradient id="dvRing" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%"   stopColor="#FF3030"/>
                <stop offset="18%"  stopColor="#FF9900"/>
                <stop offset="36%"  stopColor="#EEFF00"/>
                <stop offset="54%"  stopColor="#00FF88"/>
                <stop offset="72%"  stopColor="#0088FF"/>
                <stop offset="88%"  stopColor="#7744FF"/>
                <stop offset="100%" stopColor="#FF3088"/>
            </linearGradient>
        </defs>
        {/* Fundo círculo escuro */}
        <circle cx="9" cy="9" r="9" fill="#252E3A"/>
        {/* Anel arco-íris */}
        <circle cx="9" cy="9" r="7.8" fill="none" stroke="url(#dvRing)" strokeWidth="2"/>
        {/* Teardrop topo — cyan (tip aponta para centro) */}
        <path d="M9,8 C10.5,7.5 11.5,6 11.5,4 A2.5,2.5 0 0,0 6.5,4 C6.5,6 7.5,7.5 9,8 Z" fill="#4DC8E8"/>
        {/* Teardrop inferior-direito — rosa (120° CW) */}
        <path d="M9,8 C10.5,7.5 11.5,6 11.5,4 A2.5,2.5 0 0,0 6.5,4 C6.5,6 7.5,7.5 9,8 Z" fill="#E86070" transform="rotate(120,9,9)"/>
        {/* Teardrop inferior-esquerdo — verde-limão (240° CW) */}
        <path d="M9,8 C10.5,7.5 11.5,6 11.5,4 A2.5,2.5 0 0,0 6.5,4 C6.5,6 7.5,7.5 9,8 Z" fill="#A8CC20" transform="rotate(240,9,9)"/>
    </svg>
);

const ElevenLabsLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#111111"/>
        <rect x="4" y="4" width="3" height="10" rx="1.5" fill="white"/>
        <rect x="11" y="4" width="3" height="10" rx="1.5" fill="white"/>
    </svg>
);

const WaveformIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <line x1="1" y1="9" x2="1" y2="9" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <line x1="4" y1="6" x2="4" y2="12" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <line x1="7" y1="3" x2="7" y2="15" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="5" x2="10" y2="13" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <line x1="13" y1="7" x2="13" y2="11" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="8" x2="16" y2="10" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const MotionIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L16 9L9 16L2 9Z" fill="#777" opacity="0.9"/>
        <line x1="2" y1="9" x2="16" y2="9" stroke="#555" strokeWidth="1.5"/>
        <circle cx="2" cy="9" r="1.5" fill="#aaa"/>
        <circle cx="16" cy="9" r="1.5" fill="#aaa"/>
    </svg>
);

const devSkills = [
    { icon: <ReactLogo />, name: "React / Next.js" },
    { icon: <TypeScriptLogo />, name: "TypeScript" },
    { icon: <TailwindLogo />, name: "CSS / Tailwind" },
    { icon: <FigmaLogo />, name: "Figma / UI Design" },
    { icon: <NodeLogo />, name: "Node.js / APIs" },
    { icon: <ReactLogo />, name: "React Native" },
];

const editorSkills = [
    { icon: <PremiereLogo />, name: "Premiere Pro" },
    { icon: <AfterEffectsLogo />, name: "After Effects" },
    { icon: <DaVinciLogo />, name: "DaVinci Resolve" },
    { icon: <WaveformIcon />, name: "Sound Design" },
    { icon: <ElevenLabsLogo />, name: "Eleven Labs" },
    { icon: <MotionIcon />, name: "Motion Design" },
];

const modeContent = {
    pt: {
        aboutLabel: "Sobre mim",
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
    },
    en: {
        aboutLabel: "About me",
        dev: {
            title: (<>Code with <em>intention</em> and design with <em>purpose</em></>),
            text: (
                <>
                    I like turning ideas into clear, fast and enjoyable interfaces.
                    <br />
                    I work mainly with React and Next.js, always balancing design, performance and user experience.
                </>
            ),
            skills: devSkills,
        },
        editor: {
            title: (<>Narrative with <em>rhythm</em> and image with <em>emotion</em></>),
            text: (
                <>
                    Every cut is a decision. Every transition is intentional. <br />
                    Always focused on bringing each client vision to life with a unique and engaging touch.
                </>
            ),
            skills: editorSkills,
        },
    },
};

export default function Sobre() {
    const { mode } = useMode();
    const { lang } = useLanguage();
    const c = modeContent[lang][mode];

    return (
        <section className="about" id="sobre">
            <div className="about-left">
                <p className="about-label">{modeContent[lang].aboutLabel}</p>
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
