(() => {
 const intro=document.getElementById('intro'),site=document.getElementById('site'),portal=document.getElementById('portal'),caption=document.getElementById('introCaption'),percent=document.getElementById('hudPercent'),skip=document.getElementById('skipIntro');
 let finished=false;
 function enterSite(){if(finished)return;finished=true;intro.classList.add('finished');site.classList.add('visible');document.body.style.overflow='';setTimeout(()=>intro.remove(),1000)}
 function startPortalSequence(){
   if(finished)return;
   intro.classList.add('lightning-phase');
   caption.textContent='ENERGY CORE ACTIVATED';
   setTimeout(()=>{if(finished)return;intro.classList.add('portal-phase','shockwave-phase');portal.classList.add('open');caption.textContent='ENTERING THE O-PORTAL';},320);
   setTimeout(enterSite,1500);
 }
 document.body.style.overflow='hidden';
 const start=performance.now(),duration=3650;
 function progress(now){if(finished)return;const p=Math.min(100,Math.round((now-start)/duration*100));percent.textContent=String(p).padStart(2,'0')+'%';if(p<100)requestAnimationFrame(progress)}
 requestAnimationFrame(progress);
 setTimeout(()=>{caption.textContent='IDENTITY CONFIRMED · OS CRAFT'},2200);
 setTimeout(startPortalSequence,3600);
 skip.addEventListener('click',enterSite);
 const toast=document.getElementById('toast');let toastTimer;
 function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1600)}
 async function copyText(value){try{await navigator.clipboard.writeText(value);showToast('با موفقیت کپی شد!')}catch{const f=document.createElement('textarea');f.value=value;document.body.appendChild(f);f.select();document.execCommand('copy');f.remove();showToast('با موفقیت کپی شد!')}}
 document.getElementById('copyIp').addEventListener('click',()=>copyText(document.getElementById('serverAddress').textContent.trim()));
 document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copyText(b.dataset.copy)));
})();