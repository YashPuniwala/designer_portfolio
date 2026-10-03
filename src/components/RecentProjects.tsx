import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug: string;
  title: string;
  tags: string[];
  src: string;
  /** Font-family override for the project title — uses project's own identity */
  titleFont: string;
  /** Optional letter-spacing override */
  titleTracking?: string;
  /** Optional text-transform override */
  titleCase?: "uppercase" | "none";
};

// Each project gets its own typographic identity for the title.
// Space Grotesk (--font-display) is the portfolio's primary display font.
// Inter (--font-body) is used for the more editorial / multi-word title.
const DISPLAY = "var(--font-display)";
const BODY    = "var(--font-body)";

const PROJECTS: Project[] = [
  {
    slug: "breww",
    title: "Breww",
    tags: ["Brand Identity", "Packaging Design"],
    src: "/images/breww/17.png",
    // Breww uses a bold grotesk — Space Grotesk
    titleFont: DISPLAY,
    titleTracking: "-0.03em",
  },
  {
    slug: "comforto",
    title: "COMFORTO",
    tags: ["Brand Identity", "Visual Identity"],
    src: "/images/comforto/image.png",
    // COMFORTO case study uses bold uppercase display
    titleFont: DISPLAY,
    titleTracking: "0.04em",
    titleCase: "uppercase",
  },
  {
    slug: "social-campaigns",
    title: "Social Media Campaigns",
    tags: ["Social Media", "Brand Campaigns"],
    src: "/images/retro/1.png",
    // Multi-word editorial title — Inter body font, normal weight
    titleFont: BODY,
    titleTracking: "-0.01em",
  },
  {
    slug: "nily",
    title: "NILY",
    tags: ["Brand Identity", "Logo Design"],
    src: "/images/nily/hero.png",
    // NILY uses bold uppercase display — Space Grotesk
    titleFont: DISPLAY,
    titleTracking: "0.06em",
    titleCase: "uppercase",
  },
];

function openProject(slug: string) {
  window.location.hash = `#/projects/${slug}`;
}

export default function RecentProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const context = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>(".rp-card");

      if (reduceMotion.matches) {
        cards.forEach((card) => {
          const frame = card.querySelector<HTMLElement>(".rp-frame");
          const title = card.querySelector<HTMLElement>(".rp-title");
          const tags  = card.querySelector<HTMLElement>(".rp-tags");
          const arrow = card.querySelector<HTMLElement>(".rp-arrow");
          if (frame) gsap.set(frame, { scale: 1, y: 0, opacity: 1 });
          if (title) gsap.set(title, { y: 0, opacity: 1 });
          if (tags)  gsap.set(tags,  { y: 0, opacity: 1 });
          if (arrow) gsap.set(arrow, { y: 0, opacity: 1 });
        });
        return;
      }


      cards.forEach((card) => {
        const frame   = card.querySelector<HTMLElement>(".rp-frame");
        const title   = card.querySelector<HTMLElement>(".rp-title");
        const tags    = card.querySelector<HTMLElement>(".rp-tags");
        const arrow   = card.querySelector<HTMLElement>(".rp-arrow");
        if (!frame) return;

        // Frame: scale + opacity scrub
        gsap.fromTo(
          frame,
          { scale: 0.94, y: 28, opacity: 0.85 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 42%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          }
        );

        // Title: upward reveal with slight stagger
        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                end: "top 50%",
                scrub: 0.8,
                invalidateOnRefresh: true,
                refreshPriority: 1,
              },
            }
          );
        }

        // Tags: delayed fade/reveal
        if (tags) {
          gsap.fromTo(
            tags,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "top 52%",
                scrub: 0.8,
                invalidateOnRefresh: true,
                refreshPriority: 1,
              },
            }
          );
        }

        // Arrow: subtle reveal
        if (arrow) {
          gsap.fromTo(
            arrow,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 54%",
                scrub: 0.8,
                invalidateOnRefresh: true,
                refreshPriority: 1,
              },
            }
          );
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  const renderCard = (project: Project) => (
    <article
      className="rp-card rp-card-link group flex cursor-pointer flex-col gap-3 outline-none sm:gap-4"
      data-slug={project.slug}
      onClick={() => openProject(project.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject(project.slug);
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Open ${project.title} case study`}
    >
      {/* Consistent 16:10 aspect ratio frame across all 4 cards */}
      <div className="rp-frame relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0f0f0f] shadow-[0_20px_50px_rgba(0,0,0,0.10)] [transform-origin:50%_50%] [will-change:transform] transition-shadow duration-500 group-hover:shadow-[0_28px_65px_rgba(0,0,0,0.18)]">
        <img
          src={project.src}
          alt={project.title}
          loading="lazy"
          className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="rp-open" aria-hidden="true">
          Open case study &rarr;
        </span>
      </div>

      {/* Editorial project info block — title + tags left, arrow right */}
      <div className="rp-caption">
        {/* Left: project name stacked above pill tags */}
        <div className="rp-caption-left">
          <h3
            className="rp-title"
            style={{
              fontFamily: project.titleFont,
              letterSpacing: project.titleTracking ?? "-0.025em",
              textTransform: project.titleCase ?? "none",
            }}
          >
            {project.title}
          </h3>

          <div className="rp-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="rp-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: minimal circular arrow button */}
        <div className="rp-arrow" aria-hidden="true">
          &rarr;
        </div>
      </div>
    </article>
  );

  return (
    <section
      ref={sectionRef}
      id="recent-projects"
      className="recent-projects relative bg-white px-[5vw] py-[10vh] pb-[14vh] text-[#0a0a0a]"
      aria-label="Recent Projects"
    >
      {/* Header */}
      <header className="rp-header pb-[7vh] pt-[2vh] text-center">
        <h2 className="font-display font-bold leading-[0.96] tracking-[-0.02em] text-[#0a0a0a] text-[clamp(2.4rem,6.2vw,5.6rem)]">
          We let the{" "}
          <span
            className="italic font-bold text-[#ff8a3c]"
            style={{ fontFamily: '"Caveat", "Brush Script MT", cursive' }}
          >
            Projects
          </span>
          <br />
          speak for itself.
        </h2>
      </header>

      {/* Symmetrical, consistent 2x2 grid */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:gap-x-12 lg:gap-y-16">
        {PROJECTS.map((project) => (
          <div key={project.slug} className="w-full">
            {renderCard(project)}
          </div>
        ))}
      </div>
    </section>
  );
}