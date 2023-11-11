'use client'
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import styles from "./theme.module.css";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  //@ts-ignore
  const [theme, setTheme] = useState(global.window?.__theme || "light");
  
  const isDark = theme === "dark";
  
  const toggleTheme = () => {
    //@ts-ignore
    global.window?.__setPreferredTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    //@ts-ignore
    global.window.__onThemeChange = setTheme;
  }, []);
  
  return (
    <button className={styles.themeBtn} onClick={toggleTheme}>

      {isDark ? <SunIcon className={styles.toggleIcon} /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
