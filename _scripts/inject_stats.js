const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Find the numbers section
// Usually there are big numbers like 100+ or 50+
const statNumbers = $('.heading-large');
console.log('Found large headings:', statNumbers.length);

if (statNumbers.length >= 2) {
    $(statNumbers[0]).text('50+');
    $(statNumbers[0]).siblings().first().text('Projects Shipped');

    $(statNumbers[1]).text('ISO 27001');
    $(statNumbers[1]).siblings().first().text('Compliant');
}

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Stats injection done.');
