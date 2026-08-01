const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Increase the font size of the Heavy-Duty text a bit
$('style#nodexi-targeted-fix-css').text((i, text) => {
    return text.replace(/clamp\(40px, 6vw, 90px\)/g, 'clamp(50px, 8vw, 110px)');
});

fs.writeFileSync('index.html', $.html());
console.log('Heavy-Duty size increased slightly.');
