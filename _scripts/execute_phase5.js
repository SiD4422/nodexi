const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// ==========================================
// PHASE 5: INTERACTIVE PROOF CARDS
// ==========================================
// Find the showcase grid where the projects live
const projectGrid = $('.showcase-grid').first();

if (projectGrid.length > 0) {
    projectGrid.empty(); // Clear out the generic agency cards
    
    // Set grid to a nice CSS grid for the proof cards
    projectGrid.attr('style', 'display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px; width: 100%;');
    
    // Inject custom B2B Proof Cards
    const proofCard1 = `
        <div class="nodexi-proof-card" style="background: #0a0a0a; border: 1px solid #334155; position: relative; overflow: hidden; display: flex; flex-direction: column;">
            
            <div style="padding: 20px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; background: #111;">
                <h3 style="margin: 0; font-size: 18px; color: #f8fafc; font-weight: 700;">MultiSym Live Infrastructure</h3>
                <span class="mono" style="background: #0ea5e9; color: #fff; font-size: 10px; padding: 4px 8px; font-weight: 700;">PROD - HEALTHY</span>
            </div>
            
            <div style="padding: 30px; position: relative; background: #050505; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <!-- Abstract Technical Visual / Wireframe -->
                <div style="width: 100%; height: 1px; background: #334155; position: absolute; top: 50%;"></div>
                <div style="height: 100%; width: 1px; background: #334155; position: absolute; left: 50%;"></div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; z-index: 2;">
                    <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid #0ea5e9; padding: 15px;">
                        <div class="mono" style="color: #94a3b8; font-size: 10px;">CONCURRENT CONNS</div>
                        <div style="color: #0ea5e9; font-size: 24px; font-weight: 900; margin-top: 5px;">1.2M+</div>
                    </div>
                    <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; padding: 15px;">
                        <div class="mono" style="color: #94a3b8; font-size: 10px;">p99 LATENCY</div>
                        <div style="color: #22c55e; font-size: 24px; font-weight: 900; margin-top: 5px;">&lt; 14ms</div>
                    </div>
                </div>
            </div>
            
            <div style="padding: 20px; background: #0a0a0a;">
                <p style="color: #94a3b8; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">
                    Distributed WebSocket architecture built on Go and Redis Cluster to handle real-time simulation state across global regions.
                </p>
                <div style="display: flex; gap: 10px;">
                    <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px;">Golang</span>
                    <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px;">Redis</span>
                    <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px;">K8s</span>
                </div>
            </div>
            
        </div>
    `;

    const proofCard2 = `
        <div class="nodexi-proof-card" style="background: #0a0a0a; border: 1px solid #334155; position: relative; overflow: hidden; display: flex; flex-direction: column;">
            
            <div style="padding: 20px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; background: #111;">
                <h3 style="margin: 0; font-size: 18px; color: #f8fafc; font-weight: 700;">MediScan AI Diagnostic Pipeline</h3>
                <span class="mono" style="background: #eab308; color: #000; font-size: 10px; padding: 4px 8px; font-weight: 700;">v2.4 - INFERENCING</span>
            </div>
            
            <div style="padding: 30px; position: relative; background: #050505; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; z-index: 2;">
                    <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid #0ea5e9; padding: 15px;">
                        <div class="mono" style="color: #94a3b8; font-size: 10px;">GPU UTILIZATION</div>
                        <div style="color: #0ea5e9; font-size: 24px; font-weight: 900; margin-top: 5px;">94% Optimized</div>
                    </div>
                    <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid #a855f7; padding: 15px;">
                        <div class="mono" style="color: #94a3b8; font-size: 10px;">DICOM PROCESSING</div>
                        <div style="color: #a855f7; font-size: 24px; font-weight: 900; margin-top: 5px;">1.4s / Scan</div>
                    </div>
                </div>
            </div>
            
            <div style="padding: 20px; background: #0a0a0a;">
                <p style="color: #94a3b8; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">
                    HIPAA-compliant tensor processing pipeline capable of analyzing 3D volumetric scans with millisecond routing latency.
                </p>
                <div style="display: flex; gap: 10px;">
                    <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px;">PyTorch</span>
                    <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px;">TensorRT</span>
                    <span class="mono" style="font-size: 11px; color: #64748b; border: 1px solid #334155; padding: 4px 8px;">AWS HealthLake</span>
                </div>
            </div>
            
        </div>
    `;

    projectGrid.append(proofCard1);
    projectGrid.append(proofCard2);
}

fs.writeFileSync('index.html', $.html());
console.log('Phase 5 completed successfully.');
