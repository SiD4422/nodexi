const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the subtext paragraph
let subtext = $('p:contains("We design exceptional")').last();

if (subtext.length > 0) {
    subtext.addClass('custom-hero-subtext');
    
    // Inject a CSS fix to pull it to the left
    const subtextCSS = `
    <style id="nodexi-subtext-move">
    /* Pull the paragraph significantly to the left */
    .custom-hero-subtext {
        position: relative !important;
        transform: translateX(-10vw) !important;
    }
    
    /* If the wrapper has a massive left margin, we can also target that */
    .app-hero-content {
        margin-left: 0 !important;
        padding-left: 0 !important;
    }
    </style>
    `;
    
    $('#nodexi-subtext-move').remove();
    $('head').append(subtextCSS);
    
    fs.writeFileSync('index.html', $.html());
    console.log('Subtext pulled left.');
} else {
    console.log('Could not find subtext.');
}
