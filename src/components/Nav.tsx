import { useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#/contact" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    let frame = 0;

    const detectBackground = () => {
      // Probe a point just below the navbar (its vertical centre).
      const nav = document.querySelector<HTMLElement>("nav");
      const probeY = nav ? nav.offsetHeight * 0.5 + 6 : 40;

      let light = false;

      // 1) Named anchors that are DARK sections.
      //    #home is intentionally NOT here — it is light now.
      for (const sel of [
        "#about",
        "#projects",
        "#work",
        "#services",
        "#marquee",
      ]) {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          light = false; // dark section
          return light;
        }
      }

      // 2) Named anchors + class-based LIGHT sections.
      //    #home (the light Hero) and .recent-projects both live here.
      for (const sel of ["#home", ".recent-projects"]) {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          return true;
        }
      }

      // 3) Sample the pixel colour under the probe for anything else
      //    (project detail pages, future sections, etc.).
      const sampleX = window.innerWidth / 2;
      try {
        const el = document.elementFromPoint(sampleX, probeY) as HTMLElement | null;
        if (el) {
          let node: HTMLElement | null = el;
          while (node && node !== document.body) {
            const bg = getComputedStyle(node).backgroundColor;
            const m = bg.match(/rgba?\(([^)]+)\)/);
            if (m) {
              const parts = m[1].split(",").map((v) => parseFloat(v));
              const r = parts[0] ?? 0;
              const g = parts[1] ?? 0;
              const b = parts[2] ?? 0;
              const a = parts[3] ?? 1;
              // Treat translucent surfaces as neutral (fall through to dark).
              if (a > 0.6) {
                const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
                light = luminance > 0.6;
                break;
              }
            }
            node = node.parentElement;
          }
        }
      } catch {
        /* elementFromPoint can throw on cross-origin/edge cases — keep prior state */
      }

      return light;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastScroll.current;

        // Visibility state
        if (y <= 60) {
          setHidden(false); // always visible at the very top
        } else if (delta > 4) {
          setHidden(true); // scrolling down → hide
        } else if (delta < -4) {
          setHidden(false); // scrolling up → show
        }
        lastScroll.current = y;

        // Background-aware colour
        setOnLight(detectBackground());
      });
    };

    lastScroll.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close the mobile menu whenever the route/anchor changes.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // While the menu is open the bar must stay on screen and stay legible
  // over the dark overlay regardless of the section behind it.
  const barHidden = hidden && !menuOpen;
  const light = onLight && !menuOpen;

  const textColor = light ? "text-black" : "text-white";
  const linkColor = light ? "text-black/70" : "text-white/70";
  const linkHover = light ? "hover:text-black" : "hover:text-white";
  const hoverBar = light ? "bg-black" : "bg-white";

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-transform duration-500 ease-out will-change-transform md:px-12 md:py-6 ${barHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className={`font-display text-sm font-bold uppercase tracking-[0.3em] transition-colors duration-500 md:text-base md:tracking-[0.4em] ${textColor}`}
        >
          Operator.X
        </a>

        {/* Desktop links — unchanged layout, hidden on small screens */}
        <div className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.3em] md:flex md:gap-12">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative py-1 ${linkColor} transition-colors duration-500 ${linkHover}`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-px w-0 ${hoverBar} transition-all duration-300 group-hover:w-full`}
              />
            </a>
          ))}
        </div>

        {/* Mobile hamburger — comfortable 44px touch target */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 transition-all duration-300 ${hoverBar} ${menuOpen ? "top-1/2 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-6 transition-all duration-300 ${hoverBar} ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-6 transition-all duration-300 ${hoverBar} ${menuOpen ? "bottom-1/2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu overlay — same typography system, dark stage */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#050505] px-8 transition-opacity duration-300 md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-2">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 font-display text-3xl font-bold uppercase tracking-tight text-white/85 transition-all duration-300 hover:text-white ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Operator.X — Creative Portfolio
          </span>
        </div>
      </div>
    </>
  );
}