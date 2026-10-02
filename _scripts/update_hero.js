const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const newHero = `    <h1 class="monks-headline reveal">
      <span class="line">FULL-STACK</span>
      <span class="line">& <span class="accent-glow hover-stroke">HARDWARE.</span></span>
    </h1>
    
    <div class="monks-hero-bottom reveal">
      <div class="monks-subtext">
        <p>We build interactive circuit simulators, real-time telemetry, and highly scalable web applications.</p>
      </div>
    </div>`;

// Regex to replace the hero text
content = content.replace(/<h1 class="monks-headline reveal">[\s\S]*?<\/div>\s*<\/div>/, newHero);

fs.writeFileSync('index.html', content);
console.log('Hero copy updated.');
