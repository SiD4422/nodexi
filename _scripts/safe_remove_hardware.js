const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let removed = false;

// Search specifically for heading elements containing the exact string
$('h1, h2, h3, h4').each(function() {
    if ($(this).text().trim() === "Hardware & IoT Systems" || $(this).text().trim() === "Branding") {
        
        // Find the specific Webflow grid item that wraps this section
        let gridItem = $(this).closest('.w-dyn-item, .collection-item, .service-item');
        
        if (gridItem.length > 0) {
            gridItem.remove();
            removed = true;
        } else {
            // If it doesn't have a standard Webflow class, find the nearest parent 
            // that is a sibling to other similar sections
            let parent = $(this).parent();
            while (parent.length && parent.siblings().length === 0) {
                parent = parent.parent();
            }
            // Once we find a parent that has siblings (i.e. it's part of a list), remove it
            if (parent.length) {
                parent.remove();
                removed = true;
            }
        }
    }
});

fs.writeFileSync('index.html', $.html());

if (removed) {
    console.log('Successfully and SAFELY removed only the Hardware & IoT Systems section.');
} else {
    console.log('Could not find the section safely.');
}
