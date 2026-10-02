const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

$('.section').each((i, el) => {
    const text = $(el).text();
    if (text.includes('100+') || text.includes('50+') || text.includes('70+') || text.includes('10+')) {
        console.log('Found stats in section:', $(el).attr('class'));
        const numbers = $(el).find('h2, h3, .heading-2, .heading-3, h4, .text-size-large, .text-size-huge');
        numbers.each((j, num) => console.log('Number class:', $(num).attr('class'), 'Text:', $(num).text()));
    }
});
