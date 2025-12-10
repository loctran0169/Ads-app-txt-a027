const parallaxItems = document.querySelectorAll(".parallax");
const revealItems = document.querySelectorAll(".reveal");

// Parallax motion based on pointer position
document.addEventListener("pointermove", (event) => {
  const { innerWidth, innerHeight } = window;
  const x = (event.clientX / innerWidth - 0.5) * 2;
  const y = (event.clientY / innerHeight - 0.5) * 2;

  parallaxItems.forEach((el) => {
    const depth = Number(el.dataset.depth || 0.08);
    el.style.transform = `translate3d(${x * depth * 14}px, ${y * depth * 14}px, 0)`;
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((el) => observer.observe(el));

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

