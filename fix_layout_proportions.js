const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let modified = false;

// 1. Scrub the small "NODEXI" text that is sitting above Hardware Architectures
$('h1, h2, h3, h4, h5, h6, p, div, span').each(function() {
    if ($(this).text().trim() === "NODEXI") {
        // Only target it if it is inside the services section
        if ($(this).closest('.section, .w-layout-grid').text().includes('Hardware Architectures')) {
            $(this).remove();
            modified = true;
        }
    }
});

// 2. Fix the layout grid proportions so the right side isn't shoved off the screen
const cssFix = `
/* Fix the proportion of the services grid so the bullet points have room */
.w-layout-grid.grid-3 {
    grid-template-columns: 1fr 1fr !important; /* 50% left (heading), 50% right (bullets) */
    gap: 2rem !important;
    max-width: 100% !important;
}

/* Ensure the bullet point grid itself stays within bounds */
.w-layout-grid.grid-2 {
    grid-template-columns: 1fr 1fr !important;
    grid-column-gap: 1rem !important; /* Smaller gap */
    width: 100% !important;
}

/* Remove the aggressive min-width that was forcing it off the screen */
.service-txt-wrap {
    min-width: 0 !important; 
    word-break: normal !important;
}

.service-txt {
    font-size: clamp(14px, 1.2vw, 18px) !important; /* Make sure the text isn't massive */
}
`;

$('head').append('<style id="nodexi-final-layout-patch">' + cssFix + '</style>');
modified = true;

if (modified) {
    fs.writeFileSync('index.html', $.html());
    console.log('Successfully removed the rogue NODEXI heading and re-proportioned the grid.');
}
