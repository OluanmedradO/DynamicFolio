"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { trackEvent } from "../lib/analytics";

const CONTACT_EMAIL = "luanmedradooliveira@gmail.com";
const COPIED_RESET_DELAY = 2200;
const CLIPBOARD_WRITE_TIMEOUT = 600;

const modeContent = {
    pt: {
        dev: {
            titleLine: "Tem um projeto",
            titleEm: "em mente?",
            sub: "Posso ajudar com sites, interfaces e apps mobile com acabamento profissional. Respondo com disponibilidade, próximos passos e uma estimativa inicial.",
        },
        editor: {
            titleLine: "Me manda",
            titleEm: "seu vídeo",
            sub: "Envie link do canal, tipo de vídeo e prazo. Te respondo com ideia + orçamento. Pode mandar mesmo sem ideia clara, eu te ajudo a definir o melhor formato. Se fizer sentido, já te passo próximos passos.",
        },
    },
    en: {
        dev: {
            titleLine: "Hiring remotely",
            titleEm: "or starting a build?",
            sub: "Send the role, project or scope. I reply with availability, fit, next steps and the clearest way to evaluate the work.",
        },
        editor: {
            titleLine: "Send me",
            titleEm: "your video",
            sub: "Send the channel link, video type and deadline. I reply with an idea + quote. You can reach out even without a clear plan, and I help you define the best format. If it makes sense, I send the next steps.",
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
        projectTypes: ["YouTube", "Reels / Shorts", "Vídeo social", "Pacote recorrente", "Outro"],
        message: "Mensagem",
        messagePlaceholder: "Link do canal, tipo de vídeo, prazo e qualquer referência.",
        submit: "Enviar briefing",
        sending: "Enviando...",
        successTitle: "Recebido.",
        successText: "Já estou lendo a sua mensagem; te respondo em breve com atenção ao que você compartilhou.",
        errorFallback: "Erro ao enviar. Tente novamente.",
        hint: "Resposta rápida · Foco em retenção · Sem compromisso",
        copy: "Copiar e-mail",
        copied: "E-mail copiado",
        copyAria: "Copiar endereço de e-mail",
        fallbackPrefix: "Se o botão não abrir, copie:",
        gmailCta: "Abrir no Gmail →",
        trust: ["Resposta em até 24h", "Ideia + orçamento", "Sem compromisso"],
    },
    en: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        projectType: "Project type",
        projectTypePlaceholder: "Select...",
        projectTypes: ["YouTube video", "Reels / Shorts", "Social video", "Recurring package", "Other"],
        message: "Message",
        messagePlaceholder: "Channel link, video type, deadline and any reference.",
        submit: "Send brief",
        sending: "Sending...",
        successTitle: "Received.",
        successText: "I am reading your message and will reply soon with attention to what you shared.",
        errorFallback: "Error sending. Please try again.",
        hint: "Fast reply · Retention focus · No commitment",
        copy: "Copy email",
        copied: "Email copied",
        copyAria: "Copy email address",
        fallbackPrefix: "If the button does not open, copy:",
        gmailCta: "Open in Gmail →",
        trust: ["Reply within 24h", "Idea + quote", "No commitment"],
    },
};

const devFormCopy = {
    pt: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        projectType: "Tipo de projeto",
        projectTypePlaceholder: "Selecione...",
        projectTypes: ["Site / landing page", "Interface web", "App / produto", "Projeto digital", "Outro"],
        message: "Mensagem",
        messagePlaceholder: "Objetivo do projeto, prazo, referências e o que precisa converter melhor.",
        submit: "Enviar projeto",
        sending: "Enviando...",
        successTitle: "Recebido.",
        successText: "Já estou lendo a sua mensagem; te respondo em breve com atenção ao que você compartilhou.",
        errorFallback: "Erro ao enviar. Tente novamente.",
        hint: "Resposta objetiva · Próximos passos claros",
        copy: "Copiar e-mail",
        copied: "E-mail copiado",
        copyAria: "Copiar endereço de e-mail",
        fallbackPrefix: "Se o botão não abrir, copie:",
        gmailCta: "Abrir no Gmail →",
        trust: ["Performance", "Clareza", "Conversão"],
    },
    en: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        projectType: "Project type",
        projectTypePlaceholder: "Select...",
        projectTypes: ["Website / landing page", "Web interface", "App / product", "Digital project", "Other"],
        message: "Message",
        messagePlaceholder: "Project goal, deadline, references and what needs to convert better.",
        submit: "Send project",
        sending: "Sending...",
        successTitle: "Received.",
        successText: "I am reading your message and will reply soon with attention to what you shared.",
        errorFallback: "Error sending. Please try again.",
        hint: "Clear reply · Clear next steps",
        copy: "Copy email",
        copied: "Email copied",
        copyAria: "Copy email address",
        fallbackPrefix: "If the button does not open, copy:",
        gmailCta: "Open in Gmail →",
        trust: ["Performance", "Clarity", "Conversion"],
    },
};

