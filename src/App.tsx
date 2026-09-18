import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { AboutSection } from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import Nav from "@/components/Nav";
import HorizontalSection from "@/components/HorizontalSection";
import WorkInMotion from "@/components/WorkInMotion";
import ProjectDetailPage from "@/components/ProjectDetailPage";
import RecentProjects from "@/components/RecentProjects";
import ServicesSection from "@/components/ServicesSection";
import ContactPage from "@/pages/ContactPage";

gsap.registerPlugin(ScrollTrigger);

type Route =
  | { name: "home" }
  | { name: "contact" }
  | { name: "project"; slug: string };

function parseRoute(): Route {
  const hash = window.location.hash || "";
  if (hash === "#/contact" || hash === "#contact") {
    return { name: "contact" };
  }
  const m = hash.match(/^#\/projects\/([\w-]+)/);
  if (m) return { name: "project", slug: decodeURIComponent(m[1]) };
  return { name: "home" };
}

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? { name: "home" } : parseRoute()
  );
  useEffect(() => {
    const onChange = () => {
      // Tear down homepage pins before swapping views.
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setRoute(parseRoute());
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const aboutPanel = aboutPanelRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!container || !stage || !aboutPanel) return;

    if (reduceMotion.matches) {
      const staticContext = gsap.context(() => {
        gsap.set(".about-word", { color: "#ffffff" });
        // Stack Hero → About statically, no pinned overlay.
        // ParallaxProject + Horizontal flow naturally below.
        gsap.set(stage, { height: "auto", overflow: "visible" });
        gsap.set(".hero-pinned-wrapper", {
          position: "relative",
          height: "100svh",
        });
        gsap.set(aboutPanel, { position: "relative", height: "auto" });
        gsap.set(".about-inner", { height: "auto" });
        gsap.set(".about-section", { height: "100svh" });

        // Keep the existing native horizontal-scroll fallback.
        const horiz = horizontalRef.current;
        if (horiz) {
          gsap.set(horiz, { height: "auto", overflowX: "auto" });
          const track = horiz.querySelector<HTMLElement>(".horizontal-track");
          if (track) {
            gsap.set(track, { clearProps: "transform", width: "max-content" });
          }
        }
      }, container);

      return () => staticContext.revert();
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: true,
    });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const animateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(animateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleNavClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      // Project cards navigate via hash routing — let them through.
      const rpLink = (e.target as HTMLElement).closest("[data-project-link]");
      if (rpLink) return;
      const href = target.getAttribute("href");
      const easeOut = (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t));

      if (
        href === "#about" ||
        target.textContent?.toLowerCase().includes("about")
      ) {
        e.preventDefault();
        const trigger = ScrollTrigger.getById("showcase-transition");
        const targetScroll = trigger ? trigger.start : aboutPanel;
        lenis.scrollTo(targetScroll, { duration: 1.1, easing: easeOut });
      } else if (
        href === "#projects" ||
        target.textContent?.toLowerCase().includes("project") ||
        href === "#showcase"
      ) {
        e.preventDefault();
        // Projects now lives in the ParallaxProject section (normal flow,
        // directly after the About pin). Scroll to it naturally.
        const projectsEl = document.getElementById("projects");
        lenis.scrollTo(projectsEl ?? aboutPanel, {
          duration: 1.2,
          easing: easeOut,
        });
      } else if (
        href === "#home" ||
        target.textContent?.toLowerCase().includes("home")
      ) {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.1, easing: easeOut });
      } else if (
        href === "#work" ||
        target.textContent?.toLowerCase().includes("work")
      ) {
        e.preventDefault();
        const horiz = horizontalRef.current;
        if (horiz) {
          const trigger = ScrollTrigger.getById("horizontal-work");
          lenis.scrollTo(trigger ? trigger.start : horiz, {
            duration: 1.3,
            easing: easeOut,
          });
        }
      }
    };

    window.addEventListener("click", handleNavClick);

    const context = gsap.context(() => {
      const statement =
        aboutPanel.querySelector<HTMLElement>(".about-statement");
      const words = aboutPanel.querySelectorAll<HTMLElement>(".about-word");

      // About-only timeline. The old Showcase/parallax sequence was replaced
      // by ParallaxProject (ZoomParallax, normal flow) directly after this pin.
      const ABOUT_ENTRY = 0.42;

      // About waits just below the viewport, on top of the pinned Hero.
      gsap.set(aboutPanel, { yPercent: 100 });
      if (statement) {
        gsap.set(statement, { autoAlpha: 1, y: 0 });
      }
      if (words.length > 0) {
        gsap.set(words, { color: "rgba(255, 255, 255, 0.18)" });
      }

      const masterTimeline = gsap.timeline({
        id: "showcase-transition",
        paused: true,
      });

      // 0. Hero stays put; About slides UP from the bottom over it.
      //    power3.in = starts slow, then accelerates into place.
      masterTimeline.fromTo(
        aboutPanel,
        { yPercent: 100 },
        { yPercent: 0, duration: ABOUT_ENTRY, ease: "power3.in" },
        0
      );

      // 1. Once About has landed, the word-by-word reveal gets its own
      // expanded timeline window so every transition has room to breathe.
      if (words.length > 0) {
        const ABOUT_WORD_REVEAL = 0.82;
        const ABOUT_WORD_DURATION = 0.08;

        masterTimeline.fromTo(
          words,
          { color: "rgba(255, 255, 255, 0.18)" },
          {
            color: "#ffffff",
            stagger: { each: ABOUT_WORD_REVEAL / words.length },
            duration: ABOUT_WORD_DURATION,
            ease: "none",
          },
          ABOUT_ENTRY
        );
      }

      masterTimeline.addLabel("about-complete", masterTimeline.duration());

      // About-only scroll budget. Preserves the exact per-phase scroll speed
      // the About entrance + word reveal previously had (1.55 / 0.65 viewports
      // per timeline second), so the About feel is unchanged. Pin and animation
      // share the same range: when the words finish, the pin releases and the
      // stage scrolls out naturally over 1 viewport into ParallaxProject —
      // no dead range, no black gap.
      const getCinematicDistance = () =>
        masterTimeline.duration() *
        stage.clientHeight *
        (1.55 / 0.65);

      const cinematicPin = ScrollTrigger.create({
        id: "cinematic-pin",
        trigger: stage,
        start: "top top",
        end: () => `+=${getCinematicDistance()}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.create({
        id: "showcase-transition",
        start: () => cinematicPin.start,
        end: () => cinematicPin.start + getCinematicDistance(),
        animation: masterTimeline,
        scrub: 0.8,
        invalidateOnRefresh: true,
      });

      const horiz = horizontalRef.current;
      if (horiz) {
        const track = horiz.querySelector<HTMLElement>(".horizontal-track");
        const progressBar =
          horiz.querySelector<HTMLElement>(".horizontal-progress");

        if (track) {
          // Cache the scroll amount so the initial tween target is computed
          // synchronously during setup — not lazily on the first scroll frame.
          // invalidateOnRefresh re-measures on every ScrollTrigger.refresh().
          let cachedScrollAmount = Math.max(
            0,
            track.scrollWidth - window.innerWidth
          );
          const getScrollAmount = () => cachedScrollAmount;

          const horizontalTween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
          });

          ScrollTrigger.create({
            id: "horizontal-work",
            trigger: horiz,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            // scrub: true = 1:1 instant sync with scroll position.
            // scrub: 1 was causing a 1-second catch-up animation on the very
            // first interaction — the tween starts at x:0 and GSAP takes 1s
            // to reach the correct x, producing a visible abrupt jump.
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              // Re-measure after any layout change (fonts, images, resize).
              cachedScrollAmount = Math.max(
                0,
                track.scrollWidth - window.innerWidth
              );
            },
            animation: horizontalTween,
            onUpdate: (self) => {
              if (progressBar) {
                gsap.set(progressBar, {
                  scaleX: self.progress,
                });
              }
            },
          });
        }
      }
    }, container);

    let disposed = false;
    const refreshLayout = () => {
      if (!disposed) ScrollTrigger.refresh();
    };

    // Only listen for load events on images *inside* the horizontal section.
    // Images elsewhere on the page (hero portrait, about, etc.) loading after
    // init should not trigger a full refresh that repositions the horizontal
    // track mid-scroll. The horizontal section's own images are the only ones
    // that can change track.scrollWidth after initialization.
    const horizImages = horizontalRef.current
      ? Array.from(horizontalRef.current.querySelectorAll("img"))
      : [];
    horizImages.forEach((image) => {
      image.addEventListener("load", refreshLayout);
      image.addEventListener("error", refreshLayout);
    });
    void document.fonts.ready.then(refreshLayout);
    ScrollTrigger.refresh();

    return () => {
      disposed = true;
      horizImages.forEach((image) => {
        image.removeEventListener("load", refreshLayout);
        image.removeEventListener("error", refreshLayout);
      });
      window.removeEventListener("click", handleNavClick);
      context.revert();
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(animateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />

      {/* Main page content — scrolls up over the fixed Footer */}
      <div ref={containerRef} className="home-page-content">
        {/* Pinned stage: the Hero stays put while About slides up over it */}
        <div className="cinematic-stage" ref={stageRef}>
          <div className="hero-pinned-wrapper">
            <HeroSection />
          </div>

          <div className="about-panel" ref={aboutPanelRef} id="about">
            <div className="about-inner">
              <AboutSection />
            </div>
          </div>
        </div>

        {/* Work In Motion — 100vw x 100vh pixel-matched editorial grid with center zoom */}
        <WorkInMotion />

        <HorizontalSection sectionRef={horizontalRef} />

        <RecentProjects />

        {/* WHAT WE DO — services cards + the composed Marquee outro */}
        <ServicesSection />

        {/* Our Approach — editorial process list on a white stage */}
        <ApproachSection />

        {/* Statement — NOBODY REMEMBERS POLITE [IMAGE] DESIGN. */}
        <StatementSection />
      </div>

      {/* Final Sticky Footer — LET'S TALK (fixed reveal layer) */}
      <Footer />
    </>
  );
}

export default function App() {
  const route = useHashRoute();

  if (route.name === "contact") {
    return <ContactPage />;
  }

  if (route.name === "project") {
    return (
      <>
        <Nav />
        <ProjectDetailPage slug={route.slug} />
      </>
    );
  }

  return <HomePage />;
}
