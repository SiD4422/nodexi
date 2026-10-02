const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Swap the text cleanly
let subtext = $('p:contains("We design exceptional")').last();
if (subtext.length > 0) {
    subtext.text("We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.");
}

// 2. Inject a simple CSS fix to drag the container to the left so it sits exactly under the purple pill
const cssFix = `
<style id="nodexi-subtext-alignment">
/* Pull the subtext container to the left without breaking the DOM structure */
.app-hero-content {
    transform: translateX(-28vw) !important;
    position: relative;
    z-index: 10;
}
/* Ensure the text itself is left-aligned to match the pill */
.app-hero-content p {
    text-align: left !important;
}
</style>
`;

$('#nodexi-subtext-alignment').remove();
$('head').append(cssFix);

fs.writeFileSync('index.html', $.html());
console.log('Subtext cleanly replaced and shifted left.');
