
/* =====================================
   OS CRAFT - MAIN JAVASCRIPT
===================================== */

const intro = document.getElementById('intro');
const website = document.getElementById('website');

const logoO = document.getElementById('logoO');
const portal = document.getElementById('oPortal');
const portalPath = document.getElementById('portalPath');

let transitionStarted = false;


/* =====================================
   GOLDEN DUST PARTICLES
===================================== */

const canvas = document.getElementById('dust');
const ctx = canvas.getContext('2d');

let particles = [];
let dustWidth = 0;
let dustHeight = 0;

function resizeDust(){

  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  dustWidth = window.innerWidth;
  dustHeight = window.innerHeight;

  canvas.width = dustWidth * ratio;
  canvas.height = dustHeight * ratio;

  canvas.style.width = dustWidth + 'px';
  canvas.style.height = dustHeight + 'px';

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  particles = Array.from({length:110}, () => ({
    x:Math.random() * dustWidth,
    y:Math.random() * dustHeight,
    radius:Math.random() * 1.5 + .35,
    speed:Math.random() * .48 + .12,
    drift:(Math.random() - .5) * .35,
    alpha:Math.random() * .6 + .12
  }));
}

function drawDust(){

  ctx.clearRect(0, 0, dustWidth, dustHeight);

  for(const p of particles){

    p.y -= p.speed;
    p.x += p.drift;

    if(p.y < -5){
      p.y = dustHeight + 5;
      p.x = Math.random() * dustWidth;
    }

    if(p.x < -5) p.x = dustWidth + 5;
    if(p.x > dustWidth + 5) p.x = -5;

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(231,190,111,${p.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(drawDust);
}

resizeDust();
drawDust();

window.addEventListener('resize', resizeDust);


/* =====================================
   INTRO TRANSITION
===================================== */

function startTransition(){

  if(transitionStarted) return;

  transitionStarted = true;

  /*
    مسیر حرف O را مستقیماً
    از لوگوی اصلی کپی می‌کنیم.
  */

  portalPath.setAttribute(
    'd',
    logoO.getAttribute('d')
  );

  /*
    پیدا کردن موقعیت واقعی O
    روی صفحه نمایش
  */

  const logoRect = logoO.getBoundingClientRect();

  const centerX = logoRect.left + logoRect.width / 2;
  const centerY = logoRect.top + logoRect.height / 2;

  portal.style.width = logoRect.width + 'px';
  portal.style.height = logoRect.height + 'px';

  portal.style.left = centerX + 'px';
  portal.style.top = centerY + 'px';

  portal.style.opacity = '1';

  // آماده‌سازی انیمیشن
  portal.getBoundingClientRect();

  // محو شدن قاب و نوشته‌های اینترو
  intro.classList.add('leaving');

  intro.querySelectorAll(
    '.frame, .frame-label, #dust'
  ).forEach(element => {
    element.style.opacity = '0';
  });

  // ظاهر شدن سایت پشت O
  setTimeout(() => {
    website.classList.add('visible');
  }, 500);

  /*
    محاسبه اندازه لازم برای بزرگ شدن O
    تا تمام صفحه را بپوشاند.
  */

  const screenDiagonal = Math.hypot(
    window.innerWidth,
    window.innerHeight
  );

  const finalScale = Math.max(
    35,
    screenDiagonal / (logoRect.width * .48)
  );

  requestAnimationFrame(() => {

    portal.style.transition =
      'transform 2.35s cubic-bezier(.72,0,.2,1), opacity .55s ease 1.9s';

    portal.style.transform =
      `translate(-50%,-50%) scale(${finalScale})`;

    portal.style.opacity = '0';

  });

  // پایان اینترو
  setTimeout(() => {

    intro.style.display = 'none';
    portal.style.display = 'none';

    document.body.style.overflow = 'auto';

  }, 2500);
}


/* =====================================
   START INTRO
===================================== */

window.addEventListener('load', () => {

  setTimeout(startTransition, 4700);

});


/* =====================================
   MOBILE MENU
===================================== */

const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

if(menuToggle && siteNav){

  menuToggle.addEventListener('click', () => {

    const isOpen = siteNav.classList.toggle('open');

    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

  });

  siteNav.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      siteNav.classList.remove('open');

      menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });

}


/* =====================================
   COPY SERVER ADDRESS
===================================== */

const copyButton = document.getElementById('copyServerButton');
const serverAddress = document.getElementById('serverAddress');
const copyFeedback = document.getElementById('copyFeedback');

if(copyButton){

  copyButton.addEventListener('click', async () => {

    const address = serverAddress.textContent.trim();

    try{

      await navigator.clipboard.writeText(address);

      copyFeedback.textContent = 'آدرس سرور کپی شد!';

    }catch(error){

      // روش جایگزین برای مرورگرهایی که Clipboard را پشتیبانی نمی‌کنند
      const temporaryInput = document.createElement('textarea');

      temporaryInput.value = address;
      temporaryInput.style.position = 'fixed';
      temporaryInput.style.opacity = '0';

      document.body.appendChild(temporaryInput);

      temporaryInput.select();

      const successful = document.execCommand('copy');

      temporaryInput.remove();

      copyFeedback.textContent = successful
        ? 'آدرس سرور کپی شد!'
        : 'کپی خودکار انجام نشد؛ آدرس را دستی کپی کن.';

    }

    setTimeout(() => {
      copyFeedback.textContent = '';
    }, 3000);

  });

}
