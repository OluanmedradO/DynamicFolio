import type { Metadata } from "next";
import { projects } from "@/app/lib/projects";
import { generateProjectMetadata, ProjectCasePage } from "./project-case-page";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    return generateProjectMetadata(props, "pt");
}

export default async function ProjectPage(props: Props) {
    return <ProjectCasePage {...props} lang="pt" />;
}
