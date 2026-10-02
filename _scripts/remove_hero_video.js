const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the background video showreel from the hero
$('.app-hero-bg-block').remove();
$('.app-hero-img-nav').remove();
$('[data-video-urls]').remove();

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Background video removed.');
