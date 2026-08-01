const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find and destroy the cookie banner
$(':contains("We use cookies")').closest('div').remove();

fs.writeFileSync('index.html', $.html());
console.log('Cookie banner destroyed.');
