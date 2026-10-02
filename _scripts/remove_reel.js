const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the text "PLAY REEL" to target the section
let playReel = $('*:contains("PLAY REEL")').last();

if (playReel.length > 0) {
    // Webflow sections usually have the class .section
    let reelSection = playReel.closest('.section, section');
    
    if (reelSection.length > 0) {
        reelSection.remove();
        console.log('Removed reel section via .section closest match.');
    } else {
        // Fallback: Just remove the parent that contains all these images
        playReel.parent().parent().parent().remove();
        console.log('Removed reel section via parent fallback.');
    }
} else {
    console.log('Could not find PLAY REEL text.');
}

fs.writeFileSync('index.html', $.html());
