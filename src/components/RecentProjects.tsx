import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  src: string;
  ratio: "4-3" | "3-4" | "16-9" | "square";
  scaleFrom: number;
  yFrom: number;
  yTo: number;
  scrub?: number;
};

const FIRST_ROW: Project[] = [
  {
    id: "01",
    slug: "after",
    title: "After",
    category: "Micro Interaction",
    src: "/images/recent-01.jpg",
    ratio: "4-3",
    scaleFrom: 0.05,
    yFrom: -28,
    yTo: 18,
    scrub: 0.7,
  },
  {
    id: "02",
    slug: "vogue",
    title: "Vogue",
    category: "Brand Identity",
    src: "/images/recent-02.jpg",
    ratio: "4-3",
    scaleFrom: 0.05,
    yFrom: 20,
    yTo: -36,
    scrub: 0.7,
  },
];

const FEATURED: Project = {
  id: "03",
  slug: "pulse",
  title: "Pulse",
  category: "GSAP Animation",
  src: "/images/recent-04.jpg",
  ratio: "16-9",
  scaleFrom: 0.04,
  yFrom: 40,
  yTo: -60,
  scrub: 1.2,
};

const SECOND_ROW: Project[] = [
  {
    id: "04",
    slug: "atlas",
    title: "Atlas",
    category: "Micro Interaction",
    src: "/images/recent-03.jpg",
    ratio: "4-3",
    scaleFrom: 0.05,
    yFrom: -32,
    yTo: 20,
    scrub: 0.7,
  },
  {
    id: "05",
    slug: "nova",
    title: "Nova",
    category: "Social Media Posts",
    src: "/images/recent-02.jpg",
    ratio: "4-3",
    scaleFrom: 0.05,
    yFrom: 24,
    yTo: -42,
    scrub: 0.7,
  },
];

const RATIO_CLASS: Record<Project["ratio"], string> = {
  "3-4": "aspect-[3/4]",
  "4-3": "aspect-[4/3]",
  "16-9": "aspect-[16/9]",
  square: "aspect-square",
};

const SCRIPT_FONT = '"Caveat", "Brush Script MT", cursive';

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
          if (frame) gsap.set(frame, { scale: 1, y: 0 });
        });
        return;
      }

      cards.forEach((card) => {
        const frame = card.querySelector<HTMLElement>(".rp-frame");
        if (!frame) return;

        const meta = card.querySelector<HTMLElement>(".rp-caption");
        const ratio = card.getAttribute("data-ratio") ?? "";

        const scaleFrom = parseFloat(card.dataset.scaleFrom ?? "0.15");
        const yFrom = parseFloat(card.dataset.yFrom ?? "0");
        const yTo = parseFloat(card.dataset.yTo ?? "0");
        const scrub = parseFloat(card.dataset.scrub ?? "0.8");
        const isFeatured = ratio === "16-9";

        // Use scale (both axes) instead of scaleX to avoid horizontal squish
        gsap.set(frame, { scale: scaleFrom, y: yFrom });
        if (meta) gsap.set(meta, { y: yFrom * 0.35, opacity: 0 });

        const start = "top 82%";
        const end = isFeatured ? "top 22%" : "top 32%";

        gsap.to(frame, {
          scale: 1,
          y: yTo,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });

        if (meta) {
          gsap.to(meta, {
            y: yTo * 0.35,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              end: isFeatured ? "top 36%" : "top 46%",
              scrub,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          });
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  const renderCard = (project: Project) => (
    <article
      className="rp-card flex cursor-pointer flex-col gap-3 outline-none sm:gap-4"
      data-ratio={project.ratio}
      data-scale-from={project.scaleFrom}
      data-y-from={project.yFrom}
      data-y-to={project.yTo}
      data-scrub={project.scrub ?? 0.8}
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
      {/*
        Image frame.
        • 4:3 cards → 16:9 on mobile so stacked single-column cards
          aren't excessively tall; restores to 4:3 at md breakpoint.
        • Featured 16:9 card keeps its ratio at all sizes.
      */}
      <div
        className={`rp-frame relative overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.13)] [transform-origin:50%_50%] [will-change:transform] ${
          project.ratio === "4-3"
            ? "aspect-[16/9] md:aspect-[4/3]"
            : RATIO_CLASS[project.ratio]
        }`}
      >
        <img
          src={project.src}
          alt={project.title}
          loading="lazy"
          className="block h-full w-full object-cover"
        />
        <span className="rp-open" aria-hidden="true">
          Open case study →
        </span>
      </div>

      {/* Caption — wraps on narrow screens so text never clips */}
      <div className="rp-caption relative flex flex-wrap items-end justify-between gap-x-3 gap-y-1 px-1">
        <span
          className="rp-title font-bold italic leading-none text-[#ff8a3c] text-[clamp(1.6rem,2.8vw,2.6rem)]"
          style={{ fontFamily: SCRIPT_FONT }}
        >
          {project.title}
        </span>
        <span className="rp-meta pb-[0.2rem] font-mono text-[10px] uppercase tracking-[0.28em] text-black/45 whitespace-nowrap">
          {project.category}
        </span>
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
      {/* Header — no extra horizontal padding; section already has px-[5vw] */}
      <header className="rp-header pb-[6vh] pt-[2vh] text-center">
        <h2 className="font-display font-bold leading-[0.96] tracking-[-0.02em] text-[#0a0a0a] text-[clamp(2.4rem,6.2vw,5.6rem)]">
          We let the{" "}
          <span
            className="italic font-bold text-[#ff8a3c]"
            style={{ fontFamily: SCRIPT_FONT }}
          >
            Projects
          </span>
          <br />
          speak for itself.
        </h2>
      </header>

      {/* Row 1 — two cards, consistent gap */}
      <div className="rp-row mb-[8vh] grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {FIRST_ROW.map((project) => (
          <div key={project.id}>{renderCard(project)}</div>
        ))}
      </div>

      {/* Featured full-width card */}
      <div className="rp-row rp-row-featured mb-[8vh]">
        {renderCard(FEATURED)}
      </div>

      {/* Row 2 — two cards, consistent gap */}
      <div className="rp-row grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {SECOND_ROW.map((project) => (
          <div key={project.id}>{renderCard(project)}</div>
        ))}
      </div>
    </section>
  );
}