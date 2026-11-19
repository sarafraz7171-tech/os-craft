
document.addEventListener("DOMContentLoaded", () => {

  // INTRO ANIMATION
  const intro = document.getElementById("intro");

  if (intro) {
    setTimeout(() => {
      intro.classList.add("is-hidden");

      setTimeout(() => {
        intro.remove();
      }, 900);

    }, 3500);
  }

  // MOBILE MENU
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", event => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // COPY SERVER IP
  const copyButton = document.getElementById("copyButton");
  const serverAddress = document.getElementById("serverAddress");
  const copyFeedback = document.getElementById("copyFeedback");

  if (copyButton && serverAddress && copyFeedback) {
    copyButton.addEventListener("click", async () => {
      const address = serverAddress.textContent.trim();

      try {
        await navigator.clipboard.writeText(address);

        copyFeedback.textContent = "آدرس سرور با موفقیت کپی شد ✓";
        copyButton.textContent = "کپی شد ✓";

      } catch (error) {
        copyFeedback.textContent =
          "کپی خودکار انجام نشد؛ آدرس را دستی کپی کنید.";
      }

      setTimeout(() => {
        copyButton.textContent = "کپی آدرس سرور";
      }, 2500);
    });
  }

  // GLASS CARD MOUSE LIGHT
  const glassCards = document.querySelectorAll(
    ".about-panel, .feature-card, .video-card, .channel-card, .server-card"
  );

  glassCards.forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // SCROLL REVEAL
  const revealElements = document.querySelectorAll(
    ".section-heading, .about-panel, .feature-card, .video-card, .channel-card, .server-card"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  }

});
