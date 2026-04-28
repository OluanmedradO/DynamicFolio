export interface Project {
    slug: string;
    title: string;
    category: "dev" | "editing";
    tags: string[];
    year: string;
    status: "live" | "internal" | "soon";
    externalUrl?: string;
    description: { pt: string; en: string };
    longDescription: { pt: string; en: string };
    highlights: { pt: string[]; en: string[] };
    coverImage: string;
    images?: string[];
}

export const projects: Project[] = [
    {
        slug: "riffmaker",
        title: "Riff Maker",
        category: "dev",
        tags: ["React Native", "Expo", "SQLite", "Reanimated"],
        year: "2025",
        status: "live",
        externalUrl: "https://play.google.com/store/apps/details?id=com.oluanmedrado.riffmaker",
        description: {
            pt: "App mobile para músicos capturarem riffs e ideias musicais no momento em que elas surgem.",
            en: "Mobile app for musicians to capture riffs and musical ideas the moment they appear.",
        },
        longDescription: {
            pt: "RiffMaker resolve um problema real: músicos perdem inspirações por não ter uma forma rápida de registrá-las. O app permite gravar, organizar e revisar riffs com zero fricção — do momento de inspiração até o estúdio.",
            en: "RiffMaker solves a real problem: musicians lose inspiration because there's no quick way to capture it. The app lets you record, organize, and review riffs with zero friction — from the moment of inspiration to the studio.",
        },
        highlights: {
            pt: [
                "Gravação de áudio com waveform em tempo real",
                "Organização por projeto e instrumento",
                "Banco de dados local com SQLite para uso offline",
                "Animações fluidas com Reanimated 3",
            ],
            en: [
                "Audio recording with real-time waveform",
                "Organization by project and instrument",
                "Local SQLite database for offline use",
                "Fluid animations with Reanimated 3",
            ],
        },
        coverImage: "/riff-1.jpg",
        images: ["/riff-1.jpg", "/riff-2.jpg", "/riff-3.jpg"],
    },
    {
        slug: "revendedor-multilaser",
        title: "Portal do Revendedor Multilaser",
        category: "dev",
        tags: ["React", "TypeScript", "B2B", "UI/UX"],
        year: "2024",
        status: "live",
        externalUrl: "https://revendedor.grupomultilaser.com.br/",
        description: {
            pt: "Hub de acesso B2B para boletos, devoluções e rastreio de pedidos do Grupo Multilaser.",
            en: "B2B access hub for invoices, returns, and order tracking for Grupo Multilaser.",
        },
        longDescription: {
            pt: "Portal desenvolvido como parte da equipe de TI do Grupo Multilaser para centralizar operações de revendedores. O projeto envolveu redesign completo da interface, integração com APIs internas e foco em usabilidade para um público não-técnico.",
            en: "Portal developed as part of Grupo Multilaser's IT team to centralize reseller operations. The project involved a complete interface redesign, integration with internal APIs, and a focus on usability for a non-technical audience.",
        },
        highlights: {
            pt: [
                "Redesign completo da interface de acesso B2B",
                "Integração com APIs internas da Multilaser",
                "Foco em acessibilidade e usabilidade",
                "Suporte a múltiplos perfis de revendedor",
            ],
            en: [
                "Complete redesign of the B2B access interface",
                "Integration with Multilaser's internal APIs",
                "Focus on accessibility and usability",
                "Support for multiple reseller profiles",
            ],
        },
        coverImage: "/revendedor-prints/revendedor.png",
        images: ["/revendedor-prints/revendedor.png"],
    },
    {
        slug: "multi-notify",
        title: "Multi Notify",
        category: "dev",
        tags: ["React", "TypeScript", "Tailwind CSS"],
        year: "2024",
        status: "internal",
        description: {
            pt: "Refatoração completa do frontend B2B focado em gestão e disparo de notificações.",
            en: "Complete B2B frontend refactor focused on notification management and dispatch.",
        },
        longDescription: {
            pt: "Multi Notify é uma plataforma interna do Grupo Multilaser para gerenciamento de campanhas de notificação push e email. A refatoração modernizou a stack técnica, melhorou a performance e trouxe uma interface mais clara para a equipe de marketing.",
            en: "Multi Notify is an internal Grupo Multilaser platform for managing push and email notification campaigns. The refactor modernized the tech stack, improved performance, and brought a cleaner interface for the marketing team.",
        },
        highlights: {
            pt: [
                "Migração de JavaScript legado para TypeScript + React moderno",
                "Dashboard de métricas de entrega e abertura",
                "Integração com serviços de notificação push",
                "Design system interno com Tailwind CSS",
            ],
            en: [
                "Migration from legacy JavaScript to modern TypeScript + React",
                "Delivery and open-rate metrics dashboard",
                "Integration with push notification services",
                "Internal design system with Tailwind CSS",
            ],
        },
        coverImage: "/notify-prints/dashboard.png",
        images: ["/notify-prints/dashboard.png"],
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
    return projects.filter((p) => p.category === category);
}
