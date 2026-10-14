export interface SEOMetadata {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: "website" | "article";
}

const DEFAULT_IMAGE = "/hero-image5.png";
const BASE_URL = "https://yashpuniwala.com";

export function updateSEO({
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOMetadata) {
  if (typeof document === "undefined") return;

  // 1. Document title
  document.title = title;

  // 2. Meta tags helper
  const setMeta = (attr: "name" | "property", key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const fullUrl = url
    ? url.startsWith("http")
      ? url
      : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`
    : typeof window !== "undefined"
      ? window.location.href
      : BASE_URL;

  const fullImage = image.startsWith("http")
    ? image
    : `${BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", fullUrl);
  setMeta("property", "og:type", type);
  setMeta("property", "og:image", fullImage);
  setMeta("property", "og:site_name", "Yash Puniwala Portfolio");

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", fullImage);

  // 3. Canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", fullUrl);
}
