const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove the background video showreel from the hero
$('.app-hero-bg-block').remove();
$('.app-hero-img-nav').remove();
$('[data-video-urls]').remove();

// 2. Remove the showreel section (if it exists)
$('.section').each((i, el) => {
    const text = $(el).text().toLowerCase();
    if (text.includes('showreel') || text.includes('we worked with')) {
        $(el).remove();
    }
});

// 3. Remove client logos
$('.client_logo_wrap').remove();

// 4. Inject Gateonix and MultiSym Live into the Work section
const projects = $('.work_item'); // Check if this class exists in Webflow

if (projects.length >= 2) {
    // Project 1: Gateonix
    const p1 = $(projects[0]);
    p1.find('h3, .heading-3').text('Gateonix');
    p1.find('.work_tag, .tag, .text-size-small').first().text('EDUCATION & ENGINEERING');
    p1.find('a').attr('href', 'project-gateonix.html');
    p1.find('img').attr('src', '../assets/gateonix.png').removeAttr('srcset');

    // Project 2: MultiSym Live
    const p2 = $(projects[1]);
    p2.find('h3, .heading-3').text('MultiSym Live');
    p2.find('.work_tag, .tag, .text-size-small').first().text('ENGINEERING & WEB APP');
    p2.find('a').attr('href', 'project-logic-simulator.html');
    p2.find('img').attr('src', '../assets/multisim-live.png').removeAttr('srcset');
}

// Write the changes back
fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Migration Complete. Projects found:', projects.length);
