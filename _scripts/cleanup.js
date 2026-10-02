const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Remove Section 1 (the static client grid)
const secondSection = $('.section').eq(1);
if (secondSection.find('img').length >= 4) {
    // Looks like a logo grid, remove it
    secondSection.remove();
}

// Replace service hover images
const serviceImgs = $('.service-img');
if (serviceImgs.length >= 3) {
    // Engineering
    $(serviceImgs[0]).attr('src', '../assets/gateonix.png').removeAttr('srcset').removeAttr('sizes').attr('style', 'object-fit: cover;');
    // AI Solutions
    $(serviceImgs[1]).attr('src', '../assets/multisim-live.png').removeAttr('srcset').removeAttr('sizes').attr('style', 'object-fit: cover;');
    // Security First
    $(serviceImgs[2]).attr('src', '../assets/nodexi-logo.png').removeAttr('srcset').removeAttr('sizes').attr('style', 'object-fit: contain; filter: invert(1); background: #000;');
}

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Cleanup and hover image replacement complete.');
