const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Increase the nudge for Heavy-Duty to the left
$('style#nodexi-targeted-fix-css').text((i, text) => {
    return text.replace(/transform: translateX\(-20px\);/g, 'transform: translateX(-50px);');
});

fs.writeFileSync('index.html', $.html());
console.log('Heavy-Duty nudged further left.');
