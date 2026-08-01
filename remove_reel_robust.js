const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find elements with text containing 'reel' case-insensitively
let removed = false;
$('*').each(function() {
    if ($(this).children().length === 0) {
        let text = $(this).text().toLowerCase();
        if (text.includes('play reel')) {
            let reelSection = $(this).closest('.section, section');
            if (reelSection.length > 0) {
                reelSection.remove();
                removed = true;
                console.log('Removed reel section via case-insensitive match.');
            }
        }
    }
});

// If that fails, look for the 'Grape' mockup text
if (!removed) {
    $('*').each(function() {
        if ($(this).children().length === 0) {
            let text = $(this).text().toLowerCase();
            if (text.includes('curate your own list')) {
                let reelSection = $(this).closest('.section, section');
                if (reelSection.length > 0) {
                    reelSection.remove();
                    removed = true;
                    console.log('Removed reel section via Grape mockup text match.');
                }
            }
        }
    });
}

// Fallback to removing the huge div that is likely the grid container if no text is found
if (!removed) {
     $('.showcase-grid').remove(); 
     console.log('Removed via .showcase-grid class.');
}

fs.writeFileSync('index.html', $.html());
