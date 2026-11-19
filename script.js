(() => {
  const intro = document.getElementById("intro");
  const enterButton = document.getElementById("enterButton");
  const logoStage = document.getElementById("logoStage");
  const particles = document.createElement("div");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function closeIntro() {
    intro.classList.add("hide");
    document.body.classList.remove("intro-open");
  }
  enterButton?.addEventListener("click", closeIntro);
  window.setTimeout(closeIntro, 9000);

  if (!reducedMotion && logoStage) {
    for (let i = 0; i < 15; i++) {
      const spark = document.createElement("i");
      spark.className = "spark";
      spark.style.left = `${8 + Math.random() * 84}%`;
      spark.style.top = `${10 + Math.random() * 80}%`;
      spark.style.animationDelay = `${Math.random() * 2.5}s`;
      logoStage.appendChild(spark);
    }
    // A compact one-time particle burst around the logo.
    window.setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement("i");
        const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.18;
        const distance = 65 + Math.random() * 115;
        p.className = "burst-particle";
        p.style.left = "50%";
        p.style.top = "50%";
        p.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
        p.style.setProperty("--ty", `${Math.sin(angle) * distance * 0.58}px`);
        p.style.animationDelay = `${Math.random() * 0.16}s`;
        logoStage.appendChild(p);
        window.setTimeout(() => p.remove(), 1500);
      }
    }, 420);
  }

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  menuToggle?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
  }
  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      showToast("کپی شد!");
    } catch {
      const helper = document.createElement("textarea");
      helper.value = value;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
      showToast("کپی شد!");
    }
  }
  document.getElementById("copyIp")?.addEventListener("click", () => {
    copyText(document.getElementById("serverIp").textContent.trim());
  });
  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", () => copyText(button.dataset.copy));
  });

  const progress = document.getElementById("scrollProgress");
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
})();
