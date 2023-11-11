const code = function () {
  //@ts-ignore
  window.__onThemeChange = function () {};

  function setTheme(newTheme: string) {
    //@ts-ignore
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.dataset.theme = newTheme;
    //@ts-ignore
    window.__onThemeChange(newTheme);
  }

  var preferredTheme;

  try {
    preferredTheme = localStorage.getItem("theme");
  } catch (err) {}
  //@ts-ignore
  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  };

  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkQuery.addEventListener("change", function (e) {
    //@ts-ignore
    window.__setPreferredTheme(e.matches ? "dark" : "light");
  });

  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
};

export const getTheme = `(${code})();`;
