import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATEMENT =
  "I’m a graphic & brand designer who turns ideas into identities people remember, from bold visual systems and logos to campaigns, digital experiences, and the details that make a brand feel like a brand. I care about the big idea, obsess over the little details, and design with one goal: making good work impossible to scroll past.";

export function AboutSection() {
  const words = STATEMENT.split(" ");
  const pRef = useRef<HTMLParagraphElement>(null);

  /* Fit the whole paragraph in one screen: find the LARGEST font-size whose
     rendered height still fits the viewport (minus room for the navbar).
     Only touches font-size on the <p>. No scroll / animation logic changes. */
  useLayoutEffect(() => {
    const p = pRef.current;
    if (!p) return;

    let lastW = 0;
    let lastH = 0;
    let lastSize = 0;

    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const reserve = vw < 768 ? 104 : 120; // navbar space + bottom breathing room
      const avail = vh - reserve;
      let lo = 14;
      let hi = Math.min(vw * 0.095, 72);

      for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        p.style.fontSize = `${mid}px`;
        if (p.offsetHeight <= avail) lo = mid;
        else hi = mid;
      }
      p.style.fontSize = `${lo}px`;
      lastW = vw;
      lastH = vh;

      // Layout changed after the scroll animation measured it, so re-measure
      // the triggers. This keeps the word-by-word brighten in sync.
      if (Math.abs(lo - lastSize) > 0.5) {
        lastSize = lo;
        requestAnimationFrame(() => {
          try {
            ScrollTrigger.refresh();
          } catch {
            /* ScrollTrigger not in use: nothing to refresh */
          }
        });
      }
    };

    fit();

    let raf = 0;
    const onResize = () => {
      // ignore tiny height-only changes (mobile address bar show/hide)
      if (
        window.innerWidth === lastW &&
        Math.abs(window.innerHeight - lastH) < 120
      )
        return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      className="about-section relative flex w-full items-center justify-center bg-ink px-6 md:px-12"
      aria-label="About Operator.X"
    >
      {/* Statement — the only content, centered; words brighten one-by-one */}
      <p
        ref={pRef}
        className="about-statement max-w-3xl sm:max-w-5xl text-center font-display font-medium leading-[1.18] sm:leading-[1.15] tracking-tight text-[clamp(1.3rem,3.6svh,1.55rem)] sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4.2rem]"
      >
        {words.map((word, i) => (
          <span key={i} className="about-word inline-block">
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </p>
    </section>
  );
}