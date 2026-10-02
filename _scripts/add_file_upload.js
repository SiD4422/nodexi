const fs = require('fs');

// 1. Update style.css to style the file input
const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const fileCss = `
.booking-input-group input[type="file"] {
  padding: 12px 16px;
  font-size: 14px;
}
.booking-input-group input[type="file"]::file-selector-button {
  background: var(--gray-100);
  border: 1px solid var(--gray-200);
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--black);
  cursor: pointer;
  font-weight: 600;
  margin-right: 16px;
  transition: all 0.3s ease;
}
.booking-input-group input[type="file"]::file-selector-button:hover {
  background: var(--gray-200);
}
`;

if (!css.includes('::file-selector-button')) {
  fs.writeFileSync(cssPath, css + '\n' + fileCss);
}

// 2. Update build-pages.js
const jsPath = 'build-pages.js';
let js = fs.readFileSync(jsPath, 'utf8');

let newForm = js.replace(
  '<form class="booking-form" id="booking-form" action="https://formspree.io/f/hello" method="POST">',
  '<form class="booking-form" id="booking-form" action="https://formspree.io/f/hello" method="POST" enctype="multipart/form-data">'
);

const fileInputHtml = `        <div class="booking-input-group">
          <label>Attach File (Optional)</label>
          <input type="file" name="attachment" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.fig">
        </div>
        
        <button type="submit"`;

newForm = newForm.replace('        <button type="submit"', fileInputHtml);
fs.writeFileSync(jsPath, newForm);

// 3. Update index.html
const indexPath = 'index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

let newIndex = indexHtml.replace(
  '<form class="booking-form" id="booking-form" action="https://formspree.io/f/hello" method="POST">',
  '<form class="booking-form" id="booking-form" action="https://formspree.io/f/hello" method="POST" enctype="multipart/form-data">'
);

newIndex = newIndex.replace('        <button type="submit"', fileInputHtml);
fs.writeFileSync(indexPath, newIndex);

console.log('Added file upload option successfully!');
