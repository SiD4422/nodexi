const fs = require('fs');
const cheerio = require('cheerio');

const originalHtmlPath = 'C:/Users/spart/Desktop/startUP/nodexi-site (1)/nodexi-site/alien-clone-project/index.html';
const currentHtmlPath = 'index.html';

let originalHtml = fs.readFileSync(originalHtmlPath, 'utf8');
let currentHtml = fs.readFileSync(currentHtmlPath, 'utf8');

const $orig = cheerio.load(originalHtml);
const $curr = cheerio.load(currentHtml);

console.log("Locating the original portfolio section via grid elements...");
let originalPortfolioSection = null;

// The portfolio section in the original file is the one containing the .w-dyn-list
const dynLists = $orig('.w-dyn-list');
if (dynLists.length > 0) {
    originalPortfolioSection = $orig(dynLists[0]).closest('.section');
}

if (originalPortfolioSection && originalPortfolioSection.length > 0) {
    console.log("Found original portfolio section. Locating injection point in current file...");
    
    // Find the ABOUT US section in current file
    let aboutUsSection = null;
    $curr('h2, h3, h4, h5, h6, .heading-7, p').each((i, el) => {
        if ($curr(el).text().trim().toUpperCase().includes('ABOUT US') || $curr(el).text().trim().includes('Trusted process')) {
            aboutUsSection = $curr(el).closest('.section');
            return false; // break the loop
        }
    });
    
    if (aboutUsSection && aboutUsSection.length > 0) {
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
