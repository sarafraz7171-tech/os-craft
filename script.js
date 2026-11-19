
(() => {

  // متن‌های افکت تایپ
  const messages = [
    "به دنیای OS CRAFT خوش آمدید",
    "نسخه 26.2 | SMP + ROLEPLAY",
    "یک تجربه متفاوت از ماینکرفت",
    "جهان OS CRAFT آماده ورود شماست"
  ];

  const typingElement = document.getElementById("typingText");
  const menuButton = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const copyButton = document.getElementById("copyServer");
  const addressElement = document.getElementById("serverAddress");
  const toast = document.getElementById("toast");


  // افکت تایپ‌شدن
  if (typingElement) {

    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {

      const current = messages[messageIndex];

      typingElement.textContent =
        current.slice(0, charIndex);

      if (!deleting && charIndex < current.length) {

        charIndex++;

        setTimeout(typeLoop, 65);

      } else if (!deleting) {

        deleting = true;

        setTimeout(typeLoop, 1500);

      } else if (charIndex > 0) {

        charIndex--;

        setTimeout(typeLoop, 28);

      } else {

        deleting = false;

        messageIndex =
          (messageIndex + 1) % messages.length;

        setTimeout(typeLoop, 350);

      }

    }

    typeLoop();
  }


  // منوی موبایل
  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.textContent =
        isOpen ? "×" : "☰";

    });


    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.textContent = "☰";

      });

    });

  }


  // کپی آدرس سرور
  if (copyButton && addressElement && toast) {

    copyButton.addEventListener("click", async () => {

      const address =
        addressElement.textContent.trim();

      try {

        await navigator.clipboard.writeText(address);

        toast.textContent =
          "آدرس سرور کپی شد!";

      } catch (error) {

        const temporary =
          document.createElement("textarea");

        temporary.value = address;

        temporary.setAttribute("readonly", "");

        temporary.style.position = "absolute";
        temporary.style.opacity = "0";

        document.body.appendChild(temporary);

        temporary.select();

        const copied =
          document.execCommand("copy");

        temporary.remove();

        toast.textContent = copied
          ? "آدرس سرور کپی شد!"
          : "کپی خودکار ممکن نیست؛ آدرس را دستی انتخاب کن.";

      }

      window.setTimeout(() => {

        toast.textContent = "";

      }, 2800);

    });

  }


  // تشخیص بخش فعال در منو
  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(".nav a[href^='#']");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
              `#${entry.target.id}`
            );

          });

        }

      });

    }, {
      rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => {
      observer.observe(section);
    });

  }

})();
