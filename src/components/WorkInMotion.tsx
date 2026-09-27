import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CAMERA_PERSPECTIVE = 1000;

export default function WorkInMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const surroundingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const world = worldRef.current;
    const centerCard = centerCardRef.current;
    const centerText = centerTextRef.current;
    const surrounding = surroundingRef.current;

    if (!section || !world || !centerCard || !centerText) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const calculateDollyZ = () => {
      const cardRect = centerCard.getBoundingClientRect();
      if (!cardRect.width || !cardRect.height) return CAMERA_PERSPECTIVE * 0.72;
      const needed =
        Math.max(
          window.innerWidth / cardRect.width,
          window.innerHeight / cardRect.height
        ) * 1.05;
      return CAMERA_PERSPECTIVE * (1 - 1 / needed);
    };

    if (reduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "work-in-motion-zoom",
          trigger: section,
          start: "top top",
          // Slightly more scroll distance than before (320% -> 360%).
          // This isn't a redesign, it's giving the same zoom more room to
          // breathe so it doesn't feel crammed/instant on a normal scroll.
          end: "+=360%",
          pin: true,
          // 0.8 instead of 1.2: still smoothed, but follows the scroll
          // input more directly so it doesn't feel like it's fighting you.
          scrub: 0.8,
          // Matches the anticipatePin behavior your other pinned sections
          // use, so this pin engages/releases the same way they do —
          // no visible "jump" right as it pins.
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0 → 0.15): Section settles into view — text fades in gently.
      // No zoom yet; this is the "arrival" moment.
      tl.fromTo(
        centerText,
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: "power2.out" },
        0
      );

      // Phase 2 (0.14 → 0.84): Dolly/camera zoom.
      // Changed from "power1.in" (barely moves, then rockets at the end)
      // to "power1.inOut" (ramps up, holds a steady pace through the
      // middle, eases out at the end). This is the actual fix for the
      // "zooms too fast / too many frames at once" complaint — the old
      // curve packed almost the entire zoom into the last ~25% of the
      // scroll range.
      tl.fromTo(
        world,
        { z: 0 },
        {
          z: () => calculateDollyZ(),
          duration: 0.7,
          ease: "power1.inOut",
        },
        0.14
      );

      // Phase 3 (0.56 → 0.78): Surrounding images fade out as the camera
      // approaches — overlaps with the zoom for a natural depth-of-field feel.
      if (surrounding) {
        tl.to(
          surrounding,
          { opacity: 0, duration: 0.22, ease: "power1.inOut" },
          0.56
        );
      }

      // Phase 4 (0.74 → 0.86): Vision text fades out as zoom finishes.
      tl.to(
        centerText,
        { opacity: 0, y: -16, scale: 1.04, duration: 0.12, ease: "power2.in" },
        0.74
      );

      // Phase 5 (0.86 → 1.0): Center card border-radius collapses to
      // fullscreen as the dolly lands — cinematic finish.
      tl.to(
        centerCard,
        { borderRadius: "0px", duration: 0.14, ease: "power1.inOut" },
        0.86
      );
    }, section);

    // --- First-visit stutter fix ---------------------------------------
    // ScrollTrigger measures pin distances and this component's dolly
    // target (calculateDollyZ) as soon as the timeline above is created.
    // If any <img> in this section is still decoding, or the "Caveat"
    // web font hasn't swapped in yet, those measurements are taken against
    // a layout that's about to shift slightly — which is exactly what
    // produces "lag then hits a wall" on the very first scroll, and why
    // it's fine again once you leave and come back (you're just scrolling
    // past the one stale frame, not fixing anything).
    //
    // Fix: once every image in this section has actually finished loading
    // (and fonts are ready), force one ScrollTrigger.refresh() so the pin
    // spacing and the dolly-zoom target are recalculated against final,
    // settled layout. invalidateOnRefresh: true (already set above) makes
    // sure calculateDollyZ() gets re-evaluated at that point too.
    const images = Array.from(section.querySelectorAll("img"));
    let cancelled = false;

    const refreshWhenReady = () => {
      if (cancelled) return;
      // Double rAF: wait a frame for layout to settle, then one more for
      // paint, before asking ScrollTrigger to remeasure.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
      });
    };

    const pending = images.filter((img) => !img.complete);
    if (pending.length === 0) {
      refreshWhenReady();
    } else {
      let remaining = pending.length;
      const onSettle = () => {
        remaining -= 1;
        if (remaining <= 0) refreshWhenReady();
      };
      pending.forEach((img) => {
        img.addEventListener("load", onSettle, { once: true });
        img.addEventListener("error", onSettle, { once: true });
      });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(refreshWhenReady);
    }

    // Belt-and-suspenders: also catch the full window load event, in case
    // something outside this section (another image, another section's
    // fonts) shifts total document height after this component mounts.
    window.addEventListener("load", refreshWhenReady);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refreshWhenReady);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="work-in-motion-section relative h-screen w-full overflow-hidden bg-black text-white select-none"
      aria-label="Work in Motion"
    >
      <div className="relative h-full w-full bg-black overflow-hidden">

        <div
          className="absolute inset-0"
          style={{
            perspective: `${CAMERA_PERSPECTIVE}px`,
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            ref={worldRef}
            className="absolute inset-0 p-2 sm:p-2.5 md:p-3"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50%",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >

            <div
              ref={surroundingRef}
              className="absolute inset-0 p-2 sm:p-2.5 md:p-3 flex flex-col justify-between pointer-events-none z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 h-[32%] w-full">
                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 pointer-events-auto">
                  <img
                    src="/images/1.png"
                    alt="Grid image 1"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 pointer-events-auto">
                  <img
                    src="/images/2.png"
                    alt="Grid image 2"
                    className="h-full w-full object-cover"
                  />
                  <svg
                    className="absolute bottom-2 left-6 w-28 sm:w-44 h-16 pointer-events-none text-[#ff8a3c] opacity-85"
                    viewBox="0 0 160 60"
                    fill="none"
                  >
                    <path
                      d="M10 10 Q 80 50, 150 55"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 sm:gap-2.5 md:gap-3 h-[34%] w-full">
                <div className="col-span-4 h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 pointer-events-auto">
                  <img
                    src="/images/3.png"
                    alt="Grid image 3"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="col-span-4 h-full w-full pointer-events-none" />

                <div className="col-span-4 h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 pointer-events-auto">
                  <img
                    src="/images/8.png"
                    alt="Grid image 4"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 h-[32%] w-full">
                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 pointer-events-auto">
                  <img
                    src="/images/7.png"
                    alt="Grid image 5"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 pointer-events-auto">
                  <img
                    src="/images/6.png"
                    alt="Grid image 6"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 p-2 sm:p-2.5 md:p-3 flex items-center justify-center pointer-events-none z-40"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                ref={centerCardRef}
                className="relative h-[34%] w-[calc((100%-1rem)/3)] sm:w-[calc((100%-1.25rem)/3)] md:w-[calc((100%-1.5rem)/3)] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-neutral-900 pointer-events-auto"
              >
                <img
                  src="/images/4.png"
                  alt="Center focal image"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-black/10 to-black/30 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* CENTER TEXT — "Vision" styled exactly like "Projects" in RecentProjects */}
        <div
          ref={centerTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 px-6 text-center opacity-0"
        >
          <span
            style={{ fontFamily: '"Caveat", "Brush Script MT", cursive' }}
            className="font-bold italic text-[#ff8a3c] text-[clamp(4rem,12vw,10rem)] leading-none"
          >
            Vision
          </span>
        </div>
      </div>
    </section>
  );
}