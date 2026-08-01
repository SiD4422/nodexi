const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove the custom-systems-eng class that made the WHOLE phrase small
let seElem = $('.custom-systems-eng');
seElem.removeClass('custom-systems-eng');

// 2. Wrap "Engineering" inside "Systems Engineering" in a span so we can target it individually
seElem.each(function() {
    let text = $(this).text();
    if (text === "Systems Engineering") {
        $(this).html('Systems <span class="custom-engineering">Engineering</span>');
    }
});

// 3. Inject CSS to target ONLY Heavy-Duty and Engineering
$('style#nodexi-targeted-fix-css').append(`
/* Shrink ONLY the word Engineering */
.custom-engineering {
    font-size: clamp(50px, 8vw, 110px) !important;
    display: inline-block;
}
`);

fs.writeFileSync('index.html', $.html());
console.log('Typography hierarchy fixed.');
