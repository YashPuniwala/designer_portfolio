import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!section || !frame || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = inner.querySelector<HTMLImageElement>("img");

    const REST_SHADOW = "0 25px 60px rgba(0, 0, 0, 0)";
    const OPEN_SHADOW = "0 25px 60px rgba(0, 0, 0, 0.7)";

    const mm = gsap.matchMedia();

    // -----------------------------------------------------------------
    // DESKTOP & TABLET (> 640px)
    // Timeline now has NO empty holds — one continuous tween across the
    // entire pin. This removes the scrub catch-up jerk.
    // -----------------------------------------------------------------
    mm.add("(min-width: 641px)", () => {
      const getTargetWidth = () => {
        const h = frame.offsetHeight || 80;
        return Math.round(h * 2.55);
      };

      const setTargetDimensions = () => {
        const targetW = getTargetWidth();
        inner.style.width = `${targetW}px`;
        inner.style.minWidth = `${targetW}px`;
        inner.style.height = "100%";
        return targetW;
      };

      if (reduceMotion) {
        const targetW = setTargetDimensions();
        frame.style.width = `${targetW}px`;
        frame.style.height = "0.82em";
        frame.style.margin = "0 0.26em";
        frame.style.boxShadow = OPEN_SHADOW;
        return;
      }

      setTargetDimensions();
      gsap.set(frame, {
        width: 0,
        height: "0.82em",
        margin: "0 0.1em",
        boxShadow: REST_SHADOW,
      });
      if (img) gsap.set(img, { scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            setTargetDimensions();
          },
        },
      });

      // Single continuous expansion — no empty holds on either end.
      tl.fromTo(
        frame,
        { width: 0, margin: "0 0.1em", boxShadow: REST_SHADOW },
        {
          width: () => getTargetWidth(),
          margin: "0 0.26em",
          boxShadow: OPEN_SHADOW,
          duration: 1,
          ease: "none",
        }
      );
    });

    // -----------------------------------------------------------------
    // MOBILE (<= 640px)
    // Same treatment — the frame expansion + image zoom fill the full
    // pin with no dead segments, so the mobile scrub is also smooth.
    // -----------------------------------------------------------------
    mm.add("(max-width: 640px)", () => {
      const IMAGE_RATIO = 2.4;
      const getTargetHeight = () => {
        return Math.max(56, Math.min(96, Math.round(window.innerWidth * 0.21)));
      };

      const getTargetWidth = () => {
        const h = getTargetHeight();
        return Math.max(80, Math.min(220, Math.round(h * IMAGE_RATIO)));
      };

      const setMobileDimensions = () => {
        const targetW = getTargetWidth();
        const targetH = getTargetHeight();
        inner.style.width = "100%";
        inner.style.minWidth = "0px";
        inner.style.height = `${targetH}px`;
        return { targetW, targetH };
      };

      if (reduceMotion) {
        const { targetW, targetH } = setMobileDimensions();
        frame.style.width = `${targetW}px`;
        frame.style.height = `${targetH}px`;
        frame.style.margin = "0.35em 0";
        frame.style.boxShadow = OPEN_SHADOW;
        return;
      }

      setMobileDimensions();
      gsap.set(frame, {
        height: 0,
        width: 0,
        margin: "0px 0px",
        boxShadow: REST_SHADOW,
      });
      if (img) gsap.set(img, { scale: 1.15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            setMobileDimensions();
          },
        },
      });

      // Frame expansion across the entire pin.
      tl.fromTo(
        frame,
        {
          height: 0,
          width: 0,
          margin: "0px 0px",
          boxShadow: REST_SHADOW,
        },
        {
          height: () => getTargetHeight(),
          width: () => getTargetWidth(),
          margin: "0.35em 0",
          boxShadow: OPEN_SHADOW,
          duration: 1,
          ease: "none",
        }
      );

      // Subtle zoom on the image runs alongside the expansion.
      if (img) {
        tl.fromTo(
          img,
          { scale: 1.1 },
          { scale: 1.0, duration: 1, ease: "none" },
          "<"
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="statement-section"
      aria-label="Design statement"
    >
      <div className="statement-inner">
        <div className="statement-row statement-row-1">
          NOBODY
          <br className="statement-break" />
          {" "}
          REMEMBERS
        </div>
        <div className="statement-row statement-row-2">
          <span className="statement-word statement-word-polite">POLITE</span>
          <div ref={frameRef} className="statement-image-frame">
            <div ref={innerRef} className="statement-image-inner">
              <img src="/about-section-image.png" alt="Featured work" />
            </div>
          </div>
          <span className="statement-word">DESIGN.</span>
        </div>
      </div>
    </section>
  );
}