const fs = require('fs');
const cheerio = require('cheerio');

const originalHtmlPath = 'C:/Users/spart/Desktop/startUP/nodexi-site (1)/nodexi-site/alien-clone-project/index.html';
const currentHtmlPath = 'index.html';

let originalHtml = fs.readFileSync(originalHtmlPath, 'utf8');
let currentHtml = fs.readFileSync(currentHtmlPath, 'utf8');

const $orig = cheerio.load(originalHtml);
const $curr = cheerio.load(currentHtml);

console.log("Checking for navbar...");
let currentNavbar = $curr('.navbar, nav, [data-collapse="medium"]');

if (currentNavbar.length === 0) {
    console.log("Navbar is missing! Restoring from original...");
    
    // Find the navbar in original
    let origNavbar = $orig('.navbar, nav, [data-collapse="medium"]').first();
    
    if (origNavbar.length > 0) {
        $curr('body').prepend(origNavbar);
        fs.writeFileSync(currentHtmlPath, $curr.html());
        console.log("Navbar successfully restored to the top of the body.");
    } else {
        console.log("Could not find navbar in original file!");
    }
} else {
    console.log("Navbar is already present. Maybe it's hidden by CSS?");
    currentNavbar.attr('style', 'display: block !important; opacity: 1 !important; visibility: visible !important;');
    fs.writeFileSync(currentHtmlPath, $curr.html());
}
