
document.addEventListener("DOMContentLoaded", () => {

  // INTRO ANIMATION
  const intro = document.getElementById("intro");

  if (intro) {
    setTimeout(() => {
      intro.style.opacity = "0";
      intro.style.visibility = "hidden";
      intro.style.pointerEvents = "none";

      setTimeout(() => {
        intro.remove();
      }, 1100);
    }, 4200);
  }

  // MOBILE MENU
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "بستن منو" : "باز کردن منو"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", event => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  // TOAST MESSAGE
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2300);
  }

  // COPY SERVER IP
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const input = document.createElement("textarea");

        input.value = text;
        input.style.position = "fixed";
        input.style.opacity = "0";

        document.body.appendChild(input);
        input.select();

        const copied = document.execCommand("copy");
        input.remove();

        if (!copied) throw new Error("Copy failed");
      }

      showToast("آدرس سرور با موفقیت کپی شد ✓");

    } catch (error) {
      showToast("کپی انجام نشد؛ آدرس را دستی کپی کن.");
    }
  }

  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", () => {
      const address = button.getAttribute("data-copy");

      if (address) {
        copyText(address);
      }
    });
  });

  // MOUSE LIGHT EFFECT
  const cards = document.querySelectorAll(
    ".feature-card, .connect-panel, .command-card"
  );

  cards.forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();

      card.style.setProperty(
        "--mouse-x",
        `${event.clientX - rect.left}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${event.clientY - rect.top}px`
      );
    });
  });

  // SCROLL REVEAL
  const revealItems = document.querySelectorAll(
    ".section-heading, .feature-card, .connect-panel, .hero-copy, .hero-art"
  );

  revealItems.forEach(item => {
    item.classList.add("reveal");
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
      { threshold: 0.12 }
    );

    revealItems.forEach(item => {
      observer.observe(item);
    });

  } else {
    revealItems.forEach(item => {
      item.classList.add("is-visible");
    });
  }

});
