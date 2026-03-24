"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./fallback.module.css";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <p className={styles.code}>500</p>
        <h1 className={styles.title}>Algo deu errado</h1>
        <p className={styles.text}>
          Ocorreu um erro inesperado. Voce pode tentar novamente ou voltar para a home.
        </p>
        <div className={styles.actions}>
          <button type="button" onClick={reset} className={styles.retryBtn}>
            Tentar novamente
          </button>
          <Link href="/" className={styles.homeBtn}>
            Voltar para a home
          </Link>
        </div>
      </div>
    </main>
  );
}
