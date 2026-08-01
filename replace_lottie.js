const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the Lottie animation
$('.loader-img').replaceWith(`<div class="loader-img" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 64px; font-weight: 800; letter-spacing: 12px; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100%; text-shadow: 0 0 20px rgba(0, 229, 255, 0.5);">NODEXI</div>`);

fs.writeFileSync('index.html', $.html());
console.log('Lottie preloader replaced.');
