import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroVisual from "@/assets/hero-visual.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 gradient-hero-bg overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-border/60 text-accent-foreground text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full gradient-cta animate-pulse-soft" />
              AI-Powered Voice Assistant
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight text-foreground mb-5">
              Your AI Receptionist That{" "}
              <span className="text-gradient">Never Takes a Break</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-md">
              Handle every call professionally. 24/7 availability for hotels, restaurants, and small businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#demo" className="gap-2">
                  Try Voice Demo Now
                  <ArrowRight size={18} />
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild className="text-muted-foreground">
                <a href="#how-it-works" className="gap-1">
                  See How It Works
                  <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass-card animate-float">
              <img
                src={heroVisual}
                alt="VoiceX AI voice assistant interface with flowing sound waves"
                className="w-full h-auto rounded-2xl"
                loading="eager"
              />
              {/* Voice wave overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 bg-card/80 backdrop-blur-md rounded-xl p-4 border border-border/30">
                <div className="w-10 h-10 rounded-full gradient-cta flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor" className="text-primary-foreground"/>
                  </svg>
                </div>
                <div className="flex items-end gap-[3px] h-6">
                  {[0.4, 0.7, 1, 0.6, 0.8, 1, 0.5, 0.9, 0.6, 0.4, 0.7, 1].map((h, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-full bg-primary animate-voice-wave"
                      style={{
                        height: `${h * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground ml-2">Listening...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
