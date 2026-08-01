const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Inject CSS to strictly frame the Hero Section to 100vh and tighten all vertical gaps
const framingCSS = `
<style id="nodexi-framing-css">
/* Force the Hero Section to be exactly 100vh (minus navbar height) and center its contents */
.section.is-hero.home {
    height: 90vh !important;
    min-height: 800px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    padding-top: 5vh !important;
    padding-bottom: 0 !important;
    overflow: hidden !important; /* Prevent scrollbar if it overflows slightly */
}

/* Tighten the line height of all massive text so it stacks closer together */
h1, .heading-huge, .app-hero-title, .custom-heavy-duty, .custom-engineering {
    line-height: 0.9 !important;
    margin-bottom: 0 !important;
    margin-top: 0 !important;
}

/* Remove the huge gaps between the flex rows */
.showcase_marquee_flex {
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}

/* Pull the subtext paragraph up tightly underneath the massive text */
.app-hero-content p {
    margin-top: 20px !important;
    margin-bottom: 0 !important;
}

/* Ensure the pill shapes don't randomly add vertical height */
.marquee_chat {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
</style>
`;

$('#nodexi-framing-css').remove();
$('head').append(framingCSS);

fs.writeFileSync('index.html', $.html());
console.log('Hero section perfectly framed to viewport.');
