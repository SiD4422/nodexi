const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Navbar Wrapper HTML:');
console.log($('.navbar_wrapper').html());
