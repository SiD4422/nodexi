const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('C:/Users/spart/Desktop/startUP/nodexi-site (1)/nodexi-site/index.html', 'utf8');
const $ = cheerio.load(html);

console.log("Original Projects:");
$('.w-dyn-item').each(function() {
    const title = $(this).find('h3, h2').text().trim();
    const tag = $(this).find('.work_category, .tag, .text-size-small, .heading-7').text().trim();
    const desc = $(this).find('p').text().trim();
    const imgSrc = $(this).find('img').attr('src');
    if (title) {
        console.log(`- Title: ${title}`);
        console.log(`  Tag: ${tag}`);
        console.log(`  Desc: ${desc}`);
        console.log(`  Img: ${imgSrc}`);
    }
});
