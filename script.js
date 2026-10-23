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
/* ==============================
   OS CRAFT - Intro Animation
   ============================== */

const osCraftReduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!osCraftReduceMotion) {
  const osCraftIntro = document.createElement("div");

  osCraftIntro.className = "site-intro";
  osCraftIntro.setAttribute("role", "status");
  osCraftIntro.setAttribute("aria-label", "ورود به OS CRAFT");

  osCraftIntro.innerHTML = `
    <div class="intro-card">
      <div class="intro-cube">OC</div>
      <div class="intro-wordmark">OS CRAFT</div>
      <p>آماده ورود به شهر هستی؟</p>
      <div class="intro-loading">
        <span></span>
      </div>
    </div>
  `;

  document.body.appendChild(osCraftIntro);

  window.setTimeout(() => {
    osCraftIntro.classList.add("is-leaving");

    window.setTimeout(() => {
      osCraftIntro.remove();
    }, 650);
  }, 1500);
}

/* ==============================
   OS CRAFT - Parallax Scroll
   ============================== */

const osCraftHero = document.querySelector(".hero");
const osCraftHeroBg = document.querySelector(".hero-bg");

if (
  osCraftHero &&
  osCraftHeroBg &&
  !osCraftReduceMotion
) {
  let osCraftScrollScheduled = false;

  const updateOsCraftParallax = () => {
    const heroPosition = osCraftHero.getBoundingClientRect().top;

    const offset = Math.max(
      -40,
      Math.min(40, -heroPosition * 0.12)
    );

    osCraftHeroBg.style.setProperty(
      "--parallax-y",
      `${offset}px`
    );

    osCraftScrollScheduled = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (osCraftScrollScheduled) return;

      osCraftScrollScheduled = true;
      window.requestAnimationFrame(updateOsCraftParallax);
    },
    { passive: true }
  );

  updateOsCraftParallax();
}
