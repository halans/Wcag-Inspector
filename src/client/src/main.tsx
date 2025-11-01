import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add theme class to document element based on local storage preference or system preference
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("wcag-analyzer-theme");
  if (storedTheme) return storedTheme;
  
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

document.documentElement.classList.add(getInitialTheme());

createRoot(document.getElementById("root")!).render(<App />);
