export default function Footer() {
  const onContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = "#/contact";
  };

  return (
    <footer
      id="footer"
      className="footer-sticky-wrap"
      aria-label="Footer and Contact Call to Action"
    >
      <div className="footer-inner">
        {/* Top subtle row */}
        <div className="footer-top-meta">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Available for Select Work — 2025/2026
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Worldwide / Remote
          </span>
        </div>

        {/* Huge centered LET'S TALK anchor / statement */}
        <div className="footer-cta-container">
          <a
            href="#/contact"
            onClick={onContactClick}
            className="footer-cta-link group"
            aria-label="Navigate to contact page — Let's Talk"
          >
            <span className="footer-cta-text font-display font-bold uppercase tracking-[-0.035em]">
              Let's Talk
            </span>
            <span className="footer-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        {/* Bottom minimal metadata bar */}
        <div className="footer-bottom-bar">
          <div className="flex items-center gap-6">
            <span className="font-display text-sm font-bold uppercase tracking-[0.4em] text-white">
              Operator.X
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 sm:inline">
              Creative Agency &amp; Design Practice
            </span>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <a
              href="mailto:hello@operator-x.agency"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 hover:text-amber-glow"
            >
              hello@operator-x.agency
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
