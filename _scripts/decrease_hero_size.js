const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Decrease the font size of the hero titles further
$('style#nodexi-hero-fix-css').text((i, text) => {
    // Replace the old clamp value with a smaller one
    return text.replace(/clamp\(50px, 7vw, 110px\)/g, 'clamp(40px, 5vw, 80px)');
});

// Also reduce the size of the pill chat boxes to match the smaller text
$('style#nodexi-hero-fix-css').text((i, text) => {
    return text.replace(/height: 100px !important;/g, 'height: 70px !important;');
});

$('style#nodexi-hero-fix-css').text((i, text) => {
    return text.replace(/font-size: 50px !important;/g, 'font-size: 36px !important;');
});

fs.writeFileSync('index.html', $.html());
console.log('Hero text size decreased.');
