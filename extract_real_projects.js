const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const srcDir = 'C:/Users/spart/Desktop/startUP/nodexi-site (1)/nodexi-site';
const files = ['project-gateonix.html', 'project-logic-simulator.html', 'project-digital-lab.html'];

console.log("Nodexi Authentic Projects:");
files.forEach(file => {
    try {
        const html = fs.readFileSync(path.join(srcDir, file), 'utf8');
        const $ = cheerio.load(html);
        
        // Find the main project title (usually an h1 or h2 at the top)
        const title = $('h1').first().text().trim() || $('h2').first().text().trim();
        
        // Find the main description (usually the first large p tag)
        const desc = $('p').first().text().trim();
        
        console.log(`\nProject File: ${file}`);
        console.log(`Title: ${title}`);
        console.log(`Desc: ${desc}`);
    } catch(e) {
        console.log(`Error reading ${file}`);
    }
});
