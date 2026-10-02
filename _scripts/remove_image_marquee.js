const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let removed = false;

// Search for the grid container by looking for images that have "alien" in their name or alt text,
// or just looking for the massive scrolling marquee.
$('.w-dyn-list, .gallery, .marquee, .showcase, .grid').each(function() {
    const text = $(this).html().toLowerCase();
    if (text.includes('alien') || $(this).find('img').length > 4) {
        // Only target if it's the specific image marquee we are looking at
        // To be safe, let's check if it's a section with just a grid of images
        const imgs = $(this).find('img');
        if (imgs.length >= 4 && !text.includes('engineered platforms')) {
            // It's probably the gallery section
            $(this).closest('.section, section').remove();
            removed = true;
            console.log("Removed gallery/marquee section based on image count or alien keyword.");
        }
    }
});

if (!removed) {
    // Look for any section where the ENTIRE content is just images
    $('.section').each(function() {
        const textContent = $(this).text().trim();
        const imgCount = $(this).find('img').length;
        if (textContent.length < 50 && imgCount >= 4) {
             $(this).remove();
             console.log("Removed section that was purely an image gallery.");
             removed = true;
        }
    });
}

// Fallback: specifically look for a class that might be the image track
if (!removed) {
    $('.image-track, .marquee-track, .slider-track').closest('.section').remove();
    console.log("Removed via track class.");
}

fs.writeFileSync('index.html', $.html());
console.log("Done. File saved.");
