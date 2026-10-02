const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove the rogue hider CSS completely so the panel comes back
$('#nodexi-rogue-hider').remove();
$('.hide-rogue-element').removeClass('hide-rogue-element');

// 2. Map of exact replacements to convert the Branding panel into Hardware Architectures
const hardwareSwaps = {
    // The main heading (currently says "NODEXI" due to an earlier rename, or "Branding")
    "NODEXI": "Hardware Architectures",
    "Branding": "Hardware Architectures",
    
    // The bullet points
    "Visual branding": "Embedded Systems",
    "Packaging design": "IoT Integrations",
    "Brand Strategy": "Edge Computing",
    "Print collaterals": "Custom PCB Design",
    "Identity Development": "Firmware Development",
    "Brand guidelines": "Telemetry Systems",
    "Digital assets": "Hardware-Cloud Sync"
};

// 3. Find and swap the text
$('h1, h2, h3, h4, h5, h6, div, span, p, li').each(function() {
    // Only target leaf nodes (text elements)
    if ($(this).children().length === 0 || ($(this).children().length === 1 && $(this).children().is('br'))) {
        let text = $(this).text().trim();
        
        // Specific exception: we only want to change "NODEXI" if it is part of this specific list/heading, 
        // not the main logo in the navbar.
        if (text === "NODEXI") {
            // Check if it's a heading tag, or if its sibling contains one of our hardware services
            if ($(this).is('h2, h3, h4') || $(this).closest('.section, .w-layout-grid').text().includes('Visual branding')) {
                $(this).text(hardwareSwaps[text]);
            }
        } else if (hardwareSwaps[text]) {
            $(this).text(hardwareSwaps[text]);
        }
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Branding panel safely converted into Hardware Architectures.');
