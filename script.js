(() => {
  const intro = document.getElementById('intro');
  const site = document.getElementById('site');
  const portal = document.getElementById('portal');
  const caption = document.getElementById('introCaption');
  const percent = document.getElementById('hudPercent');
  const skip = document.getElementById('skipIntro');
  let finished = false;

  function enterSite() {
    if (finished) return;
    finished = true;
    intro.classList.add('finished');
    site.classList.add('visible');
    document.body.style.overflow = '';
    window.setTimeout(() => intro.remove(), 1000);
  }

  function startPortalSequence() {
    if (finished) return;
    intro.classList.add('portal-phase');
    portal.classList.add('open');
    caption.textContent = 'ENTERING THE O-PORTAL';
    window.setTimeout(enterSite, 1050);
  }

  // Short, staged intro: hologram -> logo -> O portal -> website.
  document.body.style.overflow = 'hidden';
  const start = performance.now();
  const duration = 3650;
  function updateProgress(now) {
    if (finished) return;
    const p = Math.min(100, Math.round(((now - start) / duration) * 100));
    percent.textContent = String(p).padStart(2, '0') + '%';
    if (p < 100) requestAnimationFrame(updateProgress);
  }
  requestAnimationFrame(updateProgress);
  window.setTimeout(() => { caption.textContent = 'IDENTITY CONFIRMED · OS CRAFT'; }, 2200);
  window.setTimeout(startPortalSequence, 3600);
  skip.addEventListener('click', enterSite);

  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
  }
  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      showToast('با موفقیت کپی شد!');
    } catch {
      const field = document.createElement('textarea');
      field.value = value;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
      showToast('با موفقیت کپی شد!');
    }
  }
  document.getElementById('copyIp').addEventListener('click', () => {
    copyText(document.getElementById('serverAddress').textContent.trim());
  });
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => copyText(button.dataset.copy));
  });
})();