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
    meta: "Observe",
    description:
      "Start with the problem. Understand the context, audience, and what the work needs to achieve.",
  },
  {
    number: "002",
    title: "Explore",
    meta: "Explore",
    description:
      "Research, experiment, sketch, and test different ideas and visual directions.",
  },
  {
    number: "003",
    title: "Create",
    meta: "Make",
    description:
      "Turn the strongest direction into thoughtful, distinctive design.",
  },
  {
    number: "004",
    title: "Refine",
    meta: "Detail",
    description:
      "Push the details, question decisions, and make the final work feel clear and complete.",
  },
  {
    number: "005",
    title: "Deliver",
    meta: "Final",
    description:
      "Bring everything together into a finished piece that is ready to exist in the real world.",
  },
];

export default function ApproachSection() {
  // One expanded row at a time; moving between rows transitions smoothly.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="approach"
      className="approach-section"
      aria-label="Our Approach"
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
