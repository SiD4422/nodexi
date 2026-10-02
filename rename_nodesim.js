const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Replace the file link
    content = content.replace(/work-gateonix\.html/g, 'work-nodesim.html');
    
    // 2. Replace the name Gateonix with NodeSim
    content = content.replace(/Gateonix/g, 'NodeSim');
    content = content.replace(/gateonix/g, 'nodesim');

    // 3. Fix the specific NodeSim description on index.html (and potentially others)
    const oldDesc = "A live interactive logic gate simulator running directly in the browser. Build complex circuits with zero latency or installation required.";
    const newDesc = "Professional circuit simulation, directly in your browser. Powered by ngspice WASM. No installation. No license headache. Just simulate.";
    content = content.replace(oldDesc, newDesc);

    // 4. Fix the broken placeholder image specifically for NodeSim
    content = content.replace(/https:\/\/via\.placeholder\.com\/800x600\/1e1e1e\/8b5cf6\?text=NodeSim\+Interface/g, 'images/nodesim.png'); 
    // Wait, the above replaced gateonix with nodesim already, so the URL is now ?text=NodeSim+Interface

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});
