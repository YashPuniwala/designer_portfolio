import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   Main 6 Tools Data (Exact Order: Row 1 & Row 2)
   ───────────────────────────────────────────────────────────── */
interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: () => ReactNode;
}

const MAIN_TOOLS: ToolItem[] = [
  // Row 1
  {
    id: "illustrator",
    name: "Illustrator",
    description: "Branding, design systems, marks & type.",
    icon: () => (
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#261300] border border-[#ff9a00]/70 shadow-sm select-none">
        <span className="font-sans text-[21px] font-bold tracking-tight text-[#ff9a00] leading-none">
          Ai
        </span>
      </div>
    ),
  },
  {
    id: "photoshop",
    name: "Photoshop",
    description: "Photo editing, retouch & compositing.",
    icon: () => (
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#001e36] border border-[#31a8ff]/70 shadow-sm select-none">
        <span className="font-sans text-[21px] font-bold tracking-tight text-[#31a8ff] leading-none">
          Ps
        </span>
      </div>
    ),
  },
  {
    id: "canva",
    name: "Canva",
    description: "Quick designs, presentations & social media.",
    icon: () => (
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-black/[0.08] shadow-sm p-1.5">
        <svg viewBox="0 0 100 42" className="h-6 w-auto" fill="none">
          <defs>
            <linearGradient id="canva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c4cc" />
              <stop offset="60%" stopColor="#7d2ae8" />
              <stop offset="100%" stopColor="#ff3366" />
            </linearGradient>
          </defs>
          <path
            d="M17.5 26.2c-3.6 0-6.8-2.1-6.8-6.9 0-6.2 5.6-12.4 13.1-12.4 4.8 0 7.8 2.5 7.8 6 0 1.8-.8 3.5-2.5 5.2l-2.8 2.9c-1 1-1.8 1.8-1.8 2.5 0 .8.7 1.2 1.9 1.2 2 0 4.3-1.3 6.3-3.6l1.8 1.6c-2.7 3.1-6.2 4.8-9.4 4.8-3.5 0-5.5-1.9-5.5-4.7 0-1.3.6-2.6 1.6-3.7l2.7-2.9c1.2-1.1 1.7-2.1 1.7-3 0-1.9-1.8-3.3-4.6-3.3-5.3 0-9.4 5.1-9.4 10 0 2.9 1.9 4.2 4.1 4.2 2.5 0 4.8-1.3 6.7-3.4l1.6 1.6c-2.6 2.9-5.9 4.5-9.3 4.5zm22.5-.2l-2.6-8.8c-.6-1.9-1.1-3.8-1.4-5.5h-.3c-.4 1.8-.8 3.7-1.4 5.5l-2.6 8.8h-3l5.5-16.6h3.9l5.5 16.6h-3.2zm-7.3-6.3h5.6l-2.8-9.1-2.8 9.1zm13.3 6.3v-11.2c0-1.9-.4-3.6-.8-5.4h3l.4 2.8h.2c1.4-2 3.5-3.2 5.7-3.2 3.4 0 5 2.3 5 6v11h-3.3v-10.3c0-2.3-1-3.7-2.9-3.7-1.8 0-3.3 1.4-4 3.2v10.8h-3.3zm19.3 0l-4.4-11.4c-.6-1.5-1-3.3-1.5-5.1h3.3l2.7 7.9c.5 1.4.8 2.8 1.2 4.1h.2c.4-1.3.7-2.7 1.2-4.1l2.7-7.9h3.3l-4.5 11.4c-1 2.3-2.3 5.1-5.3 5.1h-1.5v-2.7h.9c1.2 0 1.8-.9 2.3-2z"
            fill="url(#canva-grad)"
          />
        </svg>
      </div>
    ),
  },
  // Row 2
  {
    id: "capcut",
    name: "CapCut",
    description: "Video editing & short form content.",
    icon: () => (
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-black/[0.08] shadow-sm p-2">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-black" fill="currentColor">
          {/* CapCut dual-blade / hourglass geometric logo */}
          <path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h11.2a1.5 1.5 0 0 1 1.22 2.37L13.1 12l4.32 5.63A1.5 1.5 0 0 1 16.2 20H5a1.5 1.5 0 0 1-1.5-1.5v-1.12a1.5 1.5 0 0 1 .6-1.2L9.2 12 4.1 7.82A1.5 1.5 0 0 1 3.5 6.62V5.5z" />
          <path d="M10.8 12l-4.3-5.6A1.5 1.5 0 0 1 7.7 4H19a1.5 1.5 0 0 1 1.5 1.5v1.12a1.5 1.5 0 0 1-.6 1.2L14.8 12l5.1 4.18a1.5 1.5 0 0 1 .6 1.2V18.5A1.5 1.5 0 0 1 19 20H7.7a1.5 1.5 0 0 1-1.2-2.4L10.8 12z" />
        </svg>
      </div>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    description: "UI/UX design & prototyping.",
    icon: () => (
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0d0d0d] border border-black/[0.08] shadow-sm p-2">
        <svg viewBox="0 0 38 57" className="h-6 w-auto" fill="none">
          <path
            d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
            fill="#1ABCFE"
          />
          <path
            d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
            fill="#0ACF83"
          />
          <path
            d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
            fill="#FF7262"
          />
          <path
            d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
            fill="#F24E1E"
          />
          <path
            d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
            fill="#A259FF"
          />
        </svg>
      </div>
    ),
  },
  {
    id: "framer",
    name: "Framer",
    description: "Interactive websites & prototyping.",
    icon: () => (
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-black/[0.08] shadow-sm p-2">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path d="M4 2h16v7h-8z M4 9h8l8 7H4z M4 16h8v7z" fill="#0055FF" />
        </svg>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   AI & Extra Tools Data (Exact Order: 1 to 5)
   ───────────────────────────────────────────────────────────── */
interface AiToolItem {
  name: string;
  icon: () => ReactNode;
}

const AI_TOOLS: AiToolItem[] = [
  {
    name: "Claude",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 flex-shrink-0 text-[#D97757]"
        fill="currentColor"
      >
        {/* Claude asterism / starburst */}
        <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v2.8a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm7.07 2.93a1.5 1.5 0 0 1 0 2.12l-1.98 1.98a1.5 1.5 0 0 1-2.12-2.12l1.98-1.98a1.5 1.5 0 0 1 2.12 0zM22 12a1.5 1.5 0 0 1-1.5 1.5h-2.8a1.5 1.5 0 0 1 0-3h2.8A1.5 1.5 0 0 1 22 12zm-2.93 7.07a1.5 1.5 0 0 1-2.12 0l-1.98-1.98a1.5 1.5 0 0 1 2.12-2.12l1.98 1.98a1.5 1.5 0 0 1 0 2.12zM12 22a1.5 1.5 0 0 1-1.5-1.5v-2.8a1.5 1.5 0 0 1 3 0v2.8A1.5 1.5 0 0 1 12 22zm-7.07-2.93a1.5 1.5 0 0 1 0-2.12l1.98-1.98a1.5 1.5 0 0 1 2.12 2.12l-1.98 1.98a1.5 1.5 0 0 1-2.12 0zM2 12a1.5 1.5 0 0 1 1.5-1.5h2.8a1.5 1.5 0 0 1 0 3H3.5A1.5 1.5 0 0 1 2 12zm2.93-7.07a1.5 1.5 0 0 1 2.12 0l1.98 1.98a1.5 1.5 0 0 1-2.12 2.12L4.93 7.05a1.5 1.5 0 0 1 0-2.12z" />
      </svg>
    ),
  },
  {
    name: "Midjourney",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 flex-shrink-0 text-[#141414]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Midjourney line sailboat */}
        <path d="M4 17c3.5 1.5 7 1.5 10.5 0 2.5-.8 5 .5 5.5 1" />
        <path d="M12 4v11" />
        <path d="M12 4c3.5 3 5.5 6.5 5.5 10.5H12" />
        <path d="M6 14.5c.5-4 2.5-7.5 6-9.5" />
      </svg>
    ),
  },
  {
    name: "Relume",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="none">
        {/* Relume faceted isometric cube */}
        <path d="M12 2.5L20 7v9l-8 4.5L4 16V7l8-4.5z" fill="#0D0D0D" />
        <path d="M12 2.5L20 7l-8 4.5L4 7l8-4.5z" fill="#E23A22" />
        <path d="M12 11.5V20.5L20 16V7l-8 4.5z" fill="#991B1B" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 flex-shrink-0 text-[#141414]"
        fill="currentColor"
      >
        {/* OpenAI rosette icon */}
        <path d="M20.5 9.8a5.1 5.1 0 0 0-.4-3.8 5.2 5.2 0 0 0-4.6-2.6 5.3 5.3 0 0 0-1.6.3 5.1 5.1 0 0 0-4.1-1.7 5.2 5.2 0 0 0-4.9 3.5 5.1 5.1 0 0 0-3.3 2.4 5.2 5.2 0 0 0 .6 5.8 5.1 5.1 0 0 0 .4 3.8 5.2 5.2 0 0 0 4.6 2.6c.5 0 1.1-.1 1.6-.3a5.1 5.1 0 0 0 4.1 1.7 5.2 5.2 0 0 0 4.9-3.5 5.1 5.1 0 0 0 3.3-2.4 5.2 5.2 0 0 0-.6-5.8zm-7.6 11.1a3.8 3.8 0 0 1-2.5-.9l1.4-1.4 3.9 2.3c-.9.5-1.9.7-2.8.7v-.7zm-6.4-2.8a3.7 3.7 0 0 1-1.3-2.3l1.9-.3 2.3 3.9c-1-.3-2-.8-2.9-1.3zm-1.8-6.1a3.8 3.8 0 0 1 1.2-2.3v2l4.2 1.4-1.4 3.9c-.8-.7-1.5-1.7-1.7-2.8l-2.3-2.2zm10.7-3.6l-3.9-2.3c.9-.5 1.9-.7 2.8-.7a3.8 3.8 0 0 1 2.5.9l-1.4 1.4v.7zm3.6 4.8c0 .8-.2 1.6-.6 2.3l-1.9.3-2.3-3.9c1 .3 2 .8 2.9 1.3.8.8 1.4 1.7 1.9 0zm-5.7 3.3l-1.7-1 1.7-1 1.7 1-1.7 1z" />
      </svg>
    ),
  },
  {
    name: "Google Stitch",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="none">
        {/* Google Stitch multi-colored rings */}
        <circle cx="8" cy="8" r="4.5" stroke="#4285F4" strokeWidth="2.4" />
        <circle cx="16" cy="8" r="4.5" stroke="#EA4335" strokeWidth="2.4" />
        <circle cx="8" cy="16" r="4.5" stroke="#34A853" strokeWidth="2.4" />
        <circle cx="16" cy="16" r="4.5" stroke="#FBBC05" strokeWidth="2.4" />
      </svg>
    ),
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect user's reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      setSettled(true);
      return;
    }

    // Check if already in viewport (e.g. on direct jump or refresh)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      setInView(true);
      const timer = window.setTimeout(() => setSettled(true), 1400);
      return () => window.clearTimeout(timer);
    }

    let t = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          t = window.setTimeout(() => setSettled(true), 1500);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const getTransitionStyle = (delayMs: number): CSSProperties => ({
    transitionDelay: settled ? "0ms" : `${delayMs}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Tools & Skills"
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-white py-12 sm:py-14 lg:py-12 xl:py-18 text-[#141414] overflow-visible"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
        {/* Top Area: Left column (Heading & blurb) + Right area (6 Tool Cards) */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-12 xl:gap-16">
          {/* ─────────────────────────────────────────────────────────────
              1. Left Column: Label, Heading & Description
              ───────────────────────────────────────────────────────────── */}
          <div
            style={getTransitionStyle(100)}
            className={`w-full lg:w-[32%] xl:w-[30%] flex-shrink-0 flex flex-col transition-all duration-700 ease-out motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {/* Small uppercase section label with terracotta line */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff8a3c] uppercase select-none">
                TOOLS & SKILLS
              </span>
              <span className="h-[1.5px] w-9 bg-[#ff8a3c] rounded-full" />
            </div>

            {/* Main Heading: large, bold, left aligned with terracotta dot */}
            <h2 className="mt-5 sm:mt-7 font-display text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-bold leading-[1.08] tracking-tight text-[#141414]">
              Tools
              <br />
              I work with
              <span className="text-[#ff8a3c]">.</span>
            </h2>

            {/* Short Description */}
            <p className="mt-4 sm:mt-6 max-w-sm font-body text-sm sm:text-[15px] leading-relaxed text-[#737373]">
              A curated set of tools that help me design, create, edit and bring ideas
              to life — from concept to final output.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              2. Right Area: Six Tool Cards (3 cols x 2 rows on desktop)
              ───────────────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[68%] xl:w-[70%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4.5 xl:gap-5">
              {MAIN_TOOLS.map((tool, idx) => {
                // Stagger cards smoothly after left column appears
                const delayMs = 180 + idx * 80;

                return (
                  <div
                    key={tool.id}
                    style={getTransitionStyle(delayMs)}
                    className={`group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:border-black/20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ${
                      inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div>
                      {/* Tool icon inside subtle rounded square */}
                      <tool.icon />

                      {/* Tool Name */}
                      <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-bold text-[#141414] tracking-tight">
                        {tool.name}
                      </h3>

                      {/* Tool Description */}
                      <p className="mt-1 font-body text-xs sm:text-[13px] leading-relaxed text-[#737373]">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. Horizontal Divider
            ───────────────────────────────────────────────────────────── */}
        <div
          style={getTransitionStyle(680)}
          className={`mt-10 sm:mt-12 lg:mt-14 h-px w-full bg-black/[0.08] transition-all duration-700 ease-out motion-reduce:transition-none ${
            inView ? "scale-x-100 opacity-100 origin-left" : "scale-x-0 opacity-0"
          }`}
        />

        {/* ─────────────────────────────────────────────────────────────
            4. AI & Extra Tools Row
            ───────────────────────────────────────────────────────────── */}
        <div
          style={getTransitionStyle(760)}
          className={`mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 transition-all duration-700 ease-out motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {/* Uppercase Section Label on the left */}
          <span className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#737373] uppercase select-none whitespace-nowrap">
            AI & EXTRA TOOLS
          </span>

          {/* Five pill-shaped items on the right */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {AI_TOOLS.map((ai) => (
              <div
                key={ai.name}
                className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white px-4 py-2 sm:px-4.5 sm:py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-black/25 hover:bg-neutral-50/80 cursor-default select-none"
              >
                <ai.icon />
                <span className="font-body text-xs sm:text-[13px] font-medium text-[#141414]">
                  {ai.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}