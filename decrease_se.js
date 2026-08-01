const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the node containing Systems Engineering
let seElem = $('*:contains("Systems Engineering")').last();
seElem.addClass('custom-systems-eng');

// Add the rule to the existing targeted CSS fix
$('style#nodexi-targeted-fix-css').append(`
/* Shrink the Systems Engineering text as well */
.custom-systems-eng {
    font-size: clamp(50px, 8vw, 110px) !important;
}
`);

fs.writeFileSync('index.html', $.html());
console.log('Systems Engineering size decreased.');
