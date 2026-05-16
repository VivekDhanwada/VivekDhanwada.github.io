/**
 * Smoothly scroll to the About section.
 */
function scrollToAbout() {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    window.scrollTo({
      top: aboutSection.offsetTop - 20,
      behavior: "smooth",
    });
  }
}

/**
 * Toggle theme between dark and light.
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.classList.remove("fa-sun", "fa-moon");
    themeIcon.classList.add(newTheme === "dark" ? "fa-sun" : "fa-moon");
  }
}

/**
 * Initialize the theme on page load based on localStorage.
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.classList.remove("fa-sun", "fa-moon");
    themeIcon.classList.add(savedTheme === "dark" ? "fa-sun" : "fa-moon");
  }
}

/**
 * Set up the about section scroll animation.
 */
function initAboutSectionScrollAnimation(aboutSection) {
  if (!aboutSection) return;

  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const triggerHeight = window.innerHeight * 0.5;

    if (currentScrollY > triggerHeight && currentScrollY > lastScrollY) {
      aboutSection.classList.add("visible-section");
    } else if (currentScrollY < lastScrollY && currentScrollY < triggerHeight) {
      aboutSection.classList.remove("visible-section");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll);
}

/**
 * Use IntersectionObserver to toggle the visibility of the scroll arrow.
 */
function initScrollArrowIntersection(aboutSection, scrollArrow) {
  if (!aboutSection || !scrollArrow) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scrollArrow.classList.add("hidden");
        } else {
          scrollArrow.classList.remove("hidden");
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(aboutSection);
}

/**
 * Match scroll arrow color to the computed color of the text-muted element.
 */
function setScrollArrowColor(descriptionText, scrollArrow) {
  if (descriptionText && scrollArrow) {
    const computedStyle = window.getComputedStyle(descriptionText);
    scrollArrow.style.color = computedStyle.color;
  }
}

/**
 * Handle avatar tilt and shadow trail on hover.
 */
function initAvatarHoverEffects(avatar) {
  if (!avatar) return;

  const shadowTrail = document.createElement("div");
  shadowTrail.classList.add("shadow-trail");
  avatar.parentNode.appendChild(shadowTrail);

  avatar.addEventListener("mousemove", (e) => {
    const { offsetX, offsetY, target } = e;
    const { offsetWidth, offsetHeight } = target;
    const xRotation = ((offsetY - offsetHeight / 2) / offsetHeight) * 10;
    const yRotation = ((offsetX - offsetWidth / 2) / offsetWidth) * 10;

    target.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    shadowTrail.style.opacity = "1";
    shadowTrail.style.animation = "shadowTrail 0.8s ease-out forwards";
  });

  avatar.addEventListener("mouseleave", () => {
    avatar.style.transform = "rotateX(0) rotateY(0) scale(1)";
    shadowTrail.style.opacity = "0";
    avatar.style.animation = "none";
    void avatar.offsetWidth;
    avatar.style.animation = "gradientGlow 3s infinite alternate";
  });
}

/**
 * Reveal sections as they enter the viewport.
 */
function initScrollRevealSections() {
  const revealSections = document.querySelectorAll(".scroll-reveal");
  if (!revealSections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible-section");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealSections.forEach((section) => observer.observe(section));
}

/**
 * Animate tech category icons as they enter the viewport.
 */
function initTechCategoryReveal() {
  const techCategories = document.querySelectorAll('.tech-category');
  if (!techCategories.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  techCategories.forEach(category => observer.observe(category));
}

/**
 * Typewriter effect for landing page subtitle.
 */
function initTypewriter() {
  const phrases = [
  "Business Analytics Graduate | Macquarie University",
  "Dashboards · Reporting · Business Intelligence",
  "Turning messy data into clear decisions"
];

  const el = document.getElementById("typed-text");
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 20 : 90);
  }

  type();
}

/**
 * Main entry point for DOMContentLoaded.
 */
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection    = document.getElementById("about");
  const scrollArrow     = document.getElementById("scrollArrow");
  const descriptionText = document.querySelector(".text-muted");
  const avatar          = document.querySelector(".avatar-container img");
  const themeToggle     = document.getElementById("theme-toggle");

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      toggleTheme();
    });
  }

  initAboutSectionScrollAnimation(aboutSection);
  initScrollArrowIntersection(aboutSection, scrollArrow);
  setScrollArrowColor(descriptionText, scrollArrow);
  initAvatarHoverEffects(avatar);
  initScrollRevealSections();
  initTechCategoryReveal();
  initTypewriter();

  const skillBars = document.querySelectorAll(".skill-bar-fill");
  skillBars.forEach((bar) => {
    const target = bar.getAttribute("data-percentage");
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.transition = "width 1.5s ease-in-out";
      bar.style.width = target + "%";
    }, 200);
  });
});