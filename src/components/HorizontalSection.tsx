import { useRef } from "react";

type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  image: string;
  color: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Monolith",
    category: "Brand Identity",
    year: "2024",
    image: "/images/hero.jpg",
    color: "#ff8a3c",
  },
  {
    index: "02",
    title: "Aurora Labs",
    category: "Web Experience",
    year: "2024",
    image:
      "https://cdn.21st.dev/assets/mirror/68/68fd4edf19855762d0020e6ddbf3fdd31b7f768a6c65014d50ec6b36ef305b54.jpg",
    color: "#7c9cff",
  },
  {
    index: "03",
    title: "Nebula",
    category: "Art Direction",
    year: "2023",
    image:
      "https://cdn.21st.dev/assets/mirror/bc/bca64f76b38b6b3e0f1c2357292903fc428e16d47b49005201be8ba51377ce8c.jpg",
    color: "#ff5d8f",
  },
  {
    index: "04",
    title: "Vertex",
    category: "Product Launch",
    year: "2023",
    image: "/about-section-image.png",
    color: "#5fe0c5",
  },
  {
    index: "05",
    title: "Helios",
    category: "Campaign Film",
    year: "2022",
    image:
      "https://cdn.21st.dev/assets/mirror/04/04691b2e29925f30eac3817ea8f65d973484b711822252a13c15248859e464da.jpg",
    color: "#ffd166",
  },
  {
    index: "06",
    title: "Orbit",
    category: "Motion System",
    year: "2022",
    image:
      "https://cdn.21st.dev/assets/mirror/71/711f1a9ccb3786dcc00e8031191dc4d58c9377cefb54bf927806921a4a05a818.jpg",
    color: "#c08bff",
  },
];

export default function HorizontalSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const progressRef = useRef<HTMLSpanElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="horizontal-section"
      aria-label="Selected Work"
    >
      <div className="horizontal-track">
        {/* Intro panel */}
        <div className="horizontal-intro flex h-full w-[88vw] shrink-0 flex-col justify-center px-6 md:w-[42vw] md:px-16">
          <h2 className="font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-tight text-white md:text-[8vw]">
            The
            <br />
            <span className="text-outline">Work</span>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
            A horizontal cut through recent releases — brand systems, digital
            experiences and films built for ambitious teams.
          </p>
          <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>Scroll sideways</span>
            <span className="inline-block h-px w-16 bg-white/30" />
          </div>
        </div>

        {/* Project cards */}
        {PROJECTS.map((p) => (
          <article
            key={p.index}
            className="horizontal-card group relative h-[64vh] w-[78vw] shrink-0 overflow-hidden rounded-2xl md:h-[70vh] md:w-[34vw]"
          >
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
              <div className="flex items-start justify-between">
                <span
                  className="font-display text-2xl font-bold"
                  style={{ color: p.color }}
                >
                  {p.index}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  {p.year}
                </span>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
                  {p.title}
                </h3>
              </div>
            </div>
          </article>
        ))}

        {/* Outro CTA panel */}
        <div className="horizontal-outro flex h-full w-[88vw] shrink-0 flex-col items-start justify-center px-6 md:w-[46vw] md:px-20">
          <h2 className="font-display text-[9vw] font-bold uppercase leading-[0.9] text-white md:text-[4.5vw]">
            Let's build
            <br />
            something
            <br />
            <span className="text-amber-glow">impossible</span>
            <br />
            to ignore.
          </h2>
          <a
            href="#home"
            className="mt-10 inline-flex items-center gap-3 border border-white/25 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Start a project <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <span
          ref={progressRef}
          className="horizontal-progress block h-full origin-left scale-x-0 bg-amber-glow"
        />
      </div>
    </section>
  );
}
