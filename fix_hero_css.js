const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Inject a CSS fix to handle the new longer words in the hero section
const fixCSS = `
<style id="nodexi-hero-fix-css">
/* The original font size was clamp(80px, 12vw, 180px) or similar, which is massive. 
   We reduce it so "Systems Engineering" fits on one line. */
h1, .heading-huge, .app-hero-title {
    font-size: clamp(50px, 7vw, 110px) !important;
    line-height: 1.1 !important;
}

/* Ensure the wrapper doesn't force wrapping if it can be avoided */
.showcase_marquee_flex {
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 20px !important;
}

/* Adjust the pills to be slightly smaller to match the new font size */
.marquee_chat {
    height: 100px !important;
    border-radius: 100px !important;
}
.marquee_chat.is_yellow {
    height: 100px !important;
}
.marquee_text {
    font-size: 50px !important;
}

/* Bring the right-side paragraph closer so it's not floating awkwardly */
.app-hero-content {
    align-items: flex-start !important;
}
</style>
`;

$('#nodexi-hero-fix-css').remove();
$('head').append(fixCSS);

// Also make sure the "We design exceptional brands..." text says "software" instead of brands
let subtext = $('p:contains("brands")');
subtext.each(function() {
    $(this).text($(this).text().replace(/brands/g, 'software'));
});

fs.writeFileSync('index.html', $.html());
console.log('Hero layout fixed.');
