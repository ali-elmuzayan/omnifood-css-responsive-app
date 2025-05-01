// make the year up to date
const currentYear = new Date().getFullYear();
document.querySelector(".year").textContent = currentYear;

// on click on the button add .nav-open class to the header
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && headerEl.classList.contains("nav-open")) {
    headerEl.classList.remove("nav-open");
  }
});

//------------
// sticky:
//------------
const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-96px", // applied outside of this root element
  }
);
obs.observe(sectionHeroEl);
