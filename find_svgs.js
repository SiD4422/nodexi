const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Find the section that has multiple svgs with 'logo' in their src or class
$('.section').each((i, el) => {
    const svgs = $(el).find('img[src*=".svg"], img[src*="logo"], svg');
    if (svgs.length > 5) {
        console.log(`Section ${i} class:`, $(el).attr('class'), 'has', svgs.length, 'SVGs/logos');
    }
});
