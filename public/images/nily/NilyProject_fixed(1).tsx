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
          1. LOGO DESIGN — FROZEN, do not modify
          ════════════════════════════════════════════════════════════ */}
      <section className="max-w-[80rem] mx-auto px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(2.5rem,5vh,4rem)] pb-0" aria-label="Logo Design">
        <p className="font-mono text-[9px] tracking-[0.42em] uppercase text-white/[0.32] mb-[0.9rem] block">
          Logo Design
        </p>
        <p className="font-display text-[clamp(0.82rem,1.1vw,0.96rem)] leading-[1.65] text-white/[0.48] max-w-[44rem] mb-[clamp(1.5rem,4vh,3rem)]">
          The logo was developed through a disciplined process of exploration,
          refinement and simplification — moving from raw ideas toward a mark
          that is quiet, precise and entirely ownable.
        </p>

        <div className="relative flex flex-col gap-[clamp(1.5rem,4vh,3rem)] mb-[clamp(1.5rem,4vh,3rem)]">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-full pointer-events-none z-0 max-[600px]:hidden" aria-hidden="true">
            <svg
              className="w-full h-full block"
              viewBox="0 0 100 900"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 50 0 L 50 80 Q 50 110 20 110 L 20 160 Q 20 180 50 180 L 50 340 Q 50 370 80 370 L 80 420 Q 80 440 50 440 L 50 620 Q 50 650 20 650 L 20 700 Q 20 720 50 720 L 50 900"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="relative z-[1] grid grid-cols-[1fr_40px_1fr] max-[900px]:grid-cols-[1fr_28px_1fr] max-[600px]:flex max-[600px]:flex-col gap-x-[clamp(1rem,2.5vw,2rem)] max-[900px]:gap-x-[0.75rem] max-[600px]:gap-y-[1rem] items-center max-[600px]:items-start">
            <div className="col-start-1 row-start-1 text-right max-[600px]:text-left pr-[clamp(0.75rem,2vw,2rem)] max-[600px]:p-0 max-[600px]:m-0 max-[600px]:order-1">
              <span className="block font-display font-bold text-[clamp(2rem,5vw,4rem)] tracking-[-0.04em] leading-[0.85] text-white/[0.05] mb-[0.4rem] select-none pointer-events-none">01</span>
              <h3 className="font-display font-bold text-[clamp(0.82rem,1.2vw,1rem)] tracking-[0.01em] text-white/90 uppercase mb-[0.4rem]">Initial Concept</h3>
              <p className="font-body text-[clamp(0.74rem,0.9vw,0.84rem)] leading-[1.65] text-white/40 max-w-[22rem] max-[600px]:max-w-none ml-auto max-[600px]:ml-0">
                The first round of explorations — testing wordmarks, symbols and
                letterform-based directions toward something unique and ownable.
              </p>
            </div>
            <div className="col-start-2 row-start-1 w-[8px] h-[8px] rounded-full bg-white/[0.18] border-[1.5px] border-white/40 mx-auto shrink-0 relative z-[2] max-[600px]:hidden" aria-hidden="true" />
            <div className="col-start-3 row-start-1 max-[600px]:order-2 rounded-[10px] overflow-hidden bg-[#0d0d0d] border border-white/[0.06] group">
              <img
                src="/images/nily 2/logo_step1.png"
                alt="NILY — Initial logo concept exploration"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="relative z-[1] grid grid-cols-[1fr_40px_1fr] max-[900px]:grid-cols-[1fr_28px_1fr] max-[600px]:flex max-[600px]:flex-col gap-x-[clamp(1rem,2.5vw,2rem)] max-[900px]:gap-x-[0.75rem] max-[600px]:gap-y-[1rem] items-center max-[600px]:items-start">
            <div className="col-start-1 row-start-1 max-[600px]:order-2 rounded-[10px] overflow-hidden bg-[#0d0d0d] border border-white/[0.06] group">
              <img
                src="/images/nily 2/logo_step2.png"
                alt="NILY — Simplified brand direction"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
            </div>
            <div className="col-start-2 row-start-1 w-[8px] h-[8px] rounded-full bg-white/[0.18] border-[1.5px] border-white/40 mx-auto shrink-0 relative z-[2] max-[600px]:hidden" aria-hidden="true" />
            <div className="col-start-3 row-start-1 text-left pl-[clamp(0.75rem,2vw,2rem)] max-[600px]:p-0 max-[600px]:m-0 max-[600px]:order-1">
              <span className="block font-display font-bold text-[clamp(2rem,5vw,4rem)] tracking-[-0.04em] leading-[0.85] text-white/[0.05] mb-[0.4rem] select-none pointer-events-none">02</span>
              <h3 className="font-display font-bold text-[clamp(0.82rem,1.2vw,1rem)] tracking-[0.01em] text-white/90 uppercase mb-[0.4rem]">Brand Simplification</h3>
              <p className="font-body text-[clamp(0.74rem,0.9vw,0.84rem)] leading-[1.65] text-white/40 max-w-[22rem] max-[600px]:max-w-none">
                Stripping away complexity — a mark that reads instantly at any
                size and carries the brand character without noise.
              </p>
            </div>
          </div>

          <div className="relative z-[1] grid grid-cols-[1fr_40px_1fr] max-[900px]:grid-cols-[1fr_28px_1fr] max-[600px]:flex max-[600px]:flex-col gap-x-[clamp(1rem,2.5vw,2rem)] max-[900px]:gap-x-[0.75rem] max-[600px]:gap-y-[1rem] items-center max-[600px]:items-start">
            <div className="col-start-1 row-start-1 text-right max-[600px]:text-left pr-[clamp(0.75rem,2vw,2rem)] max-[600px]:p-0 max-[600px]:m-0 max-[600px]:order-1">
              <span className="block font-display font-bold text-[clamp(2rem,5vw,4rem)] tracking-[-0.04em] leading-[0.85] text-white/[0.05] mb-[0.4rem] select-none pointer-events-none">03</span>
              <h3 className="font-display font-bold text-[clamp(0.82rem,1.2vw,1rem)] tracking-[0.01em] text-white/90 uppercase mb-[0.4rem]">Refined Core Mark</h3>
              <p className="font-body text-[clamp(0.74rem,0.9vw,0.84rem)] leading-[1.65] text-white/40 max-w-[22rem] max-[600px]:max-w-none ml-auto max-[600px]:ml-0">
                The final mark — refined, resolved and ready. Every curve, weight
                and proportion considered.
              </p>
            </div>
            <div className="col-start-2 row-start-1 w-[8px] h-[8px] rounded-full bg-white/[0.18] border-[1.5px] border-white/40 mx-auto shrink-0 relative z-[2] max-[600px]:hidden" aria-hidden="true" />
            <div className="col-start-3 row-start-1 max-[600px]:order-2 rounded-[10px] overflow-hidden bg-[#0d0d0d] border border-white/[0.06] group">
              <img
                src="/images/nily 2/logo_step3.png"
                alt="NILY — Refined final core mark"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
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
            LOGO VARIATIONS — tightly packed 3-column editorial board.
            The left mark spans the full board height; the four supporting
            applications are packed into two independent stacked columns.
            Each image remains fully visible (no crop / no stretch).
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-[1.28fr_0.86fr_0.86fr] grid-rows-2 gap-[8px] items-stretch mb-[8px] max-[900px]:grid-cols-[1.15fr_0.85fr] max-[900px]:grid-rows-[auto_auto_auto] max-[600px]:grid-cols-1 max-[600px]:grid-rows-none">
          {/* Main logo — spans both rows so the board has one clean outer shape. */}
          <div className="row-span-2 min-w-0 min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d] border border-white/[0.04] max-[900px]:row-span-2 max-[600px]:row-span-1">
            <img
              src="/images/nily 2/logosketch3.png"
              alt="NILY — Logo variation"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain block"
            />
          </div>

          {/* Middle column — two compact applications, no independent outer gap. */}
          <div className="row-span-2 min-w-0 min-h-0 grid grid-rows-2 gap-[8px] max-[600px]:grid-rows-none max-[600px]:gap-[8px]">
            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/20.png"
                alt="NILY — Identity application"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain block"
              />
            </div>
            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/21.png"
                alt="NILY — Identity application"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain block"
              />
            </div>
          </div>

          {/* Right column — business card + final logo variation, packed to the same height. */}
          <div className="row-span-2 min-w-0 min-h-0 grid grid-rows-2 gap-[8px] max-[600px]:grid-rows-none max-[600px]:gap-[8px]">
            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/2.png"
                alt="NILY — Business card / identity application"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain block"
              />
            </div>
            <div className="min-h-0 rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/logosketch4.png"
                alt="NILY — Logo variation"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain block"
              />
            </div>
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
            Natural image heights — no forced row heights or black gaps.
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-[1.15fr_1fr_1fr] gap-[8px] mb-[8px] items-start max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">

          {/* LEFT COLUMN — 15 + 17 */}
          <div className="flex flex-col gap-[8px] min-w-0">

            <div className="rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/15.png"
                alt="NILY — application"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>

            <div className="rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/17.png"
                alt="NILY — brand application"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>

          </div>

          {/* MIDDLE COLUMN — 12 + 4 */}
          <div className="flex flex-col gap-[8px] min-w-0">

            <div className="rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/12.png"
                alt="NILY — brand application"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>

            <div className="rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/4.png"
                alt="NILY — brand application"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>

          </div>

          {/* RIGHT COLUMN — 13 + 5 */}
          <div className="flex flex-col gap-[8px] min-w-0">

            <div className="rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/13.png"
                alt="NILY — brand application"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>

            <div className="rounded-[10px] overflow-hidden bg-[#0d0d0d]">
              <img
                src="/images/nily 2/5.png"
                alt="NILY — brand application"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default NilyProject;