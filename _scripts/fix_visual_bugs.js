const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. FIX BUTTON WRAPPING
// Add white-space: nowrap to all tech buttons so they don't crush vertically
$('style#nodexi-engineering-css').text((i, text) => {
    return text.replace('.button.is-tech {', '.button.is-tech { white-space: nowrap !important;');
});
$('.button.is-tech').css('white-space', 'nowrap'); // Also inline just to be safe

// 2. INJECT PROOF CARDS (FORCEFULLY)
// Previous attempts failed because Webflow classes were unpredictable.
// We will find the logo grid by looking for the IIFL or HDFC images.
let logoImg = $('img[alt*="IIFL"], img[src*="IIFL"], img[alt*="HDFC"], img[src*="HDFC"]').first();
let logoSection = logoImg.closest('section, .section, div[class*="logo"]');

// Fallback: If we can't find the logo section, inject it immediately after the White-Label banner
if (logoSection.length === 0) {
    logoSection = $('.white-label-banner').closest('.nodexi-tech-ticker').next();
    if(logoSection.length === 0) logoSection = $('.white-label-banner');
}

// Remove any accidentally injected proof sections that might be hidden
$('.nodexi-proof-section').remove();

const proofSectionHTML = `
<div class="nodexi-proof-section" style="background-color: #ffffff; padding: 10vh 5vw; width: 100%; border-bottom: 1px solid #e2e8f0; display: block !important; visibility: visible !important;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="color: #020617; font-size: 32px; font-weight: 900; margin-bottom: 40px; font-family: 'Inter', sans-serif;">
            Systems Engineered
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; width: 100%;">
            
            <!-- Proof Card 1 -->
            <div class="nodexi-proof-card" style="background: #ffffff; border: 1px solid #e2e8f0; position: relative; overflow: hidden; display: flex; flex-direction: column;">
                <div style="padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                    <h3 style="margin: 0; font-size: 18px; color: #020617; font-weight: 700; font-family: 'Inter', sans-serif;">MultiSym Live</h3>
                    <span class="mono" style="background: #0ea5e9; color: #fff; font-size: 10px; padding: 4px 8px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">PROD - HEALTHY</span>
                </div>
                <div style="padding: 30px; position: relative; background: #f1f5f9; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; z-index: 2;">
                        <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid #0ea5e9; padding: 15px;">
                            <div class="mono" style="color: #475569; font-size: 10px; font-family: 'JetBrains Mono', monospace;">CONCURRENT CONNS</div>
                            <div style="color: #0ea5e9; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">1.2M+</div>
                        </div>
                        <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; padding: 15px;">
                            <div class="mono" style="color: #475569; font-size: 10px; font-family: 'JetBrains Mono', monospace;">p99 LATENCY</div>
                            <div style="color: #22c55e; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">&lt; 14ms</div>
                        </div>
                    </div>
                </div>
                <div style="padding: 20px; background: #ffffff;">
                    <p style="color: #475569; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5; font-family: 'Inter', sans-serif;">
                        Distributed WebSocket architecture built on Go and Redis Cluster to handle real-time simulation state across global regions.
                    </p>
                    <div style="display: flex; gap: 10px;">
                        <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #e2e8f0; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">Golang</span>
                        <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #e2e8f0; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">Redis</span>
                    </div>
                </div>
            </div>

            <!-- Proof Card 2 -->
            <div class="nodexi-proof-card" style="background: #ffffff; border: 1px solid #e2e8f0; position: relative; overflow: hidden; display: flex; flex-direction: column;">
                <div style="padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                    <h3 style="margin: 0; font-size: 18px; color: #020617; font-weight: 700; font-family: 'Inter', sans-serif;">MediScan AI</h3>
                    <span class="mono" style="background: #eab308; color: #000; font-size: 10px; padding: 4px 8px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">INFERENCING</span>
                </div>
                <div style="padding: 30px; position: relative; background: #f1f5f9; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; z-index: 2;">
                        <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid #0ea5e9; padding: 15px;">
                            <div class="mono" style="color: #475569; font-size: 10px; font-family: 'JetBrains Mono', monospace;">GPU UTILIZATION</div>
                            <div style="color: #0ea5e9; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">94% Opt</div>
                        </div>
                        <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid #a855f7; padding: 15px;">
                            <div class="mono" style="color: #475569; font-size: 10px; font-family: 'JetBrains Mono', monospace;">PROCESSING</div>
                            <div style="color: #a855f7; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">1.4s/Scan</div>
                        </div>
                    </div>
                </div>
                <div style="padding: 20px; background: #ffffff;">
                    <p style="color: #475569; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5; font-family: 'Inter', sans-serif;">
                        HIPAA-compliant tensor processing pipeline capable of analyzing 3D volumetric scans with millisecond routing latency.
                    </p>
                    <div style="display: flex; gap: 10px;">
                        <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #e2e8f0; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">PyTorch</span>
                        <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #e2e8f0; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">AWS Health</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
`;

// Forcefully inject it immediately AFTER the logo section.
// If logoSection somehow is still 0, append it directly to body as a last resort to guarantee visibility.
if (logoSection.length > 0) {
    logoSection.after(proofSectionHTML);
} else {
    // Ultimate fallback, inject it before the footer or at end of page-wrapper
    let pageWrapper = $('.page-wrapper');
    if (pageWrapper.length > 0) {
        pageWrapper.append(proofSectionHTML);
    } else {
        $('body').append(proofSectionHTML);
    }
}

fs.writeFileSync('index.html', $.html());
console.log('Button wrapping fixed and proof cards forcefully injected.');
