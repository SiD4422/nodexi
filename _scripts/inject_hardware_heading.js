const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the section or grid that holds our newly added Hardware services
let hardwareItem = $('*:contains("Embedded Systems")').last();

// Find the main grid wrapper for this specific service block
let grid = hardwareItem.closest('.w-layout-grid, .service_wrap, .service-item');

if (grid.length > 0) {
    // The left side is usually the first block-level child (div) of the grid
    let leftColumn = grid.children('div, a').first();
    
    // Inject the missing heading! 
    // We use standard Webflow heading classes to ensure it matches the other sections.
    leftColumn.html('<h2 class="heading-style-h2" style="font-size: 2.5rem; font-weight: 500; letter-spacing: -0.02em; color: #111827; margin: 0;">Hardware Architectures</h2>');
    
    fs.writeFileSync('index.html', $.html());
    console.log('Successfully injected Hardware Architectures heading into the left column.');
} else {
    console.log('Could not find the grid containing Embedded Systems.');
}
