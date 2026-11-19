
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
          "کپی خودکار انجام نشد؛ آدرس را به‌صورت دستی انتخاب و کپی کن.";
      }

      setTimeout(() => {
        copyButton.textContent = "کپی آدرس سرور";
      }, 2500);
    });
  }

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
