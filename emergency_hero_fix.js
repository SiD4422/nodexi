const fs = require('fs');
const cheerio = require('cheerio');

const currentHtmlPath = 'index.html';
let html = fs.readFileSync(currentHtmlPath, 'utf8');
const $ = cheerio.load(html);

console.log("Locating the broken Crafting hero section...");

let heroSection = null;

// Find the section that contains "Crafting and digital"
$('.section').each((i, el) => {
    if ($(el).text().includes('Crafting')) {
        heroSection = $(el);
        return false;
    }
});

// Also fix the huge NODEXI logo in the navbar if it's black and hard to read, or missing
$('.navbar .logo, .navbar .brand').attr('style', "font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 36px; font-weight: 900; letter-spacing: 4px; color: #000000; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 100%;").text('NODEXI');

if (heroSection && heroSection.length > 0) {
    console.log("Hero section found. Overwriting completely with pure Nodexi layout...");
    
    const nodexiHero = `
    <div style="padding: 15vh 5vw 10vh 5vw; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; width: 100%; max-width: 1400px; margin: 0 auto;">
        
        <!-- ROW 1: Heavy-Duty -->
        <div style="display: flex; align-items: center; justify-content: flex-start; gap: 20px; width: 100%; margin-bottom: 5px;">
            <h1 style="margin: 0; padding: 0; font-size: clamp(40px, 8vw, 110px); line-height: 0.9; text-align: left; font-family: 'Inter', sans-serif; font-weight: 900; letter-spacing: -0.02em; color: #000000; text-transform: uppercase;">Heavy-Duty</h1>
            <div style="background-color: #f3f4f6; padding: 8px 16px; border-radius: 50px; border: 1px solid #e5e7eb; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #374151;">✦ Enterprise Grade</div>
        </div>

        <!-- ROW 2: Systems (Massive) -->
        <div style="display: flex; align-items: center; justify-content: flex-start; width: 100%; margin-bottom: 5px;">
            <h1 style="margin: 0; padding: 0; font-size: clamp(80px, 15vw, 200px); line-height: 0.85; text-align: left; font-family: 'Inter', sans-serif; font-weight: 900; letter-spacing: -0.04em; color: #000000; text-transform: uppercase;">Systems</h1>
        </div>

        <!-- ROW 3: Engineering -->
        <div style="display: flex; align-items: center; justify-content: flex-start; gap: 20px; width: 100%;">
            <h1 style="margin: 0; padding: 0; font-size: clamp(40px, 8vw, 110px); line-height: 0.9; text-align: left; font-family: 'Inter', sans-serif; font-weight: 900; letter-spacing: -0.02em; color: #000000; text-transform: uppercase;">Engineering</h1>
            <div style="background-color: #000000; padding: 8px 16px; border-radius: 50px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #ffffff;">⚡ High Performance</div>
        </div>

        <p style="font-family: 'JetBrains Mono', monospace, sans-serif; margin-top: 50px; font-size: 20px; max-width: 700px; color: #4b5563; line-height: 1.6; border-left: 4px solid #000; padding-left: 20px;">
            > Initializing high-performance engineering for startups and enterprises.<br>
            > Deploying robust architectures, sleek web apps, and immutable security.
        </p>
    </div>
    `;

    heroSection.empty();
    heroSection.append(nodexiHero);
    
    fs.writeFileSync(currentHtmlPath, $.html());
    console.log("Hero section fully restored to Nodexi specification.");
} else {
    console.log("Could not find hero section!");
}
