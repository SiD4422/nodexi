const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the badge. It might be an SVG containing the text 'JUST GREAT WORK'
let badgeRemoved = false;

// 1. Check for text inside SVGs or anywhere else
$('*').each(function() {
    if ($(this).text().toUpperCase().includes("JUST GREAT WORK")) {
        let badgeContainer = $(this).closest('.hero-badge-wrap, .badge-wrapper, a, div[class*="badge"]');
        if (badgeContainer.length > 0) {
            badgeContainer.remove();
            badgeRemoved = true;
        } else {
            $(this).remove();
            badgeRemoved = true;
        }
    }
});

// 2. Check for images with alt text or src containing 'badge' or 'great work'
$('img').each(function() {
    let src = $(this).attr('src') || '';
    let alt = $(this).attr('alt') || '';
    
    if (src.toLowerCase().includes('badge') || alt.toLowerCase().includes('great work') || alt.toLowerCase().includes('badge')) {
        let parent = $(this).closest('.hero-badge-wrap, a, div[class*="badge"]');
        if (parent.length > 0) {
            parent.remove();
            badgeRemoved = true;
        } else {
            $(this).remove();
            badgeRemoved = true;
        }
    }
});

// 3. Fallback: hide `.hero-badge-wrap` or similar common Webflow classes entirely if they exist
$('.hero-badge-wrap, .spinning-badge, .badge-circle').remove();

fs.writeFileSync('index.html', $.html());
console.log('Badge removal script completed.');
