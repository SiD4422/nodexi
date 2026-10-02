const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Add a solid black background to the hero since we removed the video
$('head').append('<style>.section.is-hero.home { background-color: #000000 !important; }</style>');

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Added black background to hero.');
