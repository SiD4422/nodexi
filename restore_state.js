const fs = require('fs');
const cheerio = require('cheerio');

const rawHtml = fs.readFileSync('alien_raw.html', 'utf8');
const $raw = cheerio.load(rawHtml);

const currentHtml = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(currentHtml);

// 1. Restore the entire Services section from the raw template
const rawServiceSection = $raw('.section.service').html();
$('.section.service').html(rawServiceSection);

// 2. Re-apply inject_services.js logic
const services = $('.accordion-item, .list-parent, .service-item');
if (services.length >= 3) {
    // Service 1: Design -> Engineering
    $(services[0]).find('.heading-2, .heading-3, h2, h3').text('Engineering');
    $(services[0]).find('.text-size-regular, p').first().text('Advanced Software Architecture and Scalable Systems.');
    
    // Service 2: Strategy -> AI Solutions
    $(services[1]).find('.heading-2, .heading-3, h2, h3').text('AI Solutions');
    $(services[1]).find('.text-size-regular, p').first().text('Integrating LLMs and ML pipelines into production applications.');

    // Service 3: Development -> Security First
    $(services[2]).find('.heading-2, .heading-3, h2, h3').text('Security First');
    $(services[2]).find('.text-size-regular, p').first().text('Threat modeling and secure-by-default practices from day one. (ISO 27001 Compliant)');
}

// 3. Re-apply remove_hover.js logic
$('.service-img').each((i, el) => {
    const parent = $(el).parent();
    if (parent.attr('class') && (parent.attr('class').includes('wrap') || parent.attr('class').includes('img') || parent.attr('class').includes('hover'))) {
        parent.remove();
    } else {
        $(el).remove();
    }
});

// Also, let's verify there are no CSS overrides or custom fonts left anywhere
$('link[href*="Space+Grotesk"]').remove();
$('style').each((i, el) => {
    const content = $(el).html() || $(el).text();
    if (content && (content.includes('TYPOGRAPHY') || content.includes('2px !important'))) {
        $(el).remove();
    }
});

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Services section flawlessly restored to pre-declone state.');
