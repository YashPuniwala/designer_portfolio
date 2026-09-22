import { useRef } from "react";

/**
 * aspectRatio: width ÷ height of the source artwork.
 *
 * All cards share one fixed height defined by --card-h in CSS.
 * Each card's width = calc(--card-h * aspectRatio) so every artwork
 * fills its card at its natural proportions — no stretching or heavy crop.
 *
 * The GSAP horizontal scroll in App.tsx reads track.scrollWidth
 * dynamically, so adding or removing cards is automatically accounted for.
 */

type Artwork = {
  /** Unique key — not shown on card */
  id: string;
  /** Shown on card: concise professional category */
  category: string;
  /** Shown on card: year */
  year: string;
  image: string;
  /** Accent color for the category label */
  color: string;
  /** width ÷ height of the source image */
  aspectRatio: number;
  /** CSS object-position — keeps the most important region visible */
  objectPosition?: string;
};

const ARTWORKS: Artwork[] = [
  {
    id: "ootd",
    category: "Editorial Design",
    year: "2024",
    image: "/horizontal_images/outfit_of_the_day.png",
    color: "#ff8a3c",
    aspectRatio: 1086 / 1448, // ~0.75 — portrait
    objectPosition: "center top",
  },
  {
    id: "aesthetically",
    category: "Visual Exploration",
    year: "2024",
    image: "/horizontal_images/aesthetically.png",
    color: "#7c9cff",
    aspectRatio: 1223 / 1286, // ~0.95 — near square
    objectPosition: "center center",
  },
  {
    id: "she",
    category: "Art Direction",
    year: "2023",
    image: "/horizontal_images/she.png",
    color: "#ff5d8f",
    aspectRatio: 4571 / 6588, // ~0.69 — portrait
    objectPosition: "center top",
  },
  {
    id: "momo",
    category: "Illustration",
    year: "2023",
    image: "/horizontal_images/momo.png",
    color: "#5fe0c5",
    aspectRatio: 3579 / 5032, // ~0.71 — portrait
    objectPosition: "center top",
  },
  {
    id: "burger",
    category: "Product Visuals",
    year: "2023",
    image: "/horizontal_images/burger.png",
    color: "#ffd166",
    aspectRatio: 1122 / 1402, // ~0.80 — portrait
    objectPosition: "center center",
  },
  {
    id: "phone",
    category: "Graphic Design",
    year: "2022",
    image: "/horizontal_images/phone.png",
    color: "#c08bff",
    aspectRatio: 1122 / 1402, // ~0.80 — portrait
    objectPosition: "center center",
  },
  {
    id: "perfume",
    category: "Campaign Artwork",
    year: "2022",
    image: "/horizontal_images/perfume.png",
    color: "#ff8a3c",
    aspectRatio: 1122 / 1402, // ~0.80 — portrait
    objectPosition: "center center",
  },
];

export default function HorizontalSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const progressRef = useRef<HTMLSpanElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="horizontal-section"
      aria-label="Selected Work"
    >
      <div className="horizontal-track">
        {/* ── Intro panel ─────────────────────────────────────────── */}
        <div className="horizontal-intro flex h-full w-[88vw] shrink-0 flex-col justify-center px-6 md:w-[44vw] md:px-16">
          {/* Label */}
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
            Selected Work
          </p>

          {/* Display headline */}
          <h2 className="font-display text-[13vw] font-bold uppercase leading-[0.88] tracking-tight text-white md:text-[7vw]">
            Visual
            <br />
            <span className="text-outline">Works</span>
          </h2>

          {/* Descriptor */}
          <p className="mt-7 max-w-[32ch] text-sm leading-relaxed text-white/55 md:text-base">
            Illustration, graphic compositions, visual identities, and
            experimental artwork created to make ideas impossible to ignore.
          </p>

          {/* Scroll cue */}
          <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            <span>Scroll sideways</span>
            <span className="inline-block h-px w-16 bg-white/25" />
          </div>
        </div>

        {/* ── Artwork cards ────────────────────────────────────────── */}
        {/*
         * Height comes from --card-h (CSS custom prop on .horizontal-track).
         * Width = calc(--card-h × aspectRatio) — set inline per card so each
         * piece of artwork occupies its natural proportions.
         * All cards share the same top/bottom edge: a true editorial gallery.
         */}
        {ARTWORKS.map((art) => (
          <article
            key={art.id}
            className="horizontal-card group relative shrink-0 overflow-hidden rounded-2xl"
            style={{
              height: "var(--card-h)",
              width: `calc(var(--card-h) * ${art.aspectRatio.toFixed(4)})`,
            }}
          >
            {/* Artwork image */}
            <img
              src={art.image}
              alt={art.category}
              className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                objectFit: "cover",
                objectPosition: art.objectPosition ?? "center center",
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20" />

            {/* Metadata — only category + year, no number or title */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.35em]"
                style={{ color: art.color }}
              >
                {art.category}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-white/45">
                {art.year}
              </p>
            </div>
          </article>
        ))}

        {/* ── Outro / CTA panel ───────────────────────────────────── */}
        {/*
         * pr-[6vw] mirrors the track's right padding so the CTA text lands
         * fully inside the scrollable area and is never clipped.
         * The GSAP tween measures track.scrollWidth - window.innerWidth
         * dynamically, so this panel is always fully reachable regardless
         * of how many cards are in the track.
         */}
        <div className="horizontal-outro flex h-full w-[80vw] shrink-0 flex-col items-start justify-center pl-6 pr-[6vw] md:w-[44vw] md:pl-16 md:pr-[6vw]">
          <h2 className="font-display text-[8.5vw] font-bold uppercase leading-[0.9] text-white md:text-[4.5vw]">
            Let's build
            <br />
            something
            <br />
            <span className="text-amber-glow">impossible</span>
            <br />
            to ignore.
          </h2>
          <a
            href="#home"
            className="mt-10 inline-flex items-center gap-3 border border-white/25 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Start a project <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <span
          ref={progressRef}
          className="horizontal-progress block h-full origin-left scale-x-0 bg-amber-glow"
        />
      </div>
    </section>
  );
}
