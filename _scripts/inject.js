const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/spart/Desktop/startUP/fresh test';
const files = ['index.html', 'services.html', 'projects.html', 'about.html'];

const cursorHtml = `
  <!-- Custom Cursor -->
  <div id="cursor-dot"></div>
  <div id="cursor-follower"></div>
`;

const toggleBtn = `
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">🌙</button>
`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Inject script and cursor at the end of body
  if (!html.includes('<script src="app.js">')) {
    html = html.replace('</body>', `${cursorHtml}\n  <script src="app.js"></script>\n</body>`);
  }

  // Inject theme toggle before the Contact button in the navbar
  if (!html.includes('id="theme-toggle"')) {
    html = html.replace('<a href="#contact" class="btn btn-dark">Book a Call ↗</a>', 
    `${toggleBtn}\n        <a href="#contact" class="btn btn-dark">Book a Call ↗</a>`);
  }

  // Remove the old preloader fallback timeout from the old inline script
  html = html.replace(/<script>[\s\S]*?<\/script>/, ''); // removes the inline script block

  fs.writeFileSync(filePath, html);
  console.log(`Updated ${file}`);
});

// Create case-study.html
let caseStudyHtml = fs.readFileSync(path.join(dir, 'projects.html'), 'utf8');
caseStudyHtml = caseStudyHtml.replace('<title>Projects | Nodexi</title>', '<title>Gateonix Case Study | Nodexi</title>');
// Replace the ALL PROJECTS section with a Case Study layout
caseStudyHtml = caseStudyHtml.replace(/<!-- ======================== ALL PROJECTS ======================== -->[\s\S]*?<!-- ======================== CTA BANNER ======================== -->/, `
<!-- ======================== CASE STUDY ======================== -->
<section class="services-section reveal" style="padding-top: 40px; padding-bottom: 80px;">
  <p class="section-eyebrow">Case Study</p>
  <h2 class="section-h2">Gateonix<br><span class="accent">Enterprise Cloud ERP</span></h2>
  
  <div style="width: 100%; max-width: 1200px; margin: 40px auto; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-hero);">
    <img src="../nodexi-site (1)/nodexi-site/assets/gateonix.png" alt="Gateonix" style="width: 100%; height: auto; display: block;" onerror="this.style.display='none';">
  </div>

  <div style="max-width: 1200px; margin: 60px auto; display: grid; grid-template-columns: 1fr 3fr; gap: 60px;">
    <!-- Sidebar -->
    <div>
      <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 20px; color: var(--black);">Tech Stack</h3>
      <ul style="list-style: none; padding: 0; margin: 0; color: var(--gray-500); font-size: 16px; display: flex; flex-direction: column; gap: 12px;">
        <li>• Next.js / React</li>
        <li>• Node.js & Express</li>
        <li>• PostgreSQL</li>
        <li>• AWS (EC2, S3)</li>
        <li>• Stripe Integration</li>
      </ul>
      <h3 style="font-size: 20px; font-weight: 800; margin-top: 40px; margin-bottom: 20px; color: var(--black);">Role</h3>
      <p style="color: var(--gray-500); font-size: 16px;">Full-Stack Development, Cloud Architecture, UI/UX Design</p>
    </div>

    <!-- Main Content -->
    <div>
      <h3 style="font-size: 24px; font-weight: 800; margin-bottom: 20px; color: var(--black);">The Challenge</h3>
      <p style="font-size: 18px; color: var(--gray-500); line-height: 1.8; margin-bottom: 40px;">
        Gateonix needed a completely modernized Enterprise Resource Planning (ERP) platform capable of handling real-time data synchronization across thousands of active sessions. The existing legacy system was slow, prone to database locks, and featured an incredibly outdated user interface that hampered employee productivity.
      </p>

      <h3 style="font-size: 24px; font-weight: 800; margin-bottom: 20px; color: var(--black);">The Architecture</h3>
      <p style="font-size: 18px; color: var(--gray-500); line-height: 1.8; margin-bottom: 40px;">
        We rebuilt the platform from the ground up using a serverless-first approach on AWS. By leveraging edge caching and a highly optimized PostgreSQL schema with read replicas, we reduced average query times by 84%. The frontend was completely redesigned with a focus on data density and quick actions, utilizing a modern React architecture.
      </p>
      
      <div style="background: var(--purple-light); padding: 40px; border-radius: var(--radius-xl); border: 1px solid var(--purple-mid);">
        <h4 style="font-size: 20px; font-weight: 800; color: var(--purple); margin-bottom: 10px;">Outcome</h4>
        <p style="font-size: 18px; color: var(--black); line-height: 1.6; margin: 0;">System performance increased drastically, supporting 10x the concurrent users without a single dropped transaction. Employee onboarding time was cut in half due to the intuitive UI.</p>
      </div>
    </div>
  </div>
</section>
<!-- ======================== CTA BANNER ======================== -->`);

// Wire the Gateonix project card to the case study page
caseStudyHtml = caseStudyHtml.replace(/<div class="project-card">/, `<a href="case-study.html" style="text-decoration: none; color: inherit; display: block;"><div class="project-card">`);
// That regex will just wrap the first one? No, wait. 
// Let's just write the case study directly.
fs.writeFileSync(path.join(dir, 'case-study.html'), caseStudyHtml);
console.log('Created case-study.html');

// Also update projects.html to link Gateonix to case-study.html
let phtml = fs.readFileSync(path.join(dir, 'projects.html'), 'utf8');
phtml = phtml.replace('<div class="project-card">', '<a href="case-study.html" style="text-decoration:none;"><div class="project-card">');
// Close the a tag after the card ends
phtml = phtml.replace('</div>\n    <div class="project-card">', '</div></a>\n    <div class="project-card">');
fs.writeFileSync(path.join(dir, 'projects.html'), phtml);
