const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// We need to completely rebuild the hero title area to guarantee perfect flush-left alignment
// and ensure the pills sit exactly where they should without wrapping or overflowing.

// 1. Find the main container holding these rows
let heroTitleContainer = $('.app-hero-title').first();
if (heroTitleContainer.length === 0) {
    heroTitleContainer = $('.showcase_marquee_flex').first().parent();
}

// 2. Extract the pills so we don't lose them
let purplePill = $('.marquee_chat:not(.is_yellow)').first().prop('outerHTML');
let yellowPill = $('.marquee_chat.is_yellow').first().prop('outerHTML');

// 3. Gut the container and inject a cleanly structured flex layout
const cleanHeroHTML = `
<div class="clean-hero-wrapper" style="display: flex; flex-direction: column; align-items: flex-start; width: 100%; max-width: 100vw; overflow: visible;">
    
    <!-- ROW 1: Heavy-Duty + Purple Pill -->
    <div style="display: flex; align-items: center; justify-content: flex-start; gap: 20px; width: 100%; margin-bottom: 5px;">
        <h1 style="margin: 0; padding: 0; font-size: clamp(40px, 6vw, 90px); line-height: 0.9; text-align: left; font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: -0.02em; color: #000;">Heavy-Duty</h1>
        \${purplePill}
    </div>

    <!-- ROW 2: Systems (Massive) -->
    <div style="display: flex; align-items: center; justify-content: flex-start; width: 100%; margin-bottom: 5px;">
        <h1 style="margin: 0; padding: 0; font-size: clamp(80px, 12vw, 180px); line-height: 0.85; text-align: left; font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: -0.04em; color: #000;">Systems</h1>
    </div>

    <!-- ROW 3: Engineering + Yellow Pill -->
    <div style="display: flex; align-items: center; justify-content: flex-start; gap: 20px; width: 100%;">
        <h1 style="margin: 0; padding: 0; font-size: clamp(40px, 6vw, 90px); line-height: 0.9; text-align: left; font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: -0.02em; color: #000;">Engineering</h1>
        \${yellowPill}
    </div>

</div>
`;

// Replace the guts of the original container with our clean structure
heroTitleContainer.html(cleanHeroHTML.replace('${purplePill}', purplePill || '').replace('${yellowPill}', yellowPill || ''));

// 4. Fix the spinning badge overlap
// Move the spinning badge slightly down or right so it doesn't clip "Engineering"
$('.hero-badge-wrap').attr('style', 'position: absolute; bottom: -50px; left: 10px; z-index: 10;');

fs.writeFileSync('index.html', $.html());
console.log('Hero completely rebuilt for perfect alignment.');
