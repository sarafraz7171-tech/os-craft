(() => {
  const intro = document.getElementById('intro');
  const bar = document.querySelector('.loading-track span');
  const percent = document.getElementById('loadPercent');
  const loadText = document.getElementById('loadText');
  const skip = document.getElementById('skipIntro');
  let finished = false;
  const messages = [
    [0, 'در حال راه‌اندازی جهان...'],
    [28, 'اتصال به هسته‌ی سرور...'],
    [55, 'بارگذاری دنیای نقش‌آفرینی...'],
    [82, 'آماده‌سازی پورتال...'],
    [100, 'خوش آمدی به OS CRAFT']
  ];
  let value = 0;
  const timer = setInterval(() => {
    if (finished) return;
    value = Math.min(100, value + (value < 55 ? 2.1 : value < 85 ? 1.35 : 2.8));
    bar.style.width = value + '%';
    percent.textContent = Math.floor(value) + '%';
    const current = messages.filter(m => value >= m[0]).pop();
    if (current) loadText.textContent = current[1];
    if (value >= 100) {
      clearInterval(timer);
      intro.classList.add('play-flash');
      setTimeout(() => intro.classList.add('play-ring'), 130);
      setTimeout(closeIntro, 850);
    }
  }, 48);

  function closeIntro() {
    if (finished) return;
    finished = true;
    clearInterval(timer);
    intro.classList.add('done');
    document.body.classList.add('intro-finished');
    setTimeout(() => intro.remove(), 1100);
  }
  skip.addEventListener('click', closeIntro);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  const address = 'sarafraz7171-srv-os_craft_asli.play.mihancraft.com:25566';
  const feedback = document.getElementById('copyFeedback');
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      feedback.textContent = 'آدرس سرور با موفقیت کپی شد ✓';
    } catch {
      const area = document.createElement('textarea');
      area.value = address;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); feedback.textContent = 'آدرس سرور کپی شد ✓'; }
      catch { feedback.textContent = 'کپی خودکار انجام نشد؛ آدرس را دستی انتخاب کن.'; }
      area.remove();
    }
    setTimeout(() => feedback.textContent = '', 3500);
  }
  document.getElementById('copyButton').addEventListener('click', copyAddress);
  document.getElementById('copyAddress').addEventListener('click', copyAddress);

  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...nav.querySelectorAll('a')];
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => activeObserver.observe(section));
})();