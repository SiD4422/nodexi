const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Update CSS rules for a white calendar
css = css.replace(/\.dark-calendar \{\s*background: #1e1e1e;/g, '.dark-calendar {\n  background: #ffffff;');
css = css.replace(/border: 1px solid rgba\(255,255,255,0\.05\);/g, 'border: 1px solid var(--gray-200);');
css = css.replace(/\.dc-header \{\s*(display: flex;[\s\S]*?color:) #fff;/g, '.dc-header {\n  $1 var(--black);');
css = css.replace(/\.dc-nav \{\s*(background:) rgba\(255,255,255,0\.05\);\s*(border:) 1px solid rgba\(255,255,255,0\.1\);([\s\S]*?color:) #fff;/g, '.dc-nav {\n  $1 #fff;\n  $2 1px solid var(--gray-200);\n$3 var(--black);');
css = css.replace(/\.dc-nav:hover \{\s*background: rgba\(255,255,255,0\.15\);/g, '.dc-nav:hover {\n  background: var(--cream);');
css = css.replace(/\.dc-day \{\s*(aspect-ratio: 1;[\s\S]*?color:) #ddd;/g, '.dc-day {\n  $1 var(--black);');
css = css.replace(/\.dc-day\.faded \{\s*color: #444;/g, '.dc-day.faded {\n  color: var(--gray-400);');
css = css.replace(/\.dc-day:not\(\.faded\):not\(\.active\):hover \{\s*background: rgba\(255,255,255,0\.1\);/g, '.dc-day:not(.faded):not(.active):hover {\n  background: rgba(139, 92, 246, 0.05);\n  color: var(--purple);');
css = css.replace(/\.dc-weekdays \{([\s\S]*?)color: #666;/g, '.dc-weekdays {$1color: var(--gray-500);');

fs.writeFileSync(cssPath, css);
console.log('Updated calendar to white background in style.css');
