const fs = require('fs');

function pivotIndexHtml() {
  const filePath = 'index.html';
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Hero Headline & Subtext
  // Current: 
  // <span class="line">ENGINEERING</span>
  // <span class="line">AT <span class="accent-glow hover-stroke">SCALE.</span></span>
  const oldHeadline = '<span class="line">ENGINEERING</span>\n      <span class="line">AT <span class="accent-glow hover-stroke">SCALE.</span></span>';
  const newHeadline = '<span class="line" style="font-size: 0.7em;">INTERACTIVE DIGITAL TWINS</span>\n      <span class="line" style="font-size: 0.7em;">& BROWSER-BASED <span class="accent-glow hover-stroke">SIMULATIONS.</span></span>\n      <p style="color: var(--gray-400); max-width: 600px; font-size: 1.1rem; line-height: 1.6; margin-top: 24px; font-family: var(--font-sans);">We build institutional-grade technical simulations and hardware-integrated training environments for engineering faculties and industrial applications.</p>';
  content = content.replace(oldHeadline, newHeadline);

  // 2. Marquee
  const oldMarquee = 'WEB DEVELOPMENT ✦ AI AUTOMATION ✦ CLOUD ARCHITECTURE ✦ PRODUCT DESIGN ✦ CYBERSECURITY ✦';
  const newMarquee = 'INTERACTIVE SIMULATIONS ✦ DIGITAL TWINS ✦ HARDWARE TELEMETRY ✦ EDTECH ENVIRONMENTS ✦';
  content = content.replace(new RegExp(oldMarquee, 'g'), newMarquee);

  // 3. Metrics
  content = content.replace('<div class="stat-num">15+</div>\n          <div class="stat-label">Projects Delivered</div>', '<div class="stat-num">Zero-Latency</div>\n          <div class="stat-label">Real-Time Telemetry</div>');
  content = content.replace('<div class="stat-num">24/7</div>\n          <div class="stat-label">Support Available</div>', '<div class="stat-num">Seamless</div>\n          <div class="stat-label">Hardware-to-Cloud Integration</div>');

  // 4. Featured Work (Kaash -> Gateonix)
  const oldWorkLeft = `<h2 class="work-title">Kaash</h2>
        <p class="work-desc">A safe space for your mind and heart. Built for the moments when thoughts feel too heavy to carry alone. No names, no pressure, just honesty.</p>
        <div class="work-tags">
          <span class="work-tag">React</span>
          <span class="work-tag">Mental Wellness</span>
          <span class="work-tag">UI/UX</span>
        </div>`;
  
  const newWorkLeft = `<h2 class="work-title">Gateonix</h2>
        <p class="work-desc">A live interactive logic gate simulator running directly in the browser. Build complex circuits with zero latency or installation required.</p>
        <div class="work-tags">
          <span class="work-tag">Simulations</span>
          <span class="work-tag">Hardware Logic</span>
          <span class="work-tag">EdTech</span>
        </div>`;
  content = content.replace(oldWorkLeft, newWorkLeft);

  const oldWorkImages = `<img class="work-mockup-img" src="images/kaash.png" alt="Kaash Screenshot"
               style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="work-mockup-phone">
          <img class="work-mockup-img" src="images/kaash.png" alt="Kaash mobile view"`;
          
  const newWorkImages = `<div id="gateonix-demo-container" style="width: 100%; height: 100%; position: relative; background: #000; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 12px; overflow: hidden;">
            <img id="gateonix-demo-img" class="work-mockup-img" src="https://via.placeholder.com/800x600/1e1e1e/8b5cf6?text=Gateonix+Interface" alt="Gateonix Screenshot" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
            <div style="position: absolute; display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <div style="width: 64px; height: 64px; background: var(--purple); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <span style="color: white; font-weight: 700; letter-spacing: 1px;">RUN INTERACTIVE DEMO</span>
            </div>
          </div>
        </div>
        <div class="work-mockup-phone" style="display:none;">
          <img class="work-mockup-img" src="https://via.placeholder.com/300x600/1e1e1e/8b5cf6" alt="Gateonix mobile view"`;
  
  content = content.replace(oldWorkImages, newWorkImages);

  fs.writeFileSync(filePath, content);
  console.log('Updated index.html');
}

