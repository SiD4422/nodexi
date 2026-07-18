// ===== Loader =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hide'), 500);
});

// ===== Scroll progress =====
const progress = document.getElementById('progress');
if (progress) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + '%';
  });
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Custom cursor =====
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring) {
  window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .card, .faq-q').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width='46px'; ring.style.height='46px'; ring.style.opacity='0.6'; });
    el.addEventListener('mouseleave', () => { ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='1'; });
  });
}

// ===== Active nav link (works across separate html files) =====
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (!href) return;
  const file = href.split('#')[0] || 'index.html';
  const current = location.pathname.split('/').pop() || 'index.html';
  if (file === current || (file === 'index.html' && current === '')) a.classList.add('active');
  else a.classList.remove('active');
});

// Note: hero cube tilt + word-cycle now handled entirely by js/hero3d.js (real WebGL scene, Home page only)

// ===== Start Project wizard (only present on Contact) =====
(() => {
  const steps = Array.from(document.querySelectorAll('.wizard-step'));
  if (!steps.length) return;
  const dots = Array.from(document.querySelectorAll('.wd'));
  const nextBtn = document.getElementById('wizNext');
  const backBtn = document.getElementById('wizBack');
  let current = 1;
  const total = steps.length;
  function render(){
    steps.forEach(s => s.classList.toggle('active', +s.dataset.step === current));
    dots.forEach(d => {
      const n = +d.dataset.step;
      d.classList.toggle('active', n === current);
      d.classList.toggle('done', n < current);
    });
    backBtn.classList.toggle('disabled', current === 1);
    nextBtn.textContent = current === total ? 'Submit →' : 'Next →';
  }
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (current < total) { current++; render(); }
    else { 
      const form = e.target.closest('form');
      if (form) form.submit();
      nextBtn.textContent = 'Submitted ✓'; 
    }
  });
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (current > 1) { current--; render(); }
  });
  render();
})();

// ===== FAQ accordion (only present on Contact) =====
const faqs = [
  ["How long does a typical project take?", "Timelines vary by scope — a marketing website typically takes 3–5 weeks, while a full platform or enterprise system runs 3–6 months. You'll get a concrete timeline after discovery."],
  ["How is pricing structured?", "We quote fixed-price for well-defined scopes and time-and-materials for evolving products. Every proposal breaks down cost by phase so there are no surprises."],
  ["Who owns the code once the project ships?", "You do — 100%. Source code, designs and documentation are handed over in full, with no licensing lock-in."],
  ["Do you offer support after launch?", "Yes. Every project includes a post-launch support window, and we offer ongoing maintenance retainers for monitoring, patching and feature work."],
  ["How do you handle security?", "We apply secure-by-default practices — encrypted data, least-privilege access, dependency scanning and code review — as standard, not an add-on."],
  ["Where do you host our application?", "We deploy to AWS, Azure or Google Cloud based on your needs, or work within infrastructure you already have."],
  ["Can you work with our existing codebase?", "Yes. We regularly audit, refactor and extend existing systems rather than requiring a rebuild from scratch."],
  ["What industries do you have experience in?", "We've delivered projects across healthcare, finance, retail, logistics, education and more — see our Industries page for the full list."],
  ["Do you sign NDAs?", "Yes, we're happy to sign an NDA before any detailed discussion of your project."],
  ["What does the discovery phase involve?", "A structured set of working sessions to understand your goals, users, constraints and success metrics before any architecture is proposed."],
  ["Can you build both the MVP and scale it later?", "Yes — we design MVP architecture with future scale in mind, so early speed doesn't create rework later."],
  ["Do you provide UI/UX design as part of development?", "Yes, design and engineering happen together on every project, not as separate handoffs."],
  ["What's your team structure like?", "You're paired with a dedicated pod — typically a lead engineer, designer and PM — who stay with your project end to end."],
  ["Do you work with startups or only enterprises?", "Both. We tailor process and pricing for early-stage startups as well as enterprise-scale engagements."],
  ["How do we get started?", "Book a free consultation — we'll discuss your goals and follow up with a scoped proposal within days."]
];
const faqList = document.getElementById('faqList');
if (faqList) {
  faqs.forEach(([q,a]) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `<div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${a}</p></div>`;
    faqList.appendChild(item);
  });
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
      if (!wasOpen) { item.classList.add('open'); const a = item.querySelector('.faq-a'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });
}
