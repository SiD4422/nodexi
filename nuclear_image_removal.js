const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log("Locating rogue image reels...");

// First, find all image sources in the document
const allImages = [];
$('img').each(function() {
    allImages.push($(this).attr('src'));
});
// Find images that likely belong to the team/alien marquee
const suspectImages = allImages.filter(src => src && (src.toLowerCase().includes('alien') || src.toLowerCase().includes('team') || src.toLowerCase().includes('office') || src.toLowerCase().includes('reel') || src.toLowerCase().includes('work')));
console.log("Suspect images:", [...new Set(suspectImages)]);

let removedCount = 0;

// Hard-delete any element with class containing 'marquee' or 'slider'
$('[class*="marquee"], [class*="slider"], [class*="track"], [class*="carousel"], .w-dyn-list:not(:has(*:contains("FEATURED ENGINEERING WORKS"))):not(:has(*:contains("Gateonix")))').each(function() {
    const section = $(this).closest('.section, section, div[style*="overflow"]');
    if (section.length > 0) {
        section.remove();
        removedCount++;
        console.log("Removed a marquee/carousel container!");
    } else {
        $(this).remove();
        removedCount++;
        console.log("Removed a standalone marquee/carousel!");
    }
});

// Also, specifically find those team images and completely nuke their parent section
$('img').each(function() {
    let src = $(this).attr('src');
    if (src && (src.toLowerCase().includes('alien') || src.toLowerCase().includes('mockup') || src.toLowerCase().includes('office') || src.toLowerCase().includes('team'))) {
        let section = $(this).closest('.section, section');
        if (section.length > 0) {
            section.remove();
            removedCount++;
            console.log("Nuked a section containing rogue team/alien images.");
        } else {
            $(this).parent().remove();
            console.log("Nuked parent of rogue image.");
        }
    }
});

// If nothing was caught, just look for any div that has a massive number of images (more than 4) that IS NOT the portfolio section
$('.section, section, .w-layout-grid').each(function() {
    const text = $(this).text().toLowerCase();
    if (text.includes('engineered platforms') || text.includes('featured engineering works')) return; // Safe
    
    if ($(this).find('img').length >= 4) {
        $(this).remove();
        removedCount++;
        console.log("Nuked an anonymous section containing 4+ images.");
    }
});

fs.writeFileSync('index.html', $.html());
console.log(`Destroyed ${removedCount} rogue sections.`);
