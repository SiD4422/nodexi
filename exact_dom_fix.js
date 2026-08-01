const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove the spinning badge using the EXACT class shown in the screenshot
$('.great-work-wrap').remove();

// 2. Position the paragraph perfectly under the purple pill using absolute positioning
// This avoids all flexbox stacking issues
const absoluteFixCSS = `
<style id="nodexi-absolute-para-fix">
/* Remove old hacky transforms */
.hero-para-wrap, .my-shifted-subtext-parent, .app-hero-content {
    transform: none !important;
}

/* Force the paragraph container into absolute space on the top right */
.hero-para-flex {
    position: absolute !important;
    right: 15vw !important; /* Position it on the right side of the screen */
    top: 30vh !important;   /* Push it down slightly so it clears the purple pill */
    max-width: 350px !important;
    text-align: left !important;
    z-index: 50 !important;
}

/* Ensure the hero container is relative so absolute positioning works inside it */
.hero-content-wrap {
    position: relative !important;
}
</style>
`;

$('#nodexi-absolute-para-fix').remove();
$('head').append(absoluteFixCSS);

fs.writeFileSync('index.html', $.html());
console.log('Badge removed and paragraph absolutely positioned.');
