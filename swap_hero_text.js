const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// We need to carefully target the exact text nodes or elements to avoid breaking the layout.
// Since we are dealing with minified/complex Webflow HTML, we will find the elements by text content.

// Find "Crafting"
$('*:contains("Crafting")').each(function() {
    // Only target elements that directly contain the text "Crafting" (excluding children)
    if ($(this).children().length === 0 && $(this).text().trim() === "Crafting") {
        $(this).text("Heavy-Duty");
    }
});

// Find "and digital"
$('*:contains("and digital")').each(function() {
    if ($(this).children().length === 0 && $(this).text().trim() === "and digital") {
        $(this).text("Systems Engineering");
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Hero text successfully swapped.');
