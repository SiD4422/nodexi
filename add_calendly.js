const fs = require('fs');

const newSuccessHtml = `
    <div class="booking-success" id="booking-success" style="padding: 0; display: none;">
      <div style="text-align: center; margin-bottom: 24px; padding-top: 24px;">
        <div class="booking-success-icon" style="font-size: 48px; margin-bottom: 16px;">✨</div>
        <h2 style="font-size: 28px; font-weight: 900; color: var(--black); margin-bottom: 8px; letter-spacing: -0.02em;">Details Received!</h2>
        <p style="font-size: 15px; color: var(--gray-500);">Now, let's grab a time to chat. Select a slot below.</p>
      </div>
      
      <!-- Calendly inline widget begin -->
      <div style="width: 100%; height: 500px; border-radius: 12px; overflow: hidden; border: 1px solid var(--gray-200); background: #fff;">
        <!-- REPLACE THE SRC URL BELOW WITH YOUR ACTUAL CALENDLY LINK -->
        <iframe src="https://calendly.com/YOUR_CALENDLY_LINK_HERE" width="100%" height="100%" frameborder="0"></iframe>
      </div>
      <!-- Calendly inline widget end -->
    </div>
`;

function addCalendly(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the old booking-success block
  const successRegex = /<div class="booking-success" id="booking-success">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  
  // Actually, wait, it's safer to just match until the end of booking-success
  // Let's use a more precise regex.
  const regex2 = /<div class="booking-success" id="booking-success">[\s\S]*?<\/div>(\s*<\/div>\s*<\/div>)/;
  
  if (regex2.test(content)) {
    content = content.replace(regex2, (match, closingTags) => {
      return newSuccessHtml + closingTags;
    });
    fs.writeFileSync(filePath, content);
    console.log('Added Calendly to', filePath);
  } else {
    console.log('booking-success not found in', filePath);
  }
}

addCalendly('index.html');
addCalendly('build-pages.js');
