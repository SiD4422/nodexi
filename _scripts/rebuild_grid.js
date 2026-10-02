const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

// Find elements with class 'work-link'
const items = $('.work-link');
console.log('Total work-link items found:', items.length);

if (items.length >= 3) {
    // Project 1: Gateonix
    const p1 = $(items[0]);
    p1.find('h3, .heading-4').text('Gateonix');
    
    // Clear the tags wrapper and inject Nodexi tag
    const tagWrap1 = p1.find('.tags-wrap, .tag-wrap, .category-wrap, .pill-wrap').first();
    if(tagWrap1.length) {
        tagWrap1.html('<div class="tag" style="background:#fff; color:#000; padding:4px 12px; border-radius:20px; font-size:12px; display:inline-block; font-weight:600;">EDUCATION & ENGINEERING</div>');
    }
    
    // Update description text
    p1.find('.text-size-small, .text-size-regular, p, .project-desc, .details').last().text('Advanced Digital Logic and Computing Lab deployed for SRMIST University for building and simulating logic circuits.');
    p1.find('img').first().attr('src', '../assets/gateonix.png').removeAttr('srcset').removeAttr('sizes');
    p1.attr('href', 'project-gateonix.html');

    // Project 2: MultiSym Live
    const p2 = $(items[1]);
    p2.find('h3, .heading-4').text('MultiSym Live');
    const tagWrap2 = p2.find('.tags-wrap, .tag-wrap, .category-wrap, .pill-wrap').first();
    if(tagWrap2.length) {
        tagWrap2.html('<div class="tag" style="background:#fff; color:#000; padding:4px 12px; border-radius:20px; font-size:12px; display:inline-block; font-weight:600;">ENGINEERING & WEB APP</div>');
    }
    p2.find('.text-size-small, .text-size-regular, p, .project-desc, .details').last().text('Interactive digital-logic circuit simulator for building and testing complex gate-level designs directly in the browser.');
    p2.find('img').first().attr('src', '../assets/multisim-live.png').removeAttr('srcset').removeAttr('sizes');
    p2.attr('href', 'project-logic-simulator.html');

    // Project 3: Digital_Lab
    const p3 = $(items[2]);
    p3.find('h3, .heading-4').text('Digital_Lab');
    const tagWrap3 = p3.find('.tags-wrap, .tag-wrap, .category-wrap, .pill-wrap').first();
    if(tagWrap3.length) {
        tagWrap3.html('<div class="tag" style="background:#fff; color:#000; padding:4px 12px; border-radius:20px; font-size:12px; display:inline-block; font-weight:600;">EDUCATION & ENGINEERING</div>');
    }
    p3.find('.text-size-small, .text-size-regular, p, .project-desc, .details').last().text('Next-Gen Electric Circuits Lab Simulator. A real-time, interactive environment built for students to design and master complex circuits.');
    p3.find('img').first().attr('src', '../assets/digital-lab.png').removeAttr('srcset').removeAttr('sizes');
    p3.attr('href', 'project-digital-lab.html');

    // Delete all other items. We need to delete their wrappers if they are in a grid!
    for (let i = 3; i < items.length; i++) {
        // Find the topmost parent that is a grid item, or just remove the parent wrapper
        let parent = $(items[i]).parent();
        if (parent.hasClass('w-dyn-item') || parent.hasClass('grid-item') || parent.hasClass('list-item')) {
            parent.remove();
        } else {
            $(items[i]).remove(); // Just remove the link itself if no obvious wrapper
        }
    }
}

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('Project grid directly rebuilt.');
