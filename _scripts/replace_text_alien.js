const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find any element containing the text ALIEN (case insensitive) or similar to replace it
let replaced = false;

// The preloader might literally just be text! "A L i E N"
$('*').each((i, el) => {
    if ($(el).children().length === 0) {
        let text = $(el).text();
        if (text && text.toLowerCase().includes('alien')) {
            console.log('Found ALIEN text inside:', $(el).parent().html());
            $(el).text(text.replace(/alien/gi, 'NODEXI'));
            replaced = true;
        }
    }
});

fs.writeFileSync('index.html', $.html());
if (replaced) {
    console.log('Text versions replaced.');
} else {
    console.log('No text versions found.');
}
