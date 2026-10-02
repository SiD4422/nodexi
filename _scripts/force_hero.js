const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the node containing "Crafting"
const heroText = $('*:contains("Crafting")').last(); // Get the deepest element containing Crafting
const heroContainer = heroText.closest('.app-hero-content'); // Try to find the wrapper

if (heroContainer.length > 0) {
    heroContainer.empty();
    heroContainer.append(`
    <div class="nodexi-hero-static" style="padding: 10vh 5vw; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; width: 100%;">
        <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px); color: #ffffff !important;">
            ENGINEERING
        </h1>
        <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px); color: #00e5ff !important;">
            SOFTWARE.
        </h1>
        <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px); color: #ffffff !important;">
            BUILDING
        </h1>
        <h1 class="heading-huge" style="text-align: left; margin: 0; line-height: 1.1; font-weight: 900; letter-spacing: -2px; font-size: clamp(60px, 10vw, 150px); color: #00e5ff !important;">
            SYSTEMS.
        </h1>
        <p style="font-family: 'JetBrains Mono', monospace !important; margin-top: 40px; font-size: 18px; max-width: 600px; color: #a0a0a0 !important; line-height: 1.6;">
            > Initializing high-performance engineering for startups and enterprises.<br>
            > Deploying robust architectures, sleek web apps, and immutable security.
        </p>
    </div>
    `);
}

// Also fix the navbar logo color (make it white instead of black so it shows up)
$('.nav-logo, .logo').attr('style', "font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 32px; font-weight: 900; letter-spacing: 4px; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100%;");

// Remove the spinning badge. It might be an img with alt="Just Great Work"
$('img[alt*="Great"], img[alt*="work"], img[src*="Just"]').remove();

// Also remove any stray marquees that might still be there
$('.showcase_marquee_wrapper').remove();

fs.writeFileSync('index.html', $.html());
console.log('Force-replaced hero and fixed logo color.');
