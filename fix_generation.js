const fs = require('fs');

function fixCondition(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const badCondition = "if (datesContainer.innerHTML.trim() !== '') return; // Already generated";
  const goodCondition = "if (datesContainer.children.length > 0) return; // Already generated";
  
  if (content.includes(badCondition)) {
    content = content.replace(badCondition, goodCondition);
    fs.writeFileSync(filePath, content);
    console.log('Fixed generation condition in', filePath);
  } else {
    console.log('Condition not found in', filePath);
  }
}

fixCondition('index.html');
fixCondition('build-pages.js');
