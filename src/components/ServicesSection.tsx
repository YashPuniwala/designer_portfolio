import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import MarqueeSection from "@/components/MarqueeSection";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "I develop cohesive visual identity systems, defining core logotypes, color palettes, typographic hierarchies, and brand guidelines that give brands an enduring presence.",
  },
  {
    number: "02",
    title: "Logo Design",
    description:
      "I craft purposeful marks, monograms, and custom logotypes through disciplined geometric grid construction, stroke weight balancing, and optical refinement.",
  },
  {
    number: "03",
    title: "Social Media Design",
    description:
      "I build structured campaign creatives and social media visuals tailored to distinct brand voices, prioritizing visual hierarchy and high audience engagement.",
  },
  {
    number: "04",
    title: "Packaging & Print",
    description:
      "I design tactile physical packaging, takeaway merchandise, and print collateral with meticulous attention to typography, layout structure, and production finish.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // A passive effect runs after App's existing layout effects, so all pin
  // spacing above this section is measured before this trigger is created.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Tablet (769–1024px) keeps the normal vertical list — no pinning.
    // Desktop (>1024px) and mobile (≤768px) both run the stacked-card animation.
    const isTablet = window.matchMedia(
      "(min-width: 769px) and (max-width: 1024px)"
    );
    // Mobile breakpoint: ≤768px gets the same pinned stacking as desktop,
    // but with viewport-appropriate card dimensions set in CSS.
    const isMobile = window.matchMedia("(max-width: 768px)");

    let context: gsap.Context | null = null;

    const setup = () => {
      context?.revert();
      context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-unit", section);

        // Reduced motion or tablet: revert transforms, no pinning.
        if (reduceMotion.matches || isTablet.matches) {
          gsap.set(cards, { clearProps: "transform" });
          return;
        }

        if (isMobile.matches) {
          // ── Mobile: pinned sequential card reveal ───────────────────
          // Horizontal centering is handled cleanly in CSS (left:0; right:0; margin:auto).
          // GSAP animates ONLY Y so there are no conflicting horizontal transforms.
          gsap.set(cards, { clearProps: "x,xPercent" });

          // Card 1 is already visible at its CSS top offset position
          gsap.set(cards[0], { y: 0 });
          // Cards 2-4 start off-screen below
          gsap.set(cards.slice(1), {
            y: () => window.innerHeight * 1.15,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "services-reveal",
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 2.6}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.slice(1).forEach((card, index) => {
            timeline.fromTo(
              card,
              { y: () => window.innerHeight * 1.15 },
              {
                y: 0,
                duration: 1,
                ease: "none",
                immediateRender: false,
              },
              index * 1.25
            );
          });
        } else {
          // ── Desktop: pinned sequential card reveal ──────────────────
          // Cards span the full grid column; no centering transform needed.

          gsap.set(cards[0], { y: 0 });
          gsap.set(cards.slice(1), {
            y: () => window.innerHeight * 1.15,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "services-reveal",
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 4.2}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.slice(1).forEach((card, index) => {
            timeline.fromTo(
              card,
              { y: () => window.innerHeight * 1.15 },
              {
                y: 0,
                duration: 1,
                ease: "none",
                immediateRender: false,
              },
              index * 1.25
            );
          });
        }
      }, section);
      // Note: do NOT call ScrollTrigger.refresh() here.
      // App.tsx calls it once after all layout effects have run (including
      // this one). Calling it again from setup() fires a second full
      // layout remeasure that can overlap with WorkInMotion's initialization
      // and create a mid-scroll stutter on first page load.
    };

    setup();

    // Rebuild when either breakpoint boundary is crossed (e.g. rotating
    // a device or resizing a browser window) so the correct animation
    // branch is always active.
    const onBreakpointChange = () => setup();
    isTablet.addEventListener("change", onBreakpointChange);
    isMobile.addEventListener("change", onBreakpointChange);

    return () => {
      isTablet.removeEventListener("change", onBreakpointChange);
      isMobile.removeEventListener("change", onBreakpointChange);
      context?.revert();
    };
  }, []);


  return (
    // WHAT WE DO = pinned services stage + the reusable Marquee as its
    // outro. The Marquee is composed via <MarqueeSection />, never
    // duplicated here, so it stays independently reusable.
    <div className="what-we-do">
      <section
        ref={sectionRef}
        id="services"
        className="services-section"
        aria-label="My Expertise"
      >
        <div className="services-shell">
          {/* HEADING TEMPORARILY HIDDEN — uncomment to restore
          <header className="services-header">
            <h2>
              What I <span className="script-accent">do.</span>
            </h2>
          </header>
          */}

          <div className="services-stage">
            <div className="services-grid">
              {SERVICES.map((service, index) => (
                <article
                  key={service.number}
                  className={`service-unit service-unit-${index + 1}`}
                >
                  <div className="service-number-card">
                    <span>{service.number}</span>
                  </div>
                  <div className="service-content-card">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee outro — visually the continuation of What We Do */}
      <MarqueeSection as="div" className="marquee-outro" />
    </div>
  );
}