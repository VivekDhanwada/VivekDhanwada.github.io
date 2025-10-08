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
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  }
}

/**
 * Initialize the theme on page load based on localStorage.
 */
function initTheme() {
  const themeIcon = document.getElementById("theme-icon");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

/**
 * Set up the about section scroll animation
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
 * Animate skill bars smoothly when page loads.
 */
function animateSkillBars() {
  const bars = document.querySelectorAll('.progress-bar');
  bars.forEach((bar) => {
    // get target percentage
    const width = bar.getAttribute('aria-valuenow');
    // start from 0
    bar.style.width = '0%';
    // animate to the target after a small delay
    setTimeout(() => {
      bar.style.transition = 'width 1.5s ease-in-out';
      bar.style.width = width + '%';
    }, 300);
  });
}

/**
 * Main entry point for DOMContentLoaded.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Grab references
  const aboutSection    = document.getElementById("about");
  const scrollArrow     = document.getElementById("scrollArrow");
  const descriptionText = document.querySelector(".text-muted");
  const avatar          = document.querySelector(".avatar-container img");
  const themeToggle     = document.getElementById("theme-toggle");

  // Theme initialization
  initTheme();

  // Attach the toggle event listener to the theme toggle anchor
  if (themeToggle) {
    themeToggle.addEventListener("click", function (e) {
      e.preventDefault(); 
      toggleTheme();
    });
  }

  // About section scroll animation
  initAboutSectionScrollAnimation(aboutSection);

  // Intersection Observer for scroll arrow
  initScrollArrowIntersection(aboutSection, scrollArrow);

  // Set scroll arrow color
  setScrollArrowColor(descriptionText, scrollArrow);

  // Avatar hover effects
  initAvatarHoverEffects(avatar);

  // ✅ Animate skill bars from data-percentage attribute
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  skillBars.forEach(bar => {
    const target = bar.getAttribute('data-percentage');
    bar.style.width = '0%'; // start at 0%
    setTimeout(() => {
      bar.style.transition = 'width 1.5s ease-in-out';
      bar.style.width = target + '%';
    }, 200); // slight delay
  });
  // Theme toggle logic
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = localStorage.getItem("theme");

  function setTheme(theme) {
    document.body.classList.remove("dark-theme", "light-theme");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    themeIcon.classList.remove("fa-moon", "fa-sun");
    themeIcon.classList.add(theme === "dark-theme" ? "fa-sun" : "fa-moon");
  }

  // Apply saved theme or default to light
  if (currentTheme === "dark-theme") {
    setTheme("dark-theme");
  } else {
    setTheme("light-theme");
  }

  toggleButton.addEventListener("click", function (e) {
    e.preventDefault();
    const newTheme = document.body.classList.contains("dark-theme") ? "light-theme" : "dark-theme";
    setTheme(newTheme);
  });
});
});
