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
      "Create distinctive visual identities that give brands a clear voice, personality, and recognizable presence across every touchpoint.",
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "From campaigns and social visuals to print and digital communication, we create graphic systems that communicate with clarity and impact.",
  },
  {
    number: "03",
    title: "Web Design",
    description:
      "We design immersive, responsive websites that combine strong visual direction, intuitive experiences, and thoughtful interaction.",
  },
  {
    number: "04",
    title: "Digital Experiences",
    description:
      "Interactive digital experiences that bring brand, motion, storytelling, and technology together into something memorable.",
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
    // Tablet + phone get normal vertical scrolling; only desktop (>1024px)
    // keeps the pinned sequential deck. The CSS breakpoint matches this.
    const isCompact = window.matchMedia("(max-width: 1024px)");

    let context: gsap.Context | null = null;

    const setup = () => {
      context?.revert();
      context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-unit", section);

        // Tablet / mobile (or reduced motion): normal document scrolling.
        // No pinning, no card-over-card stacking, no scroll-jacking.
        if (reduceMotion.matches || isCompact.matches) {
          gsap.set(cards, { clearProps: "transform" });
          return;
        }

        // Desktop (>1024px): the exact existing pinned sequential reveal.
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
      }, section);

      ScrollTrigger.refresh();
    };

    setup();

    // If the viewport crosses the breakpoint (e.g. rotating a tablet or
    // resizing a window), tear down and rebuild so the desktop animation
    // can never bleed into the compact layout, and vice versa.
    const onBreakpointChange = () => setup();
    isCompact.addEventListener("change", onBreakpointChange);

    return () => {
      isCompact.removeEventListener("change", onBreakpointChange);
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
        aria-label="Services"
      >
        <div className="services-shell">
          <header className="services-header">
            <h2>
              What we <span className="script-accent">do.</span>
            </h2>
          </header>

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