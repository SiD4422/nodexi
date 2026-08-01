const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

console.log("Replacing text...");

html = html.replace(/>Design</g, '>AI & Data Pipelines<');
html = html.replace(/>Development</g, '>Cloud & Infrastructure<');
html = html.replace(/>Branding</g, '>Hardware Architectures<');

// Replace the bullet points
const swaps = {
    "UI UX Design Services": "Large Language Models (LLMs)",
    "Mobile App Design": "Predictive Analytics",
    "Research & Discovery": "Computer Vision",
    "Competitive Analysis": "Data Lakes & Warehousing",
    "Design Systems": "Machine Learning Models",
    "3D Illustrations": "Real-time Data Streaming",
    "Webflow Design": "Natural Language Processing",
    "Motion Design": "Recommendation Engines",
    "Illustrations": "Data Pipeline Automation",
    "Iconography": "Time-Series Forecasting",
    "Prototyping": "AI Model Fine-tuning",
    
    "Front-End Development": "AWS / GCP / Azure",
    "Back-End Development": "Kubernetes & Docker",
    "CMS Development": "Serverless Computing",
    "E-Commerce Development": "Microservices Arch",
    "Web App Development": "High-Availability Systems",
    "Mobile App Development": "CI/CD Pipelines",
    "Custom Software Development": "Infrastructure as Code",
    
    "Visual branding": "Embedded Systems",
    "Packaging design": "IoT Integrations",
    "Brand Strategy": "Edge Computing",
    "Brand guidelines": "Custom PCB Design",
    "Identity Development": "Firmware Development",
    "Print collaterals": "Telemetry Systems",
    "Digital assets": "Hardware-Cloud Sync"
};

for (const [key, value] of Object.entries(swaps)) {
    // Replace exact text matches between tags
    const regex = new RegExp('>' + key + '<', 'g');
    html = html.replace(regex, '>' + value + '<');
}

fs.writeFileSync('index.html', html);
console.log("Services updated using raw string replacement.");
