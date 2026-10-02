const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove specific links from the first column
    content = content.replace(/<a href="insights\.html".*?>INSIGHTS.*?<\/a>\s*/g, '');
    content = content.replace(/<a href="seo\.html".*?>SEO.*?<\/a>\s*/g, '');

    // Remove the entire second menu-col completely
    // It starts with <div class="menu-col"> and ends with </div> just before </div>\n</aside>
    // We can use a regex to match the second menu-col.
    // The first menu-col contains the "MENU" label.
    // The second contains "WEBFLOW WEBSITE SOLUTIONS" or "DESIGN SERVICES".
    
    const regexSecondCol = /<div class="menu-col">\s*<div class="menu-label">.*?WEBFLOW WEBSITE SOLUTIONS[\s\S]*?<\/nav>\s*<\/div>/;
    content = content.replace(regexSecondCol, '');

    // Sometimes they don't have the span perfectly matched, let's just make it robust
    content = content.replace(/<div class="menu-col">[\s\S]*?WEBFLOW WEBSITE SOLUTIONS[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/aside>)/, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        updatedCount++;
        console.log(`Cleaned menu in ${file}`);
    }
});

console.log(`Cleaned menus in ${updatedCount} files.`);
