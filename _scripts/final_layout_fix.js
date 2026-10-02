const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove the badge completely
let badgeRemoved = false;
$('*').each(function() {
    if ($(this).text().toUpperCase().includes("JUST GREAT WORK")) {
        // Find the topmost container of the badge that is not the body
        let badgeWrap = $(this).closest('.hero-badge-wrap, a, .spinning-badge, .badge');
        if (badgeWrap.length > 0 && !badgeWrap.is('body') && !badgeWrap.is('html')) {
            badgeWrap.remove();
            badgeRemoved = true;
        } else if ($(this).is('svg') || $(this).is('textPath') || $(this).hasClass('badge')) {
            $(this).remove();
            badgeRemoved = true;
        }
    }
});
if (!badgeRemoved) {
    // Aggressive SVG removal if it contains text
    $('svg').each(function() {
        if ($(this).html().toUpperCase().includes('GREAT WORK')) {
            $(this).parent().remove();
        }
    });
}

// 2. Fix the subtext and move it left
let subtext = $('*:contains("startups and enterprises")').last();
if (subtext.length > 0) {
    // If it's a paragraph
    if (subtext.is('p')) {
        subtext.text("We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.");
        
        // Find the wrapper to move it left
        let wrapper = subtext.closest('.app-hero-content, .showcase-grid-content, div');
        // Let's just use a specific class injection instead of guessing wrappers
        subtext.addClass('my-shifted-subtext');
    }
}

// Inject CSS to force the text leftwards
const css = `
<style id="nodexi-final-fix">
/* Move the container forcefully left */
.app-hero-content {
    transform: translateX(-15vw) !important; 
    position: relative !important;
    z-index: 100 !important;
}
.my-shifted-subtext {
    text-align: left !important;
    font-family: 'Inter', sans-serif !important;
    color: #475569 !important;
}
</style>
`;
$('#nodexi-final-fix').remove();
$('head').append(css);

fs.writeFileSync('index.html', $.html());
console.log('Badge removed and subtext updated.');
