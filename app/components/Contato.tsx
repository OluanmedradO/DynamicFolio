"use client";

import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { trackEvent } from "../lib/analytics";

const modeContent = {
    pt: {
        dev: {
            titleLine: "Tem um projeto",
            titleEm: "em mente?",
            sub: "Me conta o que você precisa. Sem compromisso. Respondo em até 24h.",
        },
        editor: {
            titleLine: "Vamos contar uma",
            titleEm: "história juntos?",
            sub: "Seja para um projeto de marca, vídeo social, documentário ou reel criativo, estou pronto pra dar vida à sua ideia.",
        },
    },
    en: {
        dev: {
            titleLine: "Have a project",
            titleEm: "in mind?",
            sub: "Tell me what you need. No pressure. I reply within 24h.",
        },
        editor: {
            titleLine: "Let's tell a",
            titleEm: "story together?",
            sub: "Whether for a brand project, social video, documentary or creative reel, I am ready to bring your idea to life.",
        },
    },
};

const formCopy = {
    pt: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        projectType: "Tipo de projeto",
        projectTypePlaceholder: "Selecione...",
        projectTypes: ["Site / landing page", "Dashboard / app", "Vídeo social", "Ambos", "Outro"],
        message: "Mensagem",
        messagePlaceholder: "Qual é o seu projeto? Me dê um contexto básico (pode ser curto).",
        submit: "Quero conversar",
        sending: "Enviando...",
        successTitle: "Recebido.",
        successText: "Já estou lendo a sua mensagem — te respondo em breve com atenção ao que você compartilhou.",
        errorFallback: "Erro ao enviar. Tente novamente.",
        orSeparator: "ou prefere o WhatsApp?",
        whatsapp: "WhatsApp",
        trust: ["Disponível agora", "Resposta em até 24h", "Sem spam"],
        hint: "Respondo em até 24h · Sem compromisso",
    },
    en: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        projectType: "Project type",
        projectTypePlaceholder: "Select...",
        projectTypes: ["Site / landing page", "Dashboard / app", "Social video", "Both", "Other"],
        message: "Message",
        messagePlaceholder: "What is your project? Give me quick context if you want.",
        submit: "Let's talk",
        sending: "Sending...",
        successTitle: "Received.",
        successText: "I am reading your message and will reply soon with attention to what you shared.",
        errorFallback: "Error sending. Please try again.",
        orSeparator: "or prefer WhatsApp?",
        whatsapp: "WhatsApp",
        trust: ["Available now", "Reply within 24h", "No spam"],
        hint: "I reply within 24h · No pressure",
    },
};

const WHATSAPP_NUMBER = "5511945764672";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contato() {
    const { mode } = useMode();
    const { lang } = useLanguage();
    const c = modeContent[lang][mode];
    const f = formCopy[lang];

    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
    const trackedFocusFields = useRef(new Set<string>());

    const whatsappMsg =
        lang === "en"
            ? encodeURIComponent("Hi Luan! I visited your portfolio and have a project that might make sense for you. Can I tell you more?")
            : encodeURIComponent("Oi Luan! Visitei seu portfólio e tenho um projeto que pode fazer sentido pra você. Posso te contar mais?");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFieldFocus = (field: string) => {
        if (trackedFocusFields.current.has(field)) return;
        trackedFocusFields.current.add(field);
        trackEvent("form_field_focus", { field, lang, mode });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error ?? f.errorFallback);
                setStatus("error");
                return;
            }

            setStatus("success");
            trackEvent("contact_form_submit", { lang, mode, projectType: form.projectType });
        } catch {
            setErrorMsg(f.errorFallback);
            setStatus("error");
        }
    };

    return (
        <section className="contact" id="contato">
            <div className="contact-inner">
                <h2 key={`contact-title-${mode}`} className="contact-big-title mode-fade" id="contactTitle">
                    {c.titleLine}
                    <br />
                    <em id="contactTitleEm">{c.titleEm}</em>
                </h2>
                <p key={`contact-sub-${mode}`} className="contact-sub mode-fade" id="contactSub">
                    {c.sub}
                </p>

                <div className="contact-trust" aria-label={lang === "en" ? "Contact expectations" : "Expectativas de contato"}>
                    {f.trust.map((item) => (
                        <span key={item}>{item}</span>
                    ))}
                </div>

                {status === "success" ? (
                    <div className="contact-success">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                        <strong>{f.successTitle}</strong>
                        <p>{f.successText}</p>
                        <button
                            type="button"
                            className="contact-reset-btn"
                            onClick={() => {
                                setStatus("idle");
                                setForm({ name: "", email: "", projectType: "", message: "" });
                                trackedFocusFields.current.clear();
                            }}
                        >
                            {lang === "en" ? "Send another message" : "Enviar outra mensagem"}
                        </button>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <div className="contact-form-row">
                            <div className="contact-form-field">
                                <label htmlFor="cf-name">{f.name}</label>
                                <input
                                    id="cf-name"
                                    name="name"
                                    type="text"
                                    placeholder={f.namePlaceholder}
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={() => handleFieldFocus("name")}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                            <div className="contact-form-field">
                                <label htmlFor="cf-email">{f.email}</label>
                                <input
                                    id="cf-email"
                                    name="email"
                                    type="email"
                                    placeholder={f.emailPlaceholder}
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => handleFieldFocus("email")}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="contact-form-field">
                            <label htmlFor="cf-projectType">{f.projectType}</label>
                            <select
                                id="cf-projectType"
                                name="projectType"
                                value={form.projectType}
                                onChange={handleChange}
                                onFocus={() => handleFieldFocus("projectType")}
                            >
                                <option value="">{f.projectTypePlaceholder}</option>
                                {f.projectTypes.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="contact-form-field">
                            <label htmlFor="cf-message">{f.message}</label>
                            <textarea
                                id="cf-message"
                                name="message"
                                placeholder={f.messagePlaceholder}
                                value={form.message}
                                onChange={handleChange}
                                onFocus={() => handleFieldFocus("message")}
                                required
                                rows={5}
                            />
                        </div>

                        {status === "error" && (
                            <p className="contact-form-error">{errorMsg}</p>
                        )}

                        <button
                            type="submit"
                            className="contact-submit-btn"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? (
                                <>
                                    <span className="contact-spinner" aria-hidden />
                                    {f.sending}
                                </>
                            ) : (
                                <>
                                    {f.submit}
                                    <span className="contact-arrow">→</span>
                                </>
                            )}
                        </button>
                        <p className="contact-submit-hint">{f.hint}</p>
                    </form>
                )}

                <div className="contact-or">
                    <span>{f.orSeparator}</span>
                </div>

                <div className="contact-btns">
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-whatsapp-btn"
                        onClick={() => trackEvent("whatsapp_click", { source: "contact_section", lang, mode })}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>{f.whatsapp}</span>
                        <span className="contact-arrow">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
