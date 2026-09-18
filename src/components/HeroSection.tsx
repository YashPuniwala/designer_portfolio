export default function Hero() {
  const SCRIPT_FONT = '"Caveat", "Brush Script MT", cursive';

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#fafafa] text-neutral-900 lg:block"
    >
      {/* ── GIANT NAME ────────────────────────────────────────────── */}
      <div className="pointer-events-none relative z-10 order-1 mt-[72px] w-full px-4 sm:mt-20 sm:px-5 md:mt-24 md:px-6 lg:mt-34 lg:px-3">
        <h1
          className="font-black uppercase text-center leading-[0.88] tracking-[-0.025em] lg:whitespace-nowrap lg:leading-[0.8] lg:tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.6rem, 14vw, 13rem)" }}
        >
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "0.02em #171717" }}
          >
            YASH
          </span>{" "}
          <span className="text-neutral-900">PUNIWALA</span>
        </h1>
      </div>

      {/* ── YOUR GRAPHIC AGENCY (tablet/mobile only) ──────────────── */}
      <div className="pointer-events-none relative z-30 order-2 mt-6 w-full px-4 text-center sm:mt-7 sm:px-5 md:mt-8 md:px-6 lg:hidden">
        <h2
          className="font-black uppercase leading-[0.88] tracking-[-0.03em] text-neutral-900"
          style={{ fontSize: "clamp(1.6rem, 5.5vw, 3.5rem)" }}
        >
          <span className="block " style={{ fontFamily: SCRIPT_FONT }}>Your</span>
          <span className="block text-[#ff8a3c]" style={{ fontFamily: SCRIPT_FONT }}
          >Graphic</span>
          <span className="block " style={{ fontFamily: SCRIPT_FONT }}>
            Designer{" "}
          </span>
        </h2>
      </div>

      {/* ── DESCRIPTION (tablet/mobile only) ──────────────────────── */}
      <div className="pointer-events-none relative z-30 order-3 mt-8 flex w-full justify-center px-6 sm:mt-6 sm:px-8 md:mt-7 md:px-10 lg:hidden">
        <p
          className="text-center font-bold leading-[1.15] tracking-[-0.02em] text-neutral-900"
          style={{
            fontSize: "clamp(0.92rem, 2.6vw, 1.35rem)",
            maxWidth: "min(460px, 88vw)",
          }}
        >
          We craft bold brand identities and digital experiences that finally
          make your work impossible to ignore.
        </p>
      </div>

      {/* ── PORTRAIT ──────────────────────────────────────────────── */}
      {/* Mobile/tablet: order-4 (last), mt-auto pushes it to bottom */}
      {/* Desktop (lg+): absolute bottom-center, z-20.               */}
      <div className="hero-portrait-wrap pointer-events-none relative z-20 order-4 mt-8 flex w-full justify-center sm:mt-10 md:mt-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
        <div className="hero-portrait-img-wrap w-auto overflow-hidden">
          <img
            src="/hero-image4.png"
            alt="Yash Puniwala"
            className="h-full w-auto object-cover object-top"
          />
        </div>
      </div>

      {/* ── BOTTOM CONTENT ROW — Desktop (lg+) only ───────────────── */}
      {/* On mobile/tablet the agency heading + description are        */}
      {/* rendered above as order-2 / order-3. This container is      */}
      {/* hidden on mobile/tablet and shown on lg+.                   */}
      <div className="hidden lg:absolute lg:inset-x-0 lg:bottom-16 lg:z-30 lg:mx-auto lg:flex lg:w-full lg:max-w-[1600px] lg:flex-row lg:items-end lg:justify-between lg:px-8">
        {/* LEFT — YOUR GRAPHIC AGENCY */}
        <h1
          className="ml-[6px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-neutral-900"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
        >
          <span className="block" style={{ fontFamily: SCRIPT_FONT }}>Your</span>
          <span className="block text-[#ff8a3c]" style={{ fontFamily: SCRIPT_FONT }}>Graphic</span>
          <span className="block" style={{ fontFamily: SCRIPT_FONT }}>
            Designer{" "}
          </span>
        </h1>

        {/* RIGHT — DESCRIPTION */}
        <div className="w-full max-w-[520px] self-end lg:mb-1 lg:max-w-[450px]">
          <p
            className="font-bold leading-[1.08] tracking-[-0.035em] text-neutral-900"
            style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.7rem)" }}
          >
            We craft bold brand identities and digital experiences that finally
            make your work impossible to ignore.
          </p>
        </div>
      </div>
    </section>
  );
}