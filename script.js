
document.addEventListener("DOMContentLoaded", () => {

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

  // COPY SERVER ADDRESS
  const toast = document.getElementById("toast");

  document.querySelectorAll(".copy-button").forEach(button => {
    const originalText = button.textContent.trim();

    button.addEventListener("click", async () => {
      const address = button.dataset.copy;

      try {
        await navigator.clipboard.writeText(address);

        button.textContent = "کپی شد ✓";

        if (toast) {
          toast.textContent = "آدرس سرور با موفقیت کپی شد ✓";
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
          }, 2500);
        }

      } catch (error) {
        if (toast) {
          toast.textContent = "کپی خودکار انجام نشد؛ آدرس را دستی کپی کن.";
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
          }, 2500);
        }
      }

      setTimeout(() => {
        button.textContent = originalText;
      }, 2500);
    });
  });

  // INTRO
  const intro = document.getElementById("intro");

  if (intro) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        intro.setAttribute("aria-hidden", "true");
      }, 4700);
    });
  }

});
