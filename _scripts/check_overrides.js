const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

let hasOverrides = false;
$('style').each((i, el) => {
    if ($(el).html().includes('border-radius: 2px !important')) {
        hasOverrides = true;
    }
});

console.log('Still has overrides:', hasOverrides);
