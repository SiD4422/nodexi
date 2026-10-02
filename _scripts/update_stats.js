const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const newStatsBar = `  <div class="stats-bar">
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
  </div>`;

// Regex to replace the entire stats-bar div and its children
content = content.replace(/<div class="stats-bar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newStatsBar);

fs.writeFileSync('index.html', content);
console.log('Stats bar updated.');
