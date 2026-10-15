import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { AboutSection } from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import Footer from "@/components/Footer";
import StatementSection from "@/components/StatementSection";
import Nav from "@/components/Nav";
import HorizontalSection from "@/components/HorizontalSection";
// import WorkInMotion from "@/components/WorkInMotion"; // temporarily hidden
import ProjectDetailPage from "@/components/ProjectDetailPage";
import RecentProjects from "@/components/RecentProjects";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import ContactPage from "@/pages/ContactPage";
import LoadingScreen from "@/components/loadingScreen";
import HeroSection from "./components/HeroSection";
import { useRoute } from "@/utils/router";
import { updateSEO } from "@/utils/seo";

gsap.registerPlugin(ScrollTrigger);

function HomePage({ isLoaded = true }: { isLoaded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const skillsPanelRef = useRef<HTMLDivElement>(null);
  const skillsInnerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    updateSEO({
      title: "Yash Puniwala | Graphic Designer & Brand Identity",
      description:
        "Portfolio of Yash Puniwala, a graphic designer specializing in bold brand identities, visual systems, and creative campaigns.",
      url: "/",
    });
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const aboutPanel = aboutPanelRef.current;
    const skillsPanel = skillsPanelRef.current;
    const skillsInner = skillsInnerRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!container || !stage || !aboutPanel || !skillsPanel || !skillsInner) return;

    if (reduceMotion.matches) {
      const staticContext = gsap.context(() => {
        gsap.set(".about-word", { color: "#ffffff" });
        // Stack Hero → About → Skills statically, no pinned overlay.
        gsap.set(stage, { height: "auto", overflow: "visible" });
        gsap.set(".hero-pinned-wrapper", {
          position: "relative",
          height: "100svh",
        });
        gsap.set(aboutPanel, { position: "relative", height: "auto", transform: "none" });
        gsap.set(skillsPanel, { position: "relative", height: "auto", transform: "none" });
        gsap.set(skillsInner, { transform: "none" });
        gsap.set(".about-inner", { height: "auto" });
        gsap.set(".about-section", { height: "100svh" });
        gsap.set(".skills-section", { height: "auto" });

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
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 1.8,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    if (!isLoaded) {
      lenis.stop();
    }

    const updateScrollTrigger = () => ScrollTrigger.update();
    const animateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(animateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleNavClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      // Project cards and contact page navigate via clean routing — let them through.
      const rpLink = (e.target as HTMLElement).closest("[data-project-link]");
      if (rpLink) return;
      const href = target.getAttribute("href");
      if (!href) return;

      if (href.startsWith("/projects/")) {
        return; // Project detail pages handled by router navigate
      }
      // /contact typed directly (not from navbar) — let it through
      if (href === "/contact" && !target.textContent?.trim().toLowerCase().includes("contact us")) {
        return;
      }

      const easeOut = (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t));

      if (
        href === "#about" ||
        href === "/#about" ||
        target.textContent?.toLowerCase().includes("about")
      ) {
        e.preventDefault();
        const trigger = ScrollTrigger.getById("showcase-transition");
        const targetScroll = trigger ? trigger.start : aboutPanel;
        lenis.scrollTo(targetScroll, { duration: 1.1, easing: easeOut });
      } else if (
        href === "#skills" ||
        href === "/#skills" ||
        target.textContent?.toLowerCase().includes("skills") ||
        target.textContent?.toLowerCase().includes("toolkit")
      ) {
        e.preventDefault();
        const isDesktop = window.matchMedia("(min-width: 1024px) and (min-height: 650px)").matches;
        if (isDesktop) {
          const trigger = ScrollTrigger.getById("showcase-transition");
          const targetScroll = trigger
            ? trigger.start + (trigger.end - trigger.start) * 0.95
            : skillsPanel;
          lenis.scrollTo(targetScroll, { duration: 1.1, easing: easeOut });
        } else {
          const el = document.getElementById("skills") || skillsPanel;
          if (el) {
            lenis.scrollTo(el, { duration: 1.1, easing: easeOut, offset: -24 });
          }
        }
      } else if (
        href === "#home" ||
        href === "/" ||
        href === "/#home" ||
        target.textContent?.toLowerCase().includes("home")
      ) {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.1, easing: easeOut });
      } else if (
        href === "#work" ||
        href === "/#work" ||
        href === "#recent-projects" ||
        href === "/#recent-projects" ||
        href === "#projects" ||
        href === "/#projects" ||
        target.textContent?.trim().toLowerCase() === "work" ||
        target.textContent?.trim().toLowerCase() === "works"
      ) {
        e.preventDefault();
        const projectsEl =
          document.getElementById("recent-projects") ||
          document.getElementById("projects");
        if (projectsEl) {
          const nav = document.querySelector<HTMLElement>("nav");
          const navOffset = nav ? -(nav.offsetHeight + 24) : -80;
          lenis.scrollTo(projectsEl, {
            duration: 1.2,
            easing: easeOut,
            offset: navOffset,
          });
          window.history.pushState(null, "", "/#recent-projects");
        }
      } else if (
        href === "#contact-cta" ||
        href === "/#contact-cta" ||
        target.textContent?.trim().toLowerCase() === "contact us"
      ) {
        e.preventDefault();
        // The footer is position:fixed — scroll to the very end of the page to reveal it.
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        lenis.scrollTo(maxScroll, { duration: 1.4, easing: easeOut });
        window.history.pushState(null, "", "/#contact-cta");
      }
    };

    window.addEventListener("click", handleNavClick);

    const context = gsap.context(() => {
      const statement =
        aboutPanel.querySelector<HTMLElement>(".about-statement");
      const words = aboutPanel.querySelectorAll<HTMLElement>(".about-word");

      const mm = gsap.matchMedia();

      // ─────────────────────────────────────────────────────────────
      // 1. DESKTOP / LARGE SCREENS (where all Skills content fits in 1 screen)
      // ─────────────────────────────────────────────────────────────
      mm.add("(min-width: 1024px) and (min-height: 650px)", () => {
        // About waits just below viewport
        gsap.set(aboutPanel, { yPercent: 100 });
        // Skills waits just below viewport
        gsap.set(skillsPanel, { yPercent: 100 });
        gsap.set(skillsInner, { clearProps: "transform" });

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

        // Balanced animation timings: generous word-by-word reveal for comfortable reading
        const ABOUT_ENTRY = 0.35;
        const ABOUT_WORD_REVEAL = 1.10;
        const ABOUT_WORD_DURATION = 0.16;
        const ABOUT_HOLD = 0.22;
        const SKILLS_ENTRY = 0.40;
        const SKILLS_HOLD = 0.15;

        // 1. Hero stays put; About slides UP from bottom over it.
        masterTimeline.fromTo(
          aboutPanel,
          { yPercent: 100 },
          { yPercent: 0, duration: ABOUT_ENTRY, ease: "power3.in" },
          0
        );

        // 2. Word-by-word reveal once About has landed, fading smoothly from grey to white.
        if (words.length > 0) {
          masterTimeline.fromTo(
            words,
            { color: "rgba(255, 255, 255, 0.18)" },
            {
              color: "#ffffff",
              stagger: { each: ABOUT_WORD_REVEAL / words.length },
              duration: ABOUT_WORD_DURATION,
              ease: "power1.out",
            },
            ABOUT_ENTRY
          );
        }

        // 3. Reading hold once all words are illuminated white so user can read comfortably
        masterTimeline.to(
          {},
          { duration: ABOUT_HOLD },
          ABOUT_ENTRY + ABOUT_WORD_REVEAL + ABOUT_WORD_DURATION
        );

        masterTimeline.addLabel("about-complete", masterTimeline.duration());

        // 4. Immediately once reading hold is complete: Skills rises smoothly over About (100% → 0%)
        masterTimeline.fromTo(
          skillsPanel,
          { yPercent: 100 },
          { yPercent: 0, duration: SKILLS_ENTRY, ease: "none" },
          "about-complete"
        );

        masterTimeline.addLabel("skills-arrived", "about-complete+=" + SKILLS_ENTRY);

        // 5. Brief hold so the user can experience the section
        masterTimeline.to(
          {},
          { duration: SKILLS_HOLD },
          "skills-arrived"
        );

        masterTimeline.addLabel("skills-complete", masterTimeline.duration());

        // Pinned scroll budget: 1.05x viewport height per timeline duration
        const getCinematicDistance = () =>
          masterTimeline.duration() * stage.clientHeight * 1.05;

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
          scrub: 0.5,
          invalidateOnRefresh: true,
        });
      });

      // ─────────────────────────────────────────────────────────────
      // 2. TABLET, MOBILE & COMPACT SCREENS (Skills expands & scrolls naturally)
      // ─────────────────────────────────────────────────────────────
      mm.add("(max-width: 1023px), (max-height: 649px)", () => {
        // Reset skills panel to normal document flow
        gsap.set(skillsPanel, { clearProps: "all" });
        gsap.set(skillsInner, { clearProps: "all" });

        // About waits just below viewport
        gsap.set(aboutPanel, { yPercent: 100 });
        if (statement) {
          gsap.set(statement, { autoAlpha: 1, y: 0 });
        }
        if (words.length > 0) {
          gsap.set(words, { color: "rgba(255, 255, 255, 0.18)" });
        }

        const mobileTimeline = gsap.timeline({
          id: "showcase-transition-mobile",
          paused: true,
        });

        const ABOUT_ENTRY = 0.35;
        const ABOUT_WORD_REVEAL = 0.95;
        const ABOUT_WORD_DURATION = 0.16;
        const ABOUT_HOLD = 0.20;

        // 1. Hero stays put; About slides UP from bottom over it.
        mobileTimeline.fromTo(
          aboutPanel,
          { yPercent: 100 },
          { yPercent: 0, duration: ABOUT_ENTRY, ease: "power3.in" },
          0
        );

        // 2. Word-by-word reveal once About has landed, fading smoothly from grey to white.
        if (words.length > 0) {
          mobileTimeline.fromTo(
            words,
            { color: "rgba(255, 255, 255, 0.18)" },
            {
              color: "#ffffff",
              stagger: { each: ABOUT_WORD_REVEAL / words.length },
              duration: ABOUT_WORD_DURATION,
              ease: "power1.out",
            },
            ABOUT_ENTRY
          );
        }

        // 3. Reading hold once all words are illuminated white so user can read comfortably
        mobileTimeline.to(
          {},
          { duration: ABOUT_HOLD },
          ABOUT_ENTRY + ABOUT_WORD_REVEAL + ABOUT_WORD_DURATION
        );

        // Pinned distance: covers About entry, comfortable reading scroll, and hold
        const getMobileDistance = () =>
          mobileTimeline.duration() * window.innerHeight * 1.0;

        // Pin stage only for the Hero → About transition
        const mobilePin = ScrollTrigger.create({
          id: "cinematic-pin",
          trigger: stage,
          start: "top top",
          end: () => `+=${getMobileDistance()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        ScrollTrigger.create({
          id: "showcase-transition",
          start: () => mobilePin.start,
          end: () => mobilePin.start + getMobileDistance(),
          animation: mobileTimeline,
          scrub: 0.5,
          invalidateOnRefresh: true,
        });
      });

      const horiz = horizontalRef.current;
      if (horiz) {
        const track = horiz.querySelector<HTMLElement>(".horizontal-track");
        const progressBar =
          horiz.querySelector<HTMLElement>(".horizontal-progress");

        if (track) {
          const calculateScrollAmount = () => {
            const isMobile = window.innerWidth < 768;
            const outro = track.querySelector<HTMLElement>(".horizontal-outro");
            if (isMobile && outro) {
              const outroRect = outro.getBoundingClientRect();
              const trackRect = track.getBoundingClientRect();
              const outroOffset = outroRect.left - trackRect.left;
              const outroTargetLeft = Math.max(
                16,
                (window.innerWidth - outroRect.width) / 2
              );
              return Math.max(0, outroOffset - outroTargetLeft);
            }
            return Math.max(0, track.scrollWidth - window.innerWidth);
          };

          const getMultiplier = () => (window.innerWidth < 768 ? 1.0 : 1.2);

          let cachedScrollAmount = calculateScrollAmount();
          const getScrollAmount = () => cachedScrollAmount;

          const horizontalTween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
          });

          ScrollTrigger.create({
            id: "horizontal-work",
            trigger: horiz,
            start: "top top",
            end: () =>
              `+=${getScrollAmount() * getMultiplier()}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              cachedScrollAmount = calculateScrollAmount();
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
      if (disposed) return;
      const horizTrigger = ScrollTrigger.getById("horizontal-work");
      const wimTrigger = ScrollTrigger.getById("work-in-motion-zoom");
      if (wimTrigger && wimTrigger.progress > 0) return;
      if (horizTrigger && horizTrigger.progress > 0) return;
      ScrollTrigger.refresh();
    };

    const horizImages = horizontalRef.current
      ? Array.from(horizontalRef.current.querySelectorAll("img"))
      : [];

    const pendingHorizImages = horizImages.filter((img) => !img.complete);
    pendingHorizImages.forEach((image) => {
      image.addEventListener("load", refreshLayout, { once: true });
      image.addEventListener("error", refreshLayout, { once: true });
    });

    void document.fonts.ready.then(refreshLayout);
    ScrollTrigger.refresh();

    return () => {
      disposed = true;
      lenisRef.current = null;
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

  useEffect(() => {
    if (isLoaded) {
      lenisRef.current?.start();

      const scrollToRecentProjects = () => {
        const el =
          document.getElementById("recent-projects") ||
          document.getElementById("projects");
        if (el && lenisRef.current) {
          const nav = document.querySelector<HTMLElement>("nav");
          const navOffset = nav ? -(nav.offsetHeight + 24) : -80;
          lenisRef.current.scrollTo(el, { duration: 1.2, offset: navOffset });
        }
      };

      const scrollToFooter = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(maxScroll, { duration: 1.4 });
        }
      };

      const hash = window.location.hash;
      if (
        hash === "#recent-projects" ||
        hash === "#projects" ||
        hash.includes("projects") ||
        hash === "#work"
      ) {
        requestAnimationFrame(() => {
          setTimeout(scrollToRecentProjects, 200);
        });
      } else if (hash === "#about" || hash.includes("about")) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const trigger = ScrollTrigger.getById("showcase-transition");
            const targetScroll = trigger ? trigger.start : aboutPanelRef.current;
            if (targetScroll && lenisRef.current) {
              lenisRef.current.scrollTo(targetScroll, { duration: 1.1 });
            }
          }, 200);
        });
      } else if (hash === "#skills" || hash.includes("skills") || hash.includes("toolkit")) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const isDesktop = window.matchMedia("(min-width: 1024px) and (min-height: 650px)").matches;
            if (isDesktop) {
              const trigger = ScrollTrigger.getById("showcase-transition");
              const targetScroll = trigger
                ? trigger.start + (trigger.end - trigger.start) * 0.95
                : skillsPanelRef.current;
              if (targetScroll && lenisRef.current) {
                lenisRef.current.scrollTo(targetScroll, { duration: 1.1 });
              }
            } else {
              const el = document.getElementById("skills") || skillsPanelRef.current;
              if (el && lenisRef.current) {
                lenisRef.current.scrollTo(el, { duration: 1.1, offset: -24 });
              }
            }
          }, 200);
        });
      } else if (hash === "#contact-cta") {
        requestAnimationFrame(() => {
          setTimeout(scrollToFooter, 200);
        });
      } else {
        window.scrollTo(0, 0);
      }

      const onHashChange = () => {
        const currentHash = window.location.hash;
        if (
          currentHash === "#recent-projects" ||
          currentHash === "#projects" ||
          currentHash.includes("projects") ||
          currentHash === "#work"
        ) {
          scrollToRecentProjects();
        } else if (currentHash === "#skills" || currentHash.includes("skills") || currentHash.includes("toolkit")) {
          const isDesktop = window.matchMedia("(min-width: 1024px) and (min-height: 650px)").matches;
          if (isDesktop) {
            const trigger = ScrollTrigger.getById("showcase-transition");
            const targetScroll = trigger
              ? trigger.start + (trigger.end - trigger.start) * 0.95
              : skillsPanelRef.current;
            if (targetScroll && lenisRef.current) {
              lenisRef.current.scrollTo(targetScroll, { duration: 1.1 });
            }
          } else {
            const el = document.getElementById("skills") || skillsPanelRef.current;
            if (el && lenisRef.current) {
              lenisRef.current.scrollTo(el, { duration: 1.1, offset: -24 });
            }
          }
        } else if (currentHash === "#contact-cta") {
          scrollToFooter();
        }
      };

      window.addEventListener("hashchange", onHashChange);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        window.removeEventListener("hashchange", onHashChange);
      };
    } else {
      lenisRef.current?.stop();
    }
  }, [isLoaded]);

  return (
    <>
      <Nav />

      {/* Main page content — scrolls up over the fixed Footer */}
      <div ref={containerRef} className="home-page-content">
        {/* Pinned stage: Hero → About → Skills, each layer sliding up over the one below */}
        <div className="cinematic-stage" ref={stageRef}>
          <div className="hero-pinned-wrapper">
            <HeroSection isLoaded={isLoaded} />
            {/* <HeroSection2 isLoaded={isLoaded} /> */}
          </div>

          {/* About covers Hero */}
          <div className="about-panel" ref={aboutPanelRef} id="about">
            <div className="about-inner">
              <AboutSection />
            </div>
          </div>

          {/* Skills covers About with 30° tilt straightening on arrival */}
          <div className="skills-panel" ref={skillsPanelRef} id="skills-panel">
            <div className="skills-inner-wrap" ref={skillsInnerRef}>
              <SkillsSection />
            </div>
          </div>
        </div>

        {/* Work In Motion — temporarily hidden; file preserved for future use */}
        {/* <WorkInMotion /> */}

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
  const route = useRoute();
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {route.name === "contact" && <ContactPage />}

      {route.name === "project" && (
        <>
          <Nav />
          <ProjectDetailPage slug={route.slug} />
        </>
      )}

      {route.name === "home" && <HomePage isLoaded={!loading} />}
    </>
  );
}