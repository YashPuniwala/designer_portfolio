export function ShowcaseSection() {
  return (
    <section
      className="showcase-section relative"
      id="showcase"
      aria-label="Featured Work Showcase"
    >
      <div className="showcase-wrapper">
        <img
          src="/about-section-image.png"
          alt="Featured Work"
          className="showcase-img"
        />
      </div>

      {/* Parallax images — each travels from below the viewport to above it,
          overlapping and driven purely by scroll, enlarged for cinematic presence */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="https://cdn.21st.dev/assets/mirror/68/68fd4edf19855762d0020e6ddbf3fdd31b7f768a6c65014d50ec6b36ef305b54.jpg"
          alt="Parallax detail 1"
          className="showcase-parallax showcase-parallax-1 absolute left-[5%] top-[8%] w-[42%] max-w-[540px] will-change-transform"
        />
        <img
          src="https://cdn.21st.dev/assets/mirror/bc/bca64f76b38b6b3e0f1c2357292903fc428e16d47b49005201be8ba51377ce8c.jpg"
          alt="Parallax detail 2"
          className="showcase-parallax showcase-parallax-2 absolute bottom-[6%] right-[8%] w-[28%] max-w-[380px] will-change-transform"
        />
        <img
          src="https://cdn.21st.dev/assets/mirror/04/04691b2e29925f30eac3817ea8f65d973484b711822252a13c15248859e464da.jpg"
          alt="Parallax detail 3"
          className="showcase-parallax showcase-parallax-3 absolute right-[24%] top-[12%] w-[22%] max-w-[300px] will-change-transform"
        />
        <img
          src="https://cdn.21st.dev/assets/mirror/71/711f1a9ccb3786dcc00e8031191dc4d58c9377cefb54bf927806921a4a05a818.jpg"
          alt="Parallax detail 4"
          className="showcase-parallax showcase-parallax-4 absolute bottom-[12%] left-[14%] w-[36%] max-w-[460px] will-change-transform"
        />
      </div>
    </section>
  );
}
