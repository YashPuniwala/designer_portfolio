/**
 * HeroSection2.tsx
 *
 * Editorial portfolio hero — inspired by the reference composition.
 * – Desktop: Oversized "YASH PUNIWALA" spans full width as the backdrop.
 *   A medium portrait sits centred, slightly overlapping the name but
 *   positioned a little lower so the full name remains readable.
 *   Small metadata (location + role) flanks the bottom of the stage.
 *   Intro statement sits below the composition.
 * – Mobile: Clean vertical stack — Name → Metadata → Portrait → Statement.
 *
 * ⚠  DO NOT touch Nav.tsx — this component is placed inside the existing
 *    hero-pinned-wrapper (App.tsx) which already renders <Nav /> above it.
 */

export default function HeroSection2() {
  /* ── Typography tokens ──────────────────────────────────────────── */
  const DISPLAY = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#fafafa] text-neutral-900"
    >
      {/* ── KEYFRAME ANIMATIONS ────────────────────────────────────── */}
      <style>{`
        @keyframes h2FadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes h2ImgReveal {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .h2-anim     { opacity: 0; animation: h2FadeUp    0.85s cubic-bezier(0.22,1,0.36,1) forwards; }
        .h2-img-anim { opacity: 0; animation: h2ImgReveal 1s   cubic-bezier(0.22,1,0.36,1) forwards; }

        .h2-d1 { animation-delay: 0.08s; }
        .h2-d2 { animation-delay: 0.55s; }
        .h2-d3 { animation-delay: 0.85s; }
        .h2-d4 { animation-delay: 1.1s;  }
        .h2-d5 { animation-delay: 1.35s; }

        @media (prefers-reduced-motion: reduce) {
          .h2-anim, .h2-img-anim {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* ── Portrait frame ─────────────────────────────────────── */
        .h2-portrait-frame {
          border: 1.5px solid rgba(0,0,0,0.18);
          overflow: hidden;
          background: #e8e4de;
        }
        .h2-portrait-frame img {
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        /* ── DESKTOP name stage ─────────────────────────────────── */
        @media (min-width: 1024px) {
          .h2-name-stage {
            position: relative;
            width: 100%;
          }
          /* Portrait — absolute, centred, 38% from top of name row */
          .h2-portrait-desktop {
            position: absolute;
            top: 38%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
            width: clamp(210px, 21vw, 330px);
          }
          /* Metadata row pinned to bottom of the stage */
          .h2-meta-desktop {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 4;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 clamp(1.5rem, 4vw, 4.5rem) clamp(0.25rem, 1vh, 1rem);
          }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (≥ 1024 px)
      ════════════════════════════════════════════════════════════ */}
      <div
        className="hidden w-full flex-col items-center lg:flex"
        style={{
          paddingTop: "clamp(5rem, 9vh, 8rem)",
          paddingBottom: "clamp(2.5rem, 5vh, 5rem)",
        }}
      >
        {/* Name stage — giant name + absolutely positioned portrait + metadata */}
        <div
          className="h2-anim h2-d1 h2-name-stage"
          style={{ minHeight: "clamp(300px, 52vw, 620px)" }}
        >
          {/* Giant editorial name */}
          <h1
            className="pointer-events-none relative z-10 w-full select-none text-center font-black uppercase"
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(5rem, 16.5vw, 17rem)",
              lineHeight: "0.82",
              letterSpacing: "-0.025em",
              color: "#171717",
            }}
          >
            YASH PUNIWALA
          </h1>

          {/* Portrait — centred, slightly lower than name midpoint */}
          <div className="h2-img-anim h2-d3 h2-portrait-desktop">
            <div className="h2-portrait-frame">
              <img
                src="/hero-image5.png"
                alt="Yash Puniwala — Graphic Designer"
                draggable={false}
              />
            </div>
          </div>

          {/* Metadata — bottom of stage, left ↔ right */}
          <div className="h2-anim h2-d4 h2-meta-desktop">
            <span
              className="font-mono uppercase tracking-[0.2em] text-neutral-500"
              style={{ fontSize: "clamp(0.6rem, 0.82vw, 0.88rem)" }}
            >
              Mumbai, India
            </span>
            <span
              className="font-mono uppercase tracking-[0.2em] text-neutral-500"
              style={{ fontSize: "clamp(0.6rem, 0.82vw, 0.88rem)" }}
            >
              Graphic Designer
            </span>
          </div>
        </div>

        {/* Intro statement */}
        <div
          className="h2-anim h2-d5 text-center"
          style={{
            marginTop: "clamp(2.5rem, 4vh, 4.5rem)",
            maxWidth: "min(660px, 48vw)",
            padding: "0 1rem",
          }}
        >
          <p
            className="font-bold leading-[1.1] tracking-[-0.025em] text-neutral-800"
            style={{ fontSize: "clamp(1.2rem, 1.85vw, 1.9rem)" }}
          >
            We craft bold brand identities and digital experiences that finally
            make your work impossible to ignore.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE / TABLET LAYOUT  (< 1024 px)
          Vertical stack: Name → Metadata → Portrait → Statement
      ════════════════════════════════════════════════════════════ */}
      <div
        className="flex w-full flex-col items-center lg:hidden"
        style={{
          paddingTop: "clamp(4.5rem, 14vw, 6rem)",
          paddingBottom: "clamp(2rem, 6vw, 3.5rem)",
        }}
      >
        {/* Name */}
        <div className="h2-anim h2-d1 w-full text-center" style={{ padding: "0 clamp(0.75rem, 4vw, 1.5rem)" }}>
          <h1
            className="font-black uppercase text-neutral-900"
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(2.8rem, 13.5vw, 5.5rem)",
              lineHeight: "0.88",
              letterSpacing: "-0.025em",
            }}
          >
            YASH PUNIWALA
          </h1>
        </div>

        {/* Metadata */}
        <div
          className="h2-anim h2-d2 flex flex-col items-center gap-0.5 text-center"
          style={{ marginTop: "clamp(1rem, 3.5vw, 1.75rem)" }}
        >
          <span
            className="font-mono uppercase tracking-[0.2em] text-neutral-500"
            style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.82rem)" }}
          >
            Mumbai, India
          </span>
          <span
            className="font-mono uppercase tracking-[0.2em] text-neutral-500"
            style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.82rem)" }}
          >
            Graphic Designer
          </span>
        </div>

        {/* Portrait */}
        <div
          className="h2-img-anim h2-d3"
          style={{
            marginTop: "clamp(1.25rem, 5vw, 2.25rem)",
            width: "clamp(260px, 75vw, 420px)",
          }}
        >
          <div className="h2-portrait-frame">
            <img
              src="/hero-image5.png"
              alt="Yash Puniwala — Graphic Designer"
              draggable={false}
            />
          </div>
        </div>

        {/* Intro statement */}
        <div
          className="h2-anim h2-d5 text-center"
          style={{
            marginTop: "clamp(1.5rem, 6vw, 2.5rem)",
            maxWidth: "min(500px, 88vw)",
            padding: "0 clamp(1rem, 4vw, 1.75rem)",
          }}
        >
          <p
            className="font-bold leading-[1.15] tracking-[-0.02em] text-neutral-800"
            style={{ fontSize: "clamp(1rem, 4.2vw, 1.45rem)" }}
          >
            We craft bold brand identities and digital experiences that finally
            make your work impossible to ignore.
          </p>
        </div>
      </div>
    </section>
  );
}
