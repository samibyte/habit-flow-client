import { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "habitflow-dark" ? "habitflow-light" : "habitflow-dark",
    );
  };

  const themeInfo = { theme, setTheme, toggleTheme };

  return <ThemeContext value={themeInfo}>{children}</ThemeContext>;
};

export default ThemeProvider;
