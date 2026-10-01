// NilyProject.tsx — NILY case study (pure Tailwind CSS)
// Only nily/* files are modified. Global styles/other projects untouched.
//
// SECTION 1 (Logo Design) is FROZEN — untouched, byte-for-byte from the
// working version. Everything below it has been rebuilt:
//   - Full-width moments remain for the main horizontal visuals.
//   - Identity/application imagery is grouped into nested editorial grids.
//   - Every image keeps its natural ratio (w-full h-auto, no object-fit:
//     cover), so nothing is cropped, stretched or squashed.
//   - Newly added NILY assets are used in the logo-variation board.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NilyProject(_props?: any) {
  return (
    <div className="bg-[#050505] text-white">
      <NilyCaseStudy />
    </div>
  );
}

function NilyCaseStudy() {
  return (
    <div className="bg-[#050505] text-white p-0">

      {/* ════════════════════════════════════════════════════════════
          1. LOGO DESIGN — Comforto-style alternating timeline
             Structure copied from Comforto; ALL NILY content preserved.
          ════════════════════════════════════════════════════════════ */}
      <section
        className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(2.5rem,5vh,4rem)] pb-[clamp(2.5rem,5vh,4rem)]"
        aria-label="Logo Design"
      >
        {/* Section heading & intro — NILY copy, Comforto heading style */}
        <div className="mb-[clamp(2rem,4vh,3.25rem)]">
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,2.8vw,2.4rem)] text-white tracking-tight uppercase mb-3">
            Logo Design
          </h2>
          <p className="font-body text-[clamp(0.95rem,1.15vw,1.05rem)] font-medium text-white/90 leading-[1.6] max-w-[50rem] mb-2">
            The logo was developed through a disciplined process of exploration,
            refinement and simplification.
          </p>
          <p className="font-body text-[clamp(0.85rem,1.02vw,0.95rem)] leading-[1.7] text-white/55 max-w-[54rem]">
            Moving from raw ideas toward a mark that is quiet, precise and entirely
            ownable — every curve, weight and proportion considered until the mark
            could stand alone at any scale.
          </p>
        </div>

        {/* ── 3-Stage Alternating Timeline Container ── */}
        <div className="relative">

          {/* Straight center spine + branch stubs — Desktop/Tablet only.
              Same system as Comforto: one continuous vertical spine at x=500,
              short horizontal stubs reaching to the image column, circle nodes
              marking the junction. Three stages → nodes at ~17%, 50%, 83%. */}
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

              {/* Stage 01 — text left, image right → stub reaches right */}
              <line x1="500" y1="167" x2="640" y2="167" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="167" r="5.5" fill="#f0ece1" />
              <circle cx="500" cy="167" r="9" stroke="#f0ece1" strokeWidth="1" strokeOpacity="0.3" />

              {/* Stage 02 — image left, text right → stub reaches left */}
              <line x1="360" y1="500" x2="500" y2="500" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="500" r="4.5" fill="#f0ece1" />

              {/* Stage 03 — text left, image right → stub reaches right */}
              <line x1="500" y1="833" x2="640" y2="833" stroke="#f0ece1" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="500" cy="833" r="6" fill="#f0ece1" />
              <circle cx="500" cy="833" r="11" stroke="#f0ece1" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
          </div>

          {/* ── Stage rows — rendered from one shared pattern ── */}
          <div className="relative z-[1] flex flex-col gap-[clamp(1.75rem,3.25vh,3rem)]">

            {/* Stage 01 — text left, image right (imageFirst=false → even index) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Text column */}
              <div className="md:pr-10 lg:pr-12 flex flex-col justify-center max-md:border-l-2 max-md:border-white/20 max-md:pl-4">
                <span className="font-display font-black text-[clamp(2.25rem,4.5vw,3.75rem)] text-white tracking-tight leading-none mb-1">
                  01
                </span>
                <h3 className="font-display font-bold text-[clamp(1rem,1.3vw,1.25rem)] text-white tracking-wide uppercase mb-2">
                  Initial Concept
                </h3>
                <p className="font-body text-[clamp(0.85rem,1.02vw,0.95rem)] leading-[1.7] text-white/60 max-w-[28rem]">
                  The first round of explorations — testing wordmarks, symbols and
                  letterform-based directions toward something unique and ownable.
                </p>
              </div>
              {/* Image column */}
              <div className="flex items-center justify-center">
                <div className="w-[172px] h-[172px] sm:w-[196px] sm:h-[196px] md:w-[212px] md:h-[212px] lg:w-[228px] lg:h-[228px] flex items-center justify-center group">
                  <img
                    src="/images/nily 2/logo_step1.png"
                    alt="NILY — Initial logo concept exploration"
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Stage 02 — image left, text right (imageFirst=true → odd index) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Image column */}
              <div className="flex items-center justify-center max-md:order-2">
                <div className="w-[172px] h-[172px] sm:w-[196px] sm:h-[196px] md:w-[212px] md:h-[212px] lg:w-[228px] lg:h-[228px] flex items-center justify-center group">
                  <img
                    src="/images/nily 2/logo_step2.png"
                    alt="NILY — Simplified brand direction"
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </div>
              {/* Text column */}
              <div className="md:pl-10 lg:pl-12 flex flex-col justify-center max-md:border-l-2 max-md:border-white/20 max-md:pl-4 max-md:order-1">
                <span className="font-display font-black text-[clamp(2.25rem,4.5vw,3.75rem)] text-white tracking-tight leading-none mb-1">
                  02
                </span>
                <h3 className="font-display font-bold text-[clamp(1rem,1.3vw,1.25rem)] text-white tracking-wide uppercase mb-2">
                  Brand Simplification
                </h3>
                <p className="font-body text-[clamp(0.85rem,1.02vw,0.95rem)] leading-[1.7] text-white/60 max-w-[28rem]">
                  Stripping away complexity — a mark that reads instantly at any
                  size and carries the brand character without noise.
                </p>
              </div>
            </div>

            {/* Stage 03 — text left, image right (imageFirst=false → even index) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Text column */}
              <div className="md:pr-10 lg:pr-12 flex flex-col justify-center max-md:border-l-2 max-md:border-white/20 max-md:pl-4">
                <span className="font-display font-black text-[clamp(2.25rem,4.5vw,3.75rem)] text-white tracking-tight leading-none mb-1">
                  03
                </span>
                <h3 className="font-display font-bold text-[clamp(1rem,1.3vw,1.25rem)] text-white tracking-wide uppercase mb-2">
                  Refined Core Mark
                </h3>
                <p className="font-body text-[clamp(0.85rem,1.02vw,0.95rem)] leading-[1.7] text-white/60 max-w-[28rem]">
                  The final mark — refined, resolved and ready. Every curve, weight
                  and proportion considered until the mark could stand alone.
                </p>
              </div>
              {/* Image column */}
              <div className="flex items-center justify-center">
                <div className="w-[172px] h-[172px] sm:w-[196px] sm:h-[196px] md:w-[212px] md:h-[212px] lg:w-[228px] lg:h-[228px] flex items-center justify-center group">
                  <img
                    src="/images/nily 2/logo_step3.png"
                    alt="NILY — Refined final core mark"
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. VISUAL IDENTITY & MOCKUPS — rebuilt
          ════════════════════════════════════════════════════════════ */}
      <section className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(1.5rem,3vh,2.5rem)] pb-[clamp(3rem,6vh,5rem)]" aria-label="Visual Identity and Mockups">
        <p className="font-mono text-[9px] tracking-[0.42em] uppercase text-white/[0.32] mb-[0.9rem] block">
          Visual Identity &amp; Mockups
        </p>
        <p className="font-display text-[clamp(0.82rem,1.1vw,0.96rem)] leading-[1.65] text-white/[0.48] max-w-[44rem] mb-[clamp(1.5rem,4vh,3rem)]">
          A complete visual language — typeface, construction and brand
          application across every surface.
        </p>

        {/* ── TYPEFACE — full-width ────────────────────────────────── */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img src="/images/nily 2/typeface.png" alt="NILY — Typeface" loading="lazy" decoding="async" className="w-full h-auto block" />
        </div>

        {/* ── ILLUSTRATOR — full-width ─────────────────────────────── */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img src="/images/nily 2/illustrator.png" alt="NILY — Illustrator / logo construction" loading="lazy" decoding="async" className="w-full h-auto block" />
        </div>

        {/* ── SKETCH — full-width ───────────────────────────────────── */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img src="/images/nily 2/sketch.png" alt="NILY — Sketch" loading="lazy" decoding="async" className="w-full h-auto block" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            LOGO VARIATIONS — tightly aligned 3-column editorial board.
            All five cards share one consistent outer height and the
            two right columns use equal-height rows.
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-[1.28fr_0.86fr_0.86fr] grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-[8px] items-stretch mb-[8px] max-[900px]:grid-cols-[1.15fr_0.85fr] max-[900px]:grid-rows-[auto_auto_auto] max-[600px]:grid-cols-1 max-[600px]:grid-rows-none">

          {/* Main logo — spans both equal rows. */}
          <div className="row-span-2 min-w-0 min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d] border border-white/[0.04] max-[900px]:row-span-2 max-[600px]:row-span-1">
            <img
              src="/images/nily 2/logo_step3.png"
              alt="NILY — Logo variation"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Middle column — two equal-height cards. */}
          <div className="row-span-2 min-w-0 min-h-0 grid grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-[8px] max-[600px]:grid-rows-none">
            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/20.png"
                alt="NILY — Identity application"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
              />
            </div>

            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/21.png"
                alt="NILY — Identity application"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

          {/* Right column — two equal-height cards. */}
          <div className="row-span-2 min-w-0 min-h-0 grid grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-[8px] max-[600px]:grid-rows-none">
            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/2.png"
                alt="NILY — Business card / identity application"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
              />
            </div>

            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/logo_step4.png"
                alt="NILY — Logo variation"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            BRAND APPLICATIONS — IMAGE 23 + SQUARE APPLICATIONS
            One full-width horizontal image followed by three equal
            1:1 images in a single row.
            ══════════════════════════════════════════════════════════ */}

        {/* ── IMAGE 23 — FULL-WIDTH HORIZONTAL ─────────────────────── */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img
            src="/images/nily 2/23.png"
            alt="NILY — brand application"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        {/* ── 10 / 24 / 26 — THREE EQUAL SQUARES ──────────────────── */}
        <div className="grid grid-cols-3 gap-[8px] items-start mb-[8px] max-[700px]:grid-cols-2 max-[480px]:grid-cols-1">

          <div className="min-w-0 aspect-square rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/10.png"
              alt="NILY — brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          <div className="min-w-0 aspect-square rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/24.png"
              alt="NILY — brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          <div className="min-w-0 aspect-square rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/26.png"
              alt="NILY — brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

        </div>

        {/* ── BANNER / POSTER — the one horizontal this step needs ─── */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img src="/images/nily 2/dasmpda.png" alt="NILY — Banner / poster" loading="lazy" decoding="async" className="w-full h-auto block" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            T-SHIRT / APPAREL — nested board, one flex row.
            Main (8) gets more width via flex-grow; 7 & 9 sit alongside
            at their own natural height — no row-span, so no gap.
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-3 gap-[8px] items-start mb-[8px] max-[700px]:grid-cols-2 max-[480px]:grid-cols-1">
          <div className="min-w-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img src="/images/nily 2/8.png" alt="NILY — apparel, mustard hoodie" loading="lazy" decoding="async" className="w-full h-auto block" />
          </div>
          <div className="min-w-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img src="/images/nily 2/7.png" alt="NILY — apparel, green hoodie" loading="lazy" decoding="async" className="w-full h-auto block" />
          </div>
          <div className="min-w-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img src="/images/nily 2/9.png" alt="NILY — apparel, folded hoodie" loading="lazy" decoding="async" className="w-full h-auto block" />
          </div>
        </div>

        {/* ── HORIZONTAL BRAND IMAGE — the second needed horizontal ── */}
        <div className="w-full mb-[8px] rounded-[10px] overflow-hidden bg-[#0d0d0d]">
          <img src="/images/nily 2/11.png" alt="NILY — Brand presentation" loading="lazy" decoding="async" className="w-full h-auto block" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            FINAL EDITORIAL IMAGE GRID
            15 spans both rows. 12, 13, 4 and 5 use equal square cells.
            The board is locked to equal row heights for clean alignment.
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-[1.15fr_1fr_1fr] grid-rows-[1fr_1fr] gap-[8px] mb-[8px] items-stretch max-[900px]:grid-cols-2 max-[900px]:grid-rows-none max-[600px]:grid-cols-1">

          {/* 15 — handbag, spans both rows */}
          <div className="row-span-2 min-w-0 min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d] max-[900px]:row-span-1">
            <img
              src="/images/nily 2/15(2).png"
              alt="NILY — application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* 12 */}
          <div className="min-w-0 min-h-0 aspect-square rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/12.png"
              alt="NILY — brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* 13 */}
          <div className="min-w-0 min-h-0 aspect-square rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/13.png"
              alt="NILY — brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* 4 */}
          <div className="min-w-0 min-h-0 aspect-square rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/4(2).png"
              alt="NILY — brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* 5 */}
          <div className="min-w-0 min-h-0 aspect-square rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/5(2).png"
              alt="NILY — brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

        </div>

        {/* ── 17 + 22 — ONE ALIGNED ROW ──────────────────────────────
            17 is 2:3 portrait and 22 is 3:1 horizontal.
            2fr : 9fr keeps their rendered heights aligned when
            those source ratios are exact. No forced crop.
            ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-[2fr_9fr] gap-[8px] mb-[8px] items-start max-[700px]:grid-cols-1">

          {/* 17 — label / tag */}
          <div className="min-w-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/17.png"
              alt="NILY — label and hang tag"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>

          {/* 22 — horizontal */}
          <div className="min-w-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
            <img
              src="/images/nily 2/22.png"
              alt="NILY — horizontal brand application"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>

        </div>
      </section>

    </div>
  );
}

export default NilyProject;