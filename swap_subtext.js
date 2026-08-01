const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the paragraph containing "We design exceptional"
$('p:contains("We design exceptional")').each(function() {
    $(this).text("We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.");
});

fs.writeFileSync('index.html', $.html());
console.log('Subtext paragraph successfully replaced.');
