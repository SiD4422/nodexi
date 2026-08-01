const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. REWRITE THE ENGINEERING CSS FOR LIGHT MODE
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

/* Light Mode Overrides */
body, .page-wrapper, .section, .nav-bg, .footer {
    background-color: #ffffff !important;
    color: #0f172a !important;
}

h1, h2, h3, h4, h5, h6 {
    color: #020617 !important;
}

/* Kill all pill shapes - Force sharp edges */
* {
    border-radius: 0px !important;
}

/* Button Styling (Light Mode) */
.button.is-tech {
    background-color: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
    color: #0f172a !important;
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
    background-color: #f1f5f9 !important;
    color: #020617 !important;
}
.button.is-tech.primary:hover {
    background-color: #38bdf8 !important;
    color: #ffffff !important;
}

/* Custom Navbar Links (Light Mode) */
.nav-link-custom {
    color: #475569 !important;
    text-decoration: none !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    padding: 10px 20px !important;
    transition: color 0.2s ease !important;
    white-space: nowrap !important;
}
.nav-link-custom:hover {
    color: #020617 !important;
}

/* Remove original bubbly elements */
.hero-badge-wrap, img[alt*="Great"], .app-hero-bg-block {
    display: none !important;
}

/* Remove dark backgrounds */
.section.is-white, .section.is-light {
    background-color: #ffffff !important;
}

/* Ticker overrides for light mode */
.nodexi-tech-ticker {
    background-color: #f8fafc !important;
    border-top: 1px solid #e2e8f0 !important;
    border-bottom: 1px solid #e2e8f0 !important;
}
.ticker-label-bg {
    background: #f8fafc !important;
    border-right: 1px solid #e2e8f0 !important;
}
.ticker-label-text {
    color: #020617 !important;
}

/* Proof Section Overrides for Light Mode */
.nodexi-proof-section {
    background-color: #ffffff !important;
}
.nodexi-proof-section h2 {
    color: #020617 !important;
}
.nodexi-proof-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
}
.nodexi-proof-card-header {
    background: #f8fafc !important;
    border-bottom: 1px solid #e2e8f0 !important;
}
.nodexi-proof-card-header h3 {
    color: #020617 !important;
}
.nodexi-proof-card-body {
    background: #f1f5f9 !important;
}
.nodexi-proof-card-footer {
    background: #ffffff !important;
}
.nodexi-proof-card-footer p {
    color: #475569 !important;
}
</style>
`;
$('#nodexi-engineering-css').replaceWith(engineeringCSS);

// 2. INLINE STYLE FIXES FOR LIGHT MODE

// Fix Hero Text
$('.nodexi-tech-hero h1').css('color', '#020617');
$('.nodexi-tech-hero p').css('color', '#475569');
// Fix Hero "View Proof of Work" button
$('a:contains("View Proof of Work")').attr('style', 'background-color: #ffffff; color: #020617; padding: 12px 24px; font-weight: 700; text-decoration: none; border: 1px solid #cbd5e1;');

// Fix Ticker classes to use the new CSS
$('.nodexi-tech-ticker').attr('style', 'width: 100%; padding: 15px 0; display: flex; align-items: center; overflow: hidden; position: relative;');
$('.nodexi-tech-ticker > div:first-child').addClass('ticker-label-bg').attr('style', 'position: absolute; left: 0; z-index: 10; padding: 0 5vw; height: 100%; display: flex; align-items: center;');
$('.nodexi-tech-ticker > div:first-child span').addClass('ticker-label-text').attr('style', 'font-size: 14px; font-weight: 700; white-space: nowrap;');

// Fix Proof Section inline styles
$('.nodexi-proof-section').attr('style', 'padding: 10vh 5vw;');
$('.nodexi-proof-section h2').attr('style', 'font-size: 32px; font-weight: 900; margin-bottom: 40px; font-family: "Inter", sans-serif;');

// Fix Proof Cards inline styles
$('.nodexi-proof-card').attr('style', 'position: relative; overflow: hidden; display: flex; flex-direction: column;');
$('.nodexi-proof-card > div:nth-child(1)').addClass('nodexi-proof-card-header').attr('style', 'padding: 20px; display: flex; justify-content: space-between; align-items: center;');
$('.nodexi-proof-card > div:nth-child(1) h3').attr('style', 'margin: 0; font-size: 18px; font-weight: 700; font-family: "Inter", sans-serif;');
$('.nodexi-proof-card > div:nth-child(2)').addClass('nodexi-proof-card-body').attr('style', 'padding: 30px; position: relative; min-height: 200px; display: flex; align-items: center; justify-content: center;');
$('.nodexi-proof-card > div:nth-child(3)').addClass('nodexi-proof-card-footer').attr('style', 'padding: 20px;');
$('.nodexi-proof-card > div:nth-child(3) p').attr('style', 'font-size: 14px; margin: 0 0 15px 0; line-height: 1.5; font-family: "Inter", sans-serif;');

// Fix Navbar Logo Color
$('.nav-logo, .logo').css('color', '#020617');

fs.writeFileSync('index.html', $.html());
console.log('Switched to Light Mode.');
