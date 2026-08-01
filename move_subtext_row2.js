const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Find the paragraph and get it ready
let subtext = $('p:contains("We design exceptional")').last();
if (subtext.length === 0) {
    subtext = $('.custom-hero-subtext').last();
}

// 2. We want to place it in Row 2, right after the "Systems" h1
let systemsH1 = $('h1:contains("Systems")').last();

if (systemsH1.length > 0) {
    let row2 = systemsH1.parent();
    
    // Remove the subtext from its original floating container
    subtext.remove();
    
    // Clean up the text to the correct engineering copy
    const engineeredCopy = "We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.";
    
    // Create a new cleanly styled block for it
    const newSubtextHTML = `
        <p class="custom-hero-subtext" style="
            max-width: 400px; 
            margin: 0 0 0 40px; 
            font-size: clamp(14px, 1.2vw, 18px); 
            line-height: 1.5; 
            color: #475569; 
            font-family: 'Inter', sans-serif;
        ">${engineeredCopy}</p>
    `;
    
    // Append it to Row 2, directly after Systems
    row2.append(newSubtextHTML);
    
    // Ensure Row 2 is flex so they sit side-by-side
    row2.attr('style', row2.attr('style') + ' display: flex; align-items: center; justify-content: flex-start;');
    
    fs.writeFileSync('index.html', $.html());
    console.log('Subtext moved perfectly under the purple pill (Row 2).');
} else {
    console.log('Could not find Systems h1.');
}
