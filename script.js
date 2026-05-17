// ----------------------------
// Mobile navigation toggle
// ----------------------------
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

function setNavOpen(open) {
  headerEl.classList.toggle("nav-open", open);
  btnNavEl.setAttribute("aria-expanded", String(open));
}

btnNavEl.addEventListener("click", function () {
  setNavOpen(!headerEl.classList.contains("nav-open"));
});

// Close mobile nav when a link is tapped
document.querySelectorAll(".main-nav-link").forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && headerEl.classList.contains("nav-open")) {
    setNavOpen(false);
  }
});

// ----------------------------
// Sticky header on scroll
// ----------------------------
const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    document.body.classList.toggle("sticky", !ent.isIntersecting);
  },
  { root: null, threshold: 0, rootMargin: "-96px" },
);
obs.observe(sectionHeroEl);

// ----------------------------
// i18n (English / Arabic)
// ----------------------------
const SUPPORTED = ["en", "ar"];

function detectInitialLang() {
  const saved = localStorage.getItem("lang");
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : "en";
}

function applyTranslations(lang) {
  const dict = (window.I18N && window.I18N[lang]) || {};
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });

  // innerHTML (for nodes with <strong>, <span>, etc.)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  // placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
  });

  // toggle active state on switcher
  document.querySelectorAll(".lang-btn").forEach((b) => {
    const active = b.dataset.lang === lang;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", String(active));
  });

  // keep dynamic year
  const yearEl = document.querySelector(".year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  localStorage.setItem("lang", lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
});

applyTranslations(detectInitialLang());
