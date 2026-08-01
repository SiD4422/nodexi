const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove existing subtext
let subtext = $('p:contains("We design exceptional")').last();
if (subtext.length === 0) {
    subtext = $('.custom-hero-subtext').last();
}
subtext.remove();

const engineeredCopy = "We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.";
const newSubtextHTML = '<div class="custom-hero-subtext-wrapper" style="flex-grow: 1; display: flex; justify-content: flex-end; padding-right: 5vw;">' +
    '<p class="custom-hero-subtext" style="max-width: 400px; margin: 0; font-size: clamp(14px, 1.2vw, 18px); line-height: 1.5; color: #475569; font-family: Inter, sans-serif; text-align: left;">' + engineeredCopy + '</p>' +
'</div>';

// 1. Find the element whose EXACT text is "Systems Engineering" or "Systems "
let systemsParent = null;
$('*').each(function() {
    if ($(this).children().length === 1 && $(this).children().hasClass('custom-engineering')) {
        systemsParent = $(this).parent();
    }
});

if (systemsParent && systemsParent.length > 0) {
    systemsParent.append(newSubtextHTML);
    systemsParent.attr('style', (systemsParent.attr('style') || '') + ' width: 100%; display: flex; align-items: center; justify-content: space-between;');
    
    fs.writeFileSync('index.html', $.html());
    console.log('Subtext correctly injected via DOM tree traversal.');
} else {
    // Fallback: Just look for any element containing the text "Systems" that is a block/flex container
    let fallback = $('*:contains("Systems")').filter(function() {
        return $(this).css('display') === 'flex' || $(this).hasClass('showcase_marquee_flex');
    }).last();
    
    if (fallback.length > 0) {
        fallback.append(newSubtextHTML);
        fallback.attr('style', (fallback.attr('style') || '') + ' width: 100%; display: flex; align-items: center; justify-content: space-between;');
        fs.writeFileSync('index.html', $.html());
        console.log('Subtext injected via fallback.');
    } else {
        console.log('Could not find Systems parent.');
    }
}
