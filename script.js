
/* INTRO */

const intro = document.getElementById("intro");

window.addEventListener("load", () => {
  setTimeout(() => {
    intro?.classList.add("hide");
  }, 4200);
});


/* TYPING EFFECT */

const typingElement = document.getElementById("typingText");

const words = [
  "MINECRAFT SMP",
  "ROLEPLAY EXPERIENCE",
  "BUILD YOUR WORLD",
  "WELCOME TO OS CRAFT"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingElement) return;

  const word = words[wordIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingElement.textContent = word.substring(0, charIndex);

  let speed = deleting ? 45 : 90;

  if (!deleting && charIndex === word.length) {
    deleting = true;
    speed = 1400;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 350;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();


/* MOBILE MENU */

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


/* COPY SERVER IP */

const copyButton = document.getElementById("copyIP");
const serverIP = document.getElementById("serverIP");
const copyMessage = document.getElementById("copyMessage");

if (copyButton && serverIP && copyMessage) {
  copyButton.addEventListener("click", async () => {
    const ip = serverIP.textContent.trim();

    try {
      await navigator.clipboard.writeText(ip);
      copyMessage.textContent = "آی‌پی سرور کپی شد!";
    } catch (error) {
      const input = document.createElement("textarea");
      input.value = ip;
      input.style.position = "fixed";
      input.style.opacity = "0";

      document.body.appendChild(input);
      input.select();

      const success = document.execCommand("copy");
      input.remove();

      copyMessage.textContent = success
        ? "آی‌پی سرور کپی شد!"
        : "کپی انجام نشد؛ آی‌پی را دستی کپی کن.";
    }

    setTimeout(() => {
      copyMessage.textContent = "";
    }, 3000);
  });
}


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


/* ACTIVE NAVIGATION */

const pageSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav a[href^='#']");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navigationLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, {
    threshold: 0.35
  });

  pageSections.forEach(section => {
    sectionObserver.observe(section);
  });
}


/* MOUSE LIGHT EFFECT */

const mouseGlow = document.getElementById("mouseGlow");

if (mouseGlow && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", event => {
    mouseGlow.style.left = event.clientX + "px";
    mouseGlow.style.top = event.clientY + "px";
  });
}
