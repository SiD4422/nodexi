const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The text replacements
const portfolioSwaps = {
    "FEATURED DESIGN WORKS": "FEATURED ENGINEERING WORKS",
    
    // Project 1
    "Better Invest": "Nexus IoT Telemetry",
    "Modernizing Accounting Agency's Website for Better Engagement": "High-throughput telemetry pipeline handling 10M+ sensor events per second for industrial manufacturing.",
    
    // Project 2
    "BOTIGA": "AeroVision Engine",
    "Building a customer friendly online store for small business owners": "Computer vision model optimized for edge devices to detect microscopic manufacturing defects in real-time.",
    
    // Project 3
    "KRIYADOCS": "CoreVault Infrastructure",
    "Revitalizing a Document Publishing SaaS Website for Enhanced User Engagement.": "Zero-trust hybrid cloud architecture deployed across multiple regions with sub-millisecond failover capabilities.",
    
    // Project 4
    "WOO Spaces": "Quantum Sync Board",
    "Building a friendly neighborhood co-working space platform": "Custom PCB design and low-level C++ firmware development for high-frequency algorithmic trading hardware."
};

console.log("Replacing portfolio text...");

for (const [key, value] of Object.entries(portfolioSwaps)) {
    // Escape regex characters just in case, though these are mostly normal strings
    const safeKey = key.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
    const regex = new RegExp(safeKey, 'g');
    html = html.replace(regex, value);
}

// Replace the pill tags (Mobile App / Web App)
// Since there are multiple of these, we'll replace them sequentially to give different tags
// We can just use standard replace to replace the first occurrence each time
const newTags = [
    "Embedded C", "AWS IoT", 
    "Python", "Edge AI", 
    "Kubernetes", "Terraform", 
    "Altium", "Firmware"
];

let tagHtml = html;
for (let i = 0; i < 4; i++) {
    tagHtml = tagHtml.replace('Mobile App', newTags[i*2]);
    tagHtml = tagHtml.replace('Web App', newTags[i*2 + 1]);
}

fs.writeFileSync('index.html', tagHtml);
console.log("Portfolio updated successfully.");
