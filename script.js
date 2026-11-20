
document.addEventListener("DOMContentLoaded", () => {

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  // Copy server IP
  const copyButton = document.getElementById("copyIp");
  const ip = document.getElementById("serverIp");
  const status = document.getElementById("copyStatus");

  copyButton?.addEventListener("click", async () => {
    const value = ip?.textContent?.trim();

    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      status.textContent = "آدرس سرور کپی شد!";
      copyButton.textContent = "کپی شد ✓";

    } catch {
      status.textContent =
        "کپی خودکار در این مرورگر در دسترس نیست؛ آدرس را دستی انتخاب کن.";
    }
  });

});
