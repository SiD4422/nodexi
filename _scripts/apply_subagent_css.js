const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const subagentCSS = `
<style id="nodexi-browser-subagent-fix">
/* Fix overlapping and size of services bullet points */
.w-layout-grid.grid-2 {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
    gap: 30px !important;
    width: 100% !important;
}

.service-txt-wrap {
    flex: 1 1 calc(50% - 30px) !important;
    min-width: 200px !important;
    margin: 0 !important;
    padding: 0 !important;
}

.service-txt, .service-txt-wrap h1, .service-txt-wrap h3, .service-txt-wrap h4, .service-txt-wrap div, .service-txt-wrap h5, .service-txt-wrap h6, .service-txt-wrap p {
    font-size: 24px !important;
    font-weight: 500 !important;
    line-height: 1.5 !important;
    white-space: normal !important;
    word-break: break-word !important;
    margin-bottom: 16px !important;
    color: #111827 !important;
}

.list-parent {
    display: flex !important;
    flex-direction: row !important;
    align-items: flex-start !important;
    justify-content: space-between !important;
    gap: 40px !important;
    flex-wrap: nowrap !important;
}

.list-left-wrap {
    width: 40% !important;
    flex-shrink: 0 !important;
}

.content-list-wrap {
    width: 60% !important;
    display: block !important;
}

.position-wrap {
    width: 100% !important;
}
</style>
`;

html = html.replace('</body>', subagentCSS + '\\n</body>');

fs.writeFileSync('index.html', html);
console.log("Browser subagent CSS fix applied.");
