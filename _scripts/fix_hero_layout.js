const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the complicated, broken marquee wrapper
$('.app-hero-title-wrap').remove();

// Insert a clean, massive header that matches the original typography
const cleanHero = `
<div class="app-hero-title-wrap" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding-top: 10vh;">
    <h1 class="heading-huge" style="color: #fff; line-height: 1.1; margin-bottom: 0;">
        Engineering
    </h1>
    <h1 class="heading-huge" style="color: #00f0ff; line-height: 1.1; margin-bottom: 0; background-color: #0a0a0a; padding: 0 20px; border-radius: 500px; display: inline-block; border: 1px solid #333;">
        software
    </h1>
    <h1 class="heading-huge" style="color: #fff; line-height: 1.1; margin-bottom: 0;">
        and digital
    </h1>
    <h1 class="heading-huge" style="color: #00f0ff; line-height: 1.1; margin-bottom: 0; background-color: #0a0a0a; padding: 0 20px; border-radius: 500px; display: inline-block; border: 1px solid #333;">
        experience
    </h1>
</div>
`;

$('.app-hero-content').prepend(cleanHero);

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Hero simplified and fixed.');
