const fs = require('fs');
const cheerio = require('cheerio');

// ----------------------------------------------------
// 1. UPDATE build-pages.js (Regex Replacements)
// ----------------------------------------------------
function updateBuildPages() {
  const filePath = 'build-pages.js';
  let content = fs.readFileSync(filePath, 'utf8');

  // Nav menu
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
      
  if (content.includes('seo.html')) {
    content = content.replace(oldNav, newNav);
  }

  // Projects array
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
    
  if (content.includes("id: 'kaash'")) {
    content = content.replace(oldProjects, newProjects);
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated build-pages.js');
}

// ----------------------------------------------------
// 2. UPDATE index.html (Using Cheerio)
// ----------------------------------------------------
function updateIndexHtml() {
  const filePath = 'index.html';
  const html = fs.readFileSync(filePath, 'utf8');
  
  // Use cheerio without wrapping everything in html/head/body automatically
  const $ = cheerio.load(html, { decodeEntities: false }, false);

  // 1. Hero Headline & Subtext
  const heroTitle = $('.hero-title');
  if (heroTitle.length) {
    heroTitle.html(`
      <span class="line" style="font-size: 0.7em;">INTERACTIVE DIGITAL TWINS</span>
      <span class="line" style="font-size: 0.7em;">& BROWSER-BASED <span class="accent-glow hover-stroke">SIMULATIONS.</span></span>
      <p style="color: var(--gray-400); max-width: 600px; font-size: 1.1rem; line-height: 1.6; margin-top: 24px; font-family: var(--font-sans); letter-spacing: normal; text-transform: none;">We build institutional-grade technical simulations and hardware-integrated training environments for engineering faculties and industrial applications.</p>
    `);
  }

  // 2. Marquee
  $('.marquee-content span').each((i, el) => {
    $(el).text('INTERACTIVE SIMULATIONS ✦ DIGITAL TWINS ✦ HARDWARE TELEMETRY ✦ EDTECH ENVIRONMENTS ✦ ');
  });

  // 3. Metrics
  $('.stat-item').eq(0).find('.stat-num').text('Zero-Latency');
  $('.stat-item').eq(0).find('.stat-label').text('Real-Time Telemetry');
  
  $('.stat-item').eq(2).find('.stat-num').text('Seamless');
  $('.stat-item').eq(2).find('.stat-label').text('Hardware-to-Cloud Integration');

  // 4. Featured Work Update (Kaash -> Gateonix Facade)
  const workLeft = $('.work-left');
  if (workLeft.length) {
    workLeft.find('.work-title').text('Gateonix');
    workLeft.find('.work-desc').text('A live interactive logic gate simulator running directly in the browser. Build complex circuits with zero latency or installation required.');
    workLeft.find('.work-tags').html(`
      <span class="work-tag">Simulations</span>
      <span class="work-tag">Hardware Logic</span>
      <span class="work-tag">EdTech</span>
    `);
  }

  const workRight = $('.work-right');
  if (workRight.length) {
    workRight.html(`
      <div class="work-mockup-wrap" style="padding-bottom:0;">
        <div id="gateonix-demo-container" style="width: 100%; aspect-ratio: 16/9; position: relative; background: #000; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
          <img id="gateonix-demo-img" class="work-mockup-img" src="https://via.placeholder.com/800x600/1e1e1e/8b5cf6?text=Gateonix+Interface" alt="Gateonix Screenshot" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
          <div style="position: absolute; display: flex; flex-direction: column; align-items: center; gap: 12px; pointer-events: none;">
            <div style="width: 64px; height: 64px; background: var(--purple); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <span style="color: white; font-weight: 700; letter-spacing: 1px;">RUN INTERACTIVE DEMO</span>
          </div>
        </div>
      </div>
    `);
  }

  // 5. Facade JS injection
  if (!html.includes('gateonix-demo-container.addEventListener')) {
    const facadeScript = `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const demoContainer = document.getElementById('gateonix-demo-container');
        if (demoContainer) {
          demoContainer.addEventListener('click', function() {
            const netlifyURL = "https://YOUR-GATEONIX-URL.netlify.app"; 
            this.style.cursor = 'default';
            this.innerHTML = \`
              <iframe 
                src="\${netlifyURL}" 
                width="100%" 
                height="100%" 
                style="border: none; width: 100%; height: 100%;" 
                title="Gateonix Logic Gate Simulator"
                loading="lazy"
                allow="autoplay; fullscreen">
              </iframe>
            \`;
          });
        }
      });
    </script>
    `;
    $('body').append(facadeScript);
  }

  // Cheerio might add html/head/body if not careful, but { decodeEntities: false } and using $.root().html() works better?
  // Let's ensure we get the full document
  let finalHtml = $.html();
  fs.writeFileSync(filePath, finalHtml);
  console.log('Updated index.html using Cheerio');
}

updateBuildPages();
updateIndexHtml();
