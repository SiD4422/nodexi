const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Adjust the transform value to push the text back to the right
$('style#nodexi-direct-shift').text((i, text) => {
    return text.replace(/transform: translateX\(-35vw\)/g, 'transform: translateX(-15vw)');
});

fs.writeFileSync('index.html', $.html());
console.log('Subtext moved to the right.');
