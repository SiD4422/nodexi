const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Scrub our recent aggressive patches
html = html.replace(/<style id="nodexi-final-ultimate-fix">[\s\S]*?<\/style>/g, '');
html = html.replace(/<style id="nodexi-browser-subagent-fix">[\s\S]*?<\/style>/g, '');

const finalSubagentFix = `
<style id="nodexi-browser-subagent-fix-v2">
/* Fix overlapping between heading and bullet points */
.list-content .heading-2.service {
    font-size: 2.5rem !important;
    white-space: normal !important;
    word-break: break-word !important;
    line-height: 1.2 !important;
}

.list-parent {
    display: flex !important;
    flex-direction: row !important;
    align-items: flex-start !important;
    justify-content: space-between !important;
    gap: 40px !important;
    flex-wrap: nowrap !important;
    width: 100% !important;
}

.list-left-wrap {
    width: 35% !important;
    flex-shrink: 0 !important;
}

.content-list-wrap {
    width: 65% !important;
    display: block !important;
}

.position-wrap {
    width: 100% !important;
}

/* Ensure bullet points are side by side cleanly */
.w-layout-grid.grid-2 {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    grid-column-gap: 40px !important;
    width: 100% !important;
}

.service-txt-wrap {
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
}

.service-txt, .service-txt-wrap h1, .service-txt-wrap h3, .service-txt-wrap h4, .service-txt-wrap div, .service-txt-wrap h5, .service-txt-wrap h6, .service-txt-wrap p {
    font-size: 20px !important;
    font-weight: 500 !important;
    line-height: 1.5 !important;
    white-space: normal !important;
    word-break: break-word !important;
    margin-bottom: 12px !important;
    color: #111827 !important;
}
</style>
`;

html = html.replace('</body>', finalSubagentFix + '\\n</body>');

fs.writeFileSync('index.html', html);
console.log("Applied browser subagent v2 CSS fix.");
