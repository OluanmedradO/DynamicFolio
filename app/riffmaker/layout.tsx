import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riff Maker | App autoral para músicos",
  description:
    "Riff Maker é um app mobile autoral criado por Luan Medrado para músicos capturarem riffs, ideias e versões com fluxo offline-first.",
};

export default function RiffMakerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
