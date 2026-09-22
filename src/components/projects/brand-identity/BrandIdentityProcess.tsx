export function BrandIdentityProcess() {
  const steps = [
    "Brainstorming\n& Ideas",
    "Logo",
    "Typography\n& Colors",
    "Mockups",
  ];

  return (
    <section className="cs-section cs-process-section" aria-label="Process">
      <p className="cs-label">Process</p>

      {/* Horizontal step flow */}
      <div className="cs-process-steps">
        {steps.map((step, i, arr) => (
          <div key={i} className="cs-process-step">
            <span className="cs-process-num">0{i + 1}</span>
            <span className="cs-process-name">{step}</span>
            {i < arr.length - 1 && (
              <span className="cs-process-arrow" aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Process text blocks — no images, short editorial copy */}
      <div className="cs-process-text">
        <div className="cs-process-block">
          <span className="cs-process-block-label">Direction</span>
          <p className="cs-process-block-copy">
            We started by understanding the brand's core — its audience,
            its tone, and the space it needed to own. Every decision
            traces back to a clear, agreed-upon direction.
          </p>
        </div>
        <div className="cs-process-block">
          <span className="cs-process-block-label">Exploration</span>
          <p className="cs-process-block-copy">
            Ideas were explored across mark-making, typeface pairings,
            and color language. We tested contrast, scale, and context
            until a visual language started to feel inevitable.
          </p>
        </div>
        <div className="cs-process-block">
          <span className="cs-process-block-label">Refinement</span>
          <p className="cs-process-block-copy">
            The strongest elements were distilled into a coherent
            system — logo, type, and palette working as one. Nothing
            superfluous. Everything intentional.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BrandIdentityProcess;
