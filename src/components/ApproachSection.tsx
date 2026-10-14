import { useState } from "react";

type Step = {
  number: string;
  title: string;
  meta: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "001",
    title: "Discover",
    meta: "Analyze",
    description:
      "Unpack the core design challenge. Define brand context, audience expectations, and functional requirements before sketching.",
  },
  {
    number: "002",
    title: "Explore",
    meta: "Ideate",
    description:
      "Test visual directions, typographic treatments, and rough symbol concepts through sketches and rapid iteration.",
  },
  {
    number: "003",
    title: "Construct",
    meta: "Form",
    description:
      "Translate the strongest direction into precise vector geometry, establishing baseline grids and optical proportions.",
  },
  {
    number: "004",
    title: "Refine",
    meta: "Detail",
    description:
      "Fine-tune stroke weights, negative space relationships, legibility tolerances, and responsive lockups.",
  },
  {
    number: "005",
    title: "Deliver",
    meta: "System",
    description:
      "Assemble production-ready assets, comprehensive brand guidelines, and real-world mockups ready for deployment.",
  },
];

export default function ApproachSection() {
  // One expanded row at a time; moving between rows transitions smoothly.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="approach"
      className="approach-section"
      aria-label="Design Process and Approach"
    >
      <div className="approach-inner">
        <header className="approach-header">
          <h2 className="approach-title">
            A refined process
            <br />
            built on <span className="script-accent">clarity.</span>
          </h2>
        </header>

        <ul className="approach-list">
          {STEPS.map((step, i) => {
            const isActive = activeIndex === i;
            return (
              <li
                key={step.number}
                className={`approach-row${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : i)}
                tabIndex={0}
                aria-expanded={isActive}
              >
                <div className="approach-row-main">
                  <span className="approach-num">{step.number}</span>
                  <h3 className="approach-name">{step.title}</h3>
                  <span className="approach-meta">{step.meta}</span>
                </div>

                <div className="approach-reveal">
                  <div className="approach-reveal-inner">
                    <p className="approach-desc">{step.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