function pivotBuildPages() {
  const filePath = 'build-pages.js';
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Navigation Links
  const oldNav = `<a href="seo.html" class="full-link">SEO <span class="arrow">↗</span></a>
        </div>
      </div>

      <div class="nav-menu-col">
        <div class="nav-menu-label">Solutions</div>
        <div class="nav-menu-links">
          <a href="startups.html" class="full-link">FOR STARTUPS <span class="arrow">↗</span></a>
          <a href="web3.html" class="full-link">FOR WEB3 <span class="arrow">↗</span></a>
          <a href="about.html" class="full-link">ABOUT <span class="arrow">↗</span></a>
        </div>
      </div>`;
      
  const newNav = `<a href="about.html" class="full-link">ABOUT <span class="arrow">↗</span></a>
        </div>
      </div>

      <div class="nav-menu-col">
        <div class="nav-menu-label">Solutions</div>
        <div class="nav-menu-links">
          <a href="institutions.html" class="full-link">FOR INSTITUTIONS <span class="arrow">↗</span></a>
          <a href="industry.html" class="full-link">FOR INDUSTRY <span class="arrow">↗</span></a>
          <a href="core-technologies.html" class="full-link">CORE TECHNOLOGIES <span class="arrow">↗</span></a>
        </div>
      </div>`;
      
  content = content.replace(oldNav, newNav);

  // 2. Portfolio Reorder
  // Currently Gateonix is at index 1, Kaash is at index 0. We also need to add/rename to "Hardware-Controlled Dry Dock Simulation"
  const oldProjects = `const projects = [
    {
      id: 'kaash',
      category: 'Mental Wellness • App',
      title: 'Kaash',
      desc: 'A safe space for your mind and heart. Built for the moments when thoughts feel too heavy to carry alone. No names, no pressure, just honesty.',
      link: 'work-kaash.html',
      img: 'images/kaash.png'
    },
    {
      id: 'gateonix',
      category: 'Digital Assets • Web3',
      title: 'Gateonix',
      desc: 'NextGen Digital Assets gateway with institutional-grade security, bridging traditional finance and web3 capabilities.',
      link: 'work-gateonix.html',
      img: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'digital-lab',
      category: 'EdTech • Platform',
      title: 'Digital Lab',
      desc: 'An immersive digital laboratory platform revolutionizing how students interact with complex scientific experiments remotely.',
      link: 'work-digital-lab.html',
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'
    },`;
    
  const newProjects = `const projects = [
    {
      id: 'gateonix',
      category: 'EdTech • Simulation',
      title: 'Gateonix',
      desc: 'A live interactive logic gate simulator running directly in the browser. Build complex circuits with zero latency or installation required.',
      link: 'work-gateonix.html',
      img: 'https://via.placeholder.com/800x600/1e1e1e/8b5cf6?text=Gateonix+Interface'
    },
    {
      id: 'dry-dock',
      category: 'Industrial • Digital Twin',
      title: 'Hardware-Controlled Dry Dock Simulation',
      desc: 'A complete physical-to-digital bridge for safety training. Real-time telemetry from physical controls directly manipulated a browser-based 3D simulation.',
      link: 'work-dry-dock.html',
      img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'kaash',
      category: 'Mental Wellness • App',
      title: 'Kaash',
      desc: 'A safe space for your mind and heart. Built for the moments when thoughts feel too heavy to carry alone. No names, no pressure, just honesty.',
      link: 'work-kaash.html',
      img: 'images/kaash.png'
    },`;
    
  content = content.replace(oldProjects, newProjects);

  fs.writeFileSync(filePath, content);
  console.log('Updated build-pages.js');
}

pivotIndexHtml();
pivotBuildPages();
