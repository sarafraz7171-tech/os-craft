
document.addEventListener("DOMContentLoaded", () => {

  // SMART INTRO
  const intro = document.getElementById("intro");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const alreadySeen = sessionStorage.getItem("osCraftIntroSeen");

  if (intro) {
    if (alreadySeen || reduceMotion) {
      intro.classList.add("hidden");
    } else {
      sessionStorage.setItem("osCraftIntroSeen", "yes");

      window.setTimeout(() => {
        intro.classList.add("hidden");
      }, 3200);
    }
  }

  // MOBILE MENU
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");

  menuButton?.addEventListener("click", () => {
    navigation?.classList.toggle("open");
  });

  navigation?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
    });
  });

  // SCROLL REVEAL
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
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
      element.classList.add("visible");
    });
  }

  // COPY SERVER IP
  const copyButton = document.getElementById("copyButton");
  const serverIP = document.getElementById("serverIP");
  const copyMessage = document.getElementById("copyMessage");

  copyButton?.addEventListener("click", async () => {
    const address = serverIP?.textContent.trim();

    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);

      copyMessage.textContent = "آدرس سرور با موفقیت کپی شد!";
      copyButton.textContent = "COPIED ✓";

      setTimeout(() => {
        copyButton.textContent = "COPY IP";
        copyMessage.textContent = "";
      }, 2500);

    } catch (error) {
      copyMessage.textContent =
        "کپی خودکار ممکن نیست؛ آدرس را دستی انتخاب کن.";
    }
  });

});
