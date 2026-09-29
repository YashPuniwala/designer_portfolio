// ComfortoProject.tsx — COMFORTO branding case study
// VARIANT 3 — stays true to the ORIGINAL vertical, alternating zig-zag
// concept (unlike the horizontal "blueprint index" alternative), but swaps
// the winding S-curve for a single straight center spine with short branch
// stubs reaching out to each stage's image. Section 2 is unchanged.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ComfortoProject(_props?: any) {
  return (
    <div className="bg-[#050505] text-white">
      <ComfortoCaseStudy />
    </div>
  );
}

// ── Shared tokens for the 4-stage timeline ─────────────────────────────────
// One source for all four stages: sizing, spacing and image treatment are
// identical by construction — no per-stage drift is possible.
// No card, no border, no background fill — just a fixed-size stage so every
// logo image sits directly on the section's dark background at a consistent
// visual scale, instead of being boxed in a container.
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

const LOGO_STAGES: Stage[] = [
  {
    number: "01",
    title: "Initial Concept",
    description:
      "Brainstorming a comprehensive emblem that captures the architectural nature of interior structures and the core COMFORTO identity. Early explorations tested wordmark proportions and spatial silhouettes to find a solid design foundation.",
    image: "/images/comforto/logo_step1.png",
    alt: "COMFORTO — Initial Concept",
  },
  {
    number: "02",
    title: "Refinement",
    description:
      "Stripping away extraneous layers to isolate a bold, high-impact wordmark built for maximum legibility at any scale. While the typography was strong, the standalone letters were tuned to uniquely communicate serene modern aesthetics.",
    image: "/images/comforto/logo_step2.png",
    alt: "COMFORTO — Refinement",
  },
  {
    number: "03",
    title: "Structure",
    description:
      "Locking the construction grid and geometric curvature. The mark was engineered with exact mathematical proportions and spatial tolerances to ensure balance across large-scale physical signages and engraved textures.",
    image: "/images/comforto/logo_step3.png",
    alt: "COMFORTO — Structure",
  },
  {
    number: "04",
    title: "Final Logo",
    description:
      "Distilling the entire process into a refined, iconic velocity mark engineered to fit cleanly on luxury furniture tags, architectural specifications, and bespoke digital brand touchpoints.",
    image: "/images/comforto/logo_mark(logo_step4).png",
    alt: "COMFORTO — Final Logo Mark",
  },
];

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

