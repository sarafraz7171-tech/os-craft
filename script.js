
/* =====================================
   OS CRAFT - MAIN JAVASCRIPT
   LOGO EXPLOSION INTRO
===================================== */


/* ---------- INTRO ELEMENTS ---------- */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const particlesContainer = document.getElementById("logoParticles");


/* ---------- CREATE EXPLOSION ---------- */

function createExplosion() {

    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 600 ? 45 : 85;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 260;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);

        const size = 2 + Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.animationDelay =
            `${Math.random() * 0.35}s`;

        particlesContainer.appendChild(particle);
    }
}


/* ---------- CLOSE INTRO ---------- */

let introClosed = false;

function closeIntro() {

    if (!intro || introClosed) return;

    introClosed = true;

    intro.classList.add("hide");

    setTimeout(() => {
        intro.style.display = "none";
    }, 1100);
}


/* ---------- START INTRO ---------- */

document.addEventListener("DOMContentLoaded", () => {

    createExplosion();

    // بستن خودکار اینترو بعد از 8.5 ثانیه
    setTimeout(() => {
        closeIntro();
    }, 8500);

});


/* ---------- ENTER BUTTON ---------- */

if (enterButton) {

    enterButton.addEventListener("click", () => {

        closeIntro();

    });

}


/* =====================================
   MOBILE MENU
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

    // بستن منو بعد از انتخاب لینک
    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}


/* =====================================
   COPY SERVER ADDRESS
===================================== */

const copyButton = document.getElementById("copyButton");
const serverAddress = document.getElementById("serverAddress");
const copyMessage = document.getElementById("copyMessage");

if (copyButton && serverAddress) {

    copyButton.addEventListener("click", async () => {

        const address = serverAddress.textContent.trim();

        try {

            await navigator.clipboard.writeText(address);

            copyButton.textContent = "کپی شد ✓";

            if (copyMessage) {
                copyMessage.textContent = "آدرس سرور با موفقیت کپی شد.";
            }

        } catch (error) {

            // روش جایگزین برای مرورگرهایی که Clipboard API ندارند
            const temporaryInput = document.createElement("textarea");

            temporaryInput.value = address;

            document.body.appendChild(temporaryInput);

            temporaryInput.select();

            try {

                document.execCommand("copy");

                copyButton.textContent = "کپی شد ✓";

                if (copyMessage) {
                    copyMessage.textContent = "آدرس سرور کپی شد.";
                }

            } catch (fallbackError) {

                if (copyMessage) {
                    copyMessage.textContent =
                        "کپی خودکار انجام نشد؛ آدرس را دستی کپی کن.";
                }

            }

            temporaryInput.remove();

        }

        setTimeout(() => {

            copyButton.textContent = "کپی آدرس";

        }, 2500);

    });

}


/* =====================================
   SMOOTH SCROLL
===================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =====================================
   OS CRAFT CONSOLE MESSAGE
===================================== */

console.log(
    "%c OS CRAFT NETWORK ",
    "background: #704cff; color: white; font-size: 20px; font-weight: bold; padding: 10px;"
);

console.log(
    "%c SMP + ROLEPLAY | VERSION 26.2 ",
    "color: #a58aff; font-size: 13px;"
);
