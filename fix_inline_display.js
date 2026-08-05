const fs = require('fs');

function fixInlineDisplay(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('style="padding: 0; display: none;"')) {
    content = content.replace(/style="padding: 0; display: none;"/g, 'style="padding: 0;"');
    fs.writeFileSync(filePath, content);
    console.log('Fixed inline display in', filePath);
  } else {
    console.log('Target string not found in', filePath);
  }
}

fixInlineDisplay('index.html');
fixInlineDisplay('build-pages.js');
