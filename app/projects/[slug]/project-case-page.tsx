import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/app/lib/projects";
import { localizePath } from "@/app/lib/locale";
import styles from "./project.module.css";

interface Props {
    params: Promise<{ slug: string }>;
}

type CaseLanguage = "pt" | "en";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export async function generateProjectMetadata({ params }: Props, lang: CaseLanguage): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};
    const path = `/projects/${slug}`;
    const localizedPath = localizePath(path, lang);
    return {
        title: project.title,
        description: project.description[lang],
        alternates: {
            canonical: `${BASE_URL}${localizedPath}`,
            languages: {
                "pt-BR": `${BASE_URL}${path}`,
                "en-US": `${BASE_URL}${localizePath(path, "en")}`,
            },
        },
        openGraph: {
            title: `${project.title} | Luan Medrado`,
            description: project.description[lang],
            locale: lang === "en" ? "en_US" : "pt_BR",
            alternateLocale: lang === "en" ? "pt_BR" : "en_US",
            url: `${BASE_URL}${localizedPath}`,
            images: [{ url: project.coverImage, width: 1200, height: 630 }],
        },
    };
}

export async function ProjectCasePage({ params, lang = "pt" }: Props & { lang?: CaseLanguage }) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    const statusLabel = {
        live: { pt: "Em produção", en: "Live", color: "#22c55e" },
        internal: { pt: "Projeto interno", en: "Internal", color: "#f59e0b" },
        soon: { pt: "Em breve", en: "Coming soon", color: "#60a5fa" },
    }[project.status];

    const labels = {
        pt: {
            projects: "Projetos",
            year: "Ano",
            status: "Status",
            area: "Área",
            devArea: "Desenvolvimento",
            editingArea: "Edição",
            liveFallback: "Ver projeto ao vivo",
            context: "Contexto",
            problem: "Problema",
            role: "Meu papel",
            result: "Resultado",
            about: "Sobre o projeto",
            decisions: "Decisões de design/engenharia",
            stack: "Stack",
            highlights: "Destaques",
            allProjects: "Ver todos os projetos",
            contact: "Fale comigo",
        },
        en: {
            projects: "Projects",
            year: "Year",
            status: "Status",
            area: "Area",
            devArea: "Development",
            editingArea: "Editing",
            liveFallback: "View live project",
            context: "Context",
            problem: "Problem",
            role: "My role",
            result: "Result",
            about: "About the project",
            decisions: "Product and engineering decisions",
            stack: "Stack",
            highlights: "Highlights",
            allProjects: "View all projects",
            contact: "Contact me",
        },
    }[lang];

    const imageAltBySlug: Record<string, { pt: string; en: string }> = {
        riffmaker: {
            pt: "Screenshot do app Riff Maker na tela de ideias",
            en: "Screenshot of the Riff Maker app ideas screen",
        },
        "vidalar-saude": {
            pt: "Antes e depois do redesign VidaLar Saúde",
            en: "Before and after of the VidaLar Saúde redesign",
        },
        "revendedor-multilaser": {
            pt: "Interface do Portal do Revendedor Multilaser",
            en: "Interface of the Multilaser reseller portal",
        },
        "multi-notify": {
            pt: "Dashboard do projeto Multi Notify",
            en: "Dashboard of the Multi Notify project",
        },
    };
    const coverAlt = imageAltBySlug[project.slug]?.[lang] ?? (lang === "en" ? `${project.title} project image` : `Imagem do projeto ${project.title}`);
    const devHref = localizePath("/dev", lang);
    const homeHref = localizePath("/", lang);
    const contactHref = `${homeHref === "/" ? "" : homeHref}/#contato`;

    return (
        <main className={styles.page}>
            <nav className={styles.topnav}>
                <Link href={devHref} className={styles.backLink}>
                    <span aria-hidden>←</span>
                    <span>{labels.projects}</span>
                </Link>
                <Link href={homeHref} className={styles.logo}>
                    oluanmedrado<span>.com</span>
                </Link>
            </nav>

            <header className={styles.hero}>
                <div className={styles.heroBadges}>
                    {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>

                <h1 className={styles.title}>{project.title}</h1>

                <p className={styles.description}>{project.description[lang]}</p>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <span className={styles.metaLabel}>{labels.year}</span>
                        <span>{project.year}</span>
                    </span>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaItem}>
                        <span className={styles.metaLabel}>{labels.status}</span>
                        <span style={{ color: statusLabel.color }}>{statusLabel[lang]}</span>
                    </span>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaItem}>
                        <span className={styles.metaLabel}>{labels.area}</span>
                        <span>{project.category === "dev" ? labels.devArea : labels.editingArea}</span>
                    </span>
                </div>

                {project.externalUrl && (
                    <Link href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                        {project.caseCtaLabel?.[lang] ?? labels.liveFallback} <span>↗</span>
                    </Link>
                )}
            </header>

            <div className={styles.coverWrap}>
                <Image
                    src={project.coverImage}
                    alt={coverAlt}
                    fill
                    sizes="100vw"
                    className={styles.coverImg}
                    priority
                />
                <div className={styles.coverOverlay} />
            </div>

            <div className={styles.content}>
                <div className={styles.contentGrid}>
                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.context}</p>
                        <p className={styles.body}>{project.context[lang]}</p>
                    </section>

                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.problem}</p>
                        <p className={styles.body}>{project.problem[lang]}</p>
                    </section>

                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.role}</p>
                        <p className={styles.body}>{project.role[lang]}</p>
                    </section>

                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.result}</p>
                        <p className={styles.body}>{project.result[lang]}</p>
                    </section>
                </div>

                <div className={styles.caseNarrative}>
                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.about}</p>
                        <p className={styles.body}>{project.longDescription[lang]}</p>
                    </section>

                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.decisions}</p>
                        <ul className={styles.highlights}>
                            {project.solution[lang].map((h) => (
                                <li key={h}>{h}</li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.stack}</p>
                        <div className={styles.stackList}>
                            {project.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>{labels.highlights}</p>
                        <ul className={styles.highlights}>
                            {project.highlights[lang].map((h) => (
                                <li key={h}>{h}</li>
                            ))}
                        </ul>
                    </section>
                </div>

                {project.caseLinks && project.caseLinks.length > 0 && (
                    <div className={styles.caseLinks}>
                        {project.caseLinks.map((link) => (
                            <Link key={link.href} href={link.href.startsWith("http") ? link.href : localizePath(link.href, lang)} className={styles.caseLink} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                                {link.label[lang]} <span>↗</span>
                            </Link>
                        ))}
                    </div>
                )}

                {project.images && project.images.length > 1 && (
                    <section className={styles.gallery}>
                        {project.images.map((src, i) => (
                            <div key={i} className={styles.galleryItem}>
                                <Image
                                    src={src}
                                    alt={lang === "en" ? `${coverAlt} - image ${i + 1}` : `${coverAlt} - imagem ${i + 1}`}
                                    fill
                                    sizes="(min-width: 900px) 50vw, 90vw"
                                    className={styles.galleryImg}
                                />
                            </div>
                        ))}
                    </section>
                )}

                {slug === "vidalar-saude" && (
                    <section className={styles.videoSection}>
                        <p className={styles.sectionLabel}>
                            {lang === "en" ? "SITE IN MOTION" : "SITE EM MOVIMENTO"}
                        </p>
                        <h3 className={styles.videoSectionTitle}>
                            {lang === "en"
                                ? "A clearer experience from first impression to contact."
                                : "Uma experiência mais clara do início ao contato."}
                        </h3>
                        <p className={styles.body}>
                            {lang === "en"
                                ? "The redesign reorganizes navigation, highlights services, and makes contact paths more visible across a responsive experience."
                                : "O redesign reorganiza a navegação, valoriza os serviços e deixa os caminhos de contato mais evidentes em uma experiência responsiva."}
                        </p>
                        <div className={styles.videoFrame}>
                            <video
                                muted
                                playsInline
                                preload="none"
                                controls
                                poster="/vidalar-prints/depois.png"
                                aria-label={lang === "en" ? "VidaLar Saúde redesign walkthrough" : "Walkthrough do redesign VidaLar Saúde"}
                            >
                                <source src="/vidalar-redesign-preview.optimized.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </section>
                )}
            </div>

            <footer className={styles.footer}>
                <Link href={devHref} className={styles.backLink}>
                    <span aria-hidden>←</span>
                    <span>{labels.allProjects}</span>
                </Link>
                <Link href={contactHref} className={styles.contactLink}>
                    {labels.contact} →
                </Link>
            </footer>
        </main>
    );
}
