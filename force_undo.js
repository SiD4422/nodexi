const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Remove ALL styles that contain '2px !important' or 'TYPOGRAPHY OVERHAUL'
$('style').each((i, el) => {
    const content = $(el).html() || $(el).text();
    if (content && (content.includes('TYPOGRAPHY') || content.includes('2px !important'))) {
        console.log('Removing injected style block...');
        $(el).remove();
    }
});

// Let's also make sure we remove the link tag
$('link').each((i, el) => {
    if ($(el).attr('href') && $(el).attr('href').includes('Space+Grotesk')) {
        console.log('Removing injected font link...');
        $(el).remove();
    }
});

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Force removal complete.');
