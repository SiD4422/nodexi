const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the ENTIRE webflow hero section
$('.section.is-hero.home').remove();

// Create a completely custom, clean hero section with no Webflow classes
const customHero = `
<section class="custom-nodexi-hero" style="background-color: #000000; width: 100%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; overflow: hidden; position: relative;">
    <div style="text-align: center; font-family: 'Space Grotesk', sans-serif, system-ui; text-transform: uppercase; letter-spacing: -2px;">
        <h1 style="color: #ffffff; font-size: clamp(40px, 8vw, 120px); font-weight: 700; margin: 0; line-height: 1.1;">
            ENGINEERING
        </h1>
        <div style="margin: 10px 0;">
            <span style="display: inline-block; background-color: #0d0d0d; border: 1px solid #333; border-radius: 500px; padding: 0 40px; color: #00e5ff; font-size: clamp(40px, 8vw, 120px); font-weight: 700; line-height: 1.1; margin: 0;">
                SOFTWARE
            </span>
        </div>
        <h1 style="color: #ffffff; font-size: clamp(40px, 8vw, 120px); font-weight: 700; margin: 0; line-height: 1.1;">
            AND DIGITAL
        </h1>
        <div style="margin: 10px 0;">
            <span style="display: inline-block; background-color: #0d0d0d; border: 1px solid #333; border-radius: 500px; padding: 0 40px; color: #00e5ff; font-size: clamp(40px, 8vw, 120px); font-weight: 700; line-height: 1.1; margin: 0;">
                <span style="color: #fff; font-size: 0.6em; vertical-align: middle;">✦</span> EXPERIENCE
            </span>
        </div>
    </div>
</section>
`;

// Insert it right after the navbar wrapper or body start
if ($('.navbar_wrapper').length > 0) {
    $('.navbar_wrapper').after(customHero);
} else {
    $('body').prepend(customHero);
}

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Nuclear option executed. Clean hero injected.');