function ComfortoCaseStudy() {
  return (
    <div className="bg-[#050505] text-white p-0">

      {/* ════════════════════════════════════════════════════════════
          1. LOGO DEVELOPMENT — straight center spine + branch stubs
          ════════════════════════════════════════════════════════════ */}
      <section
        className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(2.5rem,5vh,4rem)] pb-[clamp(2.5rem,5vh,4rem)]"
        aria-label="Logo Development"
      >
        {/* Section Heading & Intro */}
        <div className="mb-[clamp(2rem,4vh,3.25rem)]">
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,2.8vw,2.4rem)] text-white tracking-tight uppercase mb-3">
            Logo Design
          </h2>
          <p className="font-body text-[clamp(0.95rem,1.15vw,1.05rem)] font-medium text-white/90 leading-[1.6] max-w-[50rem] mb-2">
            The mark needed to feel as timeless, structured, and calm as architectural space itself.
          </p>
          <p className="font-body text-[clamp(0.85rem,1.02vw,0.95rem)] leading-[1.7] text-white/55 max-w-[54rem]">
            I explored compact forms, spatial proportions, and geometric reduction to create a mark with enough visual weight to stand out on physical architectural hardware and furniture tags, while staying pure enough to remain crystal clear at smaller digital sizes.
          </p>
        </div>

        {/* ── 4-Stage Alternating Timeline Container ── */}
        <div className="relative">

          {/* Straight center spine + branch stubs (Desktop / Tablet).
              A single vertical line runs down the exact horizontal center
              of the grid; a short horizontal stub reaches from the spine
              into whichever column holds that stage's image, with a node
              where the stub meets the spine. Every stage occupies an even
              25% vertical band, so this stays in sync regardless of the
              row's actual pixel height. */}
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
              <line x1="500" y1="125" x2="640" y2="125" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="125" r="5.5" fill="#f0ece1" />
              <circle cx="500" cy="125" r="9" stroke="#f0ece1" strokeWidth="1" strokeOpacity="0.3" />

              {/* Stage 02 — image on the left → stub reaches left */}
              <line x1="360" y1="375" x2="500" y2="375" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="375" r="4.5" fill="#f0ece1" />

              {/* Stage 03 — image on the right → stub reaches right */}
              <line x1="500" y1="625" x2="640" y2="625" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="625" r="4.5" fill="#f0ece1" />

              {/* Stage 04 — image on the left → stub reaches left */}
              <line x1="360" y1="875" x2="500" y2="875" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="875" r="6" fill="#f0ece1" />
              <circle cx="500" cy="875" r="11" stroke="#f0ece1" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
          </div>

          {/* Stages Grid (4 Rows) — rendered from one shared row component,
              so alignment, sizing and spacing cannot drift between stages. */}
          <div className="relative z-[1] flex flex-col gap-[clamp(1.75rem,3.25vh,3rem)]">
            {LOGO_STAGES.map((stage, i) => (
              <LogoStageRow key={stage.number} stage={stage} imageFirst={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          2. VISUAL IDENTITY & MOCKUPS
          ════════════════════════════════════════════════════════════ */}
      <section
        className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(1.5rem,3vh,2.5rem)] pb-[clamp(3rem,6vh,5rem)]"
        aria-label="Visual Identity and Mockups"
      >
        <p className="font-mono text-[9px] tracking-[0.42em] uppercase text-white/[0.32] mb-[0.9rem] block">
          Visual Identity &amp; Mockups
        </p>
        <p className="font-display text-[clamp(0.82rem,1.1vw,0.96rem)] leading-[1.65] text-white/[0.48] max-w-[44rem] mb-[clamp(1.5rem,4vh,3rem)]">
          A complete visual language — typeface, colour system and brand
          application across every surface.
        </p>

        {/* 02. TYPEFACE — full-width */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img
            src="/images/comforto/typeface.png"
            alt="COMFORTO — Typeface"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* 03. COLOUR PALETTE — full-width */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img
            src="/images/comforto/color_pallete.png"
            alt="COMFORTO — Colour palette"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* 04. LOGO VARIATIONS — seamless horizontal brand-system strip */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden grid grid-cols-3 gap-0 max-[600px]:grid-cols-1">
          <img
            src="/images/comforto/logo.png"
            alt="COMFORTO — Primary logo"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
          <img
            src="/images/comforto/logo2.png"
            alt="COMFORTO — Logo mark"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
          <img
            src="/images/comforto/logo3.png"
            alt="COMFORTO — Submark logo"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* 05. ILLUSTRATOR — full-width */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img
            src="/images/comforto/illustrator.png"
            alt="COMFORTO — Illustrator / logo construction"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* 06. IMAGE GRID — 2x2 at 4:5 portrait ratio */}
        <div className="grid grid-cols-2 gap-[8px] items-start max-[480px]:grid-cols-1">
          <div className="min-w-0 aspect-[4/5] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/comforto/chair_logo.png"
              alt="COMFORTO — Chair with logo application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
          <div className="min-w-0 aspect-[4/5] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/comforto/app_icon.png"
              alt="COMFORTO — App icon"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
          <div className="min-w-0 aspect-[4/5] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/comforto/color_illus.png"
              alt="COMFORTO — Colour illustration"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
          <div className="min-w-0 aspect-[4/5] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/comforto/app_icon2.png"
              alt="COMFORTO — App icon variant"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
        </div>

        {/* ── 07. POSTER — full-width ───────────────────────────────── */}
        <div className="w-full mt-[8px] rounded-[10px] overflow-hidden">
          <img
            src="/images/comforto/poster2.png"
            alt="COMFORTO — Brand poster"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* ── 08. CAP + SOFA 3 — two-column pair ───────────────────── */}
        <div className="grid grid-cols-2 gap-[8px] mt-[8px] items-start max-[480px]:grid-cols-1">
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/cap.png"
              alt="COMFORTO — Cap brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/sofa3.png"
              alt="COMFORTO — Sofa brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* ── 09. BUSINESS CARD — full-width ───────────────────────── */}
        <div className="w-full mt-[8px] rounded-[10px] overflow-hidden">
          <img
            src="/images/comforto/busineiss_card.png"
            alt="COMFORTO — Business card"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* ── 10. STORE BANNER — full-width ────────────────────────── */}
        <div className="w-full mt-[8px] rounded-[10px] overflow-hidden">
          <img
            src="/images/comforto/store_banner.jpg"
            alt="COMFORTO — Store banner"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* ── 11. INSTA + SOFA — two-column pair ───────────────────── */}
        <div className="grid grid-cols-2 gap-[8px] mt-[8px] items-start max-[480px]:grid-cols-1">
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/insta.png"
              alt="COMFORTO — Instagram brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/sofa.png"
              alt="COMFORTO — Sofa brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* ── 12. BOOK — full-width ─────────────────────────────────── */}
        <div className="w-full mt-[8px] rounded-[10px] overflow-hidden">
          <img
            src="/images/comforto/book.png"
            alt="COMFORTO — Brand book"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* ── 13. LETTER + WEBSITE — two-column pair ───────────────── */}
        <div className="grid grid-cols-2 gap-[8px] mt-[8px] items-start max-[480px]:grid-cols-1">
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/letter.png"
              alt="COMFORTO — Letter brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/website.png"
              alt="COMFORTO — Website brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* ── 14. PRICE — full-width ────────────────────────────────── */}
        <div className="w-full mt-[8px] rounded-[10px] overflow-hidden">
          <img
            src="/images/comforto/price.png"
            alt="COMFORTO — Price presentation"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* ── 15. TEXT + SOFA 4 — two-column pair ──────────────────── */}
        <div className="grid grid-cols-2 gap-[8px] mt-[8px] items-start max-[480px]:grid-cols-1">
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/text.png"
              alt="COMFORTO — Text brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/sofa4.png"
              alt="COMFORTO — Sofa brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* ── 16. SOFA + SOFA 6 — two-column pair ──────────────────── */}
        <div className="grid grid-cols-2 gap-[8px] mt-[8px] items-start max-[480px]:grid-cols-1">
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/sofa.png"
              alt="COMFORTO — Sofa brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
          <div className="min-w-0 rounded-[10px] overflow-hidden">
            <img
              src="/images/comforto/sofa6.png"
              alt="COMFORTO — Sofa brand application variant"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* ── 17. FINAL THANK YOU — full-width ─────────────────────── */}
        <div className="w-full mt-[8px] rounded-[10px] overflow-hidden">
          <img
            src="/images/comforto/thankyou.png"
            alt="COMFORTO — Thank you"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

      </section>

    </div>
  );
}

export default ComfortoProject;