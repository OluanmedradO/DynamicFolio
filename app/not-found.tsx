import Link from "next/link";
import styles from "./fallback.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.text}>
          O caminho que você tentou acessar não existe ou foi movido.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeBtn}>
            Voltar para a home
          </Link>
        </div>
      </div>
    </main>
  );
}
