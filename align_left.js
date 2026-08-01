const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the hacky translateX nudge
$('style#nodexi-targeted-fix-css').text((i, text) => {
    return text.replace(/transform: translateX\(-50px\);/g, '');
});
$('style#nodexi-targeted-fix-css').text((i, text) => {
    return text.replace(/transform: translateX\(-20px\);/g, '');
});

// Add robust flush-left alignment to the flex rows
$('style#nodexi-framing-css').append(`
/* Force all hero flex rows to perfectly align on the left edge */
.showcase_marquee_flex {
    justify-content: flex-start !important;
    padding-left: 0 !important;
    margin-left: 0 !important;
}

/* Ensure the text elements themselves have no weird left margins */
.custom-heavy-duty, h1, .heading-huge {
    text-align: left !important;
    margin-left: 0 !important;
    padding-left: 0 !important;
}

/* Push the whole hero content block flush left if it has a max-width */
.app-hero-content {
    align-items: flex-start !important;
}
`);

fs.writeFileSync('index.html', $.html());
console.log('Flush left alignment applied.');
