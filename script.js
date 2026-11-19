const intro=document.getElementById('intro');const site=document.getElementById('site');const fill=document.getElementById('loadingFill');const number=document.getElementById('loadingNumber');const loadingText=document.getElementById('loadingText');let done=false;let progress=0;const messages=['در حال اتصال به جهان OS CRAFT','در حال ساخت تونل بی‌نهایت','بارگذاری سیستم رول‌پلی','آماده ورود'];const timer=setInterval(()=>{if(done)return;progress=Math.min(100,progress+Math.ceil(Math.random()*3));fill.style.width=progress+'%';number.textContent=String(progress).padStart(2,'0')+'%';loadingText.textContent=messages[Math.min(3,Math.floor(progress/26))];if(progress>=100){clearInterval(timer);setTimeout(closeIntro,650)}},75);function closeIntro(){if(done)return;done=true;intro.classList.add('hide');site.classList.add('ready');setTimeout(()=>intro.remove(),1100)}document.getElementById('skipIntro').addEventListener('click',()=>{clearInterval(timer);closeIntro()});document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));const toast=document.getElementById('toast');let toastTimer;function showToast(text){toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1700)}async function copyText(value){try{await navigator.clipboard.writeText(value);showToast('کپی شد!')}catch(e){const area=document.createElement('textarea');area.value=value;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();showToast('کپی شد!')}}document.getElementById('copyServer').addEventListener('click',()=>copyText(document.getElementById('serverAddress').textContent.trim()));document.querySelectorAll('.copy-command').forEach(btn=>btn.addEventListener('click',()=>copyText(btn.dataset.copy)));

/* ===== OS CRAFT PARALLAX ENGINE ===== */

const parallaxContainer = document.querySelector('.parallax-container');

if (parallaxContainer && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {

    const layers = parallaxContainer.querySelectorAll('.parallax-layer');
    const glow = parallaxContainer.querySelector('.parallax-glow');

    parallaxContainer.addEventListener('mousemove', (event) => {

        const rect = parallaxContainer.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        layers.forEach(layer => {

            const depth = Number(layer.dataset.depth || 10);

            layer.style.transform =
                `translate3d(${x * depth}px, ${y * depth}px, 0)
                 rotateX(${-y * 4}deg)
                 rotateY(${x * 4}deg)`;

        });

        if (glow) {
            glow.style.left = `${(x + 0.5) * 100}%`;
            glow.style.top = `${(y + 0.5) * 100}%`;
        }

    });

    parallaxContainer.addEventListener('mouseleave', () => {

        layers.forEach(layer => {
            layer.style.transform = '';
        });

    });
}
