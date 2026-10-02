const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Inject a CSS rule into our master stylesheet to fix the text overflow in the services grid
const cssFix = `
/* Fix text overflow for the Services grid columns */
.service-txt-wrap, .service-txt {
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    line-height: 1.4 !important;
}
.w-layout-grid.grid-2 {
    grid-column-gap: 2rem !important; /* Reduce the massive gap between columns to give more breathing room */
}
/* Ensure the overall grid doesn't overflow the viewport */
.w-layout-grid {
    max-width: 100vw !important;
    overflow-x: hidden !important;
}
`;

// Append it inside the existing nodexi-master-styles block
if (html.includes('<style id="nodexi-master-styles">')) {
    html = html.replace('</style>', cssFix + '\\n</style>');
} else {
    // Fallback if not found
    $('head').append('<style id="nodexi-master-styles">' + cssFix + '</style>');
    html = $.html();
}

fs.writeFileSync('index.html', html);
console.log('Successfully injected CSS to fix text overflow and column gap.');
