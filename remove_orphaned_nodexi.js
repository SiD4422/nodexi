const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let removed = false;

// Search for headings that exactly equal "NODEXI" (this is the left-side text that was left behind)
$('h1, h2, h3, h4, div').each(function() {
    if ($(this).text().trim() === "NODEXI") {
        // We only want to remove it if it's acting as a section header 
        // (i.e. it doesn't have a bunch of children, and it's inside a structural wrapper)
        if ($(this).children().length <= 1) {
            
            // Find the massive section wrapper that holds this orphaned "NODEXI" header
            let section = $(this).closest('.section, .w-layout-grid, .service_wrap, section');
            
            if (section.length > 0) {
                section.remove();
                removed = true;
            } else {
                // If we can't find a standard section class, go up 3 levels
                $(this).parent().parent().parent().remove();
                removed = true;
            }
        }
    }
});

// Edge case: if there's a `.section` that contains exactly "NODEXI" and nothing else
$('.section').each(function() {
    if ($(this).text().trim() === "NODEXI") {
        $(this).remove();
        removed = true;
    }
});

fs.writeFileSync('index.html', $.html());

if (removed) {
    console.log('Successfully removed the orphaned NODEXI block.');
} else {
    console.log('Could not find the orphaned block.');
}
