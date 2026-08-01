const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// We completely rewrite the hero fix CSS for perfect scaling and no clipping
const perfectFitCSS = `
<style id="nodexi-hero-fix-css">
/* 1. Scale the main hero text to fit perfectly on the screen */
h1, .heading-huge, .app-hero-title {
    font-size: clamp(40px, 6.5vw, 90px) !important;
    line-height: 1.05 !important;
    margin-bottom: 0 !important;
}

/* 2. Ensure the flexbox layout never breaks or wraps awkwardly */
.showcase_marquee_flex {
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 15px !important;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
}

/* 3. Fix the Pill Shapes (Purple and Yellow) so they scale and never clip text */
.marquee_chat {
    height: clamp(55px, 7vw, 85px) !important;
    border-radius: 100px !important;
    display: flex !important;
    align-items: center !important;
    overflow: hidden !important; /* Keep the edges clean */
}
.marquee_chat.is_yellow {
    height: clamp(55px, 7vw, 85px) !important;
}

/* 4. Fix the text INSIDE the pills so it perfectly centers and fits */
.marquee_text, .marquee_text * {
    font-size: clamp(30px, 4vw, 55px) !important;
    line-height: 1 !important; /* Force tight line-height to prevent clipping */
    margin: 0 !important;
    padding: 0 20px !important; /* Add breathing room on sides */
    display: block !important;
}

/* 5. Force the entire Hero section to fit nicely in the viewport */
.section.is-hero.home, .app-hero-content {
    min-height: 85vh !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    padding-top: 10vh !important;
}

/* Make sure the subtext paragraph doesn't float away */
p:contains("We build scalable") {
    margin-top: 30px !important;
    font-size: clamp(16px, 1.5vw, 20px) !important;
    max-width: 600px !important;
}
</style>
`;

$('#nodexi-hero-fix-css').replaceWith(perfectFitCSS);

fs.writeFileSync('index.html', $.html());
console.log('Responsive perfect-fit layout applied.');
