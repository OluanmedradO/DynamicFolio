import { projects } from "@/app/lib/projects";
import { generateProjectMetadata, ProjectCasePage } from "../../../projects/[slug]/project-case-page";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props) {
    return generateProjectMetadata(props, "en");
}

export default async function EnglishProjectPage(props: Props) {
    return <ProjectCasePage {...props} lang="en" />;
}
