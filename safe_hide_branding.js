const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Hide the Hardware/Branding service in the main grid
$('h2, h3, h4').each(function() {
    let text = $(this).text().trim();
    if (text === "Hardware & IoT Systems" || text === "Branding") {
        // Find the specific grid item wrapper (do NOT go up to .section)
        let item = $(this).closest('.w-dyn-item, .collection-item, .service-item');
        if (item.length > 0) {
            item.attr('style', 'display: none !important;');
        } else {
            // Fallback to strict parent traversal (max 2 levels)
            $(this).parent().parent().attr('style', 'display: none !important;');
        }
    }
});

// 2. Hide the rogue NODEXI/Visual Branding block
// Search for the specific list items
$('div, li, p').each(function() {
    let text = $(this).text().trim();
    if (text === "Visual branding" || text === "Packaging design") {
        let item = $(this).closest('.w-dyn-item, .collection-item, .service-item');
        if (item.length > 0) {
            item.attr('style', 'display: none !important;');
        }
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Successfully hidden specific branding elements.');
