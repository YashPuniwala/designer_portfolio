import { useEffect, useRef, useState, type CSSProperties } from "react";

/* ═════════════════════════════════════════════════════════════
   YOUR PALETTE: change colours here, nothing else needs touching
═════════════════════════════════════════════════════════════ */
const PALETTE = {
  paper: "#ffffff",              // section background
  ink: "#141414",              // main text
  muted: "#7d786b",              // small labels / blurb
  line: "rgba(20,20,20,0.12)",  // dividers, pill borders
  track: "rgba(20,20,20,0.10)",  // empty part of the bars
  ghost: "rgba(20,20,20,0.04)",  // big "KIT" word
  accent: "#ff6b35",              // label, handwriting, hovers
};

/* ───────────── Data (edit freely) ───────────── */
const MAIN_TOOLS = [
  { name: "Figma", tag: "DAILY DRIVER", level: 96, color: "#2b50e6" },
  { name: "InDesign", tag: "PUBLICATION", level: 92, color: "#f2401e" },
  { name: "Illustrator", tag: "MARKS & TYPE", level: 88, color: "#ff6a3a" },
  { name: "Photoshop", tag: "RETOUCH", level: 84, color: "#ffc400" },
] as const;

const ALSO = ["After Effects", "Blender", "CapCut", "Canva"] as const;

// listed column by column on desktop (4 left, 3 right)
const AI_TOOLS = [
  { name: "Claude", tag: "IDEATION" },
  { name: "Midjourney", tag: "IMAGE GEN" },
  { name: "Relume", tag: "WIREFRAMING" },
  { name: "ChatGPT", tag: "CONTENT & IMAGE" },
  { name: "Claude Design", tag: "UI" },
  { name: "Runway", tag: "VIDEO GEN" },
  { name: "Google Stitch", tag: "UI HELP" },
] as const;

