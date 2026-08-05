const fs = require('fs');

function updateFormspree(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('https://formspree.io/f/hello')) {
    content = content.replace(/https:\/\/formspree\.io\/f\/hello/g, 'https://formspree.io/f/xbgrjzza');
    fs.writeFileSync(filePath, content);
    console.log('Updated Formspree URL in', filePath);
  } else {
    console.log('Placeholder URL not found in', filePath);
  }
}

updateFormspree('index.html');
updateFormspree('build-pages.js');
