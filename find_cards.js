const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Searching for Better Invest...');
// Find elements containing 'Better Invest'
$('*').each((i, el) => {
    if ($(el).children().length === 0) { // Leaf nodes
        if ($(el).text().includes('Better Invest')) {
            console.log('Found:', $(el).text(), '| Tag:', $(el).prop('tagName'), '| Class:', $(el).attr('class'));
            // Print the classes of its parents up to 3 levels
            let parent = $(el).parent();
            for(let level=1; level<=3; level++) {
                if(parent) {
                    console.log(`  Parent ${level}:`, parent.prop('tagName'), '| Class:', parent.attr('class'));
                    parent = parent.parent();
                }
            }
        }
    }
});
