const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the entire logo grid section
// The logo grid usually has a class like .section.is-logos or we can find it by looking for the wrapper of the HDFC image
let logoImg = $('img[src*="HDFC"], img[alt*="HDFC"]').first();
if (logoImg.length > 0) {
    let logoSection = logoImg.closest('.section, section');
    if (logoSection.length > 0) {
        logoSection.remove();
    } else {
        // Fallback: remove the parent container
        logoImg.parent().parent().remove();
    }
}

fs.writeFileSync('index.html', $.html());
console.log('Removed entire logo grid section.');
