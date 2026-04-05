import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Initialize theme on page load
(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");

  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    root.style.colorScheme = "light";
  } else {
    root.removeAttribute("data-theme");
    root.style.colorScheme = "dark";
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
