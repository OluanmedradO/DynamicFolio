import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "luanmedradooliveira@gmail.com";

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);

    if (!body) {
        return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { name, email, projectType, message } = body as {
        name: string;
        email: string;
        projectType: string;
        message: string;
    };

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: TO_EMAIL,
            replyTo: email,
            subject: `[Portfolio] ${projectType ? `${projectType} — ` : ""}${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f0f0f0; border-radius: 8px;">
                    <h2 style="color: #e03030; font-size: 20px; margin: 0 0 24px;">Nova mensagem do portfólio</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Nome</td>
                            <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td>
                            <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px;">
                                <a href="mailto:${email}" style="color: #e03030;">${email}</a>
                            </td>
                        </tr>
                        ${projectType ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-size: 13px;">Tipo</td>
                            <td style="padding: 8px 0; color: #f0f0f0; font-size: 14px;">${projectType}</td>
                        </tr>
                        ` : ""}
                    </table>
                    <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
                    <p style="color: #f0f0f0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Erro ao enviar mensagem. Tente novamente." }, { status: 500 });
    }
}
