const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const startStr = '<div class="stats-bar">';
const endStr = '<div class="divider"><hr></div>';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newStatsBar = `<div class="stats-bar">
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
  </div>\n\n`;

    content = content.substring(0, startIndex) + newStatsBar + content.substring(endIndex);
    fs.writeFileSync('index.html', content);
    console.log('Stats bar updated perfectly.');
} else {
    console.log('Could not find stats bar bounds.');
}
