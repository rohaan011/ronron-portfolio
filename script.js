/* =========================================
   PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
       01. ELEMENTS
    ========================================== */

  const body = document.body;
  const header = document.querySelector(".site-header");

  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  const projects = document.querySelectorAll(".project");

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  const magneticElements = document.querySelectorAll(".magnetic");

  const personalityWords = document.querySelectorAll(".personality-word");

  /* =========================================
       02. DEVICE CHECK
    ========================================== */

  const isTouchDevice = window.matchMedia(
    "(hover: none), (pointer: coarse)",
  ).matches;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* =========================================
       03. NAVIGATION SCROLL EFFECT
    ========================================== */

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  updateHeader();

  /* =========================================
       04. CUSTOM CURSOR
    ========================================== */

  if (!isTouchDevice && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let followerX = mouseX;
    let followerY = mouseY;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.14;
      followerY += (mouseY - followerY) * 0.14;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateFollower);
    }

    animateFollower();

    /* -----------------------------------------
           Cursor visibility
        ----------------------------------------- */

    document.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    document.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });

    /* -----------------------------------------
           Interactive elements
        ----------------------------------------- */

    const cursorTargets = document.querySelectorAll(
      "a, button, .project, .experience-item, .personality-word",
    );

    cursorTargets.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
      });

      element.addEventListener("mouseleave", () => {});
    });
  }

  /* =========================================
       05. PROJECT CURSOR PREVIEW
    ========================================== */

  if (!isTouchDevice && !prefersReducedMotion) {
    projects.forEach((project) => {
      const image = project.querySelector(".project-image");

      if (!image) return;

      project.addEventListener("mousemove", (event) => {
        const rect = project.getBoundingClientRect();

        const relativeX = event.clientX - rect.left;

        const relativeY = event.clientY - rect.top;

        const moveX = (relativeX / rect.width - 0.5) * 80;

        const moveY = (relativeY / rect.height - 0.5) * 45;

        image.style.setProperty("--image-x", `${moveX}px`);

        image.style.setProperty("--image-y", `calc(-50% + ${moveY}px)`);
      });

      project.addEventListener("mouseleave", () => {
        image.style.setProperty("--image-x", "0px");

        image.style.setProperty("--image-y", "-50%");
      });
    });
  }

  /* =========================================
       06. MOBILE MENU
    ========================================== */

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("active");

      mobileMenu.classList.toggle("open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      body.classList.toggle("menu-open", isOpen);
    });
  }

  /* -----------------------------------------
       Close mobile menu
    ----------------------------------------- */

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");

      mobileMenu.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      body.classList.remove("menu-open");
    });
  });

  /* =========================================
       07. SCROLL REVEAL
    ========================================== */

  const revealElements = document.querySelectorAll(
    ".section-header, .about-content, .experience-list, .personality-content, .contact-main",
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =========================================
       08. MAGNETIC BUTTON
    ========================================== */

  if (!isTouchDevice && !prefersReducedMotion) {
    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;

        const y = event.clientY - rect.top - rect.height / 2;

        const strength = 0.12;

        element.style.transform = `translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "translate(0, 0)";
      });
    });
  }

  /* =========================================
   09. PERSONALITY WORD INTERACTION
========================================= */

  personalityWords.forEach((word) => {
    const image = word.dataset.image;

    if (!image) return;

    word.style.setProperty("--personality-image", `url("${image}")`);
  });

  if (!isTouchDevice && !prefersReducedMotion) {
    const cloud = document.querySelector(".personality-cloud");

    if (cloud) {
      cloud.addEventListener("mousemove", (event) => {
        const rect = cloud.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;

        const mouseY = event.clientY - rect.top;

        personalityWords.forEach((word, index) => {
          const wordRect = word.getBoundingClientRect();

          const wordCenterX = wordRect.left - rect.left + wordRect.width / 2;

          const wordCenterY = wordRect.top - rect.top + wordRect.height / 2;

          const distanceX = wordCenterX - mouseX;

          const distanceY = wordCenterY - mouseY;

          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY,
          );

          const influence = 140;

          if (distance < influence) {
            const strength = (influence - distance) / influence;

            const moveX = (distanceX / distance) * strength * 30;

            const moveY = (distanceY / distance) * strength * 30;

            word.style.transform = `translate(
                            ${moveX}px,
                            ${moveY}px
                        )`;
          } else {
            word.style.transform = "translate(0, 0)";
          }
        });
      });

      cloud.addEventListener("mouseleave", () => {
        personalityWords.forEach((word) => {
          word.style.transform = "translate(0, 0)";
        });
      });
    }
  }

  /* =========================================
       10. SMOOTH ANCHOR SCROLL
    ========================================== */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  /* =========================================
       11. PROCESS MOBILE INTERACTION
    ========================================== */

  const processItems = document.querySelectorAll(".experience-item");

  if (isTouchDevice) {
    experienceItems.forEach((item) => {
      item.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        experienceItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
        });

        if (!isActive) {
          item.classList.add("active");
        }
      });
    });
  }

  /* =========================================
       12. BACK TO TOP
    ========================================== */

  const backTop = document.querySelector(".back-top");

  if (backTop) {
    backTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* =========================================
       13. IMAGE ERROR HANDLING
    ========================================== */

  const projectImages = document.querySelectorAll(".project-image img");

  projectImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.style.opacity = "0";

      image.parentElement.classList.add("image-placeholder");
    });
  });

  /* =========================================
       14. ESCAPE KEY
    ========================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (mobileMenu && mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");

      body.classList.remove("menu-open");
    }
  });
});
