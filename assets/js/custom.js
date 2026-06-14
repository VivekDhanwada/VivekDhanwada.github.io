/**
 * Walk up offsetParent chain to get true layout position, ignoring CSS transforms.
 */
function getLayoutTop(el) {
  let top = 0;
  while (el) {
    top += el.offsetTop;
    el = el.offsetParent;
  }
  return top;
}

/**
 * Smoothly scroll to the About section.
 */
function scrollToAbout() {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.classList.add("visible-section");
    const pageBottom = document.body.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pageBottom, behavior: "smooth" });
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
 * Snap the About section to the top of the viewport when the user
 * naturally scrolls past the midpoint of the hero's trailing space.
 */
function initAboutSectionSnap(aboutSection) {
  if (!aboutSection) return;
  let hasSnapped = false;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pageBottom = document.body.scrollHeight - window.innerHeight;
    const snapThreshold = pageBottom / 2;

    if (!hasSnapped && scrollY >= snapThreshold && scrollY < pageBottom) {
      hasSnapped = true;
      aboutSection.classList.add('visible-section');
      window.scrollTo({ top: pageBottom, behavior: 'smooth' });
    }

    if (scrollY < 100) {
      hasSnapped = false;
    }
  }, { passive: true });
}

/**
 * Set up the about section scroll animation.
 */
function initAboutSectionScrollAnimation(aboutSection) {
  if (!aboutSection) return;

  function checkReveal() {
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      aboutSection.classList.add("visible-section");
    }
    if (window.scrollY < 80) {
      aboutSection.classList.remove("visible-section");
    }
  }

  window.addEventListener("scroll", checkReveal, { passive: true });
  checkReveal();
}

/**
 * Use IntersectionObserver to toggle the visibility of the scroll arrow.
 */
function initScrollArrowIntersection(aboutSection, scrollArrow) {
  if (!scrollArrow) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      scrollArrow.classList.add("hidden");
    } else {
      scrollArrow.classList.remove("hidden");
    }
  }, { passive: true });
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
 * Convert timeline bullet text into block spans for cleaner spacing.
 */
function processBulletParagraphs() {
  document.querySelectorAll('.timeline-item .content p').forEach(p => {
    const nodes = Array.from(p.childNodes);
    if (!nodes.some(n => n.nodeType === 3 && n.textContent.includes('•'))) return;

    const segments = [];
    let current = [];

    for (const node of nodes) {
      if (node.nodeName === 'BR') {
        segments.push(current);
        current = [];
      } else {
        current.push(node);
      }
    }

    segments.push(current);

    p.innerHTML = '';

    for (const seg of segments) {
      const text = seg.map(n => n.textContent || '').join('').trim();
      if (text === '') continue;

      if (text.startsWith('•')) {
        const span = document.createElement('span');
        span.className = 'bullet-item';
        seg.forEach(n => span.appendChild(n.cloneNode(true)));
        p.appendChild(span);
      } else {
        seg.forEach(n => p.appendChild(n.cloneNode(true)));
      }
    }
  });
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

  initAboutSectionSnap(aboutSection);
  initAboutSectionScrollAnimation(aboutSection);
  initScrollArrowIntersection(aboutSection, scrollArrow);
  setScrollArrowColor(descriptionText, scrollArrow);
  initAvatarHoverEffects(avatar);
  initScrollRevealSections();
  initTechCategoryReveal();
  processBulletParagraphs();

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