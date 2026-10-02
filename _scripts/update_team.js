const fs = require('fs');
let code = fs.readFileSync('build-pages.js', 'utf8');

// Replace Aryan Sharma in the Our Mission section
code = code.replace(
  /<div style="font-size: 16px; font-weight: 800; color: #fff;">Aryan Sharma<\/div>\s*<div style="font-size: 13px; color: rgba\(255,255,255,0\.5\); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Founder & Lead Engineer<\/div>/,
  '<div style="font-size: 16px; font-weight: 800; color: #fff;">[Your Name]</div>\n        <div style="font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Founder & Lead Engineer</div>'
);
code = code.replace(
  />A<\/div>/,
  '>👤</div>'
);

// Replace Bento Grid Team section
const bentoRegex = /<!-- Bento Team Grid -->[\s\S]*?(?=<!-- VALUES MANIFESTO STRIP -->)/;

const newTeamGrid = `<!-- Bento Team Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    
    <!-- FOUNDER (You) -->
    <div style="background: var(--black); border-radius: 32px; padding: 48px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 480px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #1a0533 0%, #2d0b5e 50%, #7B5CF5 100%); opacity: 0.9;"></div>
      <div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: rgba(123,92,245,0.3); border-radius: 50%; filter: blur(60px);"></div>
      <div style="position: relative; z-index: 2;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 24px;">👤</div>
        <div style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em;">[Your Name]</div>
        <div style="font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Founder & Lead Engineer</div>
        <p style="font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.7;">Full-stack engineer and systems architect. Deep background in distributed systems, AI pipelines, and building scalable platforms.</p>
        <div style="display: flex; gap: 8px; margin-top: 24px; flex-wrap: wrap;">
          \${['React','Node.js','TypeScript','Next.js'].map(t => \`<span style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15);">\${t}</span>\`).join('')}
        </div>
      </div>
    </div>
    
    <!-- CO-FOUNDER (Friend) -->
    <div style="background: var(--black); border-radius: 32px; padding: 48px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 480px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #38bdf8 100%); opacity: 0.9;"></div>
      <div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: rgba(56,189,248,0.3); border-radius: 50%; filter: blur(60px);"></div>
      <div style="position: relative; z-index: 2;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 24px;">👤</div>
        <div style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em;">[Friend's Name]</div>
        <div style="font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Co-Founder</div>
        <p style="font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.7;">Creative problem solver and operations lead. Focused on delivering perfect user experiences and scaling the business.</p>
        <div style="display: flex; gap: 8px; margin-top: 24px; flex-wrap: wrap;">
          \${['Design','UI/UX','Product','Operations'].map(t => \`<span style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15);">\${t}</span>\`).join('')}
        </div>
      </div>
    </div>

    <!-- BOTTOM WIDE: VALUES TEASER -->
    <div style="grid-column: span 2; background: linear-gradient(135deg, #f0ebff 0%, var(--purple-light) 100%); border: 1px solid rgba(123,92,245,0.2); border-radius: 32px; padding: 40px; display: flex; align-items: center; gap: 40px;">
      <div style="font-size: 64px;">🌍</div>
      <div>
        <div style="font-size: 22px; font-weight: 900; color: var(--black); margin-bottom: 8px;">Operating Globally</div>
        <p style="font-size: 15px; color: var(--gray-500); line-height: 1.7; max-width: 500px;">Clients across India, USA, Canada, UAE, and Southeast Asia. We work async, across timezones, with no drop in communication quality.</p>
      </div>
      <div style="margin-left: auto; display: flex; gap: 24px; flex-shrink: 0;">
        \${['🇮🇳','🇺🇸','🇨🇦','🇦🇪'].map(flag => \`<div style="font-size: 36px;">\${flag}</div>\`).join('')}
      </div>
    </div>
    
  </div>
</section>

`;

code = code.replace(bentoRegex, newTeamGrid);
fs.writeFileSync('build-pages.js', code);
