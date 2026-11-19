
/* =========================================
   OS CRAFT - LUXURY JAVASCRIPT
========================================= */


/* =========================================
   LUXURY INTRO
========================================= */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const sparklesContainer = document.getElementById("logoSparkles");

let introClosed = false;


/* =========================================
   CREATE GOLD SPARKLES
========================================= */

function createSparkles() {

    if (!sparklesContainer) return;

    const count = window.innerWidth < 600 ? 18 : 32;

    for (let i = 0; i < count; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;

        sparkle.style.animationDelay = `${Math.random() * 2.5}s`;

        const size = 2 + Math.random() * 4;

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        sparklesContainer.appendChild(sparkle);

    }

}


/* =========================================
   CLOSE INTRO
========================================= */

function closeIntro() {

    if (!intro || introClosed) return;

    introClosed = true;

    intro.classList.add("hide");

    setTimeout(() => {

        intro.style.display = "none";

    }, 1250);

}


/* =========================================
   START INTRO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    createSparkles();

    // بستن خودکار اینترو پس از 8 ثانیه

    setTimeout(() => {

        closeIntro();

    }, 8000);

});


/* =========================================
   ENTER BUTTON
========================================= */

if (enterButton) {

    enterButton.addEventListener("click", () => {

        closeIntro();

    });

}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}


/* =========================================
   COPY SERVER ADDRESS
========================================= */

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

            const temporaryInput = document.createElement("textarea");

            temporaryInput.value = address;

            temporaryInput.style.position = "fixed";
            temporaryInput.style.opacity = "0";

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


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

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


/* =========================================
   CONSOLE
========================================= */

console.log(
    "%c OS CRAFT ",
    "background: linear-gradient(90deg,#d8bb78,#94713a); color: #17130a; font-size: 22px; font-weight: bold; padding: 10px;"
);

console.log(
    "%c SMP + ROLEPLAY | VERSION 26.2 ",
    "color: #c7a45d; font-size: 13px;"
);
