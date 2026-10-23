(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Scroll reveal: preserve the existing .reveal animations.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    try {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach((item) => revealObserver.observe(item));
      // Enable hidden-before-reveal styling only after the observer is ready.
      document.documentElement.classList.add('js-enabled');
    } catch (_) {
      // Fail open: do not hide content if scroll animation setup fails.
      revealItems.forEach((item) => item.classList.add('visible'));
    }
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // Pixel particles floating in the hero section.
  const hero = document.querySelector('.hero');
  if (hero && !prefersReducedMotion && !hero.querySelector('.pixel-particles')) {
    const particlesLayer = document.createElement('div');
    particlesLayer.className = 'pixel-particles';
    particlesLayer.setAttribute('aria-hidden', 'true');
    const particleCount = window.innerWidth < 700 ? 18 : 34;
    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement('span');
      particle.className = 'pixel-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.setProperty('--particle-size', `${3 + Math.random() * 5}px`);
      particle.style.setProperty('--particle-duration', `${7 + Math.random() * 11}s`);
      particle.style.setProperty('--particle-delay', `${Math.random() * -15}s`);
      particle.style.setProperty('--particle-drift', `${-45 + Math.random() * 90}px`);
      particlesLayer.appendChild(particle);
    }
    hero.appendChild(particlesLayer);
  }

  // Gentle parallax on the hero background.
  const heroBackground = document.querySelector('.hero-bg');
  let scrollFrameRequested = false;
  const updateParallax = () => {
    if (!heroBackground || prefersReducedMotion) return;
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const offset = Math.min(55, Math.max(-15, (window.innerHeight - heroBottom) * 0.12));
    heroBackground.style.setProperty('--parallax-y', `${offset}px`);
    scrollFrameRequested = false;
  };
  if (heroBackground && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      if (!scrollFrameRequested) {
        window.requestAnimationFrame(updateParallax);
        scrollFrameRequested = true;
      }
    }, { passive: true });
    updateParallax();
  }

  // Optional mobile navigation compatibility if navigation elements exist.
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Copy the server address with a fallback for older browser contexts.
  const copyButton = document.getElementById('copyBtn');
  const serverIp = document.getElementById('serverIp');
  const copyMessage = document.getElementById('copyMessage');
  if (copyButton && serverIp) {
    copyButton.addEventListener('click', async () => {
      const value = serverIp.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const temporaryInput = document.createElement('textarea');
          temporaryInput.value = value;
          temporaryInput.setAttribute('readonly', '');
          temporaryInput.style.position = 'fixed';
          temporaryInput.style.opacity = '0';
          document.body.appendChild(temporaryInput);
          temporaryInput.select();
          const copied = document.execCommand('copy');
          temporaryInput.remove();
          if (!copied) throw new Error('Copy fallback failed');
        }
        copyButton.textContent = 'کپی شد ✓';
        if (copyMessage) copyMessage.textContent = 'آی‌پی سرور در کلیپ‌بورد کپی شد.';
        window.setTimeout(() => {
          copyButton.textContent = 'کپی IP';
          if (copyMessage) copyMessage.textContent = '';
        }, 2200);
      } catch (error) {
        if (copyMessage) copyMessage.textContent = 'کپی خودکار انجام نشد؛ آی‌پی را دستی کپی کن.';
      }
    });
  }

  // Animated intro overlay, skipped for reduced-motion users.
  let introSeen = false;
  try { introSeen = sessionStorage.getItem('os-craft-intro-seen') === '1'; } catch (_) { /* Storage may be disabled. */ }
  if (!prefersReducedMotion && !introSeen) {
    const intro = document.createElement('div');
    intro.className = 'site-intro';
    intro.setAttribute('role', 'presentation');
    intro.innerHTML = `
      <div class="intro-card">
        <div class="intro-cube" aria-hidden="true"><span>OS</span></div>
        <div class="intro-wordmark">OS CRAFT</div>
        <p>شهر تو، ماجراجویی تو</p>
        <div class="intro-loading"><span></span></div>
      </div>`;
    document.body.appendChild(intro);
    document.body.classList.add('intro-active');
    window.setTimeout(() => {
      intro.classList.add('site-intro-leaving');
      document.body.classList.remove('intro-active');
      window.setTimeout(() => intro.remove(), 650);
      try { sessionStorage.setItem('os-craft-intro-seen', '1'); } catch (_) { /* Private mode is fine. */ }
    }, 1200);
  }
})();
