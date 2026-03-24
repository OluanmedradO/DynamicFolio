"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import LanguageButtons from "./LanguageButtons";

const copy = {
  pt: {
    title: "Política de Privacidade - Riff Maker",
    back: "Voltar para Riff Maker",
    updated: "Atualizado em: 13 de março de 2026",
    overviewTitle: "Visão Geral",
    overview:
      "O Riff Maker foi desenvolvido para operar sem criação de conta e, por padrão, manter os dados criativos localmente no dispositivo do usuário. Conforme a configuração de cada release, o aplicativo poderá encaminhar dados técnicos limitados a operadores terceirizados utilizados para monitoramento, análise de produto e entrega de atualizações over-the-air (OTA).",
    sections: [
      {
        title: "1. Dados armazenados localmente",
        intro: "No uso padrão, o Riff Maker armazena localmente no dispositivo:",
        bullets: [
          "riffs, nomes de projetos, anotações, BPM, afinações e tags",
          "gravações de áudio criadas no próprio aplicativo",   
          "arquivos de backup selecionados pelo usuário para exportação ou restauração",
          "preferências do app, incluindo idioma e opções de gravação",
        ],
        outro:
          "Não é exigida criação de conta para utilização das funcionalidades principais.",
      },
      {
        title: "2. Dados técnicos que podem ser enviados",
        intro:
          "Quando as integrações estiverem habilitadas na release, o app poderá enviar dados técnicos limitados aos serviços abaixo:",
        bullets: [
          "Sentry: relatórios de falhas (crashes), stack traces, metadados de release/build e diagnósticos de execução",
          "PostHog: eventos de analítica de produto, como visualização de telas, versão do app, número de build, canal de atualização, plataforma e metadados básicos de dispositivo/app",
          "Expo Updates: identificadores de atualização, runtime version e informações de canal necessárias para entrega de OTA compatível",
        ],
        outro:
          "Tais dados são utilizados para aprimorar a confiabilidade, compreender o uso do produto e reduzir riscos em novas publicações. O Riff Maker não comercializa riffs, gravações ou dados pessoais de usuários.",
      },
      {
        title: "3. Permissões",
        intro: "O Riff Maker pode solicitar as seguintes permissões do dispositivo:",
        bullets: [
          "acesso ao microfone, exclusivamente quando o usuário iniciar uma gravação",
          "acesso a arquivos/compartilhamento ao exportar, importar ou compartilhar backups e arquivos de áudio",
        ],
      },
      {
        title: "4. Processadores terceirizados",
        intro: "Dependendo da configuração de build e release, o app poderá utilizar:",
        bullets: [
          "Expo / EAS Update para distribuição do app e atualizações OTA",
          "Sentry para monitoramento de erros e falhas",
          "PostHog para analítica de produto",
        ],
        outro:
          "Se as credenciais ou chaves correspondentes não estiverem configuradas, tais serviços permanecerão desativados.",
      },
      {
        title: "5. Seus controles",
        intro: "O usuário poderá, a qualquer momento:",
        bullets: [
          "excluir conteúdos diretamente no aplicativo",
          "exportar backups dos dados locais",
          "desinstalar o app para remover do dispositivo o conteúdo armazenado localmente",
        ],
      },
      {
        title: "6. Crianças",
        text:
          "O Riff Maker não foi desenvolvido para coletar intencionalmente dados pessoais de crianças.",
      },
      {
        title: "7. Contato",
        text:
          "Antes da publicação oficial em loja, disponibilize um canal formal de atendimento (e-mail de suporte ou página oficial) na listagem do aplicativo e replique essas informações nesta política.",
      },
    ],
  },
  en: {
    title: "Privacy Policy - Riff Maker",
    back: "Back to Riff Maker",
    updated: "Last updated: March 13, 2026",
    overviewTitle: "Overview",
    overview:
      "Riff Maker is designed to work without an account and stores your creative data locally on your device by default. Depending on how a release is configured, the app can also send technical diagnostics and product analytics to third-party processors used for monitoring, analytics, and over-the-air updates.",
    sections: [
      {
        title: "1. Data stored locally",
        intro: "Riff Maker stores the following content locally on your device:",
        bullets: [
          "riffs, project names, notes, BPM, tunings, and tags",
          "audio recordings created inside the app",
          "backup files you choose to export or restore",
          "app preferences such as language and recording options",
        ],
        outro: "You do not need to create an account to use the app.",
      },
      {
        title: "2. Technical data that may be sent",
        intro:
          "When the integrations are configured for a release, the app may send limited technical data to the services below:",
        bullets: [
          "Sentry: crash reports, stack traces, release/build metadata, and runtime diagnostics",
          "PostHog: product analytics events such as screen views, app version, build number, update channel, platform, and basic device/app metadata",
          "Expo Updates: update identifiers, runtime version, and channel information required to deliver compatible OTA updates",
        ],
        outro:
          "This information is used to improve reliability, understand usage, and ship safer releases. We do not sell your riffs, recordings, or personal data.",
      },
      {
        title: "3. Permissions",
        intro: "Riff Maker may request:",
        bullets: [
          "Microphone access, only when you start a recording",
          "File access/sharing permissions when you export, import, or share backups and audio files",
        ],
      },
      {
        title: "4. Third-party processors",
        intro: "Depending on the build configuration, the app may use:",
        bullets: [
          "Expo / EAS Update for app delivery and OTA updates",
          "Sentry for crash and error monitoring",
          "PostHog for product analytics",
        ],
        outro:
          "If the related credentials are not configured, those services remain disabled.",
      },
      {
        title: "5. Your controls",
        intro: "You can:",
        bullets: [
          "delete your content inside the app",
          "export backups of your data",
          "uninstall the app to remove locally stored content from the device",
        ],
      },
      {
        title: "6. Children",
        text: "Riff Maker is not designed to intentionally collect personal data from children.",
      },
      {
        title: "7. Contact",
        text:
          "Before public release, publish an official support email or support page in the store listing and mirror it here.",
      },
    ],
  },
};

