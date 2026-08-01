const fs = require('fs');
const cheerio = require('cheerio');

const originalHtmlPath = 'C:/Users/spart/Desktop/startUP/nodexi-site (1)/nodexi-site/alien-clone-project/index.html';
const currentHtmlPath = 'index.html';

let originalHtml = fs.readFileSync(originalHtmlPath, 'utf8');
let currentHtml = fs.readFileSync(currentHtmlPath, 'utf8');

const $orig = cheerio.load(originalHtml);
const $curr = cheerio.load(currentHtml);

console.log("Restoring the Hero section...");

// Find the hero section in original. It's usually the first section with data-w-id or class hero
let origHero = null;
$orig('.section').each((i, el) => {
    const text = $orig(el).text().toLowerCase();
    if (text.includes('digital agency') || text.includes('award winning') || $orig(el).hasClass('hero')) {
        origHero = $orig(el);
        return false;
    }
});

if (!origHero) {
    origHero = $orig('.section').first(); // Fallback to first section
}

if (origHero.length > 0) {
    // Inject it immediately after the navbar or at the very top of body
    const navbar = $curr('.navbar, nav');
    if (navbar.length > 0) {
        navbar.after(origHero);
    } else {
        $curr('body').prepend(origHero);
    }
    
    fs.writeFileSync(currentHtmlPath, $curr.html());
    console.log("Hero section grafted back successfully.");
} else {
    console.log("Could not locate original Hero section.");
}
