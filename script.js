const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const year = document.querySelector("#current-year");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  const applyTheme = (theme, savePreference) => {
    const isLight = theme === "light";
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
    themeToggle.querySelector(".theme-icon").textContent = isLight ? "☾" : "☼";
    themeToggle.querySelector(".theme-label").textContent = isLight ? "Dark mode" : "Light mode";

    if (themeColor) {
      themeColor.content = isLight ? "#f5f6f2" : "#0b0d12";
    }

    if (savePreference) {
      localStorage.setItem("portfolio-theme", theme);
    }
  };

  const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : preferredTheme;
  applyTheme(initialTheme, false);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme, true);
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navMenu.classList.toggle("is-open", !isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      navMenu.classList.remove("is-open");
    }
  });
}

if ("IntersectionObserver" in window) {
  const sections = document.querySelectorAll("main section[id]");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const currentLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.toggle("active", link === currentLink));
    }
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
}
