const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the existing .booking-modal-content definition
const oldCssRegex = /\.booking-modal-content\s*{[\s\S]*?}/;

const newCss = `.booking-modal-content {
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--cream);
  border-radius: 24px;
  padding: 48px;
  transform: translateY(40px) scale(0.95);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--gray-200);
}`;

if (oldCssRegex.test(css)) {
  css = css.replace(oldCssRegex, newCss);
  fs.writeFileSync(cssPath, css);
  console.log('Fixed modal overflow in style.css');
} else {
  console.log('Could not find .booking-modal-content in style.css');
}
