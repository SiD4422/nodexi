const fs = require('fs');
const cheerio = require('cheerio');

const originalHtmlPath = 'C:/Users/spart/Desktop/startUP/nodexi-site (1)/nodexi-site/alien-clone-project/index.html';
const currentHtmlPath = 'index.html';

let originalHtml = fs.readFileSync(originalHtmlPath, 'utf8');
let currentHtml = fs.readFileSync(currentHtmlPath, 'utf8');

const $orig = cheerio.load(originalHtml);
const $curr = cheerio.load(currentHtml);

console.log("Locating the original portfolio section...");
let originalPortfolioSection = null;

// Find the portfolio section in original file
$orig('h2').each((i, el) => {
    if ($orig(el).text().trim() === 'FEATURED DESIGN WORKS') {
        originalPortfolioSection = $orig(el).closest('.section');
    }
});

if (originalPortfolioSection) {
    console.log("Found original portfolio section. Locating injection point in current file...");
    
    // Find the ABOUT US section in current file
    let aboutUsSection = null;
    $curr('h2, h3, .heading-7').each((i, el) => {
        if ($curr(el).text().trim().toUpperCase().includes('ABOUT US') || $curr(el).text().trim() === 'Trusted process') {
            aboutUsSection = $curr(el).closest('.section');
        }
    });
    
    if (aboutUsSection.length > 0) {
        console.log("Found ABOUT US section. Injecting portfolio right before it...");
        aboutUsSection.before(originalPortfolioSection);
        
        fs.writeFileSync(currentHtmlPath, $curr.html());
        console.log("Portfolio section successfully restored from original backup.");
    } else {
        console.log("Could not find ABOUT US section!");
    }
} else {
    console.log("Could not find original portfolio section!");
}
