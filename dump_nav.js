const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Nav classes:');
$('nav, header, .navbar, .nav').each((i, el) => {
    console.log($(el).attr('class'));
});
