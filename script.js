
// DIGITAL TYPING INTRO

const typingElement = document.getElementById("typingText");

const typingWords = [
  "SMP WORLD",
  "ROLEPLAY EXPERIENCE",
  "BUILD YOUR WORLD",
  "WELCOME TO OS CRAFT"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = typingWords[wordIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingElement.textContent = currentWord.substring(0, charIndex);

  let delay = deleting ? 45 : 90;

  if (!deleting && charIndex === currentWord.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();


// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  document.addEventListener("click", event => {
    if (
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      nav.classList.remove("open");
    }
  });
}


// COPY SERVER IP

const copyButton = document.getElementById("copyIP");
const serverIP = document.getElementById("serverIP");
const copyMessage = document.getElementById("copyMessage");

if (copyButton && serverIP && copyMessage) {
  copyButton.addEventListener("click", async () => {
    const ip = serverIP.textContent.trim();

    try {
      await navigator.clipboard.writeText(ip);
      copyMessage.textContent = "آی‌پی سرور با موفقیت کپی شد!";
    } catch (error) {
      const temp = document.createElement("textarea");
      temp.value = ip;
      temp.style.position = "fixed";
      temp.style.opacity = "0";

      document.body.appendChild(temp);
      temp.select();

      const copied = document.execCommand("copy");
      temp.remove();

      copyMessage.textContent = copied
        ? "آی‌پی سرور کپی شد!"
        : "کپی خودکار انجام نشد؛ آی‌پی را دستی کپی کن.";
    }

    setTimeout(() => {
      copyMessage.textContent = "";
    }, 3000);
  });
}


// ACTIVE NAVIGATION

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, {
    threshold: 0.25
  });

  sections.forEach(section => observer.observe(section));
}
