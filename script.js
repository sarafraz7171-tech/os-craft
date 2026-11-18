
const SERVER_IP='sarafraz7171-srv-os_craft_asli.play.mihancraft.com:25566';
document.querySelectorAll('[data-server-ip]').forEach(el=>el.textContent=SERVER_IP);
async function copyText(text){
  try{await navigator.clipboard.writeText(text);showToast('کپی شد!')}
  catch(e){showToast('کپی خودکار در این مرورگر فعال نیست؛ متن را دستی کپی کن.')}
}
function showToast(message){
  let toast=document.getElementById('toast');
  if(!toast){toast=document.createElement('div');toast.id='toast';toast.className='toast';document.body.appendChild(toast)}
  toast.textContent=message;toast.classList.add('show');
  clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2100);
}
document.querySelectorAll('[data-copy-ip]').forEach(btn=>btn.addEventListener('click',()=>copyText(SERVER_IP)));
const particleLayer=document.getElementById('particles');
if(particleLayer){for(let i=0;i<75;i++){const p=document.createElement('span');p.className='pixel'+(i%4===0?' dark':'');p.style.left=Math.random()*100+'%';p.style.top=(Math.random()*100+10)+'%';p.style.animationDuration=(7+Math.random()*12)+'s';p.style.animationDelay=(-Math.random()*18)+'s';p.style.transform=`scale(${.5+Math.random()*1.5})`;particleLayer.appendChild(p)}}
const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
if(menuBtn&&navLinks){menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')))}
const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12}):null;
if(observer)document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const search=document.getElementById('commandSearch');
if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('.command').forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?'flex':'none');document.querySelectorAll('.command-group').forEach(g=>{const visible=[...g.querySelectorAll('.command')].some(c=>c.style.display!=='none');g.style.display=visible?'block':'none'})})}
document.querySelectorAll('[data-copy-command]').forEach(btn=>btn.addEventListener('click',()=>copyText(btn.dataset.copyCommand)));