/* ───────────── Shared class strings ───────────── */
const MONO = "font-mono text-[10px] font-medium uppercase tracking-[0.18em]";
const DISPLAY = "[font-family:var(--font-display,Impact,sans-serif)]";
const HAND = "[font-family:var(--font-hand,'Segoe_Script','Bradley_Hand',cursive)]";
const FADE = "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none";
const rise = (on: boolean) => (on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0");

export default function ToolkitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);

  const [inView, setInView] = useState(false);
  const [settled, setSettled] = useState(false); // drops stagger delays after the intro
  const [hovered, setHovered] = useState<number | null>(null);

  /* Content animates in as the curtain rises */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      setSettled(true);
      return;
    }
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          t = window.setTimeout(() => setSettled(true), 2200);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  /* Guarantee the whole section fits in one screen on desktop:
     if the content is taller than the window, scale it down just enough. */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      if (window.innerWidth < 768) return setFit(1); // mobile keeps natural height
      setFit(Math.min(1, window.innerHeight / el.offsetHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const delay = (ms: number): CSSProperties => ({
    transitionDelay: settled ? "0ms" : `${ms}ms`,
  });

  /* Dot rides along the bar under the cursor */
  const moveDot = (e: React.PointerEvent<HTMLDivElement>) => {
    const dot = e.currentTarget.querySelector<HTMLElement>("[data-dot]");
    const track = dot?.parentElement;
    if (!dot || !track) return;
    const r = track.getBoundingClientRect();
    dot.style.left = `${Math.min(Math.max(e.clientX - r.left, 0), r.width)}px`;
  };

  const vars = {
    "--paper": PALETTE.paper,
    "--ink": PALETTE.ink,
    "--muted": PALETTE.muted,
    "--line": PALETTE.line,
    "--track": PALETTE.track,
    "--ghost": PALETTE.ghost,
    "--accent": PALETTE.accent,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Toolkit"
      style={vars}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[color:var(--paper)] text-[color:var(--ink)] md:h-[100svh]"
    >
      {/* ghost word */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-6 right-[-4%] select-none text-[34vw] font-black leading-none text-[color:var(--ghost)] md:text-[min(22rem,48vh)] ${DISPLAY}`}
      >
        KIT
      </div>

      <div
        ref={contentRef}
        style={{ transform: `scale(${fit})` }}
        className="relative mx-auto w-full max-w-[1100px] origin-center px-6 py-12 md:px-14 md:py-[4vh]"
      >
        {/* label row */}
        <div className="flex items-center gap-4">
          <span className={`${MONO} text-[color:var(--accent)]`}>Toolkit</span>
          <span
            className={`h-px flex-1 origin-left bg-[color:var(--line)] transition-transform duration-[1200ms] ease-out motion-reduce:transition-none ${inView ? "scale-x-100" : "scale-x-0"
              }`}
          />
          <span
            className={`group/hand -rotate-2 cursor-default whitespace-nowrap text-xl text-[color:var(--accent)] ${HAND} ${FADE} ${rise(inView)}`}
            style={delay(500)}
          >
            a sharp little kit{" "}
            <span className="inline-block transition-transform duration-300 group-hover/hand:rotate-[24deg] group-hover/hand:scale-125">
              ✏️
            </span>
          </span>
        </div>

        {/* heading + blurb */}
        <div className="mt-[3vh] grid items-end gap-5 md:grid-cols-2 md:gap-10">
          <h2
            className={`m-0 text-[clamp(2.4rem,min(6.2vw,9vh),4.6rem)] font-black uppercase leading-[0.92] tracking-wide ${DISPLAY}`}
          >
            {["The tools on", "my bench."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  className={`block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${inView ? "translate-y-0" : "translate-y-[110%]"
                    }`}
                  style={delay(150 + i * 120)}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p
            className={`m-0 max-w-[340px] text-sm leading-relaxed text-[color:var(--muted)] md:mb-1 md:justify-self-end ${FADE} ${rise(inView)}`}
            style={delay(450)}
          >
            AI stays in the loop, never at the wheel, it speeds the thinking, the calls stay mine.
          </p>
        </div>

        {/* main tools: bars */}
        <div className="mt-[4vh] grid gap-x-14 gap-y-[2.6vh] md:grid-cols-2">
          {MAIN_TOOLS.map((t, i) => {
            const dim = hovered !== null && hovered !== i;
            return (
              <div
                key={t.name}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                onPointerMove={moveDot}
                style={delay(600 + i * 110)}
                className={`group/row cursor-default ${FADE} ${!inView ? "translate-y-6 opacity-0" : dim ? "translate-y-0 opacity-35" : "translate-y-0 opacity-100"
                  }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[17px] font-semibold transition-transform duration-300 group-hover/row:translate-x-1">
                    {t.name}
                  </span>
                  <span className={`${MONO} text-[color:var(--muted)] transition-colors duration-300 group-hover/row:text-[color:var(--ink)]`}>
                    {t.tag}
                  </span>
                </div>

                <div className="relative mt-2">
                  <div className="h-1.5 w-full rounded-full bg-[color:var(--track)] transition-[height] duration-300 group-hover/row:h-2.5">
                    <div
                      className="h-full rounded-full transition-[width,box-shadow] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:shadow-[0_0_16px_var(--c)] motion-reduce:transition-none"
                      style={
                        {
                          "--c": t.color,
                          backgroundColor: t.color,
                          width: inView ? `${t.level}%` : "0%",
                          transitionDelay: settled ? "0ms" : `${800 + i * 130}ms`,
                        } as CSSProperties
                      }
                    />
                  </div>
                  <span
                    data-dot
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[color:var(--paper)] bg-[color:var(--ink)] opacity-0 shadow transition-[left,opacity] duration-150 ease-out group-hover/row:opacity-100"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* also */}
        <div className="mt-[3vh] flex flex-wrap items-center gap-2">
          <span className={`${MONO} mr-2 text-[color:var(--muted)]`}>Also</span>
          {ALSO.map((name, i) => (
            <span
              key={name}
              style={delay(1100 + i * 80)}
              className={`cursor-default rounded-full border border-[color:var(--line)] px-3.5 py-1.5 text-[11px] font-semibold transition-[opacity,transform,background-color,color,border-color] duration-500 hover:-translate-y-0.5 hover:-rotate-3 hover:border-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)] motion-reduce:transition-none ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              {name}
            </span>
          ))}
        </div>

        {/* AI */}
        <div className="mt-[3.5vh] border-t border-[color:var(--line)] pt-[2.6vh]">
          <div
            className={`flex items-center gap-2.5 ${MONO} text-[color:var(--accent)] ${FADE} ${rise(inView)}`}
            style={delay(1200)}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            </span>
            AI kept in the loop
          </div>

          <ul className="m-0 mt-2 grid list-none gap-x-14 p-0 md:grid-flow-col md:grid-cols-2 md:grid-rows-4">
            {AI_TOOLS.map((t, i) => (
              <li
                key={t.name}
                style={delay(1300 + i * 90)}
                className={`group/ai relative flex items-center justify-between border-b border-[color:var(--line)] py-[clamp(6px,1.1vh,12px)] ${FADE} ${rise(inView)}`}
              >
                <span className="text-[17px] font-semibold transition-[transform,color] duration-300 group-hover/ai:translate-x-1.5 group-hover/ai:text-[color:var(--accent)]">
                  {t.name}
                </span>
                <span className={`${MONO} text-[color:var(--muted)] transition-colors duration-300 group-hover/ai:text-[color:var(--accent)]`}>
                  {t.tag}
                </span>
                <span className="pointer-events-none absolute -bottom-px left-0 h-px w-0 bg-[color:var(--accent)] transition-[width] duration-500 ease-out group-hover/ai:w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}