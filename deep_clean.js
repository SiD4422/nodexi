const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log("Starting deep clean...");

// 1. Gather all existing injected CSS and remove their individual style tags
let masterCSS = `
/* =========================================
   NODEXI MASTER STYLESHEET
   Consolidated layout fixes and overrides
========================================= */

/* Hiding utility for removed template elements */
.nodexi-hidden {
    display: none !important;
}

/* Custom Hero Subtext styling */
.nodexi-hero-subtext {
    max-width: 400px;
    margin: 0;
    font-size: clamp(14px, 1.2vw, 18px);
    line-height: 1.5;
    color: #475569;
    font-family: Inter, sans-serif;
    text-align: left;
}

/* Absolute Positioning for the Hero Container */
.nodexi-absolute-hero-container {
    position: absolute !important;
    right: 35vw !important;
    top: 30vh !important;
    max-width: 350px !important;
    text-align: left !important;
    z-index: 50 !important;
    transform: none !important;
}

/* Relative Wrapper requirement */
.nodexi-relative-wrap {
    position: relative !important;
}
`;

// Remove previous fragmented style tags we injected
$('style[id^="nodexi-"]').each(function() {
    $(this).remove();
});

// 2. Map inline styles to our new semantic classes
$('*').each(function() {
    let style = $(this).attr('style');
    if (style) {
        // Convert display: none to .nodexi-hidden
        if (style.includes('display: none') || style.includes('display:none')) {
            $(this).addClass('nodexi-hidden');
            let newStyle = style.replace(/display:\s*none\s*!important;?/, '')
                                .replace(/display:\s*none;?/, '').trim();
            if (newStyle) {
                $(this).attr('style', newStyle);
            } else {
                $(this).removeAttr('style');
            }
        }
        
        // Convert the massive hero subtext inline styling to .nodexi-hero-subtext
        if (style.includes('max-width: 400px') && style.includes('clamp')) {
            $(this).addClass('nodexi-hero-subtext');
            $(this).removeAttr('style');
        }
    }
});

// Apply our structural classes
$('.hero-para-flex, .app-hero-content').addClass('nodexi-absolute-hero-container');
$('.hero-content-wrap').addClass('nodexi-relative-wrap');

// Also remove any remaining my-shifted-subtext classes
$('.my-shifted-subtext').removeClass('my-shifted-subtext');

// 3. Scrub orphaned DOM nodes
let removedCount = 0;
$('.w-dyn-item, .collection-item, .service-item').each(function() {
    // If the item only contains whitespace or a single empty div
    let text = $(this).text().trim();
    if (text === "" && $(this).find('img, svg').length === 0) {
        $(this).remove();
        removedCount++;
    }
});

// 4. Inject the master stylesheet into the head
$('head').append('\\n<style id="nodexi-master-styles">\\n' + masterCSS + '\\n</style>\\n');

// Write the pristine HTML back
fs.writeFileSync('index.html', $.html());
console.log('Deep clean complete! Removed ' + removedCount + ' orphaned nodes and consolidated all CSS.');
