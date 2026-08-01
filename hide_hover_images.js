const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Inject a CSS rule into our master stylesheet to permanently hide the hover images
const cssFix = `
/* Permanently hide the interactive hover images in the Services section */
.service-img-wrap, .service-image, .service_img, .w-dyn-item img, .collection-item img {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
}
`;

if (html.includes('<style id="nodexi-master-styles">')) {
    html = html.replace('</style>', cssFix + '\\n</style>');
} else {
    // Fallback if not found
    $('head').append('<style id="nodexi-master-styles">' + cssFix + '</style>');
    html = $.html();
}

fs.writeFileSync('index.html', html);
console.log('Successfully injected CSS to hide popping images.');
