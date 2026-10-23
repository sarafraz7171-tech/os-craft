const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

const copyBtn = document.getElementById("copyBtn");
const ip = document.getElementById("serverIp");
const message = document.getElementById("copyMessage");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(ip.textContent.trim());
    copyBtn.textContent = "کپی شد ✓";
    message.textContent = "آی پی سرور در کلیپ‌بورد کپی شد.";
    setTimeout(() => {
      copyBtn.textContent = "کپی IP";
      message.textContent = "";
    }, 2200);
  } catch {
    message.textContent = "کپی خودکار انجام نشد؛ IP را دستی کپی کنید.";
  }
});
