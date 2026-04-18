import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProject, projects } from "@/app/lib/projects";
import styles from "./project.module.css";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};
    return {
        title: project.title,
        description: project.description.pt,
        openGraph: {
            title: `${project.title} | Luan Medrado`,
            description: project.description.pt,
            images: [{ url: project.coverImage, width: 1200, height: 630 }],
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    const statusLabel = {
        live: { pt: "Em produção", en: "Live", color: "#22c55e" },
        internal: { pt: "Projeto interno", en: "Internal", color: "#f59e0b" },
        soon: { pt: "Em breve", en: "Coming soon", color: "#60a5fa" },
    }[project.status];

    return (
        <main className={styles.page}>
            <nav className={styles.topnav}>
                <Link href="/dev" className={styles.backLink}>
                    <span aria-hidden>←</span>
                    <span>Projetos</span>
                </Link>
                <Link href="/" className={styles.logo}>
                    luanmedrado<span>.</span>
                </Link>
            </nav>

            <header className={styles.hero}>
                <div className={styles.heroBadges}>
                    {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>

                <h1 className={styles.title}>{project.title}</h1>

                <p className={styles.description}>{project.description.pt}</p>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <span className={styles.metaLabel}>Ano</span>
                        <span>{project.year}</span>
                    </span>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaItem}>
                        <span className={styles.metaLabel}>Status</span>
                        <span style={{ color: statusLabel.color }}>{statusLabel.pt}</span>
                    </span>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaItem}>
                        <span className={styles.metaLabel}>Área</span>
                        <span>{project.category === "dev" ? "Desenvolvimento" : "Edição"}</span>
                    </span>
                </div>

                {project.externalUrl && (
                    <Link href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                        Ver projeto ao vivo <span>↗</span>
                    </Link>
                )}
            </header>

            <div className={styles.coverWrap}>
                <Image
                    src={project.coverImage}
                    alt={project.title}
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
                        <p className={styles.sectionLabel}>Sobre o projeto</p>
                        <p className={styles.body}>{project.longDescription.pt}</p>
                    </section>

                    <section className={styles.section}>
                        <p className={styles.sectionLabel}>Destaques</p>
                        <ul className={styles.highlights}>
                            {project.highlights.pt.map((h) => (
                                <li key={h}>{h}</li>
                            ))}
                        </ul>
                    </section>
                </div>

                {project.images && project.images.length > 1 && (
                    <section className={styles.gallery}>
                        {project.images.map((src, i) => (
                            <div key={i} className={styles.galleryItem}>
                                <Image
                                    src={src}
                                    alt={`${project.title} — screenshot ${i + 1}`}
                                    fill
                                    sizes="(min-width: 900px) 50vw, 90vw"
                                    className={styles.galleryImg}
                                />
                            </div>
                        ))}
                    </section>
                )}
            </div>

            <footer className={styles.footer}>
                <Link href="/dev" className={styles.backLink}>
                    <span aria-hidden>←</span>
                    <span>Ver todos os projetos</span>
                </Link>
                <Link href="/#contato" className={styles.contactLink}>
                    Fale comigo →
                </Link>
            </footer>
        </main>
    );
}
