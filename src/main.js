import { applyChaiStyles } from "chaicorecss";

// Styles loaded via <link> in index.html for render-blocking behavior

// ===== THEME =====
const root = document.documentElement;
function setTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem('chai-theme', t);
}
const saved = localStorage.getItem('chai-theme') || 'dark';
setTheme(saved);
document.getElementById('theme-btn')?.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ===== COPY NPM =====
document.querySelectorAll('[data-copy]').forEach(el => {
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(el.dataset.copy);
    const toast = el.querySelector('.copied-toast');
    if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1200); }
  });
});

// ===== NAV ACTIVE LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
function updateNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ===== SCROLL ANIMATIONS =====
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.15 });
fadeEls.forEach(el => obs.observe(el));

// ===== PLAYGROUND =====
const pgInput = document.getElementById('pg-input');
const pgOutput = document.getElementById('pg-output');
const pgRun = document.getElementById('pg-run');
const pgExamples = {
  default: `<div class="chai-flex chai-gap-16 chai-items-center chai-flex-wrap">
  <div class="chai-bg-orange chai-text-white chai-p-24 chai-rounded-xl chai-font-bold">
    Hello ChaiCoreCSS!
  </div>
  <div class="chai-bg-blue chai-text-white chai-p-24 chai-rounded-xl">
    Utility-first CSS
  </div>
</div>`,
  card: `<div class="chai-bg-white chai-rounded-xl chai-shadow-lg chai-p-32 chai-max-w-320">
  <div class="chai-bg-orange chai-text-white chai-p-16 chai-rounded-lg chai-font-bold chai-text-center chai-mb-16">
    Featured
  </div>
  <div class="chai-text-24 chai-font-bold chai-mb-8 chai-text-black">
    ChaiCoreCSS
  </div>
  <div class="chai-text-gray chai-text-14 chai-mb-16">
    A modern utility-first CSS runtime. Zero build step, zero config.
  </div>
  <div class="chai-bg-orange chai-text-white chai-p-12 chai-rounded-lg chai-text-center chai-font-bold chai-cursor-pointer">
    Get Started
  </div>
</div>`,
  navbar: `<nav class="chai-flex chai-items-center chai-justify-between chai-bg-black chai-text-white chai-px-24 chai-py-16 chai-rounded-xl" style="width:100%">
  <div class="chai-font-bold chai-text-18">Brand</div>
  <div class="chai-flex chai-gap-24 chai-text-14">
    <span class="chai-text-orange chai-font-bold">Home</span>
    <span>About</span>
    <span>Services</span>
    <span>Contact</span>
  </div>
  <div class="chai-bg-orange chai-text-white chai-px-20 chai-py-10 chai-rounded-lg chai-text-13 chai-font-bold chai-cursor-pointer">
    Sign Up
  </div>
</nav>`,
  pricing: `<div class="chai-flex chai-gap-12 chai-items-center chai-flex-wrap">
  <div class="chai-bg-green chai-text-white chai-px-16 chai-py-8 chai-rounded-full chai-text-13 chai-font-bold">
    Free
  </div>
  <div class="chai-bg-orange chai-text-white chai-px-16 chai-py-8 chai-rounded-full chai-text-13 chai-font-bold">
    Pro - $9/mo
  </div>
  <div class="chai-bg-purple chai-text-white chai-px-16 chai-py-8 chai-rounded-full chai-text-13 chai-font-bold">
    Enterprise
  </div>
</div>`,
  alert: `<div class="chai-flex chai-items-center chai-gap-16 chai-bg-orange chai-text-white chai-p-20 chai-rounded-xl" style="width:100%">
  <div class="chai-text-28 chai-font-bold">!</div>
  <div>
    <div class="chai-text-15 chai-font-bold">Heads up!</div>
    <div class="chai-text-13 chai-opacity-80">ChaiCoreCSS v1.0 is now available on npm. Try it today!</div>
  </div>
</div>`
};

if (pgInput && pgOutput && pgRun) {
  const pgResetBtn = document.getElementById('pg-reset');

  function autoResize() {
    pgInput.style.height = 'auto';
    pgInput.style.height = Math.max(180, pgInput.scrollHeight) + 'px';
  }

  function runPlayground() {
    const html = pgInput.value;
    pgOutput.innerHTML = html;
    applyChaiStyles(pgOutput);
  }

  function getActiveExampleKey() {
    const activeBtn = document.querySelector('.pg-example-btn.active');
    return activeBtn ? activeBtn.dataset.example : 'default';
  }

  pgRun.addEventListener('click', runPlayground);
  pgInput.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'Enter') runPlayground(); });
  pgInput.addEventListener('input', autoResize);
  pgInput.value = pgExamples.default;
  autoResize();
  runPlayground();

  // Reset button - reloads the currently active example preset
  if (pgResetBtn) {
    pgResetBtn.addEventListener('click', () => {
      const key = getActiveExampleKey();
      pgInput.value = pgExamples[key] || pgExamples.default;
      autoResize();
      runPlayground();
    });
  }

  // Example preset buttons
  document.querySelectorAll('.pg-example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pg-example-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.example;
      if (pgExamples[key]) {
        pgInput.value = pgExamples[key];
        autoResize();
        runPlayground();
      }
    });
  });
}

// ===== UTILITY TABS =====
document.querySelectorAll('.utils-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.utils-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.utils-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(tab.dataset.panel);
    if (panel) panel.classList.add('active');
  });
});

// ===== HERO PARALLAX (depth shift - visual area only) =====
const hero3d = document.querySelector('.hero-3d');
const heroCode = document.querySelector('.hero-code');
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  heroVisual.addEventListener('mousemove', e => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // 3D component: subtle shift away from cursor
    if (hero3d) hero3d.style.transform = `translate(${x * -18}px, ${y * -18}px)`;
    // Code snippet: slightly more shift for layered depth
    if (heroCode) heroCode.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
  });
  heroVisual.addEventListener('mouseleave', () => {
    if (hero3d) hero3d.style.transform = 'translate(0, 0)';
    if (heroCode) heroCode.style.transform = 'translate(0, 0)';
  });
}

// ===== MOBILE NAV =====
const mobileBtn = document.getElementById('mobile-toggle');
const navLinksWrap = document.querySelector('.nav-links');
if (mobileBtn && navLinksWrap) {
  mobileBtn.addEventListener('click', () => {
    navLinksWrap.style.display = navLinksWrap.style.display === 'flex' ? 'none' : 'flex';
    navLinksWrap.style.position = 'absolute';
    navLinksWrap.style.top = 'var(--nav-height)';
    navLinksWrap.style.left = '0';
    navLinksWrap.style.right = '0';
    navLinksWrap.style.flexDirection = 'column';
    navLinksWrap.style.background = 'var(--bg-secondary)';
    navLinksWrap.style.padding = '16px';
    navLinksWrap.style.borderBottom = '1px solid var(--border-color)';
  });
}
