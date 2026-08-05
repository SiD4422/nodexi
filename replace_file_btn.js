const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const buttonCss = `
/* From Uiverse.io by SpatexDEV - Adapted for File Label */ 
.custom-file-btn {
  border: none;
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  background-color: #488aec;
  color: #ffffff;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  vertical-align: middle;
  align-items: center;
  border-radius: 0.5rem;
  user-select: none;
  gap: 0.75rem;
  box-shadow:
    0 4px 6px -1px #488aec31,
    0 2px 4px -1px #488aec17;
  transition: all 0.6s ease;
}

.custom-file-btn:hover {
  box-shadow:
    0 10px 15px -3px #488aec4f,
    0 4px 6px -2px #488aec17;
}

.custom-file-btn:focus,
.custom-file-btn:active {
  opacity: 0.85;
  box-shadow: none;
}

.custom-file-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}
`;

if (!css.includes('.custom-file-btn')) {
  fs.writeFileSync(cssPath, css + '\n' + buttonCss);
}

const newAttachmentsHtml = `<!-- Row 5: Attachments -->
        <div class="booking-input-group" style="margin-top: 16px;">
          <label>Attachments (Optional)</label>
          <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px;">
            <label class="custom-file-btn">
              <input type="file" name="attachment" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.fig" style="display: none;" onchange="this.parentElement.nextElementSibling.textContent = this.files.length > 0 ? this.files[0].name : 'No file chosen'">
              <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-width="2" stroke="#ffffff" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke-linejoin="round" stroke-linecap="round"></path>
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M17 15V18M17 21V18M17 18H14M17 18H20"></path>
              </svg>
              ADD FILE
            </label>
            <span style="font-size: 13px; color: var(--gray-500); font-family: var(--mono);">No file chosen</span>
          </div>
        </div>`;

function updateFileBtn(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Match the Row 5 attachment block from the previous update
  const regex = /<!-- Row 5: Attachments -->[\s\S]*?(?=<!-- Submit button -->)/;
  if (regex.test(content)) {
    content = content.replace(regex, newAttachmentsHtml + '\n        \n        ');
    fs.writeFileSync(filePath, content);
    console.log('Updated file button in', filePath);
  } else {
    console.log('Attachment row not found in', filePath);
  }
}

updateFileBtn('index.html');
updateFileBtn('build-pages.js');
