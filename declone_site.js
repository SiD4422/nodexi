const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const decloneCSS = `
<style id="nodexi-declone-css">
/* =========================================
   NODEXI DE-CLONING CSS OVERRIDES
   ========================================= */

/* 1. TYPOGRAPHY OVERHAUL */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');

body, h1, h2, h3, h4, h5, h6, .heading-huge, .nav-logo, p, a, div {
    font-family: 'Inter', sans-serif !important;
}

/* Use Monospace for technical elements like buttons, pills, small tags */
.button-text, .text-size-tiny, .marquee_chat, .is_social {
    font-family: 'JetBrains Mono', monospace !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
}

/* 2. GLOBAL THEME OVERHAUL (DARK MODE) */
body, .page-wrapper, .section, .nav-bg, .footer {
    background-color: #050505 !important;
    color: #e0e0e0 !important;
}

h1, h2, h3, h4, h5, h6, .heading-huge {
    color: #ffffff !important;
}

/* 3. GEOMETRY SQUARING (KILL THE PILLS) */
/* Override all massive border-radiuses to 4px for a sharp, tech look */
* {
    border-radius: 4px !important;
}

/* 4. BRAND COLORS (KILL PURPLE & LIME) */
/* Target Webflow's specific colored blocks and buttons */
.marquee_chat, .button, .nav-block, .footer-bottom {
    background-color: #111111 !important;
    color: #00e5ff !important;
    border: 1px solid #333333 !important;
}

/* Specifically target the hero marquee wrappers */
.showcase_marquee_wrapper, .showcase_marquee_flex {
    background-color: transparent !important;
}

.marquee_chat {
    background-color: #0a0a0a !important;
    border: 1px solid #00e5ff !important;
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.1);
}

.marquee_chat.is_yellow {
    background-color: #0a0a0a !important;
    border: 1px solid #00e5ff !important;
    color: #00e5ff !important;
}

/* Ensure links are readable */
a { color: #ffffff !important; }
a:hover { color: #00e5ff !important; }

/* Remove the massive white backgrounds on sections */
.section.is-white, .section.is-light {
    background-color: #0a0a0a !important;
}

/* Inverse the button hover effects to match the new dark theme */
.button.is-icon.nav:hover {
    background-color: #00e5ff !important;
    color: #000000 !important;
}
.button.is-icon.nav:hover * {
    color: #000000 !important;
}

/* Hide the spinning badge */
.spinning-badge, .spinning-circle-wrapper, [alt="Rating"] {
    display: none !important;
}
</style>
`;

// Remove any previously injected declone css just in case
$('#nodexi-declone-css').remove();
$('head').append(decloneCSS);

// Let's also remove the actual spinning badge HTML if we can find it
$('.hero-badge-wrap').remove();

// Also remove the huge "Crafting brands and digital experience" marquee
// We will replace it with a clean, static, aggressive tech hero layout
$('.app-hero-title-wrap').replaceWith(`
<div class="app-hero-title-wrap nodexi-hero-static" style="padding: 10vh 5vw; display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
    <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px);">
        ENGINEERING
    </h1>
    <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px); color: #00e5ff !important;">
        SOFTWARE.
    </h1>
    <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px);">
        BUILDING
    </h1>
    <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px); color: #00e5ff !important;">
        SYSTEMS.
    </h1>
    <p style="font-family: 'JetBrains Mono', monospace !important; margin-top: 40px; font-size: 18px; max-width: 600px; color: #a0a0a0 !important; line-height: 1.6;">
        > Initializing high-performance engineering for startups and enterprises.<br>
        > Deploying robust architectures, sleek web apps, and immutable security.
    </p>
</div>
`);

// Hide the showreel video block completely since it ruins the dark tech vibe
$('.app-hero-bg-block').remove();

fs.writeFileSync('index.html', $.html());
console.log('De-cloning CSS and Hero replacement applied.');
