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
          end: "+=320%",
          pin: true,
          scrub: 1.2,
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

      // Phase 2 (0.15 → 0.82): Dolly/camera zoom begins after the settle.
      // Starts slow (power1.in ease), accelerates naturally toward the end.
      tl.fromTo(
        world,
        { z: 0 },
        {
          z: () => calculateDollyZ(),
          duration: 0.67,
          ease: "power1.in",
        },
        0.15
      );

      // Phase 3 (0.56 → 0.76): Surrounding images fade out as the camera
      // approaches — overlaps with the zoom for a natural depth-of-field feel.
      if (surrounding) {
        tl.to(
          surrounding,
          { opacity: 0, duration: 0.2, ease: "power1.in" },
          0.56
        );
      }

      // Phase 4 (0.72 → 0.84): Vision text fades out as zoom accelerates.
      tl.to(
        centerText,
        { opacity: 0, y: -16, scale: 1.04, duration: 0.12, ease: "power2.in" },
        0.72
      );

      // Phase 5 (0.84 → 1.0): Center card border-radius collapses to
      // fullscreen as the dolly lands — cinematic finish.
      tl.to(
        centerCard,
        { borderRadius: "0px", duration: 0.16, ease: "power1.inOut" },
        0.84
      );
    }, section);

    return () => ctx.revert();
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