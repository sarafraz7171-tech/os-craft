
/* ===== OS CRAFT TYPING SYSTEM ===== */

const typingElement = document.getElementById("typingText");

if (typingElement) {
    const messages = [
        "به دنیای OS CRAFT خوش آمدید",
        "نسخه 26.2 | SMP + ROLEPLAY",
        "یک تجربه متفاوت از ماینکرفت",
        "جهان OS CRAFT آماده ورود شماست"
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentMessage = messages[messageIndex];

        if (!deleting) {
            charIndex++;

            typingElement.textContent =
                currentMessage.substring(0, charIndex);

            if (charIndex >= currentMessage.length) {
                deleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
        } else {
            charIndex--;

            typingElement.textContent =
                currentMessage.substring(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;

                messageIndex =
                    (messageIndex + 1) % messages.length;
            }
        }

        setTimeout(typeEffect, deleting ? 35 : 85);
    }

    typeEffect();
}

/* ===== COPY SERVER ADDRESS ===== */

const copyButton = document.getElementById("copyServer");
const serverAddress = document.querySelector(".server-address");
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

copyButton.addEventListener("click", async () => {
    const address = serverAddress.textContent.trim();

    try {
        await navigator.clipboard.writeText(address);
        showToast("آدرس سرور کپی شد!");
    } catch (error) {
        const textarea = document.createElement("textarea");

        textarea.value = address;
        document.body.appendChild(textarea);
        textarea.select();

        const success = document.execCommand("copy");
        textarea.remove();

        showToast(success ? "آدرس سرور کپی شد!" : "کپی انجام نشد!");
    }
});
