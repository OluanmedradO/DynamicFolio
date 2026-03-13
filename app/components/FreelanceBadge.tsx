"use client";

export default function FreelanceBadge() {
    return (
        <a
            href="#contato"
            className="freelance-badge"
            id="freelanceBadge"
            onClick={(event) => {
                const contato = document.getElementById("contato");
                if (!contato) return;

                event.preventDefault();
                contato.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
        >
            <span className="freelance-dot"></span>
            <span className="freelance-text">
                Disponível para Projetos
            </span>
            <span className="freelance-arrow">↗</span>
        </a>
    );
}
