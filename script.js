"use strict";

// منوی موبایل
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const opened = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute(
      "aria-label",
      opened ? "بستن منو" : "باز کردن منو"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// کپی آدرس سرور
const copyButton = document.getElementById("copy-ip");
const serverIp = document.getElementById("server-ip");
const copyStatus = document.getElementById("copy-status");

if (copyButton && serverIp && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const address = serverIp.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
      } else {
        const area = document.createElement("textarea");
        area.value = address;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();

        const success = document.execCommand("copy");
        area.remove();

        if (!success) throw new Error("Copy failed");
      }

      copyButton.textContent = "کپی شد! ✓";
      copyStatus.textContent = "آدرس سرور کپی شد.";
    } catch (error) {
      copyStatus.textContent =
        "کپی خودکار انجام نشد؛ آدرس را دستی انتخاب کن.";
    }

    window.setTimeout(() => {
      copyButton.textContent = "کپی IP";
      copyStatus.textContent = "";
    }, 3000);
  });
}
