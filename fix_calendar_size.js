const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Reduce padding and border-radius on the calendar container
css = css.replace(/\.dark-calendar \{\s*background: #ffffff;\s*border-radius: 24px;\s*padding: 24px;/g, '.dark-calendar {\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 16px;');

// 2. Reduce dc-header margin
css = css.replace(/\.dc-header \{\s*display: flex;\s*justify-content: space-between;\s*align-items: center;\s*margin-bottom: 24px;/g, '.dc-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;');

// 3. Fix the massive grid gaps
css = css.replace(/\.dc-grid \{\s*display: grid;\s*grid-template-columns: repeat\(7, 1fr\);\s*gap: 8px 4px;\s*\}/g, '.dc-grid {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n}');

// 4. Fix the massive size of the days (remove aspect-ratio)
css = css.replace(/\.dc-day \{\s*aspect-ratio: 1;/g, '.dc-day {\n  width: 36px;\n  height: 36px;\n  margin: 0 auto;');

// 5. Shrink weekdays margin
css = css.replace(/\.dc-weekdays \{([\s\S]*?)margin-bottom: 16px;/g, '.dc-weekdays {$1margin-bottom: 8px;');

fs.writeFileSync(cssPath, css);
console.log('Fixed calendar size in style.css');
