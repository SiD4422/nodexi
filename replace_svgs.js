const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find SVGs in preloader and replace them
$('.preloader svg, .page-loader svg, .loader svg').each((i, el) => {
    console.log('Replacing preloader SVG...');
    const nodexiLogo = `<div class="${$(el).attr('class') || ''}" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 32px; font-weight: 800; letter-spacing: 4px; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100%;">NODEXI</div>`;
    $(el).replaceWith(nodexiLogo);
});

// Just in case the navbar logo was an SVG instead of an img (the first script caught the img, but maybe there's a mobile logo SVG)
$('.nav-logo svg, .logo svg').each((i, el) => {
    console.log('Replacing navbar SVG...');
    const nodexiLogo = `<div class="${$(el).attr('class') || ''}" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 28px; font-weight: 800; letter-spacing: 4px; color: #000000; display: flex; align-items: center; justify-content: center; height: 100%;">NODEXI</div>`;
    $(el).replaceWith(nodexiLogo);
});

fs.writeFileSync('index.html', $.html());
console.log('SVG logos replaced.');
