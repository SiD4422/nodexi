const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const fixCSS = `
/* Universal text fix for all services */
.service-txt-wrap {
    min-width: 150px !important; /* Prevent collapsing into vertical slivers */
    white-space: normal !important;
    word-break: normal !important;
}

.service-txt {
    font-size: 16px !important; /* Standardize the font size so it's readable but fits */
    line-height: 1.5 !important;
    white-space: normal !important;
    word-break: normal !important;
    overflow-wrap: normal !important;
    margin-bottom: 0.5rem !important; /* Add some breathing room between bullet points */
}

/* Ensure the inner grid holding the bullet points has physical space */
.w-layout-grid.grid-2 {
    grid-template-columns: 1fr 1fr !important;
    grid-column-gap: 2rem !important;
    width: 100% !important;
    min-width: 350px !important; /* Force the grid to be wide enough to hold two columns of text */
}

/* Ensure the master grid allocates space properly */
.w-layout-grid.grid-3 {
    grid-template-columns: 1fr 1.5fr !important; /* Give the right side (bullet points) even MORE room than the heading */
}
`;

// Inject into master styles
if (html.includes('<style id="nodexi-master-styles">')) {
    html = html.replace('</style>', fixCSS + '\\n</style>');
} else {
    html = html.replace('</head>', '<style id="nodexi-master-styles">' + fixCSS + '</style>\\n</head>');
}

fs.writeFileSync('index.html', html);
console.log('Text layout and sizing permanently fixed.');
