const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const animatedPreloader = `
<style>
@keyframes nodexi-glow {
    0%, 100% { color: #ffffff; text-shadow: none; }
    33% { color: #8a2be2; text-shadow: 0 0 20px #8a2be2; } /* Purple glow */
    66% { color: #00e5ff; text-shadow: 0 0 20px #00e5ff; } /* Cyan glow */
}
.nodexi-char-1 { animation: nodexi-glow 3s infinite; animation-delay: 0.2s; }
.nodexi-char-3 { animation: nodexi-glow 3s infinite; animation-delay: 0.6s; }
.nodexi-char-5 { animation: nodexi-glow 3s infinite; animation-delay: 1.0s; }
</style>
<div class="loader-img" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 64px; font-weight: 800; letter-spacing: 12px; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100%;">
    <span>N</span>
    <span class="nodexi-char-1">O</span>
    <span>D</span>
    <span class="nodexi-char-3">E</span>
    <span>X</span>
    <span class="nodexi-char-5">I</span>
</div>
`;

// Find our previously injected NODEXI preloader and replace it
$('.loader-img').replaceWith(animatedPreloader);

fs.writeFileSync('index.html', $.html());
console.log('Animated preloader injected.');
