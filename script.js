"use strict";

(() => {
  /* =====================================
     تنظیمات اولیه
  ===================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================
     1. منوی موبایل
  ===================================== */

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "باز کردن منو");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "بستن منو" : "باز کردن منو"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !menuToggle.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    });
  }

  /* =====================================
     2. ذرات پیکسلی شناور
  ===================================== */

  const hero = document.querySelector(".hero");

  if (
    hero &&
    !prefersReducedMotion &&
    !hero.querySelector(".pixel-particles")
  ) {
    const particleLayer = document.createElement("div");

    particleLayer.className = "pixel-particles";
    particleLayer.setAttribute("aria-hidden", "true");

    const isMobile = window.matchMedia(
      "(max-width: 700px)"
    ).matches;

    const particleCount = isMobile ? 12 : 26;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");

      particle.className = "pixel-particle";

      particle.style.left = `${(i * 37 + 7) % 100}%`;
      particle.style.top = `${(i * 29 + 11) % 100}%`;

      particle.style.setProperty(
        "--pixel-size",
        `${4 + (i % 4) * 2}px`
      );

      particle.style.setProperty(
        "--duration",
        `${10 + (i % 7) * 1.7}s`
      );

      particle.style.setProperty(
        "--delay",
        `${-(i % 10) * 1.5}s`
      );

      particleLayer.appendChild(particle);
    }

    const heroContent = hero.querySelector(".hero-content");

    if (heroContent) {
      hero.insertBefore(particleLayer, heroContent);
    } else {
      hero.appendChild(particleLayer);
    }
  }

  /* =====================================
     3. صفحه ورود انیمیشنی OS CRAFT
  ===================================== */

  if (!prefersReducedMotion && document.body) {
    const intro = document.createElement("div");

    intro.className = "site-intro";

    intro.setAttribute("role", "status");
    intro.setAttribute(
      "aria-label",
      "در حال ورود به OS CRAFT"
    );

    const introCard = document.createElement("div");
    introCard.className = "intro-card";

    const cube = document.createElement("div");
    cube.className = "intro-cube";
    cube.textContent = "OC";

    const wordmark = document.createElement("div");
    wordmark.className = "intro-wordmark";
    wordmark.textContent = "OS CRAFT";

    const message = document.createElement("p");
    message.textContent = "آماده ورود به شهر هستی؟";

    const loading = document.createElement("div");
    loading.className = "intro-loading";

    const progress = document.createElement("span");
    loading.appendChild(progress);

    introCard.append(
      cube,
      wordmark,
      message,
      loading
    );

    intro.appendChild(introCard);
    document.body.appendChild(intro);

    // بعد از نمایش لوگو، صفحه ورود محو می‌شود.
    window.setTimeout(() => {
      intro.classList.add("is-leaving");

      window.setTimeout(() => {
        intro.remove();
      }, 650);
    }, 1650);
  }

  /* =====================================
     4. انیمیشن ظاهرشدن بخش‌ها هنگام اسکرول
  ===================================== */

  const revealElements = document.querySelectorAll(
    ".section-heading, .feature-card, .job-card, " +
    ".server-panel, .end-section .container"
  );

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("reveal", "is-visible");
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px 35px 0px"
        }
      );

      revealElements.forEach((element) => {
        revealObserver.observe(element);
      });
    } else {
      // برای مرورگرهایی که IntersectionObserver ندارند
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
    }
  }

  /* =====================================
     5. پارالاکس پس‌زمینه
  ===================================== */

  const heroBackground = document.querySelector(".hero-bg");

  if (hero && heroBackground && !prefersReducedMotion) {
    let updateScheduled = false;

    const updateParallax = () => {
      const heroPosition = hero.getBoundingClientRect().top;

      const offset = Math.max(
        -40,
        Math.min(40, -heroPosition * 0.12)
      );

      heroBackground.style.setProperty(
        "--parallax-y",
        `${offset}px`
      );

      updateScheduled = false;
    };

    const requestParallaxUpdate = () => {
      if (updateScheduled) {
        return;
      }

      updateScheduled = true;
      window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener(
      "scroll",
      requestParallaxUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestParallaxUpdate
    );

    updateParallax();
  }

  /* =====================================
     6. دکمه کپی IP سرور
  ===================================== */

  const copyButton = document.getElementById("copy-ip");
  const serverIp = document.getElementById("server-ip");
  const copyStatus = document.getElementById("copy-status");

  if (copyButton && serverIp && copyStatus) {
    const originalButtonText = copyButton.textContent.trim();

    const fallbackCopy = (text) => {
      const area = document.createElement("textarea");

      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      area.style.pointerEvents = "none";

      document.body.appendChild(area);
      area.select();

      let success = false;

      try {
        success = document.execCommand("copy");
      } catch (error) {
        success = false;
      }

      area.remove();

      return success;
    };

    copyButton.addEventListener("click", async () => {
      const address = serverIp.textContent.trim();

      if (!address) {
        copyStatus.textContent = "آدرس سرور پیدا نشد.";
        return;
      }

      try {
        if (
          navigator.clipboard &&
          window.isSecureContext
        ) {
          await navigator.clipboard.writeText(address);
        } else {
          const copied = fallbackCopy(address);

          if (!copied) {
            throw new Error("Copy failed");
          }
        }

        copyButton.textContent = "کپی شد! ✓";
        copyStatus.textContent = "آدرس سرور با موفقیت کپی شد.";
      } catch (error) {
        copyStatus.textContent =
          "کپی خودکار انجام نشد؛ آدرس را دستی انتخاب و کپی کن.";
      }

      window.setTimeout(() => {
        copyButton.textContent = originalButtonText;
      }, 2500);

      window.setTimeout(() => {
        copyStatus.textContent = "";
      }, 3500);
    });
  }

})();
