import { useEffect } from "react";
import useTheme from "./useTheme";

export const ThemeProvider = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    // Make sure theme is applied to document
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  return children;
};
