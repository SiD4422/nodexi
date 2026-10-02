const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien_raw.html', 'utf8');
const $ = cheerio.load(html);

console.log('Raw style for marquee_chat:', $('.marquee_chat').first().attr('style'));
console.log('Raw text in marquee_chat:', $('.marquee_chat .heading-big').first().text());
