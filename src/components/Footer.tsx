const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-cta flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-sm font-bold text-foreground">VoiceX</span>
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
