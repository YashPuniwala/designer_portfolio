import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ProjectFooter from "@/components/ProjectFooter";
import { BrandIdentityProject } from "./projects/brand-identity";
import { SocialMediaProject } from "./projects/social-media";
import { NilyProject } from "./projects/nily";
import { ComfortoProject } from "./projects/comforto";
import { SocialCampaignsProject } from "./projects/social-campaigns";
import {
  getNextProject,
  getProjectBySlug,
  isNilyProject,
  isComfortoProject,
  isSocialMediaProject,
  isSocialCampaignsProject,
} from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

function goHome() {
  window.location.hash = "#home";
}

export default function ProjectDetailPage({ slug }: { slug: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const project = getProjectBySlug(slug);
  const next = project ? getNextProject(project.slug) : null;

  useLayoutEffect(() => {
    document.title = project ? `${project.title} — OPERATOR.X` : "Project — OPERATOR.X";
    window.scrollTo(0, 0);
  }, [project, slug]);

  // Sticky intro — GSAP pin & slide-over animation
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !project) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: true });
    const onScroll = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const intro = root.querySelector<HTMLElement>("..pd-intro".replace("..", "."));
      const titleLayer = root.querySelector<HTMLElement>(".pd-title-layer");
      const infoLayer = root.querySelector<HTMLElement>(".pd-info-layer");
      if (!intro || !titleLayer || !infoLayer) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Black title layer moves UP and exits.
      tl.fromTo(titleLayer, { yPercent: 0 }, { yPercent: -101, duration: 1, ease: "none" }, 0);
      // 2. Image stays sticky (pinned) — no tween on it.
      // 3. Black info layer rises FROM THE BOTTOM over the sticky image.
      tl.fromTo(infoLayer, { yPercent: 101 }, { yPercent: 0, duration: 1.2, ease: "none" }, 0.55);
    }, root);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [slug, project]);

  if (!project) {
    return (
      <div className="pd-root">
        <div className="pd-missing">
          <h1 className="font-display text-5xl font-bold uppercase">Project not found</h1>
          <button onClick={goHome} className="pd-back-btn">
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-root" ref={rootRef}>
      {/* Scrolling content layer — sits above the fixed ProjectFooter
          and slides off the bottom to reveal it. */}
      <div className="pd-page-content">
        {/* ============================================================
          STICKY INTRO — the ← BACK link lives INSIDE the black title
          layer, so back + project name travel as one layer during the
          existing intro animation and leave the viewport with it.
          ============================================================ */}
        <section className="pd-intro" aria-label={`${project.title} intro`}>
          <div className="pd-stage">
            <img src={project.mainImage} alt={project.title} className="pd-main-img" />

            <div className="pd-title-layer">
              <div className="pd-title-inner">
                <button
                  type="button"
                  onClick={goHome}
                  className="pd-back-link"
                  aria-label="Back to all work"
                >
                  <span className="pd-back-arrow" aria-hidden="true">
                    ←
                  </span>
                  Back
                </button>
                <p className="pd-eyebrow">Featured Case Study</p>
                <h1 className="pd-title">{project.title}</h1>
                <p className="pd-title-sub">
                  {project.year} — {project.client}
                </p>
              </div>
              <div className="pd-scroll-hint">
                <span>Scroll</span>
                <span className="pd-scroll-line" />
              </div>
            </div>

            <div className="pd-info-layer">
              <div className="pd-info-inner">
                <div className="pd-info-grid">
                  <div>
                    <p className="pd-label">Client</p>
                    <p className="pd-value">{project.client}</p>
                  </div>
                  <div>
                    <p className="pd-label">Year</p>
                    <p className="pd-value">{String(project.year)}</p>
                  </div>
                  <div>
                    <p className="pd-label">Services</p>
                    <ul className="pd-services">
                      {project.services.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="pd-label">Project</p>
                    {project.projectUrl ? (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="pd-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit live site ↗
                      </a>
                    ) : (
                      <p className="pd-value-dim">Case study only</p>
                    )}
                  </div>
                </div>
                <p className="pd-desc pd-desc-tight">{project.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Body isolated by discriminated union project type */}
        {isSocialCampaignsProject(project) ? (
          <SocialCampaignsProject project={project} />
        ) : isSocialMediaProject(project) ? (
          <SocialMediaProject project={project} />
        ) : isNilyProject(project) ? (
          <NilyProject project={project} />
        ) : isComfortoProject(project) ? (
          <ComfortoProject project={project} />
        ) : (
          <BrandIdentityProject project={project} />
        )}
      </div>

      {/* Sticky-reveal footer — a fixed layer the content scrolls up over.
          Dedicated to project pages: hero statement is the NEXT PROJECT. */}
      {next && <ProjectFooter next={next} />}
    </div>
  );
}
