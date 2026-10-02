const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Navbar Book a Call
    content = content.replace(/href="#contact"([^>]*id="btn-book-call")/g, 'href="https://calendly.com/siddharth02906/30min" target="_blank"$1');
    
    // 2. Footer CTA Book a Call
    content = content.replace(/href="mailto:hello@nodexi\.com"([^>]*id="btn-cta-book")/g, 'href="https://calendly.com/siddharth02906/30min" target="_blank"$1');

    // 3. Contact page Schedule Meeting button
    content = content.replace(/href="#"([^>]*>Schedule Meeting)/g, 'href="https://calendly.com/siddharth02906/30min" target="_blank"$1');

    // 4. Update the other navbar link "CONTACT" to go to contact.html instead of #contact
    content = content.replace(/href="#contact"([^>]*id="btn-contact")/g, 'href="contact.html"$1');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        updatedCount++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Done. Updated ${updatedCount} files.`);
