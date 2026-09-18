import { ZoomParallax } from "@/components/ui/zoom-parallax";

const PROJECT_IMAGES = [
  {
    src: "/about-section-image.png",
    alt: "Operator.X — Featured brand installation",
  },
  {
    src: "/images/hero.jpg",
    alt: "Monolith — Brand identity",
  },
  {
    src: "/images/recent-01.jpg",
    alt: "After — Micro interaction",
  },
  {
    src: "/images/recent-02.jpg",
    alt: "Vogue — Web development",
  },
  {
    src: "/images/recent-03.jpg",
    alt: "Atlas — Editorial design",
  },
  {
    src: "/images/recent-04.jpg",
    alt: "Pulse — Immersive campaign",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/68/68fd4edf19855762d0020e6ddbf3fdd31b7f768a6c65014d50ec6b36ef305b54.jpg",
    alt: "Orbit — Motion system",
  },
];

export default function ParallaxProject() {
  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="relative bg-white text-black"
    >
      {/* Section heading — the composition below carries the story */}
      <div className="flex flex-col items-center px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
        <h2 className="max-w-4xl font-display text-[11vw] font-bold uppercase leading-[0.9] tracking-tight text-black sm:text-5xl md:text-7xl">
          Work in <span className="text-amber-glow">Motion</span>
        </h2>
      </div>

      {/* Scroll-controlled cinematic sequence:
          grid → centre text → image reveal → zoom → full screen → release */}
      <ZoomParallax
        images={PROJECT_IMAGES}
        centerText="Featured Work"
      />
    </section>
  );
}
