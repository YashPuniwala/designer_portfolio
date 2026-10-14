import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type Route =
  | { name: "home" }
  | { name: "contact" }
  | { name: "project"; slug: string };

/**
 * Parses the current URL to determine the active route.
 * Automatically handles legacy hash-based URLs (e.g. #/projects/comforto or #/contact)
 * by replacing history with clean URLs.
 */
export function parseRoute(): Route {
  if (typeof window === "undefined") {
    return { name: "home" };
  }

  // Backward compatibility: seamlessly migrate legacy hash-based URLs
  const hash = window.location.hash || "";
  if (hash.startsWith("#/projects/")) {
    const slug = decodeURIComponent(hash.replace("#/projects/", "").replace(/\/$/, ""));
    window.history.replaceState(null, "", `/projects/${slug}`);
    return { name: "project", slug };
  }
  if (hash === "#/contact" || hash === "#contact") {
    window.history.replaceState(null, "", "/contact");
    return { name: "contact" };
  }

  // Standard clean browser-history routing
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/contact") {
    return { name: "contact" };
  }

  const projectMatch = pathname.match(/^\/projects\/([\w-]+)$/);
  if (projectMatch) {
    return { name: "project", slug: decodeURIComponent(projectMatch[1]) };
  }

  return { name: "home" };
}

/**
 * Clean navigation helper using the HTML5 History API.
 */
export function navigate(to: string, options?: { replace?: boolean }) {
  if (typeof window === "undefined") return;

  // If navigating to an anchor on the homepage from another page (e.g. /#about or #about)
  const isHashAnchor = to.startsWith("#") || (to.startsWith("/#") && to.length > 2);
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

  if (isHashAnchor) {
    const targetHash = to.startsWith("/#") ? to.substring(1) : to;
    if (currentPath !== "/") {
      if (options?.replace) {
        window.history.replaceState(null, "", "/" + targetHash);
      } else {
        window.history.pushState(null, "", "/" + targetHash);
      }
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      window.history.pushState(null, "", "/" + targetHash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    return;
  }

  // Avoid pushing duplicate states
  const targetUrl = new URL(to, window.location.origin);
  if (
    targetUrl.pathname === window.location.pathname &&
    targetUrl.hash === window.location.hash &&
    targetUrl.search === window.location.search
  ) {
    return;
  }

  if (options?.replace) {
    window.history.replaceState(null, "", to);
  } else {
    window.history.pushState(null, "", to);
  }

  window.dispatchEvent(new PopStateEvent("popstate"));
}

/**
 * React hook to listen to browser-history route changes.
 */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute());

  useEffect(() => {
    const onChange = () => {
      // Tear down homepage ScrollTriggers before swapping views
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setRoute(parseRoute());
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return route;
}
