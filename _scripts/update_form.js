const fs = require('fs');

// 1. Update style.css modal width
const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/max-width:\s*600px;/g, 'max-width: 800px;');
fs.writeFileSync(cssPath, css);

const newFormHtml = `
      <form class="booking-form" id="booking-form" action="https://formspree.io/f/hello" method="POST" enctype="multipart/form-data">
        
        <!-- Row 1: Name, Email, Phone -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="booking-input-group">
            <label>Your Name</label>
            <input type="text" name="name" required placeholder="John Doe">
          </div>
          <div class="booking-input-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="you@example.com">
          </div>
          <div class="booking-input-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="+91 98765 43210">
          </div>
        </div>
        
        <!-- Row 2: Category, Budget, Timeline -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="booking-input-group">
            <label>Project Category</label>
            <select name="category" required>
              <option value="" disabled selected>Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="AI / Machine Learning">AI / ML Integration</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="booking-input-group">
            <label>Budget Range (INR)</label>
            <select name="budget" required>
              <option value="" disabled selected>Select budget</option>
              <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
              <option value="₹1L - ₹5L">₹1L - ₹5L</option>
              <option value="₹5L - ₹15L">₹5L - ₹15L</option>
              <option value="₹15L+">₹15L+</option>
            </select>
          </div>
          <div class="booking-input-group">
            <label>Timeline</label>
            <select name="timeline" required>
              <option value="" disabled selected>Select timeline</option>
              <option value="ASAP">ASAP</option>
              <option value="1 - 3 Months">1 - 3 Months</option>
              <option value="3 - 6 Months">3 - 6 Months</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>
        
        <!-- Row 3: Title -->
        <div class="booking-input-group" style="margin-top: 16px;">
          <label>Project Title</label>
          <input type="text" name="title" required placeholder="Give your project a title">
        </div>
        
        <!-- Row 4: Description -->
        <div class="booking-input-group" style="margin-top: 16px;">
          <label>Project Description</label>
          <textarea name="details" rows="4" required placeholder="Describe your project, features, goals and any specific requirements..."></textarea>
        </div>
        
        <!-- Row 5: Attachments -->
        <div class="booking-input-group" style="margin-top: 16px;">
          <label>Attachments (Optional)</label>
          <div style="border: 2px dashed var(--gray-200); border-radius: 12px; padding: 24px; text-align: center; position: relative; transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--purple)'; this.style.background='rgba(123,92,245,0.02)'" onmouseout="this.style.borderColor='var(--gray-200)'; this.style.background='transparent'">
            <input type="file" name="attachment" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.fig" style="opacity: 0; position: absolute; inset: 0; width: 100%; height: 100%; cursor: pointer; z-index: 2;" onchange="if(this.files.length > 0) this.nextElementSibling.querySelector('p:first-of-type').innerHTML = 'Selected: <span style=\\'color:var(--purple);\\'>' + this.files[0].name + '</span>'; else this.nextElementSibling.querySelector('p:first-of-type').innerHTML = 'Drag & drop files here or <span style=\\'color: var(--purple);\\'>click to upload</span>';">
            <div style="pointer-events: none;">
              <div style="font-size: 24px; margin-bottom: 8px;">☁️</div>
              <p style="font-size: 14px; font-weight: 600; color: var(--black); margin-bottom: 4px;">Drag & drop files here or <span style="color: var(--purple);">click to upload</span></p>
              <p style="font-size: 12px; color: var(--gray-400);">Images, documents, or any reference materials (Max. 10MB)</p>
            </div>
          </div>
        </div>
        
        <!-- Submit button -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 32px; flex-wrap: wrap; gap: 16px;">
          <button type="submit" class="booking-submit" style="margin: 0; display: inline-flex; align-items: center; gap: 12px; padding: 16px 32px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            Submit Booking Request
          </button>
          <div style="font-size: 13px; color: var(--gray-400); display: flex; align-items: center; gap: 8px;">
            <span>🔒</span> Your information is 100% secure
          </div>
        </div>
      </form>
`;

function replaceForm(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the exact <form> to </form> block to replace
  const formRegex = /<form class="booking-form" id="booking-form"[\s\S]*?<\/form>/;
  if (formRegex.test(content)) {
    content = content.replace(formRegex, newFormHtml.trim());
    fs.writeFileSync(filePath, content);
    console.log('Updated form in', filePath);
  } else {
    console.log('Form not found in', filePath);
  }
}

replaceForm('index.html');
replaceForm('build-pages.js');
