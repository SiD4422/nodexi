const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Fix Navbar Wrapping
// Add white-space: nowrap to the links
$('.nav-link-custom').css('white-space', 'nowrap');

// 2. Fix the Hero Alignment
// In the screenshot, the text is centered. If we want it left-aligned, we need to enforce it on the parent wrappers.
// Webflow's .section.is-hero.home often has text-align: center on it. Let's force it to left.
$('.section.is-hero.home').css('text-align', 'left');
$('.nodexi-tech-hero').css('align-items', 'flex-start');

// 3. Inject Proof Cards above the Services section
// We will find the text "SERVICES" and target its section wrapper
let servicesText = $('*:contains("SERVICES")').last();
let servicesSection = servicesText.closest('.section');

if (servicesSection.length > 0) {
    // Check if we already injected them
    if ($('.nodexi-proof-section').length === 0) {
        const proofSectionHTML = `
        <div class="section nodexi-proof-section" style="background-color: #030303; padding: 10vh 5vw;">
            <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="color: #ffffff; font-size: 32px; font-weight: 900; margin-bottom: 40px; font-family: 'Inter', sans-serif;">
                    Systems Engineered
                </h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; width: 100%;">
                    
                    <!-- Proof Card 1 -->
                    <div class="nodexi-proof-card" style="background: #0a0a0a; border: 1px solid #334155; position: relative; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="padding: 20px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; background: #111;">
                            <h3 style="margin: 0; font-size: 18px; color: #f8fafc; font-weight: 700; font-family: 'Inter', sans-serif;">MultiSym Live</h3>
                            <span class="mono" style="background: #0ea5e9; color: #fff; font-size: 10px; padding: 4px 8px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">PROD - HEALTHY</span>
                        </div>
                        <div style="padding: 30px; position: relative; background: #050505; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; z-index: 2;">
                                <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid #0ea5e9; padding: 15px;">
                                    <div class="mono" style="color: #94a3b8; font-size: 10px; font-family: 'JetBrains Mono', monospace;">CONCURRENT CONNS</div>
                                    <div style="color: #0ea5e9; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">1.2M+</div>
                                </div>
                                <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; padding: 15px;">
                                    <div class="mono" style="color: #94a3b8; font-size: 10px; font-family: 'JetBrains Mono', monospace;">p99 LATENCY</div>
                                    <div style="color: #22c55e; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">&lt; 14ms</div>
                                </div>
                            </div>
                        </div>
                        <div style="padding: 20px; background: #0a0a0a;">
                            <p style="color: #94a3b8; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5; font-family: 'Inter', sans-serif;">
                                Distributed WebSocket architecture built on Go and Redis Cluster to handle real-time simulation state across global regions.
                            </p>
                            <div style="display: flex; gap: 10px;">
                                <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">Golang</span>
                                <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">Redis</span>
                            </div>
                        </div>
                    </div>

                    <!-- Proof Card 2 -->
                    <div class="nodexi-proof-card" style="background: #0a0a0a; border: 1px solid #334155; position: relative; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="padding: 20px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; background: #111;">
                            <h3 style="margin: 0; font-size: 18px; color: #f8fafc; font-weight: 700; font-family: 'Inter', sans-serif;">MediScan AI</h3>
                            <span class="mono" style="background: #eab308; color: #000; font-size: 10px; padding: 4px 8px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">INFERENCING</span>
                        </div>
                        <div style="padding: 30px; position: relative; background: #050505; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; z-index: 2;">
                                <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid #0ea5e9; padding: 15px;">
                                    <div class="mono" style="color: #94a3b8; font-size: 10px; font-family: 'JetBrains Mono', monospace;">GPU UTILIZATION</div>
                                    <div style="color: #0ea5e9; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">94% Opt</div>
                                </div>
                                <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid #a855f7; padding: 15px;">
                                    <div class="mono" style="color: #94a3b8; font-size: 10px; font-family: 'JetBrains Mono', monospace;">PROCESSING</div>
                                    <div style="color: #a855f7; font-size: 24px; font-weight: 900; margin-top: 5px; font-family: 'Inter', sans-serif;">1.4s/Scan</div>
                                </div>
                            </div>
                        </div>
                        <div style="padding: 20px; background: #0a0a0a;">
                            <p style="color: #94a3b8; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5; font-family: 'Inter', sans-serif;">
                                HIPAA-compliant tensor processing pipeline capable of analyzing 3D volumetric scans with millisecond routing latency.
                            </p>
                            <div style="display: flex; gap: 10px;">
                                <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">PyTorch</span>
                                <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px; font-family: 'JetBrains Mono', monospace;">AWS Health</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `;
        servicesSection.before(proofSectionHTML);
    }
}

fs.writeFileSync('index.html', $.html());
console.log('Layout bugs fixed and proof cards injected.');
