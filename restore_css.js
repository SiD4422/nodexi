const fs = require('fs');
const cheerio = require('cheerio');

const raw = fs.readFileSync('alien_raw.html', 'utf8');
const $raw = cheerio.load(raw);

const target = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $target = cheerio.load(target);

// Find the main Webflow stylesheet link in the raw file
let cssLink = '';
$raw('link').each((i, el) => {
    const href = $raw(el).attr('href');
    if (href && href.includes('alien-new.webflow.shared')) {
        console.log('Found original CSS:', href);
        // We recreate the link string without CORS integrity (since that blocked it before)
        cssLink = `<link href="${href}" rel="stylesheet" type="text/css"/>`;
    }
});

if (cssLink) {
    // Check if target already has it
    let hasIt = false;
    $target('link').each((i, el) => {
        if ($target(el).attr('href') && $target(el).attr('href').includes('alien-new.webflow.shared')) {
            hasIt = true;
        }
    });

    if (!hasIt) {
        console.log('Injecting missing CSS link into head...');
        $target('head').append(cssLink);
        fs.writeFileSync('alien-clone-project/index.html', $target.html());
    } else {
        console.log('Target already has the CSS link.');
    }
} else {
    console.log('Could not find the original CSS link.');
}
