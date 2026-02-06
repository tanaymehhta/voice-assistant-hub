import VoiceXLogo from "./VoiceXLogo";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <VoiceXLogo height={18} className="text-foreground" />
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground" aria-label="Footer navigation">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VoiceX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
