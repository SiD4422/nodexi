const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the section or block containing the "Hardware & IoT Systems" heading
// (Since I previously renamed "Branding" to "Hardware & IoT Systems")
let removed = false;

$('h2, h3, h1, div').each(function() {
    if ($(this).text().trim() === "Hardware & IoT Systems" || $(this).text().trim() === "Branding") {
        // Find the closest wrapper that represents this entire service row
        // Usually something like .service-item, .w-dyn-item, .w-layout-grid, or .service-content-wrap
        let serviceRow = $(this).closest('.w-dyn-item, .service_wrap, .service-item, .collection-item, [role="listitem"]');
        
        // If we can't find a standard Webflow list item class, we just go up a few levels
        // Let's assume it's wrapped in a .w-dyn-item or .service_wrap
        if (serviceRow.length === 0) {
            // Webflow structure often looks like: .w-dyn-items > .w-dyn-item > ...
            serviceRow = $(this).closest('.w-dyn-item');
        }
        
        if (serviceRow.length === 0) {
             // Let's just go up to the nearest parent that contains other things
             serviceRow = $(this).parent().parent().parent(); 
        }

        if (serviceRow.length > 0) {
            serviceRow.remove();
            removed = true;
        }
    }
});

if (removed) {
    fs.writeFileSync('index.html', $.html());
    console.log('Successfully removed the Branding / Hardware & IoT Systems section.');
} else {
    // Fallback: search for it and aggressively remove its parent row
    $('*:contains("Hardware & IoT Systems")').last().parent().parent().parent().remove();
    fs.writeFileSync('index.html', $.html());
    console.log('Removed via fallback.');
}
