import type { ProjectData } from "@/data/projects";

type ProjectFooterProps = {
  next: ProjectData;
};

/**
 * Dedicated sticky-reveal footer for Project Detail pages.
 * The fixed layer the page content scrolls up over; its hero statement
 * is the NEXT PROJECT name with the next project's featured image as a
 * quiet, static backdrop. No end header, no numbering — just the
 * statement and the reveal.
 */
export default function ProjectFooter({ next }: ProjectFooterProps) {
  const goNext = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    window.location.hash = `#/projects/${next.slug}`;
  };

  return (
    <footer
      id="project-footer"
      className="pf-sticky-wrap"
      aria-label={`Next project — ${next.title}`}
    >
      {/* Quiet backdrop: next project's featured image, static, dimmed */}
      <div className="pf-backdrop" aria-hidden="true">
        <img src={next.mainImage} alt="" className="pf-backdrop-img" />
        <div className="pf-backdrop-veil" />
      </div>

      <div className="pf-inner">
        {/* Top meta row — no numbering */}
        <div className="pf-top-meta">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
            Next Project
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
            {next.year} — {next.client}
          </span>
        </div>

        {/* Huge centered NEXT PROJECT name */}
        <div className="pf-cta-container">
          <a
            href={`#/projects/${next.slug}`}
            onClick={goNext}
            className="pf-cta-link group"
            aria-label={`Open next case study — ${next.title}`}
          >
            <span className="pf-cta-text font-display font-bold uppercase tracking-[-0.035em]">
              {next.title}
            </span>
            <span className="pf-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <span className="pf-cta-hint font-mono text-[10px] uppercase tracking-[0.35em]">
            Open case study
          </span>
        </div>
      </div>
    </footer>
  );
}
