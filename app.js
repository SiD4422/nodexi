try {
  // 1. Preloader & Transitions
  const preloader = document.getElementById("preloader");
  
  if (preloader) {
    // FORCE HIDE IMMEDIATELY for debugging
    preloader.style.display = "none";
    preloader.classList.add("slide-out");

    // Slide up on initial load
    if (document.readyState === 'complete') {
      setTimeout(() => { preloader.classList.add("slide-out"); preloader.style.display="none"; }, 50);
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => { preloader.classList.add("slide-out"); preloader.style.display="none"; }, 50);
      });
    }
    
    // Fallback if load event fires early or fails
    setTimeout(() => {
      if (!preloader.classList.contains("slide-out")) {
        preloader.classList.add("slide-out");
        preloader.style.display = "none";
      }
    }, 1600);
  }

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const hasDarkHero = document.getElementById('hero'); // Only index.html has this
  if (navbar) {
    if (window.scrollY > 50 || !hasDarkHero) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  }
}
window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('DOMContentLoaded', handleNavbarScroll);

// =============================================
// SCROLL REVEAL ANIMATION (IntersectionObserver)
// =============================================
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire only once
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback for browsers without IntersectionObserver
  revealEls.forEach(el => el.classList.add('visible'));
}

// Also immediately reveal anything already in viewport on page load
setTimeout(() => {
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}, 50);

// Intercept internal link clicks for seamless transitions
document.querySelectorAll('a[href^="index.html"], a[href^="services.html"], a[href^="projects.html"], a[href^="about.html"], a[href^="case-study.html"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.target === '_blank') return;
    e.preventDefault();
    const targetUrl = this.getAttribute('href');
    
    if (preloader) {
      preloader.style.transform = 'translateY(0%)';
      preloader.classList.remove('slide-out');
    }
    
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 500); // Wait for transition to cover screen
  });
});





// 4. 3D Card Tilt Effect (Micro-interaction)
const tiltCards = document.querySelectorAll('.service-card, .project-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
    card.style.zIndex = '10';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease';
    card.style.zIndex = '1';
  });
});

// =============================================
// SIDE PANEL
// =============================================
const menuBtn = document.getElementById('menu-btn');
const panelClose = document.getElementById('panel-close');
const sidePanel = document.getElementById('side-panel');
const panelOverlay = document.getElementById('panel-overlay');

function openPanel() {
  sidePanel.classList.add('open');
  panelOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  sidePanel.classList.remove('open');
  panelOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (menuBtn) menuBtn.addEventListener('click', openPanel);
if (panelClose) panelClose.addEventListener('click', closePanel);
if (panelOverlay) panelOverlay.addEventListener('click', closePanel);

// Close panel on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
});



// =============================================
// FEATURED WORK SLIDER
// =============================================
const featuredProjects = [
  {
    title: "NodeSim",
    desc: "Professional circuit simulation, directly in your browser. Powered by ngspice WASM. No installation. No license headache. Just simulate.",
    tags: ["Simulations", "Hardware Logic", "EdTech"],
    link: "work-nodesim.html",
    img: "images/nodesim.png"
  },
  {
    title: "Digital Lab",
    desc: "Next-Gen Electric Circuits Lab Simulator. A real-time, interactive simulation environment built specifically for students to design, visualize, and master complex circuits.",
    tags: ["Circuits", "Interactive", "EdTech"],
    link: "work-digital-lab.html",
    img: "images/digital_lab.jpg"
  },
  {
    title: "V-Lab",
    desc: "Premium, full-stack virtual laboratory designed for Electrical and Electronics Engineering (EEE) students. Explore sensors and bridge circuits interactively.",
    tags: ["Virtual Lab", "Simulation", "EdTech"],
    link: "work-vlab.html",
    img: "images/vlab.jpg"
  }
];

let currentProjectIdx = 0;
const titleEl = document.querySelector('.work-title');
const descEl = document.querySelector('.work-desc');
const tagsEl = document.querySelector('.work-tags');
const linkEl = document.querySelector('.work-link');
const imgEl = document.querySelector('.work-mockup-img');
const sliderPrev = document.getElementById('btn-prev');
const sliderNext = document.getElementById('btn-next');

function updateSlider(index) {
  if (!titleEl) return;
  const p = featuredProjects[index];
  
  const leftSide = document.querySelector('.work-left > div:first-child');
  const rightSide = document.getElementById('nodesim-demo-container');
  
  if (leftSide) leftSide.style.transition = 'opacity 0.2s ease';
  if (rightSide) rightSide.style.transition = 'opacity 0.2s ease';
  if (leftSide) leftSide.style.opacity = 0;
  if (rightSide) rightSide.style.opacity = 0;
  
  setTimeout(() => {
    titleEl.textContent = p.title;
    descEl.textContent = p.desc;
    if (linkEl) linkEl.href = p.link;
    if (imgEl) {
      imgEl.src = p.img;
      imgEl.alt = p.title + " Screenshot";
    }
    
    if (tagsEl) {
      tagsEl.innerHTML = p.tags.map(t => "<span class=\"work-tag\">" + t + "</span>").join('');
    }
    
    if (leftSide) leftSide.style.opacity = 1;
    if (rightSide) rightSide.style.opacity = 1;
  }, 200);
}

if (sliderPrev && sliderNext) {
  sliderPrev.addEventListener('click', () => {
    currentProjectIdx = (currentProjectIdx - 1 + featuredProjects.length) % featuredProjects.length;
    updateSlider(currentProjectIdx);
  });
  
  sliderNext.addEventListener('click', () => {
    currentProjectIdx = (currentProjectIdx + 1) % featuredProjects.length;
    updateSlider(currentProjectIdx);
  });
}
} catch (e) {
  console.error(e);
  alert("Error in app.js: " + e.message);
  // Force hide preloader if there's any error
  const p = document.getElementById("preloader");
  if (p) p.style.display = "none";
}


