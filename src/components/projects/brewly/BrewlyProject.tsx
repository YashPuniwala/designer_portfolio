// BrewlyProject.tsx — BREWLY logo design case study
// Structure mirrors ComfortoProject.tsx exactly:
// - Same IMAGE_STAGE_CLASS / IMAGE_INNER_CLASS tokens
// - Same Stage type & LogoStageRow component pattern
// - Same alternating zig-zag layout with SVG spine
// - Same section heading / intro paragraph pattern
// Content is 100% Brewly-specific — no Comforto content.
import { useEffect, useRef, type ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BrewlyProject(_props?: any) {
  return (
    <div className="bg-[#050505] text-white">
      <BrewlyCaseStudy />
    </div>
  );
}

// ── Shared tokens (identical to ComfortoProject) ────────────────────────────
const IMAGE_STAGE_CLASS =
  "w-[172px] h-[172px] sm:w-[196px] sm:h-[196px] md:w-[212px] md:h-[212px] lg:w-[228px] lg:h-[228px] " +
  "flex items-center justify-center group";

const IMAGE_INNER_CLASS =
  "max-w-full max-h-full object-contain block transition-transform duration-700 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105";

type Stage = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

// Three Brewly logo design process stages — exact descriptions as provided.
const LOGO_STAGES: Stage[] = [
  {
    number: "01",
    title: "Typographic Baseline",
    description:
      "I began with a bold, clean sans-serif foundation to determine Brewly's core proportions and letter spacing. The focus was on structural balance and immediate legibility at café counter distances before introducing expressive character styling.",
    image: "/images/brewly/logo_step1.png",
    alt: "BREWLY, Typographic Baseline",
  },
  {
    number: "02",
    title: "Contour & Curve Softening",
    description:
      "In the second iteration, I rounded the exterior corners and softened rigid junctions. This brought a friendly, welcoming café tone into the typography, making the wordmark feel approachable while preserving its solid typographic presence.",
    image: "/images/brewly/logo_step2.png",
    alt: "BREWLY, Contour & Curve Softening",
  },
  {
    number: "03",
    title: "Selected Typeface Direction",
    description:
      "In the final stage, I selected a complete font with consistent angular cuts across letterforms such as the B, R, and W. Using the typeface's inherent character gave the wordmark a cohesive appearance that scales effortlessly from coffee bags to store signage.",
    image: "/images/brewly/logo_step3.png",
    alt: "BREWLY, Selected Typeface Direction",
  },
];

// ── LogoStageRow — identical pattern to ComfortoProject ─────────────────────
function LogoStageRow({ stage, imageFirst }: { stage: Stage; imageFirst: boolean }) {
  const textCol = (
    <div
      className={
        "md:pl-10 lg:pl-12 flex flex-col justify-center max-md:border-l-2 max-md:border-white/20 max-md:pl-4 " +
        (imageFirst ? "max-md:order-1" : "")
      }
    >
      <span className="font-display font-black text-[clamp(2.25rem,4.5vw,3.75rem)] text-white tracking-tight leading-none mb-1">
        {stage.number}
      </span>
      <h3 className="font-display font-bold text-[clamp(1rem,1.3vw,1.25rem)] text-white tracking-wide uppercase mb-2">
        {stage.title}
      </h3>
      <p className="font-body text-[clamp(0.85rem,1.02vw,0.95rem)] leading-[1.7] text-white/60 max-w-[28rem]">
        {stage.description}
      </p>
    </div>
  );

  const imageCol = (
    <div className={"flex items-center justify-center " + (imageFirst ? "max-md:order-2" : "")}>
      <div className={IMAGE_STAGE_CLASS}>
        <img
          src={stage.image}
          alt={stage.alt}
          loading="lazy"
          decoding="async"
          className={IMAGE_INNER_CLASS}
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
      {imageFirst ? imageCol : textCol}
      {imageFirst ? textCol : imageCol}
    </div>
  );
}

// ── BrewlyCaseStudy — main case study body ───────────────────────────────────
function BrewlyCaseStudy() {
  return (
    <div className="bg-[#050505] text-white p-0">

      {/* ════════════════════════════════════════════════════════════
          LOGO DESIGN PROCESS — straight center spine + branch stubs
          (identical structural pattern to ComfortoProject Section 1)
          ════════════════════════════════════════════════════════════ */}
      <section
        className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(1.5rem,3vh,2.25rem)] pb-[clamp(2.5rem,5vh,4rem)]"
        aria-label="Logo Design Process"
      >
        {/* Section Heading & Intro */}
        <div className="mb-[clamp(1.75rem,3.25vh,2.5rem)]">
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,2.8vw,2.4rem)] text-white tracking-tight uppercase mb-3">
            Logo Design Process
          </h2>
          <p className="font-body text-[clamp(0.95rem,1.15vw,1.05rem)] font-medium text-white/90 leading-[1.6] max-w-[50rem] mb-2">
            Crafting an expressive, custom wordmark for a specialty café brand.
          </p>
          <p className="font-body text-[clamp(0.85rem,1.02vw,0.95rem)] leading-[1.7] text-white/55 max-w-[54rem]">
            Brewly needed an identity that felt warm and approachable yet confident and distinct in a competitive coffee landscape. Rather than relying on generic coffee bean iconography, I built a custom wordmark through three iterative stages—moving from clean structural proportions to curved contours, and finally to bespoke angular incisions that give the brand its memorable signature.
          </p>
        </div>

        {/* ── 3-Stage Alternating Timeline Container ── */}
        <div className="relative">

          {/* Straight center spine + branch stubs (Desktop / Tablet).
              Same SVG connector system as ComfortoProject — adapted for
              3 stages instead of 4, so vertical proportions are evenly
              distributed across three 33% bands. */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
            aria-hidden="true"
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* The spine — one continuous straight vertical line */}
              <line
                x1="500" y1="15" x2="500" y2="985"
                stroke="#f0ece1" strokeOpacity="0.85" strokeWidth="2.5" strokeLinecap="round"
              />

              {/* Stage 01 — image on the right → stub reaches right */}
              <line x1="500" y1="167" x2="640" y2="167" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="167" r="5.5" fill="#f0ece1" />
              <circle cx="500" cy="167" r="9" stroke="#f0ece1" strokeWidth="1" strokeOpacity="0.3" />

              {/* Stage 02 — image on the left → stub reaches left */}
              <line x1="360" y1="500" x2="500" y2="500" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="500" r="4.5" fill="#f0ece1" />

              {/* Stage 03 — image on the right → stub reaches right */}
              <line x1="500" y1="833" x2="640" y2="833" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="833" r="6" fill="#f0ece1" />
              <circle cx="500" cy="833" r="11" stroke="#f0ece1" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
          </div>

          {/* Stages Grid (3 Rows) — one shared LogoStageRow component,
              so alignment, sizing and spacing cannot drift between stages. */}
          <div className="relative z-[1] flex flex-col gap-[clamp(1.75rem,3.25vh,3rem)]">
            {LOGO_STAGES.map((stage, i) => (
              <LogoStageRow key={stage.number} stage={stage} imageFirst={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TYPOGRAPHY — full-width typeface specimen
          Structure mirrors Comforto Section 2 (typeface.png strip).
          Content is 100% Brewly-specific.
          ════════════════════════════════════════════════════════════ */}
      <section
        className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(1.5rem,3vh,2.5rem)] pb-0"
        aria-label="Typography"
      >
        {/* Section label + intro — identical pattern to Comforto Section 2 */}
        <p className="font-mono text-[9px] tracking-[0.42em] uppercase text-white/[0.32] mb-[0.9rem] block">
          Typography System
        </p>
        <p className="font-display text-[clamp(0.82rem,1.1vw,0.96rem)] leading-[1.65] text-white/[0.48] max-w-[44rem] mb-[clamp(1.5rem,4vh,3rem)]">
          A deliberate typographic pairing: Daffiys as the bold, expressive display typeface for headline moments,
          complemented by Epilogue for clean, functional communication across packaging labels, menus, and collateral.
        </p>

        {/* Full-width typeface specimen image */}
        <div className="w-full rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img
            src="/images/brewly/typography.png"
            alt="BREWLY, Typography specimen: Daffiys (primary) and Epilogue (secondary)"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ALL MOCKUPS — logo trio + full gallery in one unified block.
          Single px wrapper, single gap token — zero separate sections.
          ════════════════════════════════════════════════════════════ */}
      <MockupFlow />

    </div>
  );
}

