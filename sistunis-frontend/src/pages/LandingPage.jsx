// File: src/pages/LandingPage.jsx

// Import semua komponen landing
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ProgramSection from '../components/landing/ProgramSection';
import NewsSection from '../components/landing/NewsSection';
import CtaSection from '../components/landing/CtaSection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        // Gunakan <main> atau <div> sebagai wrapper jika perlu padding global
        <>
            <Navbar />
            <main>
                <HeroSection />
                <ProgramSection />
                <NewsSection />
            </main>
            <CtaSection />
            <Footer />
        </>
    );
};
export default LandingPage;