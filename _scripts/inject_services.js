const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

const services = $('.accordion-item, .list-parent, .service-item');
console.log('Found services:', services.length);

if (services.length >= 3) {
    // Service 1: Design -> Engineering
    $(services[0]).find('.heading-2, .heading-3, h2, h3').text('Engineering');
    $(services[0]).find('.text-size-regular, p').text('Advanced Software Architecture and Scalable Systems.');
    
    // Service 2: Strategy -> AI Solutions
    $(services[1]).find('.heading-2, .heading-3, h2, h3').text('AI Solutions');
    $(services[1]).find('.text-size-regular, p').text('Integrating LLMs and ML pipelines into production applications.');

    // Service 3: Development -> Security First
    $(services[2]).find('.heading-2, .heading-3, h2, h3').text('Security First');
    $(services[2]).find('.text-size-regular, p').text('Threat modeling and secure-by-default practices from day one. (ISO 27001 Compliant)');
}

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Services injection done.');
