const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
let newHtml = html.replace(/Alien/g, 'Nodexi').replace(/ALIEN/g, 'NODEXI');
fs.writeFileSync('index.html', newHtml);
console.log('Name changed successfully.');
