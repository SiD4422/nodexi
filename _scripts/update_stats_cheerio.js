const fs = require('fs');
const cheerio = require('cheerio');

let content = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(content);

const newStatsBar = `
  <div class="stats-bar">
    <div class="stats-inner">
      <div class="stat-item">
        <div class="stat-icon">📡</div>
        <div>
          <div class="stat-num">Real-Time</div>
          <div class="stat-label">Hardware Telemetry</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">⚙️</div>
        <div>
          <div class="stat-num">10+ Systems</div>
          <div class="stat-label">Shipped & Deployed</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">☁️</div>
        <div>
          <div class="stat-num">Full-Stack</div>
          <div class="stat-label">Hardware-to-Cloud Integration</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🔬</div>
        <div>
          <div class="stat-num">NodeSim</div>
          <div class="stat-label">Complex Interactive Simulators</div>
        </div>
      </div>
    </div>
  </div>
`;

$('.stats-bar').replaceWith(newStatsBar);

// Cheerio adds html, head, body tags if we use load(), let's make sure we only write what we need, or we can just run a safe regex now that we know exactly how the HTML looks.
// Let's actually just read the original file and do a substring replace.
