const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The CSS we want to remove/replace
const badCSS = `
/* Fix text overflow for the Services grid columns */
.service-txt-wrap, .service-txt {
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    line-height: 1.4 !important;
}
.w-layout-grid.grid-2 {
    grid-column-gap: 2rem !important; /* Reduce the massive gap between columns to give more breathing room */
}
/* Ensure the overall grid doesn't overflow the viewport */
.w-layout-grid {
    max-width: 100vw !important;
    overflow-x: hidden !important;
}
`;

// The fixed CSS
const goodCSS = `
/* Fix text overflow for the Services grid columns cleanly */
.service-txt-wrap {
    min-width: 200px !important; /* Prevent the container from collapsing */
    white-space: normal !important; /* Allow natural wrapping without forcing letter breaks */
}
.service-txt {
    white-space: normal !important;
    line-height: 1.4 !important;
}
.w-layout-grid.grid-2 {
    grid-column-gap: 2rem !important; 
    grid-template-columns: 1fr 1fr !important; /* Force equal columns so they have room */
}
`;

if (html.includes(badCSS)) {
    html = html.replace(badCSS, goodCSS);
} else {
    // If exact match fails, use regex to strip out word-break properties
    html = html.replace(/word-break:\s*break-word\s*!important;/g, '');
    html = html.replace(/overflow-wrap:\s*break-word\s*!important;/g, '');
    html = html.replace(/\.service-txt-wrap,\s*\.service-txt\s*{/g, '.service-txt-wrap { min-width: 200px !important; } .service-txt {');
}

fs.writeFileSync('index.html', html);
console.log('CSS fixed to prevent vertical letter stacking.');
