const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// ==========================================
// PHASE 4: TRUST TICKER
// ==========================================
const marqueeWrapper = $('.showcase_marquee_wrapper');

if (marqueeWrapper.length > 0) {
    marqueeWrapper.empty();
    
    // Build the new technical ticker
    const tickerItems = `
        <div class="ticker-item mono">[ Multi-Tenant Platforms ]</div>
        <div class="ticker-item mono">[ AI Diagnostic Engines ]</div>
        <div class="ticker-item mono">[ Real-Time Telemetry ]</div>
        <div class="ticker-item mono">[ QNX / Embedded ]</div>
    `.repeat(4); // Repeat for scrolling effect

    marqueeWrapper.append(`
        <div class="nodexi-tech-ticker" style="width: 100%; border-top: 1px solid #334155; border-bottom: 1px solid #334155; padding: 15px 0; display: flex; align-items: center; background-color: #030303; overflow: hidden; position: relative;">
            
            <div style="position: absolute; left: 0; z-index: 10; background: #030303; padding: 0 5vw; border-right: 1px solid #334155; height: 100%; display: flex; align-items: center;">
                <span class="mono" style="color: #ffffff; font-size: 14px; font-weight: 700; white-space: nowrap;">SYSTEMS ENGINEERED:</span>
            </div>
            
            <div class="ticker-scroll-content" style="display: flex; gap: 40px; margin-left: 280px; animation: tickerScroll 20s linear infinite;">
                ${tickerItems}
            </div>
            
        </div>
        
        <style>
            @keyframes tickerScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .ticker-item {
                color: #0ea5e9;
                font-size: 14px;
                font-weight: 700;
                white-space: nowrap;
            }
            @media screen and (max-width: 768px) {
                .nodexi-tech-ticker > div:first-child { position: relative; padding: 15px 5vw; border-right: none; border-bottom: 1px solid #334155; width: 100%; }
                .ticker-scroll-content { margin-left: 0; margin-top: 15px; }
                .nodexi-tech-ticker { flex-direction: column; align-items: flex-start; padding: 0; }
            }
        </style>
    `);

    // ==========================================
    // PHASE 4: WHITE-LABEL BANNER
    // ==========================================
    const whiteLabelBanner = `
        <div class="white-label-banner" style="background-color: #0ea5e9; color: #ffffff; text-align: center; padding: 16px 20px; font-family: 'Inter', sans-serif;">
            <p style="margin: 0; font-size: 16px; font-weight: 600;">
                <strong style="font-weight: 900; background: #030303; color: #0ea5e9; padding: 2px 8px; margin-right: 10px;">PARTNER NETWORK</strong> 
                Design agency needing backend muscle? We act as your invisible engineering arm. 
                <a href="#partner" style="color: #030303; font-weight: 800; text-decoration: underline; margin-left: 10px;">Let's Talk</a>
            </p>
        </div>
    `;
    
    // Inject right after the marquee
    marqueeWrapper.after(whiteLabelBanner);
}

fs.writeFileSync('index.html', $.html());
console.log('Phase 4 completed successfully.');
