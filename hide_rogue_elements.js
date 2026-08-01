const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Hide the exact header element that says "NODEXI"
$('h1, h2, h3, h4, h5, h6, div, span').each(function() {
    // Only target elements that are leaf nodes or have very little nested content
    if ($(this).children().length <= 1) {
        if ($(this).text().trim() === "NODEXI") {
            // Give it a special class to hide it
            $(this).addClass('hide-rogue-element');
        }
    }
});

// 2. Hide the list items containing the rogue branding services
const rogueServices = [
    "Visual branding", "Packaging design", "Brand Strategy",
    "Print collaterals", "Identity Development", "Brand guidelines", "Digital assets"
];

$('*').each(function() {
    if ($(this).children().length === 0) { // Leaf nodes only
        let text = $(this).text().trim();
        if (rogueServices.includes(text)) {
            // Give the element itself AND its direct parent a hiding class
            $(this).addClass('hide-rogue-element');
            $(this).parent().addClass('hide-rogue-element');
            // If it's in a list item, hide the list item too
            if ($(this).closest('li, .collection-item, .w-dyn-item').length > 0) {
                 // But only if that list item doesn't contain the good services!
                 let wrapper = $(this).closest('li, .collection-item, .w-dyn-item');
                 if (!wrapper.text().includes("Cloud & Infrastructure")) {
                     wrapper.addClass('hide-rogue-element');
                 }
            }
        }
    }
});

// Inject CSS to hide all these rogue elements securely without touching the layout wrappers
const css = `
<style id="nodexi-rogue-hider">
.hide-rogue-element {
    display: none !important;
}
</style>
`;
$('#nodexi-rogue-hider').remove();
$('head').append(css);

fs.writeFileSync('index.html', $.html());
console.log('Rogue branding elements individually hidden.');
