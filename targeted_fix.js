const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove all my previous aggressive CSS hacks
$('#nodexi-hero-fix-css').remove();
$('#nodexi-ultra-shrink-css').remove();

// 2. Remove inline font-sizes that were mistakenly applied to both
$('*:contains("Heavy-Duty")').last().css('font-size', '');
$('*:contains("Systems Engineering")').last().css('font-size', '');

// 3. Specifically target ONLY the element containing "Heavy-Duty" and give it a unique class
let hdElem = $('*:contains("Heavy-Duty")').last();
hdElem.addClass('custom-heavy-duty');

// 4. Inject a CSS rule that ONLY targets .custom-heavy-duty
const targetedFixCSS = `
<style id="nodexi-targeted-fix-css">
/* Only shrink the Heavy-Duty text so it doesn't push the purple pill */
.custom-heavy-duty {
    font-size: clamp(40px, 6vw, 90px) !important;
}
/* Ensure the purple pill doesn't overlap by forcing a gap on the flex row */
.showcase_marquee_flex {
    gap: 20px !important;
}
</style>
`;

$('#nodexi-targeted-fix-css').remove();
$('head').append(targetedFixCSS);

fs.writeFileSync('index.html', $.html());
console.log('Targeted CSS fix applied.');
