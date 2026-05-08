import HomePage from "./components/HomePage";

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luan Medrado",
    url: "https://oluanmedrado.com",
    jobTitle: "Frontend Developer & Video Editor",
    sameAs: [
        "https://github.com/oluanmemo",
        "https://www.linkedin.com/in/oluanmedrado/",
    ],
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <HomePage />
        </>
    );
}
