const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the un-replaced Cloud & Infrastructure text using case-insensitive regex
const cloudSwaps = {
    "Webflow development": "AWS / GCP / Azure",
    "Front-end development": "Kubernetes & Docker",
    "Backend development": "Serverless Computing",
    "API & CMS development": "Microservices Arch",
    "Mobile App development": "High-Availability Systems",
    "Web Development": "CI/CD Pipelines",
    "Framer websites": "Infrastructure as Code"
};

for (const [key, value] of Object.entries(cloudSwaps)) {
    // Case-insensitive replace just in case
    const regex = new RegExp('>' + key + '<', 'gi');
    html = html.replace(regex, '>' + value + '<');
}

// 2. Fix the CSS for the bullet points to make them significantly larger and prevent narrow wrapping
const cssPatch = `
/* Make the bullet points significantly larger and more readable */
.service-txt-wrap, .service-txt {
    font-size: 20px !important; /* Bump up from 16px to 20px */
    font-weight: 500 !important; /* Make it slightly bolder to stand out */
    line-height: 1.5 !important;
    min-width: 250px !important; /* Force the columns to be much wider so text doesn't wrap as aggressively */
}

/* Ensure the grid gap gives them space but allows them to be wide */
.w-layout-grid.grid-2 {
    grid-column-gap: 3rem !important; /* Increase gap between the two bullet lists */
    width: 100% !important;
}
`;

if (html.includes('<style id="nodexi-master-styles">')) {
    html = html.replace('</style>', cssPatch + '\\n</style>');
} else {
    html = html.replace('</head>', '<style id="nodexi-master-styles">' + cssPatch + '</style>\\n</head>');
}

fs.writeFileSync('index.html', html);
console.log('Fixed cloud text and increased bullet point sizes.');
