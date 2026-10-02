const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/>PROCESS\s*<span class="arrow"/g, '>CAPABILITIES <span class="arrow"');
    content = content.replace(/>ABOUT\s*<span class="arrow"/g, '>THE FOUNDER <span class="arrow"');

    const openSourceLink = '<a href="https://github.com/SiD4422" target="_blank" class="full-link">OPEN SOURCE <span class="arrow">&#8599;</span></a>\n        ';
    
    if (content.includes('THE FOUNDER') && !content.includes('OPEN SOURCE')) {
        content = content.replace(/<a href="about\.html" class="full-link">THE FOUNDER/, openSourceLink + '<a href="about.html" class="full-link">THE FOUNDER');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        updatedCount++;
        console.log(`Updated menu in ${file}`);
    }
});

console.log(`Updated menus in ${updatedCount} files.`);
