import { DecodeReveal } from "../components/DecodeReveal";
import { ChevronsDown } from "lucide-react";

export const HeroSection = () => {
    return (
        <section 
            id="hero" 
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    <DecodeReveal text="Hi," delay={0} />
                    <span> </span>
                    <DecodeReveal text="I'm" delay={400} />
                    <span> </span>
                    <DecodeReveal text="Nathaniel" delay={800} />
                    <span> </span>
                    <DecodeReveal text="Yee" delay={1600} />
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-0 opacity-0 animate-fade-in-delay-3">
                    A Northeastern student studying Data Science and Finance with a minor in Mathematics. I have interests in market microstructure, 
                    global trading, and quantitative research. Currently, I'm working at Wellington Management Company on the Quantitative Trading Research and Analytics team!
                </p>

                <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                    <a href="#projects" className="cosmic-button">
                        View My Work
                    </a>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-delay-4">
                <span className="text-sm text-muted-foreground mb-2">Scroll</span>
                <ChevronsDown className="h-5 w-5 text-primary animate-bounce" />
            </div>
        </section>
    );
};