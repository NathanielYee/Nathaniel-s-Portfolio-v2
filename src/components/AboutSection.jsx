import { Briefcase, Code, CandlestickChart } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
            <img 
            src="public/images/melondon.jpg" 
            alt="Nathaniel Yee" 
            className="w-72 h-48 md:w-96 md:h-64 rounded-xl object-cover border-4 border-primary/20 shadow-2xl 
                 animate-float opacity-0 animate-fade-in-up hover:scale-105 transition-all duration-1500 ease-out"
            />
        </div>
            
            <h3 className="text-2xl font-semibold">
              Curious and Passionate Student
            </h3>

            <p className="text-muted-foreground">
              After taking my first data science class freshman year at Northeastern. I was hooked,
              ever since I've strived to create new and exciting projects.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about applying statistical and machine learning models to financial markets,
              to make sense of market volatility.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="mailto:yee.n@northeastern.edu?subject=Getting%20In%20Touch&body=Hi%20Nathaniel,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards,
              " className="cosmic-button" >
                {" "}
                Get In Touch
              </a>

              <a
                href="src/Nathaniel Yee's Resume Summer 2026.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Currently working @Wellington Management</h4>
                  <p className="text-muted-foreground">
                    Conducting multi-asset global execution research, pre-trade cost models, and TCA.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <CandlestickChart className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Prev: @John Hancock</h4>
                  <p className="text-muted-foreground">
                    Created VBA automations for financial reporting and worked on variable/fixed annuities.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">President of NU Systematic Alpha</h4>
                  <p className="text-muted-foreground">
                    Leading a team of Quantitative Researchers to find alpha using alternative data and statistical methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};