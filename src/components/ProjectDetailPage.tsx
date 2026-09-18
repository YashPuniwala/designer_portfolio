import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "framer-motion";
import ProjectFooter from "@/components/ProjectFooter";
import {
  getNextProject,
  getProjectBySlug,
  isSocialMediaProject,
  type ProjectData,
  type ProjectImage,
} from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

function goHome() {
  window.location.hash = "#home";
}

/** Subtle image reveal — no flashy motion */
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Img({ image, className = "" }: { image: ProjectImage; className?: string }) {
  return (
    <img src={image.src} alt={image.alt} loading="lazy" className={className} />
  );
}

/** Cycle mockups through art-directed compositions without forcing sizes */
function MockupBlock({
  images,
  startIndex,
}: {
  images: ProjectImage[];
  startIndex: number;
}) {
  const slice = images.slice(startIndex, startIndex + 3);
  if (slice.length === 0) return null;

  const pattern = startIndex % 5;

  // Full-width single
  if (pattern === 0 || slice.length === 1) {
    return (
      <Reveal className="cs-m-full">
        <Img image={slice[0]} />
      </Reveal>
    );
  }

  // Split pair
  if (pattern === 1 && slice.length >= 2) {
    return (
      <div className="cs-m-split">
        <Reveal>
          <Img image={slice[0]} />
        </Reveal>
        <Reveal>
          <Img image={slice[1]} />
        </Reveal>
      </div>
    );
  }

  // Large + small
  if (pattern === 2 && slice.length >= 2) {
    return (
      <div className="cs-m-ls">
        <Reveal className="cs-m-ls-lg">
          <Img image={slice[0]} />
        </Reveal>
        <Reveal className="cs-m-ls-sm">
          <Img image={slice[1]} />
        </Reveal>
      </div>
    );
  }

  // Offset right
  if (pattern === 3) {
    return (
      <Reveal className="cs-m-offset-r">
        <Img image={slice[0]} />
      </Reveal>
    );
  }

  // Offset left / cinematic
  return (
    <Reveal className="cs-m-offset-l">
      <Img image={slice[0]} />
    </Reveal>
  );
}

function BrandBody({ project }: { project: ProjectData }) {
  const mockupBlocks: number[] = [];
  for (let i = 0; i < project.mockups.length; ) {
    mockupBlocks.push(i);
    const pattern = i % 5;
    if (pattern === 1 || pattern === 2) i += 2;
    else i += 1;
  }

  return (
    <div className="cs-body">
      {/* LOGO — 3 marks, almost no text */}
      <section className="cs-section" aria-label="Logo">
        <p className="cs-label">Logo</p>
        <div className="cs-logos">
          {project.logos.map((logo, i) => (
            <Reveal key={i} className="cs-logo-item">
              <Img image={logo} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TYPOGRAPHY + COLOR */}
      <section className="cs-section cs-typecolor" aria-label="Typography and Color">
        <div className="cs-type">
          <p className="cs-label">Typography</p>
          <div className="cs-type-list">
            {project.typography.map((t) => (
              <div key={t.name} className="cs-type-row">
                <span className="cs-type-specimen">{t.specimen}</span>
                <div className="cs-type-meta">
                  <span className="cs-type-name">{t.name}</span>
                  <span className="cs-type-role">
                    {t.role}
                    {t.weight ? ` · ${t.weight}` : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cs-color">
          <p className="cs-label">Color</p>
          <div className="cs-swatches">
            {project.colors.map((c) => (
              <div key={c.hex} className="cs-swatch">
                <span className="cs-swatch-chip" style={{ background: c.hex }} />
                <span className="cs-swatch-hex">{c.hex}</span>
                <span className="cs-swatch-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAINSTORMING / EXPLORE — max 3 images, 1 large + 2 supporting */}
      <section className="cs-section" aria-label="Brainstorming">
        <p className="cs-label">Brainstorming</p>
        <h2 className="cs-phrase">{project.brainstorming.phrase}</h2>
        <div className="cs-explore-grid">
          {project.brainstorming.images.slice(0, 3).map((img, i) => (
            <Reveal
              key={i}
              className={`cs-explore-item${i === 0 ? " cs-explore-item-lg" : ""}`}
            >
              <Img image={img} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONCEPT / DIRECTION — max 3 images, balanced */}
      <section className="cs-section" aria-label="Concept">
        <p className="cs-label">Concept</p>
        <h2 className="cs-phrase">{project.concept.phrase}</h2>
        <div className="cs-trio">
          {project.concept.images.slice(0, 3).map((img, i) => (
            <Reveal key={i} className="cs-trio-item">
              <Img image={img} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MOCKUPS — unlimited, art-directed */}
      <section className="cs-section cs-mockups" aria-label="Mockups">
        <p className="cs-label">Mockups</p>
        <div className="cs-mockup-grid">
          {mockupBlocks.map((start) => (
            <MockupBlock key={start} images={project.mockups} startIndex={start} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SocialBody({ project }: { project: ProjectData }) {
  const posts = project.socialPosts ?? [];
  const stories = project.storiesReels ?? [];
  const overview = project.contentOverview;

  return (
    <div className="cs-body sm-body">
      {/* CONTENT OVERVIEW */}
      {overview && (
        <section className="cs-section sm-overview" aria-label="Content overview">
          <p className="cs-label">Content Overview</p>
          <h2 className="cs-phrase sm-overview-title">{overview.heading}</h2>
          {overview.intro && <p className="sm-overview-intro">{overview.intro}</p>}
          <ul className="sm-cats" aria-label="Content categories">
            {overview.categories.map((cat) => (
              <li key={cat} className="sm-cat">
                <span className="sm-cat-dot" aria-hidden="true" />
                {cat}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SELECTED POSTS — unlimited */}
      <section className="cs-section sm-posts" aria-label="Selected social media posts">
        <p className="cs-label">Social Media Posts</p>
        <h2 className="cs-phrase">Selected Posts.</h2>
        <div className="sm-posts-grid">
          {posts.map((post, i) => (
            <Reveal key={`${post.src}-${i}`} className="sm-post">
              <Img image={post} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORIES & REELS */}
      {stories.length > 0 && (
        <section className="cs-section sm-stories" aria-label="Stories and reels">
          <p className="cs-label">Stories &amp; Reels</p>
          <h2 className="cs-phrase">Stories in motion.</h2>
          <div className="sm-stories-row">
            {stories.map((story, i) => (
              <Reveal key={`${story.src}-${i}`} className="sm-story">
                <span className="sm-story-frame">
                  <Img image={story} />
                  {story.isVideo && (
                    <span className="sm-play" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
                        <path d="M10 8.5L15.5 12L10 15.5V8.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  )}
                </span>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProjectDetailPage({ slug }: { slug: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const project = getProjectBySlug(slug);
  const next = project ? getNextProject(project.slug) : null;

  useLayoutEffect(() => {
    document.title = project ? `${project.title} — OPERATOR.X` : "Project — OPERATOR.X";
    window.scrollTo(0, 0);
  }, [project, slug]);

  // Sticky intro — UNCHANGED behavior
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
      const intro = root.querySelector<HTMLElement>(".pd-intro");
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

      // The ProjectFooter is a fixed reveal layer driven purely by CSS
      // (content scrolls up over it) — no GSAP needed here.
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

  // Layout is driven by the project's canonical type:
  //   type: "social-media"   → Social Media Posts page
  //   type: "brand-identity" → Brand Identity page
  // Falls back to legacy `projectType` so older data keeps working.
  const isSocial = isSocialMediaProject(project);

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
                      Visit live site →
                    </a>
                  ) : (
                    <p className="pd-value-dim">Case study only</p>
                  )}
                </div>
              </div>
              {/* Slightly reduced body size only */}
              <p className="pd-desc pd-desc-tight">{project.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Body switches by project type — shared sticky intro above */}
      {isSocial ? <SocialBody project={project} /> : <BrandBody project={project} />}
      </div>

      {/* Sticky-reveal footer — a fixed layer the content scrolls up over.
          Dedicated to project pages: hero statement is the NEXT PROJECT. */}
      {next && <ProjectFooter next={next} />}
    </div>
  );
}
