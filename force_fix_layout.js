const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. FIX THE HERO SECTION
// Find the element containing "Crafting" and completely destroy its parent wrapper
let heroSection = $('*:contains("Crafting")').last().closest('.section.is-hero.home');
if (heroSection.length === 0) {
    heroSection = $('.section.is-hero.home'); // Fallback
}

if (heroSection.length > 0) {
    heroSection.empty();
    heroSection.append(`
        <div class="nodexi-tech-hero" style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 15vh 5vw 10vh 5vw; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; position: relative; z-index: 10;">
            <div class="badge mono" style="color: #0ea5e9; font-size: 14px; font-weight: 700; border: 1px solid #0ea5e9; padding: 6px 12px; margin-bottom: 40px; display: inline-block;">
                ● B2B ENGINEERING & ARCHITECTURE STUDIO
            </div>
            <h1 style="color: #ffffff; font-size: clamp(48px, 6vw, 90px); font-weight: 900; line-height: 1.05; letter-spacing: -2px; margin: 0 0 30px 0; max-width: 1000px; font-family: 'Inter', sans-serif;">
                Architecting Heavy-Duty Backends, Custom AI & Connected Systems.
            </h1>
            <p style="color: #94a3b8; font-size: clamp(18px, 2vw, 24px); line-height: 1.5; margin: 0 0 50px 0; max-width: 800px; font-weight: 400; font-family: 'Inter', sans-serif;">
                We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <a href="#contact" class="button is-tech primary mono" style="background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; font-weight: 700; text-decoration: none; border: 1px solid #0ea5e9;">[ Book Tech Call ↗ ]</a>
                <a href="#proof" class="button is-tech mono" style="background-color: #030303; color: #f8fafc; padding: 12px 24px; font-weight: 700; text-decoration: none; border: 1px solid #334155;">[ View Proof of Work ]</a>
            </div>
        </div>
    `);
}

// 2. FIX THE TICKER & BANNER DUPLICATION
// Remove all existing showcase marquees and my injected banners to clean the slate
$('.showcase_marquee_wrapper, .nodexi-tech-ticker, .white-label-banner').remove();

// Inject exactly ONE ticker and banner immediately after the hero section
const tickerHTML = `
    <div class="nodexi-tech-ticker" style="width: 100%; border-top: 1px solid #334155; border-bottom: 1px solid #334155; padding: 15px 0; display: flex; align-items: center; background-color: #030303; overflow: hidden; position: relative;">
        <div style="position: absolute; left: 0; z-index: 10; background: #030303; padding: 0 5vw; border-right: 1px solid #334155; height: 100%; display: flex; align-items: center;">
            <span class="mono" style="color: #ffffff; font-size: 14px; font-weight: 700; white-space: nowrap;">SYSTEMS ENGINEERED:</span>
        </div>
        <div class="ticker-scroll-content" style="display: flex; gap: 40px; margin-left: 280px; animation: tickerScroll 20s linear infinite;">
            <div class="ticker-item mono" style="color: #0ea5e9; font-weight: 700;">[ Multi-Tenant Platforms ]</div>
            <div class="ticker-item mono" style="color: #0ea5e9; font-weight: 700;">[ AI Diagnostic Engines ]</div>
            <div class="ticker-item mono" style="color: #0ea5e9; font-weight: 700;">[ Real-Time Telemetry ]</div>
            <div class="ticker-item mono" style="color: #0ea5e9; font-weight: 700;">[ QNX / Embedded ]</div>
            <div class="ticker-item mono" style="color: #0ea5e9; font-weight: 700;">[ Multi-Tenant Platforms ]</div>
            <div class="ticker-item mono" style="color: #0ea5e9; font-weight: 700;">[ AI Diagnostic Engines ]</div>
        </div>
    </div>
    <div class="white-label-banner" style="background-color: #0ea5e9; color: #ffffff; text-align: center; padding: 16px 20px; font-family: 'Inter', sans-serif;">
        <p style="margin: 0; font-size: 16px; font-weight: 600;">
            <strong style="font-weight: 900; background: #030303; color: #0ea5e9; padding: 2px 8px; margin-right: 10px;">PARTNER NETWORK</strong> 
            Design agency needing backend muscle? We act as your invisible engineering arm. 
            <a href="#partner" style="color: #030303; font-weight: 800; text-decoration: underline; margin-left: 10px;">Let's Talk</a>
        </p>
    </div>
`;
heroSection.after(tickerHTML);

// 3. FIX THE NAVBAR
// The navbar has two blocks: left (menu) and right (contact buttons)
const navRight = $('a:contains("CONTACT")').closest('.nav-block');
if (navRight.length > 0) {
    navRight.empty();
    navRight.append(`<a href="#contact" class="button is-tech primary mono" style="background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; font-weight: 700; text-decoration: none; border: 1px solid #0ea5e9;">[ Book Tech Call ↗ ]</a>`);
}

const navLeft = $('.navbar-menu-wrap');
if (navLeft.length > 0) {
    navLeft.empty();
    navLeft.append(`
        <div style="display: flex; gap: 30px; align-items: center;">
            <a href="#capabilities" class="nav-link-custom mono" style="color: #94a3b8; text-decoration: none; font-weight: 700;">[ Capabilities ]</a>
            <a href="#work" class="nav-link-custom mono" style="color: #94a3b8; text-decoration: none; font-weight: 700;">[ Selected Work ]</a>
        </div>
    `);
}

// Ensure the NODEXI logo is bright white so it's visible on the black background
$('.nav-logo, .logo').css('color', '#ffffff');
$('.nav-logo, .logo').css('-webkit-text-stroke', '0px');

fs.writeFileSync('index.html', $.html());
console.log('Aggressive layout fix applied.');
