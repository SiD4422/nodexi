const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let removedCount = 0;

// Find all sections that contain our engineering text
$('.section').each(function() {
    let text = $(this).text();
    if (text.includes("AI & Data Pipelines") || text.includes("Hardware Architectures")) {
        
        // Destroy every single image inside this section
        $(this).find('img').each(function() {
            // Also destroy its direct parent if it's just a wrapper for the image
            let parent = $(this).parent();
            $(this).remove();
            removedCount++;
            
            // If the parent is now completely empty or only contains whitespace, destroy it too
            if (parent.text().trim() === "" && parent.children().length === 0) {
                parent.remove();
            }
        });

        // Destroy any div that has a specific "hover image" class name, just in case they are background images
        $(this).find('[class*="hover-img"], [class*="hover-image"], [class*="popup-image"]').remove();
    }
});

fs.writeFileSync('index.html', $.html());
console.log(`Successfully destroyed ${removedCount} popup images from the Services section.`);
