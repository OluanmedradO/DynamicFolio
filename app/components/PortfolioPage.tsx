import Contato from "../components/Contato";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import ScrollObserver from "../components/ScrollObserver";
import Sobre from "../components/Sobre";
import TechStrip from "../components/TechStrip";
import VidaLar from "../components/VidaLar";

export default function PortfolioPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between w-full">
            <ScrollObserver />
            <Navbar />
            <div className="w-full">
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
