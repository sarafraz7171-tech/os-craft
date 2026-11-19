
document.addEventListener("DOMContentLoaded", () => {

    // INTRO ANIMATION
    const intro = document.getElementById("intro");

    if (intro) {
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            intro.classList.add("is-hidden");

            setTimeout(() => {
                intro.remove();
                document.body.style.overflow = "";
            }, 500);

        }, 2600);
    }

    // MOBILE MENU
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    function closeMenu() {
        if (mainNav) mainNav.classList.remove("active");
    }

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 680) {
                closeMenu();
            }
        });
    }

    // COPY SERVER ADDRESS
    const copyButton = document.getElementById("copyButton");
    const serverAddress = document.getElementById("serverAddress");
    const copyFeedback = document.getElementById("copyFeedback");

    if (copyButton && serverAddress) {

        copyButton.addEventListener("click", async () => {
            const address = serverAddress.textContent.trim();

            try {
                await navigator.clipboard.writeText(address);

                if (copyFeedback) {
                    copyFeedback.textContent = "آدرس سرور کپی شد!";
                }

            } catch (error) {
                const temp = document.createElement("textarea");
                temp.value = address;
                document.body.appendChild(temp);
                temp.select();

                const copied = document.execCommand("copy");
                temp.remove();

                if (copyFeedback) {
                    copyFeedback.textContent = copied
                        ? "آدرس سرور کپی شد!"
                        : "کپی انجام نشد؛ آدرس را دستی کپی کنید.";
                }
            }

            copyButton.textContent = "کپی شد!";

            setTimeout(() => {
                copyButton.textContent = "کپی آدرس";

                if (copyFeedback) {
                    copyFeedback.textContent = "";
                }
            }, 2500);
        });
    }

});
