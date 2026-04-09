// PREE LOADER
(function () {
  document.body.classList.add('loading');
  var bar = document.getElementById('pxBar');
  var pct = document.getElementById('pxPercent');
  var loader = document.getElementById('px-loader');
  var progress = 0;
  var interval = setInterval(function () {
    var jump = Math.random() * 12 + 4;
    progress = Math.min(progress + jump, 92);
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 120);
  window.addEventListener('load', function () {
    clearInterval(interval);
    bar.style.width = '100%';
    pct.textContent = '100%';
    bar.style.transition = 'width 0.3s ease';
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 500);
  });
})();

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx+'px'; cursor.style.top = my+'px'; });
function animateRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(animateRing); }
animateRing();

// PAGE NAVIGATION
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => { l.classList.remove('active'); if(l.dataset.page === id) l.classList.add('active'); });
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(() => { revealOnScroll(); if(id==='home') startCounters(); }, 100);
}

// SCROLL REVEAL
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
document.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => { revealOnScroll(); startCounters(); });

// COUNTERS
let countersStarted = false;
function startCounters() {
  if(countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (target >= 100 ? '+' : target < 10 ? 'K+' : '+');
      if(current >= target) clearInterval(interval);
    }, 25);
  });
}

// NAV SCROLL EFFECT
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.background = window.scrollY > 50 ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.7)';
});

// MOBILE MENU
function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  if(links) {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.position = 'fixed';
    links.style.top = '80px'; links.style.left='0'; links.style.right='0';
    links.style.background='rgba(5,8,16,0.98)';
    links.style.flexDirection='column'; links.style.padding='24px 5%';
    links.style.borderBottom='1px solid rgba(255,255,255,0.08)';
    links.style.backdropFilter='blur(20px)';
  }
}

// FORM SUBMIT
function submitForm() {
  document.getElementById('form-wrapper').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
}
function resetForm() {
  document.getElementById('form-wrapper').style.display = 'block';
  document.getElementById('form-success').style.display = 'none';
}

// SERVICE CARD hover sound effect (subtle visual only)
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.zIndex='2'; });
  card.addEventListener('mouseleave', () => { card.style.zIndex=''; });
});

// TYPEWRITER effect for hero (subtle)
const heroLines = document.querySelectorAll('.hero-title .line1, .hero-title .line2, .hero-title .line3');
heroLines.forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transform = 'translateY(30px)';
  line.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transform = 'translateY(0)';
  }, 300 + i * 180);
});

// NAV link click close mobile menu
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if(window.innerWidth <= 900) links.style.display = 'none';
  });
});


/* portfolio Page js */

/* COUNTERS */
function animCounter(el,target,suffix){
  let v=0,step=target/60;
  const iv=setInterval(()=>{
    v=Math.min(v+step,target);
    el.textContent=Math.floor(v)+suffix;
    if(v>=target)clearInterval(iv);
  },22);
}


if(document.getElementById('cnt1')) animCounter(document.getElementById('cnt1'),9,'+');
if(document.getElementById('cnt2')) animCounter(document.getElementById('cnt2'),9,'+');
if(document.getElementById('cnt3')) animCounter(document.getElementById('cnt3'),6,'+');

/* FILTER */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.p-card');
const noResults = document.getElementById('noResults');

filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    let visible=0;
    cards.forEach((card,i)=>{
      const match=f==='all'||card.dataset.cat===f;
      card.style.display=match?'block':'none';
      if(match){
        visible++;
        card.style.animation='none';
        card.offsetHeight; // reflow
        card.style.animation=`cardIn .5s ease ${i*.06}s forwards`;
      }
    });
    noResults.style.display=visible===0?'block':'none';
  });
});

/* SCROLL REVEAL */
function revealAll(){
  document.querySelectorAll('.reveal').forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-60)
      el.classList.add('visible');
  });
}
window.addEventListener('scroll',revealAll);
window.addEventListener('load',revealAll);

/* SCROLL TO TOP BTN */
const scrollBtn = document.getElementById('scrollTop');
if(scrollBtn) {
  window.addEventListener('scroll', ()=>{
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  });
}

/* TOAST */
let toastTimer;
function showToast(url){
  const toast=document.getElementById('url-toast');
  document.getElementById('toast-url').textContent=url;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),2500);
}

/* UPDATE COUNTS to match actual cards */
setTimeout(()=>{
  if(document.getElementById('cnt1')) document.getElementById('cnt1').textContent='9+';
  if(document.getElementById('cnt2')) document.getElementById('cnt2').textContent='9+';
  if(document.getElementById('cnt3')) document.getElementById('cnt3').textContent='6+';
},1500);