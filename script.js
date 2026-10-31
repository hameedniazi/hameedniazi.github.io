// Your Fiverr profile link.
// Every "Hire me" / "Order on Fiverr" button on the page uses it.
const FIVERR_URL = "https://www.fiverr.com/hameed_niazi1";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-fiverr]").forEach((a) => {
  a.href = FIVERR_URL;
});

document.getElementById("year").textContent = new Date().getFullYear();

// Sticky nav border once the page is scrolled
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("navLinks");
const setMenu = (open) => {
  links.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Reveal sections as they scroll into view
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

// Type out the chatbot's answer in the hero
const typed = document.querySelector(".typed");
if (typed) {
  const text = typed.dataset.text;
  if (reduceMotion) {
    typed.textContent = text;
  } else {
    let i = 0;
    typed.classList.add("is-typing");
    setTimeout(function tick() {
      typed.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 18);
      else typed.classList.remove("is-typing");
    }, 700);
  }
}
