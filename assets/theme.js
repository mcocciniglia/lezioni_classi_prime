// assets/theme.js
(() => {
  const ROOT = document.documentElement;
  const STORAGE_KEY = "theme";             // "light" | "dark"
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // 1) scelta salvata o preferenza di sistema
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return prefersDark.matches ? "dark" : "light";
  }

  // 2) applica tema
  function applyTheme(theme) {
    ROOT.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Aggiorna testo bottone se presente
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const span = btn.querySelector("span");
      if (span) span.textContent = theme === "dark" ? "Tema scuro" : "Tema chiaro";
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  // 3) toggle manuale
  function toggleTheme() {
    const cur = ROOT.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  }

  // 4) inizializza
  applyTheme(getInitialTheme());

  // 5) reagisci al cambio di sistema (opzionale)
  prefersDark.addEventListener?.("change", (e) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) applyTheme(e.matches ? "dark" : "light");
  });

  // 6) collega pulsante se esiste
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  });
})();

<button id="themeToggle" class="theme-toggle" aria-label="Cambia tema" aria-pressed="false">
  <span class="btn-label">Tema chiaro</span>
  <span aria-hidden="true" class="btn-icon">🌓</span>
</button>
