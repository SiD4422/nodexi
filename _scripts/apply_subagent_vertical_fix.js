const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const additionalCSS = `
/* Fix vertical squishing of the heading */
.list-content, .list-content .parent {
    height: auto !important;
    min-height: unset !important;
    display: block !important;
}

.list-content .heading-2.service {
    font-size: 2rem !important;
    line-height: 1.4 !important;
    margin-bottom: 10px !important;
}

.list-parent {
    align-items: center !important;
}
`;

if (html.includes('<style id="nodexi-browser-subagent-fix-v2">')) {
    html = html.replace('</style>\\n</body>', additionalCSS + '\\n</style>\\n</body>');
} else {
    html = html.replace('</body>', '<style id="nodexi-browser-subagent-fix-v3">' + additionalCSS + '</style>\\n</body>');
}

fs.writeFileSync('index.html', html);
console.log("Applied browser subagent vertical squishing fix.");
