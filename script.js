
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // INTRO ANIMATION
  // =========================

  const intro = document.getElementById("intro");

  if (intro) {
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      intro.classList.add("is-hidden");

      setTimeout(() => {
        intro.remove();
        document.body.style.overflow = "";
      }, 1100);

    }, 3500);
  }

  // =========================
  // MOBILE MENU
  // =========================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  // =========================
  // COPY SERVER ADDRESS
  // =========================

  const copyButton = document.getElementById("copyButton");
  const serverAddress = document.getElementById("serverAddress");
  const copyFeedback = document.getElementById("copyFeedback");

  async function copyAddress() {

    if (!serverAddress || !copyFeedback) return;

    const address = serverAddress.textContent.trim();

    try {

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
      } else {

        const textArea = document.createElement("textarea");

        textArea.value = address;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);

        textArea.select();

        const successful = document.execCommand("copy");

        textArea.remove();

        if (!successful) {
          throw new Error("Copy failed");
        }
      }

      copyFeedback.textContent = "آدرس سرور با موفقیت کپی شد ✓";

      if (copyButton) {
        copyButton.textContent = "کپی شد ✓";

        setTimeout(() => {
          copyButton.textContent = "کپی آدرس سرور";
        }, 2200);
      }

    } catch (error) {

      copyFeedback.textContent =
        "کپی خودکار انجام نشد؛ آدرس را دستی انتخاب و کپی کن.";

    }
  }

  if (copyButton) {
    copyButton.addEventListener("click", copyAddress);
  }

  // =========================
  // SCROLL REVEAL
  // =========================

  const revealElements = document.querySelectorAll(
    ".section-heading, .about-panel, .feature-card, .video-card, .channel-card, .server-card"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            currentObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }

  // =========================
  // ACTIVE NAV LINK
  // =========================

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            navLinks.forEach(link => {

              const isActive =
                link.getAttribute("href") === "#" + entry.target.id;

              link.classList.toggle("active", isActive);

            });

          }

        });

      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }

});
