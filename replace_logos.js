const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// We need to replace the image logos with a textual logo.
// The user's screenshot showed the stylized "A L i E N" logo.
// Let's find any images that might be the logo.
$('img').each((i, el) => {
    const src = $(el).attr('src') || '';
    const alt = $(el).attr('alt') || '';
    const className = $(el).attr('class') || '';
    
    // Check if it's the logo
    if (src.toLowerCase().includes('logo') || alt.toLowerCase().includes('logo') || className.toLowerCase().includes('logo')) {
        console.log('Replacing logo image:', src, className);
        
        // We will replace it with a sleek text-based logo.
        // If it's the preloader (has absolute positioning or is in a loader wrapper), it might need different styling.
        // But a generic text block usually works well.
        
        const isPreloader = className.includes('preloader') || $(el).parents('.preloader').length > 0 || $(el).parents('.loader').length > 0;
        
        const color = isPreloader ? '#ffffff' : '#000000'; // Preloader is black, so text should be white. Navbar is white, text black.
        
        const nodexiLogo = `<div class="${className}" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 28px; font-weight: 800; letter-spacing: 4px; color: ${color}; display: flex; align-items: center; justify-content: center; height: 100%;">NODEXI</div>`;
        
        $(el).replaceWith(nodexiLogo);
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Logos replaced successfully.');
