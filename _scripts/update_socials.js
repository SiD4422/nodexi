const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Type 1 Footer (index.html style)
    content = content.replace(/<a href="#" class="footer-social-btn" title="LinkedIn">in<\/a>/g, '<a href="https://www.linkedin.com/company/nodexi" target="_blank" class="footer-social-btn" title="LinkedIn">in</a>');
    content = content.replace(/<a href="#" class="footer-social-btn" title="GitHub">GH<\/a>/g, '<a href="https://github.com/SiD4422" target="_blank" class="footer-social-btn" title="GitHub">GH</a>');
    content = content.replace(/<a href="mailto:[^"]*" class="footer-social-btn" title="Email">\?<\/a>/g, '<a href="https://www.youtube.com/channel/UCNw4svzFJ9Q9tn4Yp41-iXw" target="_blank" class="footer-social-btn" title="YouTube">YT</a>'); // Just repurpose the email to YT since contact handles email

    // Type 2 Footer (contact.html style)
    // Replace the entire social row to be consistent
    const newSocialRow = '<div class="social-row"><a href="https://www.linkedin.com/company/nodexi" target="_blank">in</a><a href="https://github.com/SiD4422" target="_blank">gh</a><a href="https://www.youtube.com/channel/UCNw4svzFJ9Q9tn4Yp41-iXw" target="_blank">yt</a></div>';
    content = content.replace(/<div class="social-row">.*?<\/div>/g, newSocialRow);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        updatedCount++;
        console.log(`Updated footer in ${file}`);
    }
});

console.log(`Done. Updated ${updatedCount} files.`);
