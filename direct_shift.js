const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the exact paragraph using a highly reliable substring
let para = $('*:contains("startups and enterprises")').filter(function() {
    return $(this).children().length === 0; // Get the deepest text node
}).last();

if (para.length > 0) {
    console.log("Found paragraph. Original text:", para.text());
    
    // Forcefully update the text
    para.text("We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.");
    
    // Add a unique class to it so we can style it DIRECTLY
    para.addClass('my-shifted-subtext');
    
    // Also find its parent and give it a class just in case we need to move the parent
    para.parent().addClass('my-shifted-subtext-parent');
    
    // Inject the CSS
    const directCSS = `
    <style id="nodexi-direct-shift">
    /* Move the parent container so we don't break the layout flow */
    .my-shifted-subtext-parent {
        transform: translateX(-35vw) !important; /* Move it way to the left */
        position: relative !important;
        z-index: 100 !important;
    }
    .my-shifted-subtext {
        text-align: left !important;
        font-family: 'Inter', sans-serif !important;
        color: #475569 !important;
    }
    </style>
    `;
    
    $('#nodexi-direct-shift').remove();
    $('head').append(directCSS);
    
    fs.writeFileSync('index.html', $.html());
    console.log("Successfully updated and shifted the text.");
} else {
    console.log("Failed to find the paragraph.");
}
