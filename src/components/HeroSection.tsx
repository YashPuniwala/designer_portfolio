import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#fafafa] text-neutral-900"
    >
      {/* GIANT NAME */}
      <div className="pointer-events-none relative z-10 mt-24 w-full px-3 sm:mt-28 md:mt-32 md:px-6">
        <h1
          className="whitespace-normal text-center font-black uppercase leading-[0.95] tracking-[-0.02em] sm:whitespace-nowrap sm:leading-[0.8]"
          style={{ fontSize: "clamp(2rem, 11vw, 13rem)" }}
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

      {/* PORTRAIT */}
      <div className="pointer-events-none relative z-20 mt-6 flex justify-center sm:mt-8 md:mt-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
        <div className="h-[240px] w-auto overflow-hidden sm:h-[300px] md:h-[360px] lg:h-[72vh]">
          <img
            src="/hero-image4.png"
            alt="Yash Puniwala"
            className="h-full w-auto object-cover object-top"
          />
        </div>
      </div>

      {/* BOTTOM CONTENT */}
      <div className="relative z-30 mx-auto mt-6 flex w-full max-w-[1600px] flex-col gap-6 px-5 pb-10 pt-6 sm:mt-8 sm:gap-8 sm:pt-8 md:px-8 lg:absolute lg:inset-x-0 lg:bottom-16 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:pb-0 lg:pt-0">

        {/* LEFT — HEADLINE */}
        <h1
          className="ml-[6px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-neutral-900"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
        >
          <span className="block">
            Your
          </span>

          <span className="block">
            Graphic
          </span>

          <span className="block">
            Agency{" "}
            <span className="inline-block text-[#E8491D]">
              &#10038;
            </span>
          </span>
        </h1>

        {/* =================================================
            BOTTOM RIGHT — INTRO STATEMENT
        ================================================== */}
        <div
          className="
            w-full
            max-w-[520px]
            self-end
            lg:mb-1
            lg:max-w-[450px]
          "
        >
          <p
            className="
              font-bold
              leading-[1.08]
              tracking-[-0.035em]
              text-neutral-900
            "
            style={{
              fontSize: "clamp(1.35rem, 2.2vw, 1.7rem)",
            }}
          >
            We craft bold brand identities and digital experiences that finally
            make your work impossible to ignore.
          </p>
        </div>
      </div>
    </section>
  );
}