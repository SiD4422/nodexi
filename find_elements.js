const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Find the client grid
console.log('Finding HDFC or TVS...');
$('.section').each((i, el) => {
    const text = $(el).text();
    if (text.includes('HDFC') || text.includes('TVS') || text.includes('IIFL')) {
        console.log('Found client section class:', $(el).attr('class'));
        // Find the inner grid wrapper
        $(el).find('div').each((j, div) => {
             if ($(div).attr('class') && $(div).attr('class').includes('grid')) {
                 console.log('Grid class:', $(div).attr('class'));
             }
        });
    }
});

// Find the service images
console.log('\nFinding service hover images...');
const services = $('.list-parent, .service-item, .accordion-item');
services.each((i, el) => {
    const img = $(el).find('img');
    if (img.length > 0) {
        console.log(`Service ${i} image:`, img.attr('src'));
        console.log(`Service ${i} image class:`, img.attr('class'));
    }
});
