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
    context: { pt: string; en: string };
    problem: { pt: string; en: string };
    role: { pt: string; en: string };
    solution: { pt: string[]; en: string[] };
    result: { pt: string; en: string };
    caseCtaLabel?: { pt: string; en: string };
    caseLinks?: Array<{ label: { pt: string; en: string }; href: string }>;
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
            en: "Google Play published mobile app for musicians to capture riffs and musical ideas the moment they appear.",
        },
        longDescription: {
            pt: "RiffMaker resolve um problema real: músicos perdem inspirações por não ter uma forma rápida de registrá-las. O app permite gravar, organizar e revisar riffs com zero fricção, do momento de inspiração até o estúdio.",
            en: "RiffMaker solves a real problem and shows product ownership beyond a demo: musicians lose inspiration when capture is slow. The app lets them record, organize and review riffs with low friction, backed by an offline-first mobile flow and Android publishing.",
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
        context: {
            pt: "Produto autoral criado para músicos registrarem ideias sem quebrar o fluxo criativo.",
            en: "Own product created for musicians to capture ideas without breaking creative flow.",
        },
        problem: {
            pt: "Ideias musicais surgem rápido e se perdem quando o músico precisa abrir várias ferramentas, nomear arquivos depois ou depender de internet.",
            en: "Musical ideas appear quickly and get lost when musicians need multiple tools, later file naming or internet access.",
        },
        role: {
            pt: "Concepção de produto, identidade visual, UI mobile, arquitetura offline-first, implementação em React Native/Expo e publicação Android.",
            en: "Product concept, visual identity, mobile UI, offline-first architecture, React Native/Expo implementation, Android publishing and monetization groundwork.",
        },
        solution: {
            pt: [
                "Fluxo Android-first para gravar riffs com baixa fricção.",
                "Persistência local com SQLite para funcionar offline.",
                "Organização por projeto, instrumento e versões.",
                "Base preparada para PRO, backup e evolução contínua do produto.",
            ],
            en: [
                "Android-first flow to record riffs with low friction.",
                "Local persistence with SQLite for offline use.",
                "Organization by project, instrument and versions.",
                "Foundation prepared for PRO, backup and continuous product evolution.",
            ],
        },
        result: {
            pt: "App próprio publicado na Google Play, com identidade de produto, fluxo mobile real e base técnica sustentável para monetização e backup.",
            en: "Own app published on Google Play with product identity, real mobile flows and a sustainable technical base for monetization, backup and continued iteration.",
        },
        caseCtaLabel: { pt: "Ver app publicado", en: "View published app" },
        caseLinks: [
            {
                label: { pt: "Landing do Riff Maker", en: "Riff Maker landing" },
                href: "/riffmaker",
            },
        ],
        coverImage: "/riff-1.jpg",
        images: ["/riff-1.jpg", "/riff-2.jpg", "/riff-3.jpg"],
    },
    {
        slug: "vidalar-saude",
        title: "VidaLar Saúde",
        category: "dev",
        tags: ["Next.js", "UI/UX", "Redesign", "SEO"],
        year: "2025",
        status: "live",
        externalUrl: "https://vida-lar.vercel.app/",
        description: {
            pt: "Redesign de site institucional para uma empresa de cuidados domiciliares, com foco em clareza e conversão.",
            en: "Institutional website redesign for a home care company, focused on clarity and conversion.",
        },
        longDescription: {
            pt: "O projeto reorganizou a presença digital da VidaLar Saúde, trocando uma experiência fragmentada por uma página mais clara, editorial e orientada a contato.",
            en: "The project reorganized VidaLar Saúde's digital presence, replacing a fragmented experience with a clearer, editorial and contact-oriented page.",
        },
        highlights: {
            pt: [
                "Antes/depois com melhoria clara de hierarquia visual",
                "Jornada de serviços mais fácil de entender",
                "CTAs de contato mais fortes",
                "Experiência responsiva e publicada",
            ],
            en: [
                "Before/after with clear visual hierarchy improvement",
                "Service journey made easier to understand",
                "Stronger contact CTAs",
                "Responsive and published experience",
            ],
        },
        context: {
            pt: "Site institucional para uma empresa de saúde domiciliar que precisava parecer mais confiável e facilitar o contato.",
            en: "Institutional website for a home care company that needed to feel more trustworthy and make contact easier.",
        },
        problem: {
            pt: "A versão anterior tinha navegação fragmentada, hierarquia visual datada e pouca força nos caminhos de conversão.",
            en: "The previous version had fragmented navigation, dated visual hierarchy and weak conversion paths.",
        },
        role: {
            pt: "Redesign visual, estrutura de conteúdo, implementação front-end, responsividade e publicação.",
            en: "Visual redesign, content structure, front-end implementation, responsiveness and publishing.",
        },
        solution: {
            pt: [
                "Home mais editorial para explicar serviços com menos ruído.",
                "Comparação antes/depois para tornar o ganho visual evidente.",
                "Cards e CTAs com função clara para orientar contato.",
                "Layout responsivo para leitura rápida em mobile.",
            ],
            en: [
                "More editorial homepage to explain services with less noise.",
                "Before/after comparison to make the visual gain evident.",
                "Cards and CTAs with clear purpose to guide contact.",
                "Responsive layout for quick mobile reading.",
            ],
        },
        result: {
            pt: "Site publicado com experiência mais clara, aparência mais profissional e jornada de contato mais objetiva.",
            en: "Published site with a clearer experience, more professional appearance and a more direct contact journey.",
        },
        caseCtaLabel: { pt: "Ver site atual", en: "View live site" },
        caseLinks: [
            { label: { pt: "Ver site antigo", en: "View legacy site" }, href: "https://vidalarsaude.com.br/" },
        ],
        coverImage: "/vidalar-prints/depois.png",
        images: ["/vidalar-prints/antes.png", "/vidalar-prints/depois.png"],
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
            en: "Portal developed as part of Grupo Multilaser's IT team to centralize reseller operations in production. The work involved interface redesign, internal API integration and usability improvements for a non-technical B2B audience.",
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
        context: {
            pt: "Hub B2B do Grupo Multilaser para revendedores acessarem informações operacionais e suporte.",
            en: "Grupo Multilaser B2B hub for resellers to access operational information and support.",
        },
        problem: {
            pt: "Revendedores precisavam acessar boletos, devoluções e rastreio com menos dependência de suporte manual.",
            en: "Resellers needed to access invoices, returns and tracking with less dependence on manual support.",
        },
        role: {
            pt: "Atuação como front-end na equipe de TI, com redesign de interface, integração com APIs internas e refinamento de usabilidade.",
            en: "Front-end work within the IT team, including interface redesign, internal API integration and usability refinement.",
        },
        solution: {
            pt: [
                "Interface B2B organizada por tarefas recorrentes.",
                "Componentes focados em autosserviço e leitura rápida.",
                "Integração com dados internos para reduzir fricção operacional.",
                "Hierarquia visual mais clara para público não técnico.",
            ],
            en: [
                "B2B interface organized around recurring tasks.",
                "Components focused on self-service and quick scanning.",
                "Internal data integration to reduce operational friction.",
                "Clearer visual hierarchy for a non-technical audience.",
            ],
        },
        result: {
            pt: "Portal em produção, com experiência mais clara para revendedores e base visual mais consistente para serviços B2B.",
            en: "Live production portal with a clearer reseller experience, reduced operational friction and a more consistent visual base for B2B services.",
        },
        caseCtaLabel: { pt: "Ver portal ao vivo", en: "View live portal" },
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
            en: "Multi Notify is an internal Grupo Multilaser platform for managing push and email notification campaigns. The refactor modernized the frontend stack, improved maintainability and brought a clearer operating interface for the marketing team.",
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
        context: {
            pt: "Plataforma interna para gestão de campanhas de notificação no ecossistema corporativo da Multilaser.",
            en: "Internal platform for managing notification campaigns within Multilaser's corporate ecosystem.",
        },
        problem: {
            pt: "O frontend legado dificultava manutenção, clareza de fluxo e evolução de funcionalidades para a equipe responsável.",
            en: "The legacy frontend made maintenance, flow clarity and feature evolution harder for the responsible team.",
        },
        role: {
            pt: "Refatoração front-end, modernização com TypeScript/React, organização de interface e integração com serviços de notificação.",
            en: "Front-end refactor, modernization with TypeScript/React, interface organization and notification service integration.",
        },
        solution: {
            pt: [
                "Migração gradual de telas legadas para uma base React mais previsível.",
                "Dashboard com métricas e estados de campanha mais escaneáveis.",
                "Componentização para reduzir repetição e facilitar manutenção.",
                "Uso de TypeScript para melhorar contratos e segurança de evolução.",
            ],
            en: [
                "Gradual migration from legacy screens to a more predictable React base.",
                "Dashboard with more scannable campaign metrics and states.",
                "Componentization to reduce repetition and ease maintenance.",
                "TypeScript usage to improve contracts and evolution safety.",
            ],
        },
        result: {
            pt: "Fluxo interno mais organizado, interface mais clara para operação e base de código mais sustentável.",
            en: "More organized internal flow, clearer interface for operations and a more sustainable codebase.",
        },
        caseCtaLabel: { pt: "Ver case completo", en: "View full case" },
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
