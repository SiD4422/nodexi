const fs = require('fs');
const cheerio = require('cheerio');

const raw = fs.readFileSync('alien_raw.html', 'utf8');
const $raw = cheerio.load(raw);

console.log($raw('.app-hero-title-wrap').html());
