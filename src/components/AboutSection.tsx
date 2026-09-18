const STATEMENT =
  "Operator.X is an independent creative agency engineering bold brand identities, cinematic websites and digital experiences that make ambitious work impossible to ignore.";

export function AboutSection() {
  const words = STATEMENT.split(" ");

  return (
    <section
      className="about-section relative flex w-full items-center justify-center bg-ink px-6 md:px-12"
      aria-label="About Operator.X"
    >
      {/* Statement — the only content, centered; words brighten one-by-one */}
      <p className="about-statement max-w-5xl text-center font-display text-[6.4vw] font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4.2rem]">
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
