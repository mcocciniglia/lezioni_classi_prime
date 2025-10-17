// assets/theme.js
(() => {
  const ROOT = document.documentElement;
  const STORAGE_KEY = "theme"; // "light" | "dark"
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return prefersDark.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    ROOT.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const label = btn.querySelector(".btn-label");
      if (label) label.textContent = theme === "dark" ? "Tema scuro" : "Tema chiaro";
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  function toggleTheme() {
    const cur = ROOT.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  }

  // Inizializza
  applyTheme(getInitialTheme());

  // Aggiorna se cambia la preferenza di sistema (solo se non hai scelta salvata)
  prefersDark.addEventListener?.("change", (e) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) applyTheme(e.matches ? "dark" : "light");
  });

  // Collega il pulsante quando il DOM è pronto
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  });
})();
window.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const cBtn = document.getElementById("contrastToggle");
  if (!cBtn) return;
  cBtn.addEventListener("click", () => {
    const on = root.getAttribute("data-contrast") === "aaa";
    root.setAttribute("data-contrast", on ? "" : "aaa");
    cBtn.textContent = on ? "Contrasto AA/AAA" : "Contrasto: AAA attivo";
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const cBtn = document.getElementById("contrastToggle");
  if (!cBtn) return;

  // set iniziale in base all'attributo (se presente)
  const initOn = root.getAttribute("data-contrast") === "aaa";
  cBtn.classList.toggle("is-active", initOn);
  cBtn.setAttribute("aria-pressed", initOn ? "true" : "false");
  cBtn.textContent = initOn ? "Contrasto alto attivo ⚡" : "Contrasto alto ☀️";

  cBtn.addEventListener("click", () => {
    const on = root.getAttribute("data-contrast") === "aaa";
    // toggle attributo su <html>
    root.setAttribute("data-contrast", on ? "" : "aaa");
    // feedback visivo + accessibilità
    cBtn.classList.toggle("is-active", !on);
    cBtn.setAttribute("aria-pressed", !on ? "true" : "false");
    cBtn.textContent = !on ? "Contrasto alto attivo ⚡" : "Contrasto alto ☀️";
  });
});

