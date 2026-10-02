const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the injected CSS
$('head link[href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap"]').remove();

$('head style').each((i, el) => {
    if ($(el).html().includes('TYPOGRAPHY OVERHAUL')) {
        $(el).remove();
    }
});

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Undid the CSS redesign.');