type FormStatus = "idle" | "loading" | "success" | "error";

async function writeEmailToClipboard() {
    if (navigator.clipboard?.writeText) {
        try {
            const didCopy = await Promise.race([
                navigator.clipboard.writeText(CONTACT_EMAIL).then(() => true),
                new Promise<boolean>((resolve) => {
                    window.setTimeout(() => resolve(false), CLIPBOARD_WRITE_TIMEOUT);
                }),
            ]);
            if (didCopy) {
                return true;
            }
        } catch {
            // Fall back to the legacy copy path below.
        }
    }

    const textarea = document.createElement("textarea");
    textarea.value = CONTACT_EMAIL;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    const didCopy = document.execCommand("copy");
    document.body.removeChild(textarea);
    return didCopy;
}

export default function Contato() {
    const { mode } = useMode();
    const { lang } = useLanguage();
    const c = modeContent[lang][mode];
    const f = mode === "dev" ? devFormCopy[lang] : formCopy[lang];

    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
    const [fieldErrors, setFieldErrors] = useState({ name: "", email: "" });
    const [copied, setCopied] = useState(false);
    const trackedFocusFields = useRef(new Set<string>());
    const copiedResetTimer = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (copiedResetTimer.current) {
                window.clearTimeout(copiedResetTimer.current);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (name === "name" || name === "email") {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleFieldFocus = (field: string) => {
        if (trackedFocusFields.current.has(field)) return;
        trackedFocusFields.current.add(field);
        trackEvent("form_field_focus", { field, lang, mode });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        const nameError = form.name.trim() === "" ? (lang === "en" ? "Name is required." : "Nome é obrigatório.") : "";
        const emailError = !form.email.includes("@") || form.email.trim() === "" ? (lang === "en" ? "Enter a valid email." : "Insira um email válido.") : "";

        if (nameError || emailError) {
            setFieldErrors({ name: nameError, email: emailError });
            return;
        }

        setStatus("loading");

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

    const handleCopyEmail = () => {
        void writeEmailToClipboard();
        setCopied(true);
        trackEvent("email_copy_click", { source: "contact_section", lang, mode });

        if (copiedResetTimer.current) {
            window.clearTimeout(copiedResetTimer.current);
        }

        copiedResetTimer.current = window.setTimeout(() => {
            setCopied(false);
        }, COPIED_RESET_DELAY);
    };

    return (
        <section className="contact" id="contato">
            <div className="contact-inner">
                <div className="contact-copy">
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
                </div>

                <div className="contact-panel">
                    {status === "success" ? (
                        <div className="contact-success">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                                    setFieldErrors({ name: "", email: "" });
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
                                        aria-describedby={fieldErrors.name ? "cf-name-err" : undefined}
                                        aria-invalid={fieldErrors.name ? "true" : undefined}
                                    />
                                    {fieldErrors.name && <span id="cf-name-err" className="contact-field-error" role="alert">{fieldErrors.name}</span>}
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
                                        aria-describedby={fieldErrors.email ? "cf-email-err" : undefined}
                                        aria-invalid={fieldErrors.email ? "true" : undefined}
                                    />
                                    {fieldErrors.email && <span id="cf-email-err" className="contact-field-error" role="alert">{fieldErrors.email}</span>}
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

                    <div className="contact-email-options" aria-label={lang === "en" ? "Email fallback options" : "Opções alternativas de e-mail"}>
                        <button
                            type="button"
                            className="contact-copy-btn"
                            aria-label={f.copyAria}
                            onClick={handleCopyEmail}
                        >
                            {copied ? f.copied : f.copy}
                        </button>
                        <a
                            href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent("Portfolio Contact")}`}
                            className="contact-gmail-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("gmail_link_click", { source: "contact_section", lang, mode })}
                        >
                            {f.gmailCta}
                        </a>
                        <p className="contact-email-fallback">
                            {f.fallbackPrefix} <span>{CONTACT_EMAIL}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
