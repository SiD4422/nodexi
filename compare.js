const fs = require('fs');
const cheerio = require('cheerio');

const raw = fs.readFileSync('alien_raw.html', 'utf8');
const now = fs.readFileSync('alien-clone-project/index.html', 'utf8');

const $raw = cheerio.load(raw);
const $now = cheerio.load(now);

console.log('Raw styles:', $raw('style').length);
console.log('Now styles:', $now('style').length);
