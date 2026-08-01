const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Find elements containing 'software' or 'experience'
$('*').each((i, el) => {
    if ($(el).children().length === 0) { // Leaf nodes only
        const text = $(el).text().toLowerCase();
        if (text.includes('software') || text.includes('experience')) {
            console.log('Found:', text);
            let parent = $(el).parent();
            // Get the HTML of the 3rd parent up to see the structure
            if (parent && parent.parent() && parent.parent().parent()) {
                console.log(parent.parent().parent().html());
                return false; // Break the loop
            }
        }
    }
});
