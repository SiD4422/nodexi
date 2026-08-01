const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const finalFixCSS = `
<style id="nodexi-final-ultimate-fix">
/* Force the bullet point text to be massive and readable */
.w-layout-grid > div:last-child h1,
.w-layout-grid > div:last-child h2,
.w-layout-grid > div:last-child h3,
.w-layout-grid > div:last-child h4,
.w-layout-grid > div:last-child h5,
.w-layout-grid > div:last-child h6,
.w-layout-grid > div:last-child p {
    font-size: 1.2rem !important; /* Scale relative to the root, not fixed px */
    line-height: 1.6 !important;
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    margin-bottom: 0.8rem !important;
    display: block !important;
    max-width: 100% !important;
}

/* Force the right side to be a proper grid so columns CANNOT overlap */
.w-layout-grid > div:last-child {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 2rem !important;
    width: 100% !important;
    overflow: hidden !important; /* Clip any bleeding text */
}

/* Ensure the main container doesn't squish the right side */
.section-title {
    font-size: 2.5rem !important;
}
.w-layout-grid[style*="flex-direction: row"] {
    display: grid !important;
    grid-template-columns: 1fr 2fr !important; /* 1 part heading, 2 parts bullets */
    gap: 4rem !important;
}
</style>
`;

html = html.replace('</body>', finalFixCSS + '\\n</body>');

fs.writeFileSync('index.html', html);
console.log("Ultimate CSS fix applied.");
