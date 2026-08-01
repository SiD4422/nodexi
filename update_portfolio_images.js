const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Source image paths
const brainDir = "C:\\\\Users\\\\spart\\\\.gemini\\\\antigravity\\\\brain\\\\d8a3f4a6-f19e-4a4a-a9f9-b8e6e26efbe6";
const images = {
    iot: path.join(brainDir, "iot_telemetry_1785474715148.jpg"),
    aero: path.join(brainDir, "aerovision_edge_1785474726898.jpg"),
    cloud: path.join(brainDir, "corevault_cloud_1785474738116.jpg"),
    pcb: path.join(brainDir, "quantum_pcb_1785474750394.jpg")
};

// Copy them to the local project folder
const destDir = "C:\\\\Users\\\\spart\\\\Desktop\\\\startUP\\\\fresh test\\\\images";
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(images.iot, path.join(destDir, 'iot.jpg'));
fs.copyFileSync(images.aero, path.join(destDir, 'aero.jpg'));
fs.copyFileSync(images.cloud, path.join(destDir, 'cloud.jpg'));
fs.copyFileSync(images.pcb, path.join(destDir, 'pcb.jpg'));

// Read HTML
let html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log("Replacing portfolio images and fixing texts...");

// The 4 new project data
const newProjects = [
    { name: "Nexus IoT Telemetry", desc: "High-throughput telemetry pipeline handling 10M+ sensor events per second for industrial manufacturing.", img: "images/iot.jpg" },
    { name: "AeroVision Engine", desc: "Computer vision model optimized for edge devices to detect microscopic manufacturing defects in real-time.", img: "images/aero.jpg" },
    { name: "CoreVault Infrastructure", desc: "Zero-trust hybrid cloud architecture deployed across multiple regions with sub-millisecond failover capabilities.", img: "images/cloud.jpg" },
    { name: "Quantum Sync Board", desc: "Custom PCB design and low-level C++ firmware development for high-frequency algorithmic trading hardware.", img: "images/pcb.jpg" }
];

// Find the featured works section by finding the section containing the first project
const portfolioSection = $('*:contains("Nexus IoT Telemetry")').closest('.section');

if (portfolioSection.length > 0) {
    // 1. Force fix the main heading
    portfolioSection.find('.section-title').text('FEATURED ENGINEERING WORKS');
    
    // 2. Iterate through the project cards (usually .w-dyn-item or .collection-item)
    // We can find them by looking for the elements containing our project titles
    newProjects.forEach((proj, idx) => {
        const card = portfolioSection.find(`*:contains("${proj.name}")`).closest('.w-dyn-item, .collection-item, .margin-bottom, .project-card-wrap');
        
        if (card.length > 0) {
            // Replace the image source
            card.find('img').attr('src', proj.img);
            card.find('img').removeAttr('srcset'); // Remove srcset so it doesn't fallback to original images
            
            // Replace the background image if it uses divs instead
            card.find('div').each(function() {
                let style = $(this).attr('style');
                if (style && style.includes('background-image')) {
                    $(this).attr('style', style.replace(/url\([^)]+\)/, `url('${proj.img}')`));
                }
            });

            // Force fix the description (specifically for project 4 which failed regex)
            // The description is usually the sibling of the heading or the next p tag
            const descTag = card.find(`*:contains("${proj.name}")`).parent().find('p, h4, h5, div.text');
            if (descTag.length > 0) {
                // Find the one that actually contains the old text or our new text and force update it
                card.find('p').text(proj.desc);
            }
        }
    });
}

// Fallback regex replacement for the 4th description and main heading just in case Cheerio fails
html = $.html();
html = html.replace(/FEATURED DESIGN WORKS/g, 'FEATURED ENGINEERING WORKS');
html = html.replace(/Building a friendly neighborhood co-working space platform/g, 'Custom PCB design and low-level C++ firmware development for high-frequency algorithmic trading hardware.');

fs.writeFileSync('index.html', html);
console.log("Images and text successfully updated!");
