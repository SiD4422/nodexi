const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const additionalCSS = `
/* Fix the horizontal squishing (crushed letters) in the headings */
.list-content .heading-2.service,
.section-title, 
h2.section-title {
    font-size: 3rem !important; /* Make them a bit larger and more prominent */
    letter-spacing: normal !important; /* Remove the template's negative letter spacing that is crushing the letters */
    word-spacing: normal !important;
    white-space: normal !important;
    word-break: normal !important; /* Don't force words to break into overlapping characters */
}
`;

if (html.includes('<style id="nodexi-browser-subagent-fix-v2">')) {
    html = html.replace('</style>\\n</body>', additionalCSS + '\\n</style>\\n</body>');
} else {
    html = html.replace('</body>', '<style id="nodexi-heading-letter-spacing-fix">' + additionalCSS + '</style>\\n</body>');
}

fs.writeFileSync('index.html', html);
console.log("Fixed heading letter spacing.");