export default function PrivacyContent() {
  const { lang } = useLanguage();
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-[#0e0e0f] px-6 py-20 text-[#fafafa] md:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-[var(--font-syne)] text-3xl font-extrabold uppercase md:text-5xl">
            {c.title}
          </h1>
          <div className="flex items-center gap-3">
            <LanguageButtons />
            <Link
              href="/riffmaker"
              className="rounded-full border border-white/15 px-4 py-2 font-[var(--font-dm-mono)] text-xs uppercase tracking-[0.18em] text-[#8a8a9a] transition-colors hover:border-[#e64d4d] hover:text-white"
            >
              {c.back}
            </Link>
          </div>
        </div>

        <p className="mb-10 font-[var(--font-dm-mono)] text-xs uppercase tracking-[0.18em] text-[#8a8a9a]">
          {c.updated}
        </p>

        <article className="space-y-10 rounded-3xl border border-white/10 bg-[#131316] p-6 md:p-10">
          <section className="space-y-3">
            <h2 className="font-[var(--font-syne)] text-2xl font-bold uppercase md:text-3xl">
              {c.overviewTitle}
            </h2>
            <p className="leading-relaxed text-[#c8c8d0]">{c.overview}</p>
          </section>

          {c.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="font-[var(--font-syne)] text-2xl font-bold uppercase md:text-3xl">
                {section.title}
              </h2>
              {"intro" in section && section.intro ? (
                <p className="text-[#c8c8d0]">{section.intro}</p>
              ) : null}
              {"bullets" in section && section.bullets ? (
                <ul className="list-disc space-y-2 pl-6 text-[#c8c8d0] marker:text-[#e64d4d]">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {"outro" in section && section.outro ? (
                <p className="text-[#c8c8d0]">{section.outro}</p>
              ) : null}
              {"text" in section && section.text ? (
                <p className="text-[#c8c8d0]">{section.text}</p>
              ) : null}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
