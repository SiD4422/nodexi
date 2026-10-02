const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the subtext and remove it from its current spot
let subtext = $('p:contains("We design exceptional")').last();
if (subtext.length === 0) {
    subtext = $('.custom-hero-subtext').last();
}
subtext.remove();

const engineeredCopy = "We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.";

// Build the HTML to inject
const newSubtextHTML = '<div class="custom-hero-subtext-wrapper" style="flex-grow: 1; display: flex; justify-content: flex-end; padding-right: 5vw;">' +
    '<p class="custom-hero-subtext" style="max-width: 400px; margin: 0; font-size: clamp(14px, 1.2vw, 18px); line-height: 1.5; color: #475569; font-family: Inter, sans-serif; text-align: left;">' + engineeredCopy + '</p>' +
'</div>';

// Find the specific flex row that contains the word "Systems"
let row2 = $('.showcase_marquee_flex:contains("Systems")').last();

if (row2.length > 0) {
    // Append the paragraph to this row
    row2.append(newSubtextHTML);
    // Ensure the row spans 100% width so flex-grow can push the text to the right
    row2.attr('style', (row2.attr('style') || '') + ' width: 100%;');
    
    fs.writeFileSync('index.html', $.html());
    console.log('Successfully injected the subtext next to Systems.');
} else {
    console.log('Failed to find the Systems flex row.');
}
