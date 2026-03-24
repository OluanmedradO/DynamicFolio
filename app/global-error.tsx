"use client";

import Link from "next/link";
import styles from "./fallback.module.css";

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  return (
    <html lang="pt-BR">
      <body>
        <main className={styles.page}>
          <div className={styles.panel}>
            <p className={styles.code}>Erro global</p>
            <h1 className={styles.title}>Falha ao carregar a aplicacao</h1>
            <p className={styles.text}>
              Tente recarregar a pagina ou voltar para a home para continuar navegando.
            </p>
            <div className={styles.actions}>
              <button type="button" onClick={reset} className={styles.retryBtn}>
                Recarregar
              </button>
              <Link href="/" className={styles.homeBtn}>
                Voltar para a home
              </Link>
            </div>
            {error?.digest ? <p className={styles.digest}>Ref: {error.digest}</p> : null}
          </div>
        </main>
      </body>
    </html>
  );
}
