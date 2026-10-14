import { createRoot } from "react-dom/client";
import "./index.css";
import "./project-detail.css";
import App from "./App";

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
}

createRoot(document.getElementById("root")!).render(<App />);
