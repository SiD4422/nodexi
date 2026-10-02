const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Map of replacements for the massive headings
const headingSwaps = {
    "Design": "AI & Data Pipelines",
    "Development": "Cloud & Infrastructure",
    "Branding": "Hardware & IoT Systems",
    "Strategy": "Custom Engineering"
};

// Find headings in the services section and swap them
$('.section:has(:contains("SERVICES")) h2, .section:has(:contains("SERVICES")) h3, .section:has(:contains("SERVICES")) h1').each(function() {
    let text = $(this).text().trim();
    if (headingSwaps[text]) {
        $(this).text(headingSwaps[text]);
    }
});

// Since the bullet points are scattered and we don't know exactly how many there are,
// we'll just search and replace all the standard placeholder service names with hard engineering terms.

const bulletSwaps = {
    // Design -> AI & Data
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
    
    // Development -> Cloud & Infrastructure
    "Front-End Development": "AWS / GCP / Azure Architectures",
    "Back-End Development": "Kubernetes & Docker Containers",
    "CMS Development": "Serverless Computing",
    "E-Commerce Development": "Microservices Architecture",
    "Web App Development": "High-Availability Systems",
    "Mobile App Development": "CI/CD Pipelines",
    "Custom Software Development": "Infrastructure as Code (IaC)",
    
    // Branding -> Hardware
    "Visual branding": "Embedded Systems Programming",
    "Packaging design": "IoT Sensor Integration",
    "Brand strategy": "Edge Computing Solutions",
    "Brand guidelines": "Hardware-Cloud Telemetry",
    
    // Other generic ones
    "Copywriting": "Performance Optimization",
    "Illustration": "Database Sharding",
    "Content Strategy": "Scalable APIs"
};

// Go through ALL text nodes in the services section and swap them
$('.section:has(:contains("SERVICES")) *').each(function() {
    if ($(this).children().length === 0) {
        let text = $(this).text().trim();
        if (bulletSwaps[text]) {
            $(this).text(bulletSwaps[text]);
        }
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Services updated successfully.');
