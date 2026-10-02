const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the nav logo that contains NODEXI
$('.nav-logo, .logo').each((i, el) => {
    let style = $(el).attr('style') || '';
    // Let's crank up the font-weight and add a slight text-stroke to forcefully thicken the letters
    style = style.replace(/font-weight:\s*\d+;/, 'font-weight: 900;');
    if (!style.includes('-webkit-text-stroke')) {
        style += ' -webkit-text-stroke: 1px #000000;';
    }
    // Also increase the font size slightly if it looks too small
    style = style.replace(/font-size:\s*28px;/, 'font-size: 32px;');
    $(el).attr('style', style);
});

fs.writeFileSync('index.html', $.html());
console.log('Navbar logo made super bold.');
