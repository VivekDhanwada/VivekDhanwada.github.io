document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".skill-bar-fill");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute("data-percentage");
        bar.style.width = percent + "%";
        bar.setAttribute("aria-valuenow", percent);
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
});
