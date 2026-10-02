const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Inject a small transform to nudge Heavy-Duty to the left
$('style#nodexi-targeted-fix-css').append(`
/* Nudge Heavy-Duty slightly to the left as requested */
.custom-heavy-duty {
    transform: translateX(-20px);
}
`);

fs.writeFileSync('index.html', $.html());
console.log('Heavy-Duty nudged to the left.');
