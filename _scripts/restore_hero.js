const fs = require('fs');
const cheerio = require('cheerio');

const rawHtml = fs.readFileSync('alien_raw.html', 'utf8');
const $raw = cheerio.load(rawHtml);

const currentHtml = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(currentHtml);

// Restore the entire hero section
const rawHero = $raw('.section.is-hero.home').html();
$('.section.is-hero.home').html(rawHero);

// Now carefully replace "Crafting" with "Engineering" and "brands" with "software"
$('.section.is-hero.home *').each((i, el) => {
    if ($(el).children().length === 0) {
        const text = $(el).text();
        if (text.includes('Crafting')) {
            $(el).text(text.replace('Crafting', 'Engineering'));
        }
        if (text.includes('brands')) {
            // Note: Webflow marquee repeats 'brands' multiple times!
            $(el).text(text.replace('brands', 'software'));
        }
    }
});

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Hero section restored and text replaced.');
