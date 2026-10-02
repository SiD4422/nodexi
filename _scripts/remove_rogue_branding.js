const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let removed = false;

// Search for the unique list items in that section
$('*').each(function() {
    let text = $(this).text().trim();
    if (text === "Visual branding" || text === "Brand Strategy" || text === "Packaging design") {
        
        // Go up to find the main wrapper for this block.
        // It's likely a flex container, a .section, a .w-dyn-item, or .collection-item
        let blockWrapper = $(this).closest('.w-dyn-item, .collection-item, .service-item');
        
        if (blockWrapper.length > 0) {
            blockWrapper.remove();
            removed = true;
        } else {
            // If we can't find a standard class, go up until we find a container that has siblings
            // or is a major structural block
            let parent = $(this).parent();
            while (parent.length && parent.siblings().length === 0 && !parent.hasClass('section')) {
                parent = parent.parent();
            }
            if (parent.length) {
                parent.remove();
                removed = true;
            }
        }
    }
});

// Also search for a section where an H2 or H1 says "NODEXI" and has "Visual branding" inside it
$('.section, .w-layout-grid, .service_wrap').each(function() {
    if ($(this).text().includes("Visual branding") && $(this).text().includes("NODEXI")) {
        $(this).remove();
        removed = true;
    }
});

fs.writeFileSync('index.html', $.html());

if (removed) {
    console.log('Successfully removed the rogue Branding/NODEXI section.');
} else {
    console.log('Could not find the rogue section safely.');
}
