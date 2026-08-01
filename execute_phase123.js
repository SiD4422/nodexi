const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// ==========================================
// PHASE 1: AESTHETIC BASELINE (CSS INJECTION)
// ==========================================
const engineeringCSS = `
<style id="nodexi-engineering-css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

/* Force typography */
body, h1, h2, h3, h4, h5, h6, p, a, div, span {
    font-family: 'Inter', sans-serif !important;
}
.mono, .button, .badge, .ticker-text, .nav-link {
    font-family: 'JetBrains Mono', monospace !important;
    letter-spacing: 0px !important;
    text-transform: uppercase;
}

/* Deep Tech Dark Mode */
body, .page-wrapper, .section, .nav-bg, .footer {
    background-color: #030303 !important;
    color: #e2e8f0 !important;
}

/* Kill all pill shapes - Force sharp edges */
* {
    border-radius: 0px !important;
}

/* Button Styling */
.button.is-tech {
    background-color: #030303 !important;
    border: 1px solid #334155 !important;
    color: #f8fafc !important;
    padding: 12px 24px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-weight: 700 !important;
    font-size: 14px !important;
    transition: all 0.2s ease !important;
    cursor: pointer !important;
    text-decoration: none !important;
}
.button.is-tech.primary {
    background-color: #0ea5e9 !important; /* Electric Blue Accent */
    border-color: #0ea5e9 !important;
    color: #ffffff !important;
}
.button.is-tech:hover {
    background-color: #f8fafc !important;
    color: #030303 !important;
}
.button.is-tech.primary:hover {
    background-color: #38bdf8 !important;
}

/* Custom Navbar Links */
.nav-link-custom {
    color: #94a3b8 !important;
    text-decoration: none !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    padding: 10px 20px !important;
    transition: color 0.2s ease !important;
}
.nav-link-custom:hover {
    color: #f8fafc !important;
}

/* Remove original bubbly elements */
.hero-badge-wrap, img[alt*="Great"], .app-hero-bg-block {
    display: none !important;
}

/* Remove white backgrounds */
.section.is-white, .section.is-light {
    background-color: #030303 !important;
}
</style>
`;
$('#nodexi-engineering-css').remove();
$('head').append(engineeringCSS);


// ==========================================
// PHASE 2: NAVBAR OVERHAUL
// ==========================================
// Strip the middle dropdowns and replace with simple links
$('.navbar-menu-wrap').empty();
$('.navbar-menu-wrap').append(`
    <div style="display: flex; gap: 30px; align-items: center;">
        <a href="#capabilities" class="nav-link-custom mono">[ Capabilities ]</a>
        <a href="#work" class="nav-link-custom mono">[ Selected Work ]</a>
    </div>
`);

// Replace the right-side CTA buttons
$('.nav-block.right').empty();
$('.nav-block.right').append(`
    <a href="#contact" class="button is-tech primary mono">[ Book Tech Call ↗ ]</a>
`);


// ==========================================
// PHASE 3: HERO SECTION RECONSTRUCTION
// ==========================================
// Completely empty the hero container
$('.app-hero-content').empty();

// Inject the custom B2B engineering hero wireframe
$('.app-hero-content').append(`
    <div class="nodexi-tech-hero" style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 15vh 5vw 10vh 5vw; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; position: relative; z-index: 10;">
        
        <div class="badge mono" style="color: #0ea5e9; font-size: 14px; font-weight: 700; border: 1px solid #0ea5e9; padding: 6px 12px; margin-bottom: 40px; display: inline-block;">
            ● B2B ENGINEERING & ARCHITECTURE STUDIO
        </div>
        
        <h1 style="color: #ffffff; font-size: clamp(48px, 6vw, 90px); font-weight: 900; line-height: 1.05; letter-spacing: -2px; margin: 0 0 30px 0; max-width: 1000px;">
            Architecting Heavy-Duty Backends, Custom AI & Connected Systems.
        </h1>
        
        <p style="color: #94a3b8; font-size: clamp(18px, 2vw, 24px); line-height: 1.5; margin: 0 0 50px 0; max-width: 800px; font-weight: 400;">
            We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.
        </p>
        
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <a href="#contact" class="button is-tech primary mono">[ Book Tech Call ↗ ]</a>
            <a href="#proof" class="button is-tech mono">[ View Proof of Work ]</a>
        </div>
    </div>
`);

fs.writeFileSync('index.html', $.html());
console.log('Phases 1, 2, and 3 completed successfully.');
