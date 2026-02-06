import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VoiceXLogo from "./VoiceXLogo";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <a href="/" className="flex items-center" aria-label="VoiceX Home">
          <VoiceXLogo height={24} className="text-foreground" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="heroPill" size="default" asChild>
            <a href="https://calendly.com/tmehta1-babson/30min" target="_blank" rel="noopener noreferrer">Book Demo</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
          >
            <div className="p-4 flex flex-col gap-3">
              <Button variant="heroPill" size="default" asChild className="w-full">
                <a href="https://calendly.com/tmehta1-babson/30min" target="_blank" rel="noopener noreferrer">Book Demo</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
