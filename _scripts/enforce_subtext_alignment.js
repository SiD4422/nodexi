const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Ensure the subtext is pulled to the left underneath the software pill
const fixCSS = `
<style id="nodexi-final-para-shift">
/* Force the container to move leftwards */
.hero-para-flex, .app-hero-content {
    position: absolute !important;
    right: 35vw !important; /* Move it 35% of the screen width away from the right edge */
    top: 30vh !important;
    max-width: 350px !important;
    text-align: left !important;
    z-index: 50 !important;
    transform: none !important;
}
.hero-content-wrap {
    position: relative !important;
}
</style>
`;

$('#nodexi-final-para-shift').remove();
$('head').append(fixCSS);

// Also let's double check if the text is exactly what we wanted
let p = $('p:contains("We build scalable")');
if (p.length > 0) {
    p.addClass('my-shifted-subtext');
    p.attr('style', 'max-width: 400px; margin: 0; font-size: clamp(14px, 1.2vw, 18px); line-height: 1.5; color: #475569; font-family: Inter, sans-serif; text-align: left;');
}

fs.writeFileSync('index.html', $.html());
console.log('Subtext alignment enforced.');
