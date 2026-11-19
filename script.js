
document.addEventListener("DOMContentLoaded", () => {

  // منوی موبایل
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

  // کپی آدرس سرور
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
          "کپی خودکار انجام نشد؛ آدرس را دستی کپی کنید.";
      }

      setTimeout(() => {
        copyButton.textContent = "کپی آدرس سرور";
      }, 2500);
    });
  }

 <!-- CINEMATIC INTRO -->
<div class="intro" id="intro">
  <div class="intro-line"></div>
  <div class="intro-inner">
    <div class="intro-mark">OS</div>
    <h1>OS CRAFT</h1>
    <p>SMP + ROLEPLAY</p>
  </div>
</div>
/* CINEMATIC RED INTRO */
.intro {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #09090d;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: introHide 0.8s ease 3.2s forwards;
}

.intro-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ed1838;
  box-shadow:
    0 0 12px #ed1838,
    0 0 30px #ed1838,
    0 0 65px rgba(237, 24, 56, 0.7);
  transform: translate(-50%, -50%);
  animation: redLineExpand 1.2s cubic-bezier(.7, 0, .2, 1) forwards;
}

.intro-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  opacity: 0;
  animation: introContent 0.8s ease 1.1s forwards;
}

.intro-mark {
  font-size: 75px;
  font-weight: 900;
  color: #ed1838;
  text-shadow: 0 0 30px rgba(237, 24, 56, .7);
}

.intro-inner h1 {
  color: #fff;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 5px;
}

.intro-inner p {
  color: #9999a5;
  letter-spacing: 4px;
}

@keyframes redLineExpand {
  0% {
    width: 0;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    width: 100vw;
    opacity: 1;
  }
}

@keyframes introContent {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes introHide {
  to {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}