// ── MockupFlow — every image from logo trio to final card, Comforto spacing ────
// Spacing matches Comforto exactly:
//   OUTER_GAP = 8px between every mockup row/group  (Comforto: mb-[8px] / mt-[8px])
//   INNER_GAP = 8px between images inside multi-col rows  (Comforto: gap-[8px])
// Layout, image order, sizes, and aspect ratios are unchanged from Brewly.
function MockupFlow() {
  const OUTER_GAP = "8px";
  const INNER_GAP = "8px";
  const WRAP = "w-full rounded-[10px] overflow-hidden bg-[#0d0d0d]";

  return (
    <section
      className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(1.75rem,3vw,2.5rem)] pb-[clamp(4rem,8vh,7rem)]"
      aria-label="Mockup Gallery"
    >
      <div className="flex flex-col" style={{ gap: OUTER_GAP }}>

        {/* A — Logo Trio: logo_step3 | iconLogo | secondaryLogo (3-col, 1:1) */}
        <BrandReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: INNER_GAP }}>
            <div className={WRAP} style={{ aspectRatio: "1/1" }}>
              <img src="/images/brewly/logo_step3.png" alt="BREWLY, Final Logo" loading="lazy" decoding="async" className="w-full h-full object-contain block" />
            </div>
            <div className={WRAP} style={{ aspectRatio: "1/1" }}>
              <img src="/images/brewly/iconLogo.png" alt="BREWLY, Icon Logo" loading="lazy" decoding="async" className="w-full h-full object-contain block" />
            </div>
            <div className={WRAP} style={{ aspectRatio: "1/1" }}>
              <img src="/images/brewly/secondaryLogo.png" alt="BREWLY, Secondary Logo" loading="lazy" decoding="async" className="w-full h-full object-contain block" />
            </div>
          </div>
        </BrandReveal>

        {/* 01 — Storefront (16:9) */}
        <BrandReveal delay={60}>
          <div className={`${WRAP} aspect-video`}>
            <img src="/images/brewly/storefront.png" alt="BREWLY, Storefront" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
          </div>
        </BrandReveal>

        {/* 02 — Poster | Instore (2-col, 4:5) */}
        <BrandReveal delay={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: INNER_GAP }}>
            <div className={WRAP} style={{ aspectRatio: "4/5" }}>
              <img src="/images/brewly/poster.png" alt="BREWLY, Poster" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
            </div>
            <div className={WRAP} style={{ aspectRatio: "4/5" }}>
              <img src="/images/brewly/instore.png" alt="BREWLY, Instore" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
            </div>
          </div>
        </BrandReveal>

        {/* 03 — Storefront 2 (16:9) */}
        <BrandReveal delay={60}>
          <div className={`${WRAP} aspect-video`}>
            <img src="/images/brewly/storefront2.png" alt="BREWLY, Storefront 2" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
          </div>
        </BrandReveal>

        {/* 04 — Store Logo Sign | Apron (2-col, 4:5) */}
        <BrandReveal delay={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: INNER_GAP }}>
            <div className={WRAP} style={{ aspectRatio: "4/5" }}>
              <img src="/images/brewly/storelogosign.png" alt="BREWLY, Store Logo Sign" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
            </div>
            <div className={WRAP} style={{ aspectRatio: "4/5" }}>
              <img src="/images/brewly/apron.png" alt="BREWLY, Apron" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
            </div>
          </div>
        </BrandReveal>

        {/* 05 — Coffee Bean Package (16:9) */}
        <BrandReveal delay={60}>
          <div className={`${WRAP} aspect-video`}>
            <img src="/images/brewly/coffebeanPacakage.png" alt="BREWLY, Coffee Bean Package" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
          </div>
        </BrandReveal>

        {/* 06 — Cup 1 | Cup 2 | Cup 3 (3-col) */}
        <BrandReveal delay={60}>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: INNER_GAP }}>
            <div className={WRAP}><img src="/images/brewly/cupp1.png" alt="BREWLY, Cup 1" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
            <div className={WRAP}><img src="/images/brewly/cupp2.png" alt="BREWLY, Cup 2" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
            <div className={WRAP}><img src="/images/brewly/cupp3.png" alt="BREWLY, Cup 3" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
          </div>
        </BrandReveal>

        {/* 07 — T-Shirt (full-width, natural ratio) */}
        <BrandReveal delay={60}>
          <div className={WRAP}>
            <img src="/images/brewly/tshirt.jpg" alt="BREWLY, T-Shirt" loading="lazy" decoding="async" className="w-full h-auto block" />
          </div>
        </BrandReveal>

        {/* 08 — Package 1 | Package 2 | Package 3 (3-col) */}
        <BrandReveal delay={60}>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: INNER_GAP }}>
            <div className={WRAP}><img src="/images/brewly/package1.png" alt="BREWLY, Package 1" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
            <div className={WRAP}><img src="/images/brewly/package2.png" alt="BREWLY, Package 2" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
            <div className={WRAP}><img src="/images/brewly/package3.png" alt="BREWLY, Package 3" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
          </div>
        </BrandReveal>

        {/* 09 — Holding Bag | Hand Box (2-col) */}
        <BrandReveal delay={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: INNER_GAP }}>
            <div className={WRAP}><img src="/images/brewly/holding_bag.jpg" alt="BREWLY, Holding Bag" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
            <div className={WRAP}><img src="/images/brewly/handBox.jpg" alt="BREWLY, Hand Box" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
          </div>
        </BrandReveal>

        {/* 10 — Business Card (full-width) */}
        <BrandReveal delay={60}>
          <div className={WRAP}>
            <img src="/images/brewly/businessCard.jpg" alt="BREWLY, Business Card" loading="lazy" decoding="async" className="w-full h-auto block" />
          </div>
        </BrandReveal>

        {/* 11 — Handing Card | Thank You Card (2-col) */}
        <BrandReveal delay={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: INNER_GAP }}>
            <div className={WRAP}><img src="/images/brewly/handingCard.png" alt="BREWLY, Handing Card" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
            <div className={WRAP}><img src="/images/brewly/thankyoucard.jpg" alt="BREWLY, Thank You Card" loading="lazy" decoding="async" className="w-full h-auto block" /></div>
          </div>
        </BrandReveal>

      </div>
    </section>
  );
}

// ── BrandReveal — subtle fade+rise on scroll into view ───────────────────────
// Uses IntersectionObserver only. No GSAP, no new animation library.
// Respects prefers-reduced-motion. Same threshold / easing feel as the
// rest of the portfolio's micro-interactions.

function BrandReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

export default BrewlyProject;


