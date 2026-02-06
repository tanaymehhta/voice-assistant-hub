import { useState } from "react";
import { motion } from "framer-motion";
import VoiceDashboard from "./VoiceDashboard";

const DemoSection = () => {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  return (
    <>
      <section id="demo" className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Tap to start a conversation with our AI Hotel Receptionist
            </p>
          </motion.div>

          {/* Metallic wavy orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 200 }}
            className="relative cursor-pointer group"
            onClick={() => setDashboardOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Start voice demo with AI Hotel Receptionist"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setDashboardOpen(true);
              }
            }}
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full rounded-full bg-primary/10 animate-pulse-soft" />
            </div>

            {/* Outer ring */}
            <div className="absolute -inset-2 rounded-full border border-border/60 group-hover:border-primary/30 transition-colors duration-500" />

            {/* Main orb */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-500">
              {/* Metallic gradient base */}
              <div className="absolute inset-0 rounded-full" style={{
                background: "conic-gradient(from 0deg, hsl(215 85% 55%), hsl(250 55% 62%), hsl(280 40% 70%), hsl(215 60% 75%), hsl(200 50% 65%), hsl(215 85% 55%))",
              }} />

              {/* Wavy overlay */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="orbSheen" cx="35%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="50" fill="url(#orbSheen)" />
                {/* Animated wave lines */}
                {[0, 1, 2].map((i) => (
                  <path
                    key={i}
                    d={`M 20 ${45 + i * 8} Q 35 ${38 + i * 8}, 50 ${45 + i * 8} T 80 ${45 + i * 8}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeOpacity={0.5 - i * 0.12}
                    strokeLinecap="round"
                    className="animate-voice-wave"
                    style={{ animationDelay: `${i * 0.3}s`, animationDuration: "2s" }}
                  />
                ))}
              </svg>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary-foreground drop-shadow-lg md:w-8 md:h-8">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Label below */}
            <motion.p
              className="text-center mt-5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Try it free
            </motion.p>
          </motion.div>
        </div>
      </section>

      <VoiceDashboard
        open={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
      />
    </>
  );
};

export default DemoSection;
