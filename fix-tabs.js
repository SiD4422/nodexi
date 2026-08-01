const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/spart/Desktop/startUP/fresh test';
const files = ['index.html', 'services.html', 'projects.html', 'about.html', 'case-study.html'];

const toggleBtn = `<button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode" style="margin-right: 15px; cursor: pointer;">🌙</button>`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Inject Theme Toggle in Navbar if missing
  if (!html.includes('id="theme-toggle"')) {
    // Look for <div class="nav-right">
    const navRightTarget = `<div class="nav-right">`;
    if (html.includes(navRightTarget)) {
      html = html.replace(navRightTarget, `${navRightTarget}\n    ${toggleBtn}`);
    }
  }

  // 2. Active Tab State Highlighting
  // Reset all active states first
  html = html.replace(/class="active-tab"/g, '');
  
  // Highlight the current tab
  if (file === 'services.html') {
    html = html.replace('<a href="services.html">Services</a>', '<a href="services.html" class="active-tab">Services</a>');
  } else if (file === 'projects.html') {
    html = html.replace('<a href="projects.html">Projects</a>', '<a href="projects.html" class="active-tab">Projects</a>');
  } else if (file === 'about.html') {
    html = html.replace('<a href="about.html">About</a>', '<a href="about.html" class="active-tab">About</a>');
  } else if (file === 'index.html') {
    // If it's index, nothing is highlighted in the center links, or maybe add active to something else.
  }

  fs.writeFileSync(filePath, html);
  console.log(`Updated ${file}`);
});
