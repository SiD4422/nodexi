const fs = require('fs');
const cheerio = require('cheerio');

// 1. Reset from raw template
const rawPath = 'C:\\Users\\spart\\Desktop\\startUP\\nodexi-site (1)\\nodexi-site\\alien_raw.html';
let html = fs.readFileSync(rawPath, 'utf8');

// 2. Fix CORS
html = html.replace(/ integrity="[^"]*" crossorigin="anonymous"/g, '');

// 3. Rename Alien to Nodexi
html = html.replace(/Alien/g, 'Nodexi').replace(/ALIEN/g, 'NODEXI');

// 4. Load into Cheerio for DOM manipulation
const $ = cheerio.load(html);

// 5. Replace image logos with Nodexi text
$('img').each((i, el) => {
    const src = $(el).attr('src') || '';
    const alt = $(el).attr('alt') || '';
    const className = $(el).attr('class') || '';
    if (src.toLowerCase().includes('logo') || alt.toLowerCase().includes('logo') || className.toLowerCase().includes('logo')) {
        const isPreloader = className.includes('preloader') || $(el).parents('.preloader').length > 0 || $(el).parents('.loader').length > 0;
        const color = isPreloader ? '#ffffff' : '#000000';
        const nodexiLogo = `<div class="${className}" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 32px; font-weight: 900; letter-spacing: 4px; color: ${color}; display: flex; align-items: center; justify-content: center; height: 100%; -webkit-text-stroke: 1px #000000;">NODEXI</div>`;
        $(el).replaceWith(nodexiLogo);
    }
});

// 6. Replace Lottie Preloader
$('.loader-img').replaceWith(`
<style>
@keyframes nodexi-glow {
    0%, 100% { color: #ffffff; text-shadow: none; }
    33% { color: #8a2be2; text-shadow: 0 0 20px #8a2be2; }
    66% { color: #00e5ff; text-shadow: 0 0 20px #00e5ff; }
}
.nodexi-char-1 { animation: nodexi-glow 3s infinite; animation-delay: 0.2s; }
.nodexi-char-3 { animation: nodexi-glow 3s infinite; animation-delay: 0.6s; }
.nodexi-char-5 { animation: nodexi-glow 3s infinite; animation-delay: 1.0s; }
</style>
<div class="loader-img" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 64px; font-weight: 800; letter-spacing: 12px; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100%;">
    <span>N</span><span class="nodexi-char-1">O</span><span>D</span><span class="nodexi-char-3">E</span><span>X</span><span class="nodexi-char-5">I</span>
</div>
`);

fs.writeFileSync('index.html', $.html());
console.log('Restored to pre-declone state with logos intact.');
