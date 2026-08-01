const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find all text nodes and replace "brands" with "software", and "BRANDS" with "SOFTWARE"
// We must be careful not to replace it in HTML attributes unless necessary, but Webflow marquees usually just have the text inside a div/span.
$('*').each(function() {
    if ($(this).children().length === 0) {
        let text = $(this).text();
        if (text.includes('brands') || text.includes('BRANDS')) {
            $(this).text(text.replace(/brands/g, 'software').replace(/BRANDS/g, 'SOFTWARE'));
        }
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Swapped brands for software.');
