const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Rename the section heading
// The user said it is "features design works" or "Featured Design Works"
let foundHeading = false;
$('h2, h3, .heading-2, .heading-3, .heading-4, .heading-large, .heading-huge').each((i, el) => {
    const text = $(el).text().toLowerCase();
    if (text.includes('feature') || text.includes('design work') || text.includes('featured')) {
        $(el).text('Engineered Platforms & Systems');
        foundHeading = true;
    }
});
if (!foundHeading) {
    // Maybe it's broken up or just says "Selected Works"
    $('*').each((i, el) => {
        if ($(el).children().length === 0) { // Leaf nodes only
            const text = $(el).text().toLowerCase().trim();
            if (text === 'featured works' || text === 'selected works' || text.includes('featured design works')) {
                $(el).text('Engineered Platforms & Systems');
            }
        }
    });
}

// 2. Inject the 3rd project and delete the rest
const projects = $('.w-dyn-item');
if (projects.length >= 3) {
    // Project 3: Digital_Lab
    const p3 = $(projects[2]);
    p3.find('h3').text('Digital_Lab');
    p3.find('.work_category, .tag, .text-size-small, .heading-7').text('EDUCATION & ENGINEERING');
    p3.find('a').attr('href', 'project-digital-lab.html');
    p3.find('img').attr('src', '../assets/digital-lab.png').removeAttr('srcset').removeAttr('sizes');
    
    // Remove all projects after index 2
    for (let i = 3; i < projects.length; i++) {
        $(projects[i]).remove();
    }
}

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Project grid updated and extra items removed.');
