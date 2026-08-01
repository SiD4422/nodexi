const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('alien-clone-project/index.html', 'utf8');
const $ = cheerio.load(html);

const customCSS = `
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
/* TYPOGRAPHY OVERHAUL */
body, p, .text-size-small, .text-size-regular, .text-size-medium, .text-size-large, .nav-text, a, div {
    font-family: 'JetBrains Mono', monospace !important;
}
h1, h2, h3, h4, h5, h6, .heading-huge, .heading-large, .heading-big, .heading-1, .heading-2, .heading-3, .heading-4, .heading-5 {
    font-family: 'Space Grotesk', sans-serif !important;
    text-transform: uppercase !important;
    letter-spacing: -1px !important;
}

/* SHAPE GEOMETRY (BRUTALISM) */
/* Override massive border radii */
* {
    border-radius: 2px !important;
}
/* Revert border radius for true circles if needed, but let's make everything square for engineering vibe */
.sec-circle, .accordion-circle {
    border-radius: 0px !important;
    transform: rotate(45deg); /* Make them diamonds */
}

/* COLOR OVERHAUL */
/* Find their lime and violet colors and force them to cyan and dark gray */
/* Violet pill in hero */
.showcase_marquee_wrapper, .marquee_chat, .is-violet, .bg-violet {
    background-color: #0d1117 !important;
    color: #00e5ff !important;
    border: 1px solid #30363d !important;
}
/* Lime pill in hero */
.marquee_img, .is-lime, .bg-lime, .app-hero-bg-block {
    background-color: #00e5ff !important;
    color: #000000 !important;
}
/* General background dark mode shift if it's currently white */
/* The hero uses a white background currently, let's flip it to pitch black */
body, .page_wrapper, .main-wrap, .section.home {
    background-color: #050505 !important;
    color: #ffffff !important;
}
.heading-big:not(.is-white) {
    color: #ffffff !important;
}
/* Make sure the navbar stays readable */
.navbar, .nav-bg {
    background-color: rgba(5,5,5,0.9) !important;
    border-bottom: 1px solid #1f1f1f !important;
}
.nav-text {
    color: #00e5ff !important;
}
/* Inverse the logo if it's currently black (since we are moving to dark mode) */
.menu-logo img {
    filter: invert(1) !important;
}

/* Fix accordion and service lists */
.list-parent, .accordion-item {
    border-color: #1f1f1f !important;
}
</style>
`;

$('head').append(customCSS);

// Also, let's rewrite the sub-lists in the Services Accordion (Content Purge)
const designTerms = ['UI UX Design Services', 'Motion Design', 'Research & Discovery', 'Competitive Analysis', 'Design Systems', 'Illustrations', 'Iconography', 'Prototyping', 'Packaging design', 'Print collaterals', 'Brand guidelines', 'Framer websites', 'Digital assets', 'Identity Development'];

$('.list-right-wrap div, p, span, li').each((i, el) => {
    const text = $(el).text().trim();
    if (designTerms.includes(text)) {
        // Replace with random tech term
        const techTerms = ['System Architecture', 'API Gateway Design', 'Microservices', 'CI/CD Pipelines', 'Kubernetes Orchestration', 'LLM Fine-Tuning', 'Vector Databases', 'Zero-Trust Security', 'Penetration Testing', 'Cloud Infrastructure', 'GraphQL Federation'];
        const randomTerm = techTerms[Math.floor(Math.random() * techTerms.length)];
        $(el).text(randomTerm);
    }
});

fs.writeFileSync('alien-clone-project/index.html', $.html());
console.log('CSS overrides and content purge completed.');
