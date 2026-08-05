const fs = require('fs');
let code = fs.readFileSync('build-pages.js', 'utf8');

// First add theme: 'light' to kaash
code = code.replace(`slug: 'kaash',`, `theme: 'light',\n    slug: 'kaash',`);

const newBuildCaseStudyBody = `const buildCaseStudyBody = (p, nextProject) => {
  const isLight = p.theme === 'light';
  const bgColor = isLight ? '#f9f9fb' : '#050505';
  const textColor = isLight ? '#111111' : '#ffffff';
  const textMuted = isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)';
  const textSubtle = isLight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
  const borderSubtle = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
  const borderFaint = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  const glassBg = isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)';
  const navBg = isLight ? 'rgba(249,249,251,0.5)' : 'rgba(5,5,5,0.5)';
  
  return \`
<!-- Custom CSS for Case Study -->
<style>
  body {
    background-color: \${bgColor} !important;
    color: \${textColor};
    overflow-x: hidden;
  }
  /* Navbar adjustments for page */
  #navbar {
    background: \${navBg} !important;
    backdrop-filter: blur(24px) !important;
    border-bottom: 1px solid \${borderFaint};
  }
  #navbar .nav-logo { color: \${textColor} !important; }
  #btn-book-call { color: \${textColor} !important; border-color: \${borderSubtle} !important; }
  #btn-contact { background: \${textColor} !important; color: \${bgColor} !important; border-color: \${textColor} !important; }
  #menu-btn { color: \${textColor} !important; }
  #menu-btn span { background: \${textColor} !important; }
  
  /* Initial load animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-up {
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  .delay-1 { animation-delay: 0.1s; }

  /* Animated Gradient Text */
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .text-gradient {
    background: linear-gradient(90deg, \${textColor} 0%, \${textSubtle} 25%, \${textColor} 50%, \${textSubtle} 75%, \${textColor} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 8s linear infinite;
  }
  
  /* Glass Card */
  .glass-card {
    background: \${glassBg};
    border: 1px solid \${borderFaint};
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 40px;
  }
</style>

<!-- Hero Section -->
<section style="position: relative; min-height: 100vh; display: flex; align-items: center; padding: 160px 5% 80px; overflow: hidden;">
  <div style="position: absolute; top: -10%; left: -10%; width: clamp(400px, 40vw, 800px); height: clamp(400px, 40vw, 800px); background: \${p.colors[1] || 'var(--purple)'}; filter: blur(120px); opacity: 0.08; border-radius: 50%; z-index: 0; pointer-events: none;"></div>
  <div style="position: absolute; bottom: 0%; right: -5%; width: clamp(300px, 30vw, 600px); height: clamp(300px, 30vw, 600px); background: \${p.colors[2] || 'var(--blue)'}; filter: blur(120px); opacity: 0.08; border-radius: 50%; z-index: 0; pointer-events: none;"></div>

  <div style="max-width: var(--max); margin: 0 auto; width: 100%; position: relative; z-index: 1;">
    
    <!-- Meta -->
    <div class="animate-fade-up" style="display: flex; gap: 16px; align-items: center; font-family: var(--mono); font-size: 14px; text-transform: uppercase; letter-spacing: 3px; color: \${textSubtle}; margin-bottom: 40px;">
      <span style="color: \${textColor}; font-weight: 600;">\${p.title}</span> 
      <span style="width: 40px; height: 1px; background: \${borderSubtle};"></span>
      <span>\${p.year}</span>
    </div>

    <!-- Massive Shimmering Headline -->
    <div class="animate-fade-up delay-1">
      <h1 class="text-gradient" style="font-size: clamp(48px, 8vw, 110px); font-weight: 900; line-height: 0.9; letter-spacing: -0.03em; max-width: 1100px; margin-bottom: 60px; text-wrap: balance;">
        \${p.headline}
      </h1>
    </div>

    <!-- 2 Column Layout (Description + Focus) -->
    <div class="reveal" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px; border-top: 1px solid \${borderSubtle}; padding-top: 60px; margin-bottom: 80px;">
      <!-- Left: Description -->
      <div>
        <p style="font-size: 20px; color: \${textMuted}; line-height: 1.6; font-weight: 300;">
          \${p.desc}
        </p>
      </div>
      
      <!-- Right: Project Focus -->
      <div>
        <h4 style="font-size: 12px; font-family: var(--mono); font-weight: 600; color: \${textSubtle}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px;">Project Focus</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          \${p.focus.map(tag => \`<span style="font-size: 12px; font-weight: 600; color: \${textColor}; background: \${borderFaint}; border: 1px solid \${borderSubtle}; border-radius: 999px; padding: 10px 24px; text-transform: uppercase; letter-spacing: 1px; backdrop-filter: blur(10px); transition: all 0.3s ease;" onmouseover="this.style.background='\${textColor}'; this.style.color='\${bgColor}'" onmouseout="this.style.background='\${borderFaint}'; this.style.color='\${textColor}'">\${tag}</span>\`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Immersive Project Showcase -->
<section style="max-width: 1400px; margin: 0 auto 160px; padding: 0 5%; position: relative; z-index: 2;">
  <div class="reveal" style="width: 100%; border-radius: 32px; overflow: hidden; background: \${p.bg}; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.5); border: 1px solid \${borderFaint};">
     <!-- Subtle inner glow -->
     <div style="position: absolute; inset: 0; box-shadow: inset 0 0 100px \${borderFaint}; pointer-events: none; z-index: 2;"></div>
     
     <img src="\${p.img}" alt="\${p.title}" style="width: 100%; height: auto; display: block; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
  </div>
</section>

<!-- Deep Dive (Styles & Colors) -->
<section style="max-width: var(--max); margin: 0 auto 160px; padding: 0 5%;">
  <div class="glass-card reveal" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 80px;">
    
    <div>
      <h3 style="font-size: 28px; font-weight: 800; color: \${textColor}; margin-bottom: 24px; letter-spacing: -0.02em;">Design Language</h3>
      <p style="font-size: 16px; color: \${textMuted}; line-height: 1.8; font-weight: 300;">
        \${p.stylesDesc}
      </p>
    </div>

    <div>
      <h3 style="font-size: 28px; font-weight: 800; color: \${textColor}; margin-bottom: 32px; letter-spacing: -0.02em;">Color Palette</h3>
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        \${p.colors.map(color => \`
          <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; cursor: pointer;" onclick="navigator.clipboard.writeText('\${color}'); alert('Copied \${color} to clipboard!');">
            <div style="width: 80px; height: 80px; border-radius: 24px; background: \${color}; box-shadow: 0 10px 30px \${color}40, inset 0 0 0 1px \${borderSubtle}; transform: rotate(-5deg); transition: transform 0.4s ease;" onmouseover="this.style.transform='rotate(0deg) scale(1.1)'" onmouseout="this.style.transform='rotate(-5deg) scale(1)'"></div>
            <span style="font-size: 12px; font-family: var(--mono); color: \${textSubtle}; text-transform: uppercase; letter-spacing: 2px;">\${color}</span>
          </div>
        \`).join('')}
      </div>
    </div>

  </div>
</section>

\${p.link !== '#' ? \`
<section style="text-align: center; margin-bottom: 160px; position: relative; z-index: 2;">
  <a href="\${p.link}" target="_blank" class="btn reveal" style="background: \${textColor}; color: \${bgColor}; font-size: 16px; font-weight: 800; padding: 24px 56px; border-radius: 999px; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; display: inline-flex; align-items: center; gap: 16px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 20px 40px \${borderSubtle};" onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 30px 60px \${borderSubtle}'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 20px 40px \${borderSubtle}'">
    Explore Live Platform 
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>
</section>
\` : ''}

<!-- Next Project Footer -->
<a href="work-\${nextProject.slug}.html" class="reveal" style="display: block; width: 100%; padding: 120px 5%; text-align: center; background: \${glassBg}; border-top: 1px solid \${borderFaint}; text-decoration: none; transition: background 0.4s ease;" onmouseover="this.style.background='\${borderFaint}'" onmouseout="this.style.background='\${glassBg}'">
  <p style="font-size: 14px; font-family: var(--mono); color: \${textSubtle}; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 24px;">Next Case Study</p>
  <h2 style="font-size: clamp(40px, 6vw, 80px); font-weight: 900; color: \${textColor}; letter-spacing: -0.02em; margin: 0;">\${nextProject.title} &rarr;</h2>
</a>

\`;
};`;

const regex = /const buildCaseStudyBody = \(p, nextProject\) => `[\s\S]*?`;\r?\n/;
code = code.replace(regex, newBuildCaseStudyBody + '\n');
fs.writeFileSync('build-pages.js', code);
console.log('Done!');
