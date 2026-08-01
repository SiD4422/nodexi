const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the hover image containers inside the services
// Let's remove the '.service-img' completely, and its immediate wrapper if it's just for the image
$('.service-img').each((i, el) => {
    // Webflow hover images are usually wrapped in a div that handles the position/opacity
    // Let's remove the parent if it has a class like 'hover', 'img-wrap', etc.
    const parent = $(el).parent();
    if (parent.attr('class') && (parent.attr('class').includes('wrap') || parent.attr('class').includes('img') || parent.attr('class').includes('hover'))) {
        parent.remove();
    } else {
        $(el).remove();
    }
});

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Hover feature removed.');
