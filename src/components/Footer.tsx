import VoiceXLogo from "./VoiceXLogo";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <VoiceXLogo height={18} className="text-foreground" />
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Tanay Mehta</span>
            <span>·</span>
            <a href="tel:+18579198811" className="hover:text-foreground transition-colors">+1 (857) 919-8811</a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/tanay-mehta17/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VoiceX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
