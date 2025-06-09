import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from '@/components/StarBackground';
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";

export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">  
        {/* Theme Toggle*/}
        <ThemeToggle className="fixed top-5 right-5 z-[60] p-2 rounded-full transition-colors duration-300 focus:outline-none md:top-8 md:right-8" />
        {/* Background Theme*/}
        <StarBackground/>
        {/* Nav Bar*/}
        <Navbar/>
        {/* Main Content*/}
        <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
        </main>
        {/* Footer */}
    </div>
};