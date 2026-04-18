import Contato from "../components/Contato";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import ScrollObserver from "../components/ScrollObserver";
import Sobre from "../components/Sobre";
import TechStrip from "../components/TechStrip";
import VidaLar from "../components/VidaLar";
import styles from "./PortfolioPage.module.css";

export default function PortfolioPage() {
    return (
        <main className={styles.main}>
            <ScrollObserver />
            <Navbar />
            <div className={styles.content}>
                <Hero />
                <TechStrip />
                <Sobre />
                <Projects />
                <VidaLar />
                <Contato />
                <Footer />
            </div>
        </main>
    );
}
