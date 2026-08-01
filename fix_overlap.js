const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove EVERY instance of the subtext (both old and new)
$('p, div').each(function() {
    let text = $(this).text();
    if (text.includes("We design exceptional") || text.includes("We build scalable digital infrastructure")) {
        // Only remove if it's the actual paragraph, not a huge wrapper
        if ($(this).children().length <= 1) {
             $(this).remove();
        }
    }
});
$('.custom-hero-subtext-wrapper').remove();
$('.custom-hero-subtext').remove();

// 2. The heavy engineering copy
const engineeredCopy = "We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.";

const newSubtextHTML = '<div class="custom-hero-subtext-wrapper" style="flex-grow: 1; display: flex; justify-content: flex-end; padding-right: 5vw; min-width: 300px;">' +
    '<p class="custom-hero-subtext" style="max-width: 400px; margin: 0; font-size: clamp(14px, 1.2vw, 18px); line-height: 1.5; color: #475569; font-family: Inter, sans-serif; text-align: left;">' + engineeredCopy + '</p>' +
'</div>';

// 3. Inject it cleanly into the Systems parent
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
    console.log('Cleaned and re-injected subtext.');
} else {
    // Fallback
    let fallback = $('*:contains("Systems")').filter(function() {
        return $(this).css('display') === 'flex' || $(this).hasClass('showcase_marquee_flex');
    }).last();
    if (fallback.length > 0) {
        fallback.append(newSubtextHTML);
        fallback.attr('style', (fallback.attr('style') || '') + ' width: 100%; display: flex; align-items: center; justify-content: space-between;');
        fs.writeFileSync('index.html', $.html());
        console.log('Cleaned and re-injected via fallback.');
    }
}
