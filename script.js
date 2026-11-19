
document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       INTRO
    ================================= */

    const intro = document.getElementById("intro");
    const enterButton = document.getElementById("enterButton");

    let introClosed = false;

    function playIntroSound() {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        const audio = new AudioContext();

        audio.resume().then(() => {
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();

            oscillator.type = "sine";

            oscillator.frequency.setValueAtTime(
                180,
                audio.currentTime
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                720,
                audio.currentTime + 0.45
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                260,
                audio.currentTime + 1.2
            );

            gain.gain.setValueAtTime(0.001, audio.currentTime);

            gain.gain.exponentialRampToValueAtTime(
                0.13,
                audio.currentTime + 0.12
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audio.currentTime + 1.5
            );

            oscillator.connect(gain);
            gain.connect(audio.destination);

            oscillator.start();
            oscillator.stop(audio.currentTime + 1.5);

            oscillator.onended = () => audio.close();
        });
    }

    function closeIntro(withSound = false) {
        if (!intro || introClosed) return;

        introClosed = true;

        if (withSound) {
            playIntroSound();
        }

        intro.classList.add("is-hidden");
        document.body.style.overflow = "";

        setTimeout(() => {
            intro.remove();
        }, 1100);
    }

    if (intro) {
        document.body.style.overflow = "hidden";

        if (enterButton) {
            enterButton.addEventListener("click", () => {
                closeIntro(true);
            });
        }

        // اگر کاربر دکمه را نزند، سایت خودکار باز می‌شود.
        setTimeout(() => {
            closeIntro(false);
        }, 9000);
    }

    /* =================================
       MOBILE MENU
    ================================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    function closeMenu() {
        if (mainNav) {
            mainNav.classList.remove("active");
        }
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
            if (window.innerWidth > 700) {
                closeMenu();
            }
        });
    }

    /* =================================
       COPY SERVER ADDRESS
    ================================= */

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
                temp.style.position = "fixed";
                temp.style.opacity = "0";

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
                copyButton.textContent = "کپی آدرس سرور";

                if (copyFeedback) {
                    copyFeedback.textContent = "";
                }
            }, 2500);
        });
    }

});
