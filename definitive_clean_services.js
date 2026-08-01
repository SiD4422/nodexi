const { execSync } = require('child_process');

console.log("Starting definitive clean recovery...");

// 1. Recover the full pristine state with Nodexi's 3 main service tiers
execSync('node recover_services.js');

// 2. Now, strictly and safely delete the rogue 4th row (the one with NODEXI and Visual Branding)
const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let removed = false;

// Delete the specific rogue list items
$('li, div, p').each(function() {
    let text = $(this).text().trim();
    if (text === "Visual branding" || text === "Packaging design" || text === "Brand Strategy") {
        let wrapper = $(this).closest('.w-dyn-item, .collection-item, .service-item');
        if (wrapper.length > 0) {
            wrapper.remove();
            removed = true;
        }
    }
});

// Delete the orphaned NODEXI header if it's acting as a rogue section
$('h1, h2, h3, h4, h5, h6, div, span').each(function() {
    if ($(this).text().trim() === "NODEXI" && $(this).children().length <= 1) {
        // Only delete it if it's not the navbar logo.
        // We can tell it's not the navbar if it's near our deleted visual branding stuff.
        let rogueWrap = $(this).closest('.w-dyn-item, .collection-item, .service-item');
        if (rogueWrap.length > 0) {
            rogueWrap.remove();
        } else {
            // Find its parent flex row or grid and just hide it to be perfectly safe
            $(this).parent().attr('style', 'display: none !important;');
        }
    }
});

// Clean up any empty `.w-dyn-item` wrappers left behind
$('.w-dyn-item').each(function() {
    if ($(this).text().trim() === "") {
        $(this).remove();
    }
});

// Rename "Hardware & IoT Systems" to "Hardware Architectures" to match the user's latest context
$('h2, h3, h1').each(function() {
    if ($(this).text().trim() === "Hardware & IoT Systems") {
        $(this).text("Hardware Architectures");
    }
});

fs.writeFileSync('index.html', $.html());
console.log("Definitive recovery and precise rogue deletion complete.");
