const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Preloader HTML:', $('.preloader').html() || $('.loader').html() || $('.page-loader').html() || $('.loading').html());
