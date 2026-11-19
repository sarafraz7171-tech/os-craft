
document.addEventListener("DOMContentLoaded", () => {

  // انیمیشن شروع سایت
  const intro = document.getElementById("intro");

  window.setTimeout(() => {
    intro?.classList.add("done");
  }, 2800);

  // منوی موبایل
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

  // کپی کردن IP سرور
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
