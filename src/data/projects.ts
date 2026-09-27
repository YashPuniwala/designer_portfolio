// --- Primitive building blocks ------------------------------------------------

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Typeface {
  name: string;
  role: string;
  specimen: string;
  weight?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface SocialStory extends ProjectImage {
  isVideo?: boolean;
}

// --- Shared fields every project carries --------------------------------------

interface ProjectBase {
  slug: string;
  id: string;
  title: string;
  client: string;
  year: number;
  services: string[];
  description: string;
  /** Main hero image � shown in the sticky intro and project cards */
  mainImage: string;
  projectUrl?: string;
}

// --- Brand Identity project ---------------------------------------------------

export interface BrandIdentityProject extends ProjectBase {
  type: "brand-identity";
  logos: ProjectImage[];
  typography: Typeface[];
  colors: ColorSwatch[];
  brainstorming: {
    phrase: string;
    images: ProjectImage[];
  };
  concept: {
    phrase: string;
    images: ProjectImage[];
  };
  /** All mockup images displayed in the masonry gallery */
  mockups: ProjectImage[];
}

// --- NILY project (dedicated branding case study) ----------------------------

export interface NilyLogoStage {
  num: string;  // "01" | "02" | "03"
  heading: string;
  description: string;
  /** Replace with actual NILY image path when assets are ready */
  imageSrc: string;
  imageAlt: string;
}

export interface NilyTypeface {
  name: string;
  role: string;
  specimen: string;
  weight?: string;
}

export interface NilyColorSwatch {
  name: string;
  hex: string;
}

export interface NilyMockupItem {
  num: string;
  src: string;
  alt: string;
  label: string;
}

export interface NilyProject extends ProjectBase {
  type: "nily";
  logoStages: NilyLogoStage[];
  typography: NilyTypeface[];
  colors: NilyColorSwatch[];
  brandElements: { src: string; alt: string; label: string }[];
  mockups: NilyMockupItem[];
}

// --- Social Media project -----------------------------------------------------

export interface SocialMediaProject extends ProjectBase {
  type: "social-media";
  contentOverview?: {
    heading: string;
    intro?: string;
    categories: string[];
  };
  socialPosts: ProjectImage[];
  storiesReels: SocialStory[];
}

// --- Discriminated union ------------------------------------------------------

export type ProjectData = BrandIdentityProject | SocialMediaProject | NilyProject;

// --- Legacy alias -------------------------------------------------------------

/** @deprecated Use `project.type === "brand-identity"` instead */
export type ProjectType = "brand-identity" | "social-media";

// --- Image asset map ---------------------------------------------------------

const A = {
  r1: "/images/breww/17.png",
  r2: "/images/recent-02.jpg",
  r3: "/images/recent-03.jpg",
  r4: "/images/recent-04.jpg",
  hero: "/images/hero.jpg",
  about: "/about-section-image.png",
  c1: "https://cdn.21st.dev/assets/mirror/68/68fd4edf19855762d0020e6ddbf3fdd31b7f768a6c65014d50ec6b36ef305b54.jpg",
  c2: "https://cdn.21st.dev/assets/mirror/bc/bca64f76b38b6b3e0f1c2357292903fc428e16d47b49005201be8ba51377ce8c.jpg",
  c3: "https://cdn.21st.dev/assets/mirror/04/04691b2e29925f30eac3817ea8f65d973484b711822252a13c15248859e464da.jpg",
  c4: "https://cdn.21st.dev/assets/mirror/71/711f1a9ccb3786dcc00e8031191dc4d58c9377cefb54bf927806921a4a05a818.jpg",
};

// --- Project data -------------------------------------------------------------

export const PROJECTS: ProjectData[] = [
  // -- NILY (Dedicated branding case study) ------------------------------------
  {
    slug: "nily",
    id: "00",
    title: "NILY",
    client: "NILY Brand",
    year: 2024,
    services: ["Brand Identity", "Logo Design", "Visual Identity"],
    description:
      "A complete brand identity system built from the ground up — from first mark exploration through to a refined, ownable logo and a full visual language that scales across every touchpoint.",
    mainImage: "/images/breww/17.png", // TODO: replace with actual NILY hero image
    type: "nily",
    logoStages: [
      {
        num: "01",
        heading: "Initial Concept",
        description:
          "The first round of explorations focused on finding the right mark — testing wordmarks, symbols and letterform-based directions. Each sketch pushed toward something unique and ownable.",
        // TODO: replace with actual NILY logo concept image
        imageSrc: "/images/breww/27.png",
        imageAlt: "NILY — Initial logo concept exploration",
      },
      {
        num: "02",
        heading: "Brand Simplification",
        description:
          "From the strongest directions, we stripped away complexity. The focus shifted to clarity — a mark that would read instantly at any size and carry the brand's character without noise.",
        // TODO: replace with actual NILY simplified logo image
        imageSrc: "/images/breww/25.png",
        imageAlt: "NILY — Simplified brand direction",
      },
      {
        num: "03",
        heading: "Refined Core Mark",
        description:
          "The final mark — refined, resolved and ready. Every curve, weight and proportion considered. A logo that is quiet enough to be versatile and strong enough to be remembered.",
        // TODO: replace with actual NILY final logo image
        imageSrc: "/images/breww/5.png",
        imageAlt: "NILY — Refined final core mark",
      },
    ],
    typography: [
      {
        name: "Space Grotesk",
        role: "Primary Display",
        specimen: "Nn",
        weight: "Bold",
      },
      {
        name: "Inter",
        role: "Secondary Body",
        specimen: "Ii",
        weight: "Regular",
      },
    ],
    colors: [
      { name: "Obsidian", hex: "#0A0A0A" },
      { name: "Bone", hex: "#F0EDE6" },
      { name: "Warm Slate", hex: "#2C2C2C" },
      { name: "Muted Gold", hex: "#C9A96E" },
    ],
    brandElements: [
      {
        // TODO: replace with actual NILY logo variation image
        src: "/images/breww/18.png",
        alt: "NILY — Primary logo mark",
        label: "Primary Mark",
      },
      {
        // TODO: replace with actual NILY monogram/icon image
        src: "/images/breww/21.png",
        alt: "NILY — Monogram / icon",
        label: "Monogram",
      },
      {
        // TODO: replace with actual NILY wordmark image
        src: "/images/breww/19.png",
        alt: "NILY — Wordmark horizontal",
        label: "Wordmark",
      },
    ],
    mockups: [
      {
        num: "01",
        // TODO: replace with actual NILY business card mockup
        src: "/images/breww/18.png",
        alt: "NILY — Business card",
        label: "Business Card",
      },
      {
        num: "02",
        // TODO: replace with actual NILY packaging mockup
        src: "/images/breww/21.png",
        alt: "NILY — Packaging",
        label: "Packaging",
      },
      {
        num: "03",
        // TODO: replace with actual NILY stationery mockup
        src: "/images/breww/5.png",
        alt: "NILY — Stationery",
        label: "Stationery",
      },
      {
        num: "04",
        // TODO: replace with actual NILY brand collateral mockup
        src: "/images/breww/9.png",
        alt: "NILY — Brand collateral",
        label: "Brand Collateral",
      },
      {
        num: "05",
        // TODO: replace with actual NILY signage mockup
        src: "/images/breww/10.png",
        alt: "NILY — Signage",
        label: "Signage",
      },
      {
        num: "06",
        // TODO: replace with actual NILY social/digital mockup
        src: "/images/breww/15.png",
        alt: "NILY — Social media / digital",
        label: "Digital",
      },
    ],
  },
  // -- Brand Identity ----------------------------------------------------------
  {
    slug: "after",
    id: "01",
    title: "After",
    client: "Private Client",
    year: 2024,
    services: ["Brand Identity", "Motion Design", "Web Experience"],
    description:
      "A complete visual reworking for a long-standing client entering a new chapter. The project paired a refined identity system with a cinematic website and a short brand film.",
    mainImage: A.r1,
    projectUrl: "https://example.com/after",
    type: "brand-identity",
    logos: [
      { src: A.about, alt: "After � primary logo" },
      { src: A.hero, alt: "After � monogram" },
      { src: A.r3, alt: "After � wordmark variation" },
    ],
    typography: [
      { name: "Space Grotesk", role: "Display", specimen: "Aa", weight: "Bold" },
      { name: "Inter", role: "Body", specimen: "Aa", weight: "Regular" },
    ],
    colors: [
      { name: "Ink", hex: "#050505" },
      { name: "Bone", hex: "#F2EFE9" },
      { name: "Amber", hex: "#FF8A3C" },
      { name: "Slate", hex: "#2A2A2A" },
    ],
    brainstorming: {
      phrase: "Explore. Question. Refine.",
      images: [
        { src: A.r2, alt: "After � research board" },
        { src: A.c1, alt: "After � sketch sheet" },
        { src: A.c3, alt: "After � moodboard" },
      ],
    },
    concept: {
      phrase: "Finding the right direction.",
      images: [
        { src: A.r4, alt: "After � concept A" },
        { src: A.c2, alt: "After � concept B" },
        { src: A.c4, alt: "After � direction lock" },
      ],
    },
    mockups: [
      { src: A.r1, alt: "After � mockup 01" },
      { src: A.r2, alt: "After � mockup 02" },
      { src: A.r3, alt: "After � mockup 03" },
      { src: A.r4, alt: "After � mockup 04" },
      { src: A.hero, alt: "After � mockup 05" },
      { src: A.about, alt: "After � mockup 06" },
      { src: A.c1, alt: "After � mockup 07" },
      { src: A.c2, alt: "After � mockup 08" },
      { src: A.c3, alt: "After � mockup 09" },
      { src: A.c4, alt: "After � mockup 10" },
      { src: A.r1, alt: "After � mockup 11" },
      { src: A.r3, alt: "After � mockup 12" },
    ],
  },
  {
    slug: "vogue",
    id: "02",
    title: "Vogue",
    client: "Editorial Client",
    year: 2024,
    services: ["Art Direction", "Web Design", "Digital Experience"],
    description:
      "An editorial digital experience built around a tight visual language and a strong sense of rhythm � more film than website.",
    mainImage: A.r2,
    type: "brand-identity",
    logos: [
      { src: A.r2, alt: "Vogue � primary logo" },
      { src: A.about, alt: "Vogue � monogram" },
      { src: A.hero, alt: "Vogue � lockup" },
    ],
    typography: [
      { name: "Space Grotesk", role: "Display", specimen: "Aa", weight: "Medium" },
      { name: "JetBrains Mono", role: "Meta", specimen: "Aa", weight: "Regular" },
    ],
    colors: [
      { name: "Noir", hex: "#0A0A0A" },
      { name: "Cream", hex: "#EDE8E0" },
      { name: "Rose", hex: "#C45C5C" },
      { name: "Graphite", hex: "#3A3A3A" },
    ],
    brainstorming: {
      phrase: "Explore. Question. Refine.",
      images: [
        { src: A.r1, alt: "Vogue � research" },
        { src: A.c2, alt: "Vogue � references" },
        { src: A.c4, alt: "Vogue � notes" },
      ],
    },
    concept: {
      phrase: "Finding the right direction.",
      images: [
        { src: A.r3, alt: "Vogue � concept 1" },
        { src: A.c1, alt: "Vogue � concept 2" },
        { src: A.c3, alt: "Vogue � final direction" },
      ],
    },
    mockups: [
      { src: A.r2, alt: "Vogue � mockup 01" },
      { src: A.r4, alt: "Vogue � mockup 02" },
      { src: A.c4, alt: "Vogue � mockup 03" },
      { src: A.r3, alt: "Vogue � mockup 04" },
      { src: A.hero, alt: "Vogue � mockup 05" },
      { src: A.c2, alt: "Vogue � mockup 06" },
      { src: A.about, alt: "Vogue � mockup 07" },
      { src: A.c1, alt: "Vogue � mockup 08" },
      { src: A.r1, alt: "Vogue � mockup 09" },
      { src: A.c3, alt: "Vogue � mockup 10" },
    ],
  },
  {
    slug: "pulse",
    id: "03",
    title: "Pulse",
    client: "Technology Partner",
    year: 2023,
    services: ["GSAP Animation", "Brand System", "Product Launch"],
    description:
      "A launch experience built around motion � turning a technical product into something energetic and easy to feel.",
    mainImage: A.r4,
    projectUrl: "https://example.com/pulse",
    type: "brand-identity",
    logos: [
      { src: A.r4, alt: "Pulse � primary logo" },
      { src: A.hero, alt: "Pulse � monogram" },
      { src: A.about, alt: "Pulse � lockup" },
    ],
    typography: [
      { name: "Space Grotesk", role: "Display", specimen: "Aa", weight: "Bold" },
      { name: "Inter", role: "UI", specimen: "Aa", weight: "Medium" },
    ],
    colors: [
      { name: "Void", hex: "#050505" },
      { name: "Signal", hex: "#1D3A8A" },
      { name: "Charge", hex: "#FF8A3C" },
      { name: "Spark", hex: "#D9E86B" },
    ],
    brainstorming: {
      phrase: "Explore. Question. Refine.",
      images: [
        { src: A.r1, alt: "Pulse � workshops" },
        { src: A.r2, alt: "Pulse � motion tests" },
        { src: A.c1, alt: "Pulse � systems" },
      ],
    },
    concept: {
      phrase: "Finding the right direction.",
      images: [
        { src: A.r3, alt: "Pulse � direction A" },
        { src: A.c4, alt: "Pulse � direction B" },
        { src: A.c2, alt: "Pulse � lock" },
      ],
    },
    mockups: [
      { src: A.r4, alt: "Pulse � mockup 01" },
      { src: A.r1, alt: "Pulse � mockup 02" },
      { src: A.r2, alt: "Pulse � mockup 03" },
      { src: A.r3, alt: "Pulse � mockup 04" },
      { src: A.c4, alt: "Pulse � mockup 05" },
      { src: A.c3, alt: "Pulse � mockup 06" },
      { src: A.hero, alt: "Pulse � mockup 07" },
      { src: A.about, alt: "Pulse � mockup 08" },
      { src: A.c1, alt: "Pulse � mockup 09" },
      { src: A.c2, alt: "Pulse � mockup 10" },
      { src: A.r4, alt: "Pulse � mockup 11" },
    ],
  },
  {
    slug: "atlas",
    id: "04",
    title: "Atlas",
    client: "Editorial Client",
    year: 2023,
    services: ["Micro Interaction", "Interface Design", "Brand Identity"],
    description:
      "A compact digital tool wrapped in a calm, considered interface � clarity and restraint as the product language.",
    mainImage: A.r3,
    type: "brand-identity",
    logos: [
      { src: A.r3, alt: "Atlas � primary logo" },
      { src: A.about, alt: "Atlas � monogram" },
      { src: A.r1, alt: "Atlas � wordmark" },
    ],
    typography: [
      { name: "Space Grotesk", role: "Display", specimen: "Aa", weight: "SemiBold" },
      { name: "Inter", role: "Body", specimen: "Aa", weight: "Regular" },
    ],
    colors: [
      { name: "Carbon", hex: "#111111" },
      { name: "Mist", hex: "#E8E4DC" },
      { name: "Teal", hex: "#3D7A7A" },
      { name: "Sand", hex: "#C9BFAF" },
    ],
    brainstorming: {
      phrase: "Explore. Question. Refine.",
      images: [
        { src: A.r2, alt: "Atlas � flows" },
        { src: A.c3, alt: "Atlas � wireframes" },
        { src: A.c1, alt: "Atlas � structure" },
      ],
    },
    concept: {
      phrase: "Finding the right direction.",
      images: [
        { src: A.r4, alt: "Atlas � concept UI" },
        { src: A.hero, alt: "Atlas � system" },
        { src: A.c2, alt: "Atlas � final" },
      ],
    },
    mockups: [
      { src: A.r3, alt: "Atlas � mockup 01" },
      { src: A.r1, alt: "Atlas � mockup 02" },
      { src: A.r2, alt: "Atlas � mockup 03" },
      { src: A.c1, alt: "Atlas � mockup 04" },
      { src: A.c4, alt: "Atlas � mockup 05" },
      { src: A.about, alt: "Atlas � mockup 06" },
      { src: A.hero, alt: "Atlas � mockup 07" },
      { src: A.c3, alt: "Atlas � mockup 08" },
      { src: A.r4, alt: "Atlas � mockup 09" },
      { src: A.c2, alt: "Atlas � mockup 10" },
    ],
  },
  // -- Social Media ------------------------------------------------------------
  {
    slug: "nova",
    id: "05",
    title: "Nova",
    client: "Creative Client",
    year: 2022,
    services: ["Social Media Posts", "Brand Identity", "Digital Experience"],
    description:
      "A full reworking for a client ready to move faster and look sharper � identity, website, and campaign as one system.",
    mainImage: A.r2,
    type: "social-media",
    contentOverview: {
      heading: "A cohesive feed for a mindful brand.",
      intro: "One system across product, ritual and community.",
      categories: ["PRODUCT", "SKINCARE", "LIFESTYLE", "COMMUNITY"],
    },
    socialPosts: [
      { src: A.r2, alt: "Nova � post 01" },
      { src: A.r4, alt: "Nova � post 02" },
      { src: A.r1, alt: "Nova � post 03" },
      { src: A.c4, alt: "Nova � post 04" },
      { src: A.about, alt: "Nova � post 05" },
      { src: A.hero, alt: "Nova � post 06" },
      { src: A.c3, alt: "Nova � post 07" },
      { src: A.r3, alt: "Nova � post 08" },
      { src: A.c1, alt: "Nova � post 09" },
      { src: A.c2, alt: "Nova � post 10" },
      { src: A.r2, alt: "Nova � post 11" },
      { src: A.r4, alt: "Nova � post 12" },
    ],
    storiesReels: [
      { src: A.c3, alt: "Nova � story 01" },
      { src: A.c1, alt: "Nova � story 02" },
      { src: A.c4, alt: "Nova � reel 01", isVideo: true },
      { src: A.c2, alt: "Nova � story 03" },
      { src: A.hero, alt: "Nova � reel 02", isVideo: true },
    ],
  },
  {
    slug: "aura",
    id: "06",
    title: "Aura",
    client: "Mindful Skincare",
    year: 2024,
    services: ["Social Media Design", "Art Direction", "Content System"],
    description:
      "A cohesive social system for a mindful skincare brand � product, ritual and community designed to read as one calm, continuous feed.",
    mainImage: A.r2,
    projectUrl: "https://example.com/aura",
    type: "social-media",
    contentOverview: {
      heading: "A cohesive feed for a mindful brand.",
      intro: "One system across product, ritual and community.",
      categories: ["PRODUCT", "SKINCARE", "LIFESTYLE", "COMMUNITY"],
    },
    socialPosts: [
      { src: A.r1, alt: "Aura � post 01" },
      { src: A.r2, alt: "Aura � post 02" },
      { src: A.r3, alt: "Aura � post 03" },
      { src: A.r4, alt: "Aura � post 04" },
      { src: A.c1, alt: "Aura � post 05" },
      { src: A.c2, alt: "Aura � post 06" },
      { src: A.c3, alt: "Aura � post 07" },
      { src: A.c4, alt: "Aura � post 08" },
      { src: A.hero, alt: "Aura � post 09" },
      { src: A.about, alt: "Aura � post 10" },
      { src: A.r1, alt: "Aura � post 11" },
      { src: A.r3, alt: "Aura � post 12" },
    ],
    storiesReels: [
      { src: A.c3, alt: "Aura � story 01" },
      { src: A.c1, alt: "Aura � story 02" },
      { src: A.c4, alt: "Aura � reel 01", isVideo: true },
      { src: A.c2, alt: "Aura � story 03" },
      { src: A.hero, alt: "Aura � reel 02", isVideo: true },
    ],
  },
];

// --- Public lookup API (signatures unchanged) ---------------------------------

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export function getNextProject(slug: string): ProjectData {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(idx + 1) % PROJECTS.length];
}

/** Type guard � true when project is a Social Media project. */
export function isSocialMediaProject(project: ProjectData): project is SocialMediaProject {
  return project.type === "social-media";
}

/** Type guard � true when project is a Brand Identity project. */
export function isBrandIdentityProject(project: ProjectData): project is BrandIdentityProject {
  return project.type === "brand-identity";
}

/** Type guard - true when project is the NILY branding case study. */
export function isNilyProject(project: ProjectData): project is NilyProject {
  return project.type === "nily";
}

export function getProjectTypeLabel(project: ProjectData): string {
  if (project.type === "social-media") return "Social Media Posts";
  if (project.type === "nily") return "Brand Identity / Logo Design";
  return "Brand Identity";
}
