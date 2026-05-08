import { Resend } from "resend";
import { NextResponse } from "next/server";

// Internal error codes — logged server-side only, never sent to the client
const ERR = {
    MISSING_API_KEY: "MISSING_RESEND_API_KEY",
    SEND_FAILED:     "RESEND_SEND_FAILED",
    VALIDATION:      "VALIDATION_FAILED",
    UNKNOWN:         "UNKNOWN_ERROR",
} as const;

// Production: set CONTACT_FROM_EMAIL=Luan Portfolio <contato@oluanmedrado.com>
// oluanmedrado.com is already verified in Resend with SPF + DKIM.
// onboarding@resend.dev is used ONLY as a local/dev fallback —
// it cannot deliver to arbitrary inboxes and must never be used in production.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "oluanmedrado@gmail.com";

const MAX_MESSAGE_LENGTH = 3000;
const MAX_URL_COUNT = 4;

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);

    if (!body) {
        return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { name, email, projectType, message, website, _filledAt } = body as {
        name: string;
        email: string;
        projectType: string;
        message: string;
        website?: string;
        _filledAt?: number;
    };

    // Honeypot — bots fill hidden fields; humans leave them empty
    if (website) {
        return NextResponse.json({ success: true });
    }

    // Minimum fill time: reject submissions completed in under 2 seconds
    const fillTime = typeof _filledAt === "number" ? Date.now() - _filledAt : Infinity;
    if (fillTime < 2000) {
        return NextResponse.json({ success: true });
    }

    const nameValue = name?.trim() ?? "";
    const emailValue = email?.trim() ?? "";
    const projectTypeValue = projectType?.trim() ?? "";
    const messageValue = message?.trim() ?? "";

    if (!nameValue || !emailValue || !messageValue) {
        console.warn(`[contact] ${ERR.VALIDATION}: missing required fields`);
        return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        console.warn(`[contact] ${ERR.VALIDATION}: invalid email format`);
        return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    if (messageValue.length > MAX_MESSAGE_LENGTH) {
        console.warn(`[contact] ${ERR.VALIDATION}: message too long (${messageValue.length} chars)`);
        return NextResponse.json({ error: "Mensagem muito longa." }, { status: 400 });
    }

    const urlCount = (messageValue.match(/https?:\/\//gi) ?? []).length;
    if (urlCount > MAX_URL_COUNT) {
        console.warn(`[contact] ${ERR.VALIDATION}: too many URLs (${urlCount})`);
        return NextResponse.json({ success: true });
    }

    const safeName = escapeHtml(nameValue);
    const safeEmail = escapeHtml(emailValue);
    const safeProjectType = escapeHtml(projectTypeValue);
    const safeMessage = escapeHtml(messageValue);

    try {
        if (!process.env.RESEND_API_KEY) {
            console.error(
                `[contact] ${ERR.MISSING_API_KEY}:`,
                "Add RESEND_API_KEY in Vercel → Project Settings → Environment Variables.",
            );
            return NextResponse.json({ error: "Envio indisponivel no momento." }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error: resendError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: emailValue,
            subject: `[Portfolio] ${projectTypeValue ? `${projectTypeValue} — ` : ""}${nameValue}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f0f0f0; border-radius: 8px;">
                    <h2 style="color: #e03030; font-size: 20px; margin: 0 0 24px;">Nova mensagem do portfólio</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Nome</td>
                            <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px;">${safeName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td>
                            <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px;">
                                <a href="mailto:${safeEmail}" style="color: #e03030;">${safeEmail}</a>
                            </td>
                        </tr>
                        ${projectTypeValue ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-size: 13px;">Tipo</td>
                            <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px;">${safeProjectType}</td>
                        </tr>
                        ` : ""}
                    </table>
                    <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
                    <p style="color: #f0f0f0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
                </div>
            `,
        });

        if (resendError) {
            console.error(`[contact] ${ERR.SEND_FAILED}:`, {
                name: resendError.name,
                message: resendError.message,
                from: FROM_EMAIL,
                to: TO_EMAIL,
                senderEmail: emailValue,
                hint: FROM_EMAIL.includes("onboarding@resend.dev")
                    ? "Using test sender — set CONTACT_FROM_EMAIL to a verified domain address for production."
                    : "Check that the sender domain is verified in Resend (SPF + DKIM).",
            });
            return NextResponse.json({ error: "Erro ao enviar mensagem. Tente novamente." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(`[contact] ${ERR.UNKNOWN}:`, err instanceof Error ? err.message : err);
        return NextResponse.json({ error: "Erro ao enviar mensagem. Tente novamente." }, { status: 500 });
    }
}
