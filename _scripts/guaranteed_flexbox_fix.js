const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the problematic CSS we injected earlier that is causing the grid to collapse
html = html.replace(/<style id="nodexi-master-styles">[\s\S]*?<\/style>/g, '');
html = html.replace(/<style id="nodexi-final-layout-patch">[\s\S]*?<\/style>/g, '');

const $ = cheerio.load(html);

console.log("Applying guaranteed flexbox layout...");

// 2. Fix the main grid (left heading vs right bullet points)
$('.w-layout-grid.grid-3').each(function() {
    $(this).removeClass('w-layout-grid grid-3');
    // Force a flexible row that won't crush the right side
    $(this).attr('style', 'display: flex; flex-direction: row; gap: 40px; justify-content: space-between; align-items: flex-start; width: 100%; margin-bottom: 80px; flex-wrap: wrap;');
    
    // Left column (the massive heading)
    let leftCol = $(this).children('div').first();
    leftCol.attr('style', 'flex: 0 0 35%; min-width: 300px;');
    
    // Make the heading a reasonable size so it doesn't push things around
    leftCol.find('h1, h2, h3').attr('style', 'font-size: 3rem !important; line-height: 1.1; margin: 0; white-space: normal;');

    // Right column (the wrapper for the two columns of bullet points)
    let rightColWrapper = $(this).children('div').last();
    rightColWrapper.removeClass('w-layout-grid grid-2');
    rightColWrapper.attr('style', 'display: flex; flex-direction: row; gap: 40px; flex: 1; min-width: 400px; justify-content: flex-start; flex-wrap: wrap;');

    // The actual columns of bullet points inside the right wrapper
    rightColWrapper.children('div').each(function() {
        $(this).removeClass('service-txt-wrap');
        $(this).attr('style', 'flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 12px;');
        
        // The individual bullet points
        $(this).find('h1, h2, h3, h4, h5, h6, p').each(function() {
            $(this).removeClass('service-txt skew-up');
            $(this).attr('style', 'font-size: 18px !important; font-weight: 500; color: #111827; margin: 0; white-space: normal; line-height: 1.5; font-family: Inter, sans-serif;');
        });
    });
});

fs.writeFileSync('index.html', $.html());
console.log("Layout completely rewritten with bulletproof flexbox.");
