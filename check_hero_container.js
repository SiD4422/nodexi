const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Find the showcase marquee section (where the broken animation is)
// The screenshot shows it is a parent of .showcase_marquee_flex or .showcase_marquee_wrapper
console.log('Hero inner HTML:');
console.log($('.showcase_marquee_wrapper').parent().html());
