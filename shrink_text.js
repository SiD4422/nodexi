const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the node containing Heavy-Duty to get its exact class
const hdClass = $('*:contains("Heavy-Duty")').last().attr('class') || '';
const seClass = $('*:contains("Systems Engineering")').last().attr('class') || '';

// Forcefully inject a style block targeting these exact classes
const ultraShrinkCSS = `
<style id="nodexi-ultra-shrink-css">
/* Target the exact classes found on the text, plus general huge headings */
.${hdClass.split(' ').join('.')}, .${seClass.split(' ').join('.')}, .heading-huge, .display-1, h1 {
    font-size: clamp(24px, 4vw, 50px) !important; /* Aggressively small to guarantee it fits */
    line-height: 1.1 !important;
}

/* Also aggressively shrink the pill shapes to match the new tiny text */
.marquee_chat {
    height: clamp(35px, 5vw, 55px) !important;
}
.marquee_text, .marquee_text * {
    font-size: clamp(20px, 3vw, 40px) !important;
}
</style>
`;

$('#nodexi-ultra-shrink-css').remove();
$('head').append(ultraShrinkCSS);

// Just in case it's inline styled, let's also rip out any massive inline font-sizes
$('*:contains("Heavy-Duty")').last().css('font-size', 'clamp(24px, 4vw, 50px)');
$('*:contains("Systems Engineering")').last().css('font-size', 'clamp(24px, 4vw, 50px)');

fs.writeFileSync('index.html', $.html());
console.log('Aggressive text shrinking applied.');
