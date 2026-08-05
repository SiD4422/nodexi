const fs = require('fs');

function updateNames(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('[Your Name]')) {
    content = content.replace(/\[Your Name\]/g, 'Siddharth Kumar');
    changed = true;
  }
  
  if (content.includes("[Friend's Name]")) {
    content = content.replace(/\[Friend's Name\]/g, 'Aduat Chauhan');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Updated names in', filePath);
  }
}

updateNames('about.html');
updateNames('build-pages.js');
