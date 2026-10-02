const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Source image paths from original Nodexi site
const srcAssets = "C:/Users/spart/Desktop/startUP/nodexi-site (1)/nodexi-site/assets";
const images = {
    gateonix: path.join(srcAssets, "gateonix.png"),
    multisym: path.join(srcAssets, "multisim-live.png"),
    digitallab: path.join(srcAssets, "digital-lab.png")
};

// Copy them to the local project folder
const destDir = "C:/Users/spart/Desktop/startUP/fresh test/images";
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(images.gateonix, path.join(destDir, 'gateonix.png'));
fs.copyFileSync(images.multisym, path.join(destDir, 'multisim-live.png'));
fs.copyFileSync(images.digitallab, path.join(destDir, 'digital-lab.png'));

// Read HTML
let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log("Injecting authentic Nodexi projects...");

// The 3 real projects
const realProjects = [
    { 
        name: "Gateonix", 
        desc: "Advanced Digital Logic and Computing Lab. A browser-native environment for designing, simulating, and understanding digital logic circuits.", 
        img: "images/gateonix.png",
        tag1: "Digital Logic",
        tag2: "Circuit Simulation"
    },
    { 
        name: "MultiSym Live", 
        desc: "Interactive digital-logic circuit simulator for building and testing gate-level designs in the browser. Engineered entirely from scratch.", 
        img: "images/multisim-live.png",
        tag1: "Browser Engine",
        tag2: "Interactive Tech"
    },
    { 
        name: "Digital_Lab", 
        desc: "Next-Gen Electric Circuits Lab Simulator. A real-time, interactive simulation environment built specifically for students to design and master circuits.", 
        img: "images/digital-lab.png",
        tag1: "Physics Engine",
        tag2: "Real-time Sim"
    }
];

const portfolioSection = $('*:contains("FEATURED ENGINEERING WORKS")').closest('.section');

if (portfolioSection.length > 0) {
    const cards = portfolioSection.find('.w-dyn-item, .collection-item, .project-card-wrap');
    
    // Inject the 3 real projects
    realProjects.forEach((proj, idx) => {
        if (cards[idx]) {
            const card = $(cards[idx]);
            // Force replace the title (which was previously our placeholder)
            card.find('h1, h2, h3').text(proj.name);
            // Replace description
            card.find('p').text(proj.desc);
            // Replace image
            card.find('img').attr('src', proj.img).removeAttr('srcset');
            
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
console.log("Authentic Nodexi portfolio successfully injected. 4th card removed.");
