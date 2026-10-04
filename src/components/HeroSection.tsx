/**
 * HeroSection2.tsx
 *
 * Editorial portfolio hero (single responsive system, one DOM).
 *
 * Fonts match the reference look:
 *  - Name + statement: Instrument Serif (tight tracking, high-contrast serif)
 *  - Small metadata:   Inter
 *
 * Desktop (>=1024px): giant one-line name, portrait sits slightly lower and
 *   overlaps only the bottom of the letters. Location left, role right.
 * Tablet (640-1023px): one-line name, vertical stack.
 * Mobile (<640px): name stacked YASH / PUNIWALA, metadata, portrait (no statement).
 *
 * No background is set here, so your existing hero background shows through.
 * Nav.tsx is NOT touched.
 */

import { useLayoutEffect, useRef } from "react";

const SERIF = '"Instrument Serif", "Times New Roman", Georgia, serif';
const SANS = '"Inter", ui-sans-serif, system-ui, sans-serif';

export default function HeroSection2() {
  const rootRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  /* Fit the name edge-to-edge: measure it at 100px, then scale the font-size
     so the widest line exactly fills the available width. Re-runs on resize
     and once the web font has loaded. */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const h1 = nameRef.current;
    const inner = innerRef.current;
    if (!root || !h1 || !inner) return;

    const fit = () => {
      const cs = getComputedStyle(h1);
      const avail =
        h1.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      // small safety margin on mobile so no glyph can touch the screen edge
      const target = window.innerWidth < 640 ? avail * 0.97 : avail;
      const cur = parseFloat(getComputedStyle(root).getPropertyValue("--nm")) || 0;
      const w = inner.getBoundingClientRect().width;
      if (target <= 0 || w <= 0 || !cur) {
        root.style.setProperty("--nm", "100px"); // bootstrap, observer refits
        return;
      }
      const next = (cur * target) / w;
      if (Math.abs(next - cur) > 0.5) root.style.setProperty("--nm", `${next}px`);
    };

    root.style.setProperty("--nm", "100px");
    fit();
    fit();
    window.addEventListener("resize", fit);
    // refit when the web font finishes loading / the name's box changes
    const ro = new ResizeObserver(fit);
    ro.observe(inner);
    document.fonts?.addEventListener?.("loadingdone", fit);
    document.fonts?.ready.then(fit);
    return () => {
      window.removeEventListener("resize", fit);
      document.fonts?.removeEventListener?.("loadingdone", fit);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="h2-root relative flex w-full flex-col items-center overflow-hidden text-neutral-900"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap');

        /* ── Entrance animations ───────────────────────────────── */
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
        .h2-d5 { animation-delay: 1.35s; }
        @media (prefers-reduced-motion: reduce) {
          .h2-anim, .h2-img-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }

        /* ── Base (mobile first) ───────────────────────────────── */
        .h2-root {
          --nm: 16vw; /* name font-size (JS fits it to the exact width) */
          background-color: #fafafa;
          min-height: 100vh;  /* fallback for older browsers */
          min-height: 100dvh; /* mobile: tracks the visible viewport */
          padding-top: clamp(5rem, 16vw, 6.5rem);
          padding-bottom: clamp(1.25rem, 5vw, 2rem);
        }
        .h2-wrap { width: 100%; display: flex; flex-direction: column; align-items: center; }

        .h2-name {
          position: relative;
          z-index: 1;
          width: 100%;
          margin: 0;
          padding: 0 clamp(0.75rem, 4vw, 1.5rem);
          text-align: center;
          text-transform: uppercase;
          font-family: ${SERIF};
          font-weight: 400;
          font-size: var(--nm);
          line-height: 0.85;
          letter-spacing: -0.035em;
          color: #111;
          user-select: none;
        }
        .h2-name-inner { display: inline-block; white-space: nowrap; }
        .h2-name-inner span { display: block; }

        .h2-stage {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: "loc" "role" "portrait";
          justify-items: center;
          row-gap: 0.35rem;
          margin-top: clamp(1rem, 3.5vw, 1.75rem);
          padding: 0 clamp(0.75rem, 4vw, 1.5rem);
        }
        .h2-meta {
          font-family: ${SANS};
          font-weight: 400;
          font-size: clamp(0.75rem, 2.8vw, 0.9rem);
          letter-spacing: 0;
          color: #1a1a1a;
          text-align: center;
        }
        .h2-loc  { grid-area: loc; }
        .h2-role { grid-area: role; text-transform: uppercase; }
        /* Big editorial role line: "Your Graphic Designer" */
        .h2-meta.h2-role {
          font-family: ${SERIF};
          font-size: clamp(1.4rem, 6.4vw, 2rem);
          line-height: 1;
          letter-spacing: -0.02em;
          color: #111;
          white-space: nowrap;
        }

        .h2-portrait {
          grid-area: portrait;
          position: relative;
          z-index: 2;
          width: clamp(240px, 76vw, 420px);
          margin-top: clamp(1.25rem, 5vw, 2.25rem);
        }
        .h2-frame { border: 4px solid #1a1a1a; background: #1a1a1a; overflow: hidden; }
        .h2-frame img {
          display: block; width: 100%; height: auto;
          object-fit: cover; object-position: top center;
        }

        .h2-statement {
          display: none; /* removed on mobile (<640px) */
          margin-top: clamp(1.75rem, 7vw, 2.75rem);
          width: min(440px, 88vw);
          text-align: center;
          font-family: ${SERIF};
          font-weight: 400;
          font-size: clamp(1.7rem, 7.4vw, 2.4rem);
          line-height: 1;
          letter-spacing: -0.035em;
          color: #111;
          text-wrap: balance;
        }

        /* ── Tablet (640–1023) ─────────────────────────────────── */
        @media (min-width: 640px) {
          .h2-root { --nm: 12.5vw; min-height: 100vh; padding-bottom: clamp(2rem, 6vw, 3.5rem); }
          .h2-statement { display: block; }
          .h2-name-inner span { display: inline; }
          .h2-portrait { width: clamp(280px, 48vw, 420px); }
          .h2-statement { width: min(560px, 80vw); font-size: clamp(2rem, 4.2vw, 2.7rem); }
          .h2-meta { font-size: 0.9rem; }
          .h2-meta.h2-role { font-size: clamp(1.8rem, 4vw, 2.4rem); }
        }

        /* ── Desktop (>=1024) ──────────────────────────────────── */
        @media (min-width: 1024px) {
          .h2-root {
            --nm: clamp(5rem, 12.5vw, 14rem);
            padding-top: clamp(5.5rem, 10vh, 8.5rem);
            padding-bottom: clamp(2.5rem, 5vh, 5rem);
          }
          .h2-name { padding: 0 clamp(1.5rem, 3vw, 3rem); white-space: nowrap; }
          .h2-stage {
            grid-template-columns: 1fr auto 1fr;
            grid-template-areas:
              "loc  portrait ."
              "role role     role";
            align-items: start;
            row-gap: 0;
            /* overlap only the bottom of the letters (portrait sits lower) */
            margin-top: calc(var(--nm) * -0.28);
            padding: 0 clamp(1.5rem, 3vw, 3rem);
          }
          .h2-portrait { width: clamp(210px, 20vw, 330px); margin-top: 0; }
          .h2-meta {
            font-size: clamp(0.8rem, 1vw, 1rem);
            padding-top: calc(var(--nm) * 0.5);
          }
          .h2-loc  { justify-self: start; text-align: left; }
          /* desktop: big role line sits BELOW the portrait, centred */
          .h2-meta.h2-role {
            justify-self: center;
            text-align: center;
            padding-top: 0;
            margin-top: clamp(1.25rem, 2.2vw, 2.75rem);
            font-size: clamp(2rem, 4.4vw, 5.5rem);
          }
          .h2-statement {
            margin-top: clamp(2.5rem, 4.5vh, 4.5rem);
            width: min(680px, 50vw);
            font-size: clamp(2rem, 2.9vw, 3rem);
          }
        }
      `}</style>

      <div className="h2-wrap">
        <h1 ref={nameRef} className="h2-anim h2-d1 h2-name">
          <span ref={innerRef} className="h2-name-inner">
            <span>Yash</span> <span>Puniwala</span>
          </span>
        </h1>

        <div className="h2-stage">
          <span className="h2-anim h2-d2 h2-meta h2-loc">Mumbai, India</span>
          <span className="h2-anim h2-d2 h2-meta h2-role">Your Graphic Designer</span>

          <div className="h2-img-anim h2-d3 h2-portrait">
            <div className="h2-frame">
              <img
                src="/hero-image5.png"
                alt="Yash Puniwala — Graphic Designer"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <p className="h2-anim h2-d5 h2-statement">
          We craft bold brand identities and digital experiences that finally
          make your work impossible to ignore.
        </p>
      </div>
    </section>
  );
}