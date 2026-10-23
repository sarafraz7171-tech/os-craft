(() => {
  "use strict";

  document.documentElement.classList.add("js");

  // منوی موبایل
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "بستن منو" : "باز کردن منو"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "باز کردن منو");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !menuToggle.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "باز کردن منو");
      }
    });
  }

  // نمایش تدریجی کارت‌ها هنگام اسکرول
  const revealElements = document.querySelectorAll(".reveal");

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
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // کپی IP سرور
  const copyButton = document.getElementById("copy-ip");
  const serverIp = document.getElementById("server-ip");
  const copyStatus = document.getElementById("copy-status");

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";

    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    const copied = document.execCommand("copy");
    temporaryInput.remove();

    if (!copied) {
      throw new Error("Copy failed");
    }
  }

  if (copyButton && serverIp && copyStatus) {
    copyButton.addEventListener("click", async () => {
      const ip = serverIp.textContent.trim();

      try {
        await copyText(ip);
        copyStatus.textContent = "✅ آدرس سرور کپی شد!";
        copyButton.querySelector("span").textContent = "کپی شد!";
      } catch (error) {
        copyStatus.textContent =
          "کپی خودکار انجام نشد؛ آدرس را دستی انتخاب و کپی کن.";
      }

      window.setTimeout(() => {
        copyButton.querySelector("span").textContent = "کپی IP";
        copyStatus.textContent = "";
      }, 3000);
    });
  }
})();
