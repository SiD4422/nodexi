const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Increase the right offset to move the text further to the left
$('style#nodexi-absolute-para-fix').text((i, text) => {
    return text.replace(/right: 15vw !important;/g, 'right: 25vw !important;');
});

fs.writeFileSync('index.html', $.html());
console.log('Text moved further left.');
