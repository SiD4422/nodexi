const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the color in .custom-file-btn to use !important
css = css.replace(/\.custom-file-btn\s*{[^}]*?color:\s*#ffffff;[^}]*?}/, (match) => {
  return match.replace('color: #ffffff;', 'color: #ffffff !important;');
});

// Just to be safe, if the regex didn't match, let's explicitly append it
if (!css.includes('color: #ffffff !important;')) {
  css += '\n.booking-input-group label.custom-file-btn { color: #ffffff; }\n';
}

fs.writeFileSync(cssPath, css);
console.log('Fixed button text color');
