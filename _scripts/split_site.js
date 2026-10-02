const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/spart/Desktop/startUP/fresh test';
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// 1. Remove the huge <style> block and replace with <link rel='stylesheet' href='style.css'>
html = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="style.css" />');

// 2. Update navigation links in the html string
html = html.replace(/href="#services"/g, 'href="services.html"');
html = html.replace(/href="#projects"/g, 'href="projects.html"');
html = html.replace(/href="#about"/g, 'href="about.html"');
// Make logo point to home
html = html.replace(/<a href="#" class="navbar-logo">/g, '<a href="index.html" class="navbar-logo">');
html = html.replace(/<div class="nav-logo">Nodexi<\/div>/g, '<a href="index.html" class="nav-logo" style="text-decoration:none;">Nodexi</a>');

// We need to extract the parts.
// We can find the sections using regex.
const headTop = html.split('<!-- ======================== NAVBAR ======================== -->')[0];
const nav = '<!-- ======================== NAVBAR ======================== -->\n' + html.split('<!-- ======================== NAVBAR ======================== -->')[1].split('<!-- ======================== HERO ======================== -->')[0];
const footerAndScripts = '<!-- ======================== FOOTER ======================== -->\n' + html.split('<!-- ======================== FOOTER ======================== -->')[1];

// Extract sections
const getSection = (startMarker, endMarker) => {
  const parts = html.split(startMarker);
  if (parts.length < 2) return '';
  const content = parts[1].split(endMarker)[0];
  return startMarker + content;
};

const hero = getSection('<!-- ======================== HERO ======================== -->', '<!-- ======================== SERVICES ======================== -->');
const services = getSection('<!-- ======================== SERVICES ======================== -->', '<!-- ======================== FEATURED WORK ======================== -->');
const featuredWork = getSection('<!-- ======================== FEATURED WORK ======================== -->', '<!-- ======================== ALL PROJECTS ======================== -->');
const allProjects = getSection('<!-- ======================== ALL PROJECTS ======================== -->', '<!-- ======================== CTA BANNER ======================== -->');
const cta = getSection('<!-- ======================== CTA BANNER ======================== -->', '<!-- ======================== FOOTER ======================== -->');

// Build Home Page (index.html)
const indexHtml = headTop + nav + hero + featuredWork + cta + footerAndScripts;
fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);

// Build Services Page
const servicesHtml = headTop.replace('<title>Nodexi — We Build Software That Drives Impact</title>', '<title>Services | Nodexi</title>') + 
  nav + 
  '\n<div style="padding-top:100px;"></div>\n' + 
  '<!-- ======================== SERVICES ======================== -->\n' + services + cta + footerAndScripts;
fs.writeFileSync(path.join(dir, 'services.html'), servicesHtml);

// Build Projects Page
const projectsHtml = headTop.replace('<title>Nodexi — We Build Software That Drives Impact</title>', '<title>Projects | Nodexi</title>') + 
  nav + 
  '\n<div style="padding-top:100px;"></div>\n' + 
  '<!-- ======================== ALL PROJECTS ======================== -->\n' + allProjects + cta + footerAndScripts;
fs.writeFileSync(path.join(dir, 'projects.html'), projectsHtml);

// Build About Page (Adding a simple about section since we didn't have a dedicated one in this new design yet)
const aboutContent = `
<!-- ======================== ABOUT ======================== -->
<section class="services-section reveal" id="about" style="min-height: 50vh;">
  <p class="section-eyebrow">About Us</p>
  <h2 class="section-h2">Trusted process designed to<br>deliver great results.</h2>
  <div style="max-width: 800px; margin: 0 auto; font-size: 18px; color: var(--gray-500); line-height: 1.8; text-align: center;">
    <p style="margin-bottom: 24px;">Our agile and adaptable process is tailored to launch new businesses swiftly and scale existing ones to the next level. We combine deep engineering expertise with a relentless focus on performance, reliability, and design excellence.</p>
    <p>From AI research pipelines to custom PCB hardware, we build systems that are engineered to last — robust architectures, clean codebases, and immutable security standards.</p>
  </div>
</section>
`;
const aboutHtml = headTop.replace('<title>Nodexi — We Build Software That Drives Impact</title>', '<title>About | Nodexi</title>') + 
  nav + 
  '\n<div style="padding-top:100px;"></div>\n' + 
  aboutContent + cta + footerAndScripts;
fs.writeFileSync(path.join(dir, 'about.html'), aboutHtml);

console.log('Site split successfully into multiple pages!');
