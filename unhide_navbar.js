const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find elements with "NODEXI" and if their parent is hidden, unhide it!
$('h1, h2, h3, h4, h5, h6, div, span, a').each(function() {
    if ($(this).text().trim() === "NODEXI") {
        let parent = $(this).parent();
        let style = parent.attr('style') || '';
        if (style.includes('display: none !important;')) {
            // Remove the display none
            style = style.replace('display: none !important;', '').trim();
            if (style === '') {
                parent.removeAttr('style');
            } else {
                parent.attr('style', style);
            }
        }
    }
});

// Just to be absolutely safe, let's explicitly find the navbar and unhide it
$('.navbar, .nav, .nav-wrap, .navigation, [data-w-id]').each(function() {
    let style = $(this).attr('style') || '';
    if (style.includes('display: none !important;')) {
        style = style.replace('display: none !important;', '').trim();
        if (style === '') {
            $(this).removeAttr('style');
        } else {
            $(this).attr('style', style);
        }
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Navbar unhidden.');
