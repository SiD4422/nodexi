const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the subtext and prepare it
let subtext = $('p:contains("We design exceptional")').last();
if (subtext.length === 0) {
    subtext = $('.custom-hero-subtext').last();
}
subtext.remove();

// The heavy engineering copy
const engineeredCopy = "We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.";

// Create the new subtext HTML block
const newSubtextHTML = \`
    <div style="flex-grow: 1; display: flex; justify-content: flex-end; padding-right: 5vw;">
        <p class="custom-hero-subtext" style="
            max-width: 400px; 
            margin: 0; 
            font-size: clamp(14px, 1.2vw, 18px); 
            line-height: 1.5; 
            color: #475569; 
            font-family: 'Inter', sans-serif;
            text-align: left;
        ">\${engineeredCopy}</p>
    </div>
\`;

// Find Row 2 (the flex container holding "Systems Engineering")
let row2 = $('h1:contains("Systems Engineering")').last().closest('.showcase_marquee_flex');

if (row2.length > 0) {
    // Append the subtext to the end of Row 2 (which pushes it to the right, under the purple pill)
    row2.append(newSubtextHTML);
    // Ensure the row spans full width so flex-grow works
    row2.attr('style', (row2.attr('style') || '') + ' width: 100%;');
    
    fs.writeFileSync('index.html', $.html());
    console.log('Subtext correctly injected into Row 2.');
} else {
    console.log('Could not find Systems Engineering row.');
}
