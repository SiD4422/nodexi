const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const titleCSS = `
/* Shrink the massive service titles on the left to give the descriptions more room */
.w-layout-grid.grid-3 > div:first-child h1,
.w-layout-grid.grid-3 > div:first-child h2,
.w-layout-grid.grid-3 > div:first-child h3,
.section-title {
    font-size: clamp(2rem, 4vw, 3.5rem) !important; /* Significantly reduce the massive text size */
    line-height: 1.1 !important;
    white-space: normal !important; /* Allow the titles themselves to wrap if necessary */
    word-break: normal !important;
}
`;

// Inject into master styles
if (html.includes('<style id="nodexi-master-styles">')) {
    html = html.replace('</style>', titleCSS + '\\n</style>');
} else {
    html = html.replace('</head>', '<style id="nodexi-master-styles">' + titleCSS + '</style>\\n</head>');
}

fs.writeFileSync('index.html', html);
console.log('Successfully reduced the size of the service titles.');
