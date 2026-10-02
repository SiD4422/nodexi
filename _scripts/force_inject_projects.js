const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log("Forcing injection of authentic Nodexi projects...");

// Find the portfolio section via DOM structure rather than text content (which was failing due to case differences)
const portfolioSection = $('.w-dyn-item').first().closest('.section');

if (portfolioSection.length > 0) {
    // 1. Force fix the main heading
    portfolioSection.find('h2.section-title, .section-title, h3, h2').first().text('Engineered Platforms & Systems');

    const cards = portfolioSection.find('.w-dyn-item, .collection-item, .project-card-wrap');
    
    const realProjects = [
        { 
            name: "Gateonix", 
            desc: "Advanced Digital Logic and Computing Lab. A browser-native environment for designing, simulating, and understanding digital logic circuits.", 
            img: "images/gateonix.png",
            tag1: "Digital Logic",
            tag2: "Circuit Sim"
        },
        { 
            name: "MultiSym Live", 
            desc: "Interactive digital-logic circuit simulator for building and testing gate-level designs in the browser. Engineered entirely from scratch.", 
            img: "images/multisim-live.png",
            tag1: "Browser Engine",
            tag2: "Interactive"
        },
        { 
            name: "Digital_Lab", 
            desc: "Next-Gen Electric Circuits Lab Simulator. A real-time, interactive simulation environment built specifically for students to design and master circuits.", 
            img: "images/digital-lab.png",
            tag1: "Physics Engine",
            tag2: "Real-time"
        }
    ];

    // Inject the 3 real projects
    realProjects.forEach((proj, idx) => {
        if (cards[idx]) {
            const card = $(cards[idx]);
            // Force replace the title
            card.find('h1, h2, h3').text(proj.name);
            // Replace description
            card.find('p').text(proj.desc);
            // Replace image
            card.find('img').attr('src', proj.img).removeAttr('srcset').removeAttr('sizes');
            
            // Replace tags (they are usually inside divs or spans with small text classes)
            const tags = card.find('.tag, .work_category, .text-size-small, [class*="badge"]');
            if (tags.length >= 2) {
                $(tags[0]).text(proj.tag1);
                $(tags[1]).text(proj.tag2);
            }
        }
    });

    // Delete the 4th project card entirely to match the authentic portfolio length
    if (cards.length > 3) {
        for(let i = 3; i < cards.length; i++) {
            $(cards[i]).remove();
        }
    }
}

fs.writeFileSync('index.html', $.html());
console.log("Bulletproof injection complete.");
