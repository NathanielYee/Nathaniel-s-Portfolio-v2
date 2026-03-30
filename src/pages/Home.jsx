import { Navbar } from "../components/Navbar";
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { QuantBackground } from '@/components/QuantBackground';
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { SectionDivider } from "../components/SectionDivider";
import { Toaster } from "../components/ui/toaster";

export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Background Theme*/}
        <InteractiveBackground/>
        <QuantBackground/>
        {/* Nav Bar*/}
        <Navbar/>
        {/* Main Content*/}
        <main>
            <HeroSection />
            <SectionDivider variant="glow" />
            <AboutSection />
            <SectionDivider variant="glow" />
            <SkillsSection />
            <SectionDivider variant="glow" />
            <ProjectsSection />
            <SectionDivider variant="glow" />
            <ContactSection />
            <Toaster />
        </main>
        <Footer />
    </div>
};