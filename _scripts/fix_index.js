const fs = require('fs');

const indexPath = 'index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const modalHtml = `
<div class="booking-modal" id="booking-modal">
  <div class="booking-modal-overlay" id="booking-modal-overlay"></div>
  <div class="booking-modal-content">
    <button class="booking-close" id="booking-close">×</button>
    
    <div id="booking-form-container">
      <h2 style="font-size: 32px; font-weight: 900; color: var(--black); margin-bottom: 8px; letter-spacing: -0.02em;">Start a Project</h2>
      <p style="font-size: 15px; color: var(--gray-500); margin-bottom: 32px;">Fill out the details below and we'll get back to you within 24 hours to schedule a discovery call.</p>
      
      <form class="booking-form" id="booking-form" action="https://formspree.io/f/hello" method="POST">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div class="booking-input-group">
            <label>Name</label>
            <input type="text" name="name" required placeholder="John Doe">
          </div>
          <div class="booking-input-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="john@company.com">
          </div>
        </div>
        
        <div class="booking-input-group">
          <label>Project Budget</label>
          <select name="budget" required>
            <option value="" disabled selected>Select a range</option>
            <option value="$10k - $25k">$10k - $25k</option>
            <option value="$25k - $50k">$25k - $50k</option>
            <option value="$50k+">$50k+</option>
          </select>
        </div>
        
        <div class="booking-input-group">
          <label>Project Details</label>
          <textarea name="details" rows="4" required placeholder="Tell us about what you're building..."></textarea>
        </div>
        
        <button type="submit" class="booking-submit">Request Discovery Call ↗</button>
      </form>
    </div>
    
    <div class="booking-success" id="booking-success">
      <div class="booking-success-icon">✨</div>
      <h2 style="font-size: 32px; font-weight: 900; color: var(--black); margin-bottom: 8px; letter-spacing: -0.02em;">Request Sent!</h2>
      <p style="font-size: 15px; color: var(--gray-500);">We've received your details and will be in touch shortly to schedule our call.</p>
    </div>
    
  </div>
</div>
`;

const scriptHtml = `
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('booking-modal');
    const overlay = document.getElementById('booking-modal-overlay');
    const closeBtn = document.getElementById('booking-close');
    const form = document.getElementById('booking-form');
    const formContainer = document.getElementById('booking-form-container');
    const successMsg = document.getElementById('booking-success');

    if (!modal) return;

    // Intercept clicks on any booking/contact links
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('a[href^="mailto:"], a[href="#contact"], #btn-book-call, #btn-cta-book');
      if (trigger) {
        e.preventDefault();
        modal.classList.add('active');
      }
    });

    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => {
        formContainer.style.display = 'block';
        successMsg.classList.remove('active');
        form.reset();
        const btn = form.querySelector('button');
        btn.textContent = 'Request Discovery Call ↗';
        btn.style.opacity = '1';
      }, 500);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate form submission visually
      const btn = form.querySelector('button');
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';
      
      setTimeout(() => {
        formContainer.style.display = 'none';
        successMsg.classList.add('active');
      }, 1000);
    });
  });
</script>
`;

if (!html.includes('id="booking-modal"')) {
  // Insert modal just before </footer>
  html = html.replace('</footer>', modalHtml + '\n</footer>');
}

if (!html.includes('document.getElementById(\'booking-modal\')')) {
  // Insert script right after <script src="app.js"></script>
  html = html.replace('<script src="app.js"></script>', '<script src="app.js"></script>\n' + scriptHtml);
}

fs.writeFileSync(indexPath, html);
console.log('Fixed index.html successfully!');
