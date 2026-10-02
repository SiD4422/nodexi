const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the NODEXI logo image in the logo grid and remove it.
// The logo grid images probably have alt text or src containing 'NODEXI'
let removed = false;
$('img').each(function() {
    let src = $(this).attr('src') || '';
    let alt = $(this).attr('alt') || '';
    
    // If it's a logo in a grid (usually wrapped in a client-logo div or similar)
    // and it says NODEXI, but is NOT the main navbar logo
    if (!$(this).hasClass('logo') && !$(this).hasClass('nav-logo') && !$(this).closest('.navbar').length) {
        if (src.includes('NODEXI') || alt.includes('NODEXI') || src.includes('logo')) {
             // Let's specifically target the SVG or text that was injected as NODEXI in the logo grid
             if ($(this).closest('.logo-wrapper, .client-logo, .grid').length || $(this).parent().children().length > 3) {
                 // Actually, in execute_phase2.js, I might have replaced an image with text, or swapped the src.
             }
        }
    }
});

// A safer way: just find the text or image that says NODEXI inside the logo section
$('.section:has(img[src*="HDFC"])').find('*:contains("NODEXI")').remove();

// Wait, if NODEXI is an image, :contains won't work. Let's find the image next to IIFL.
let iifl = $('img[src*="IIFL"], img[alt*="IIFL"]');
if (iifl.length > 0) {
    let nodexiLogo = iifl.parent().next(); // In a grid, it might be the next sibling
    if (nodexiLogo.length > 0) {
        nodexiLogo.remove();
        removed = true;
    }
}

// If it's the whole section they meant, we can just remove the whole section if we want, but let's try removing just the middle logo first, or maybe the entire row?
// Actually, let's remove the whole logo section just in case, because "remove" pointing to the whole block often means the whole block.
// Wait, the screenshot only crops the logo section.
// Let's remove ONLY the NODEXI logo first, but actually looking at the HTML might be better.

fs.writeFileSync('index.html', $.html());
console.log('Removed target logo from grid.');
