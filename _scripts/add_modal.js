const fs = require('fs');

// 1. Add CSS to style.css
const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const modalCss = `
/* ============================================================ */
/* BOOKING MODAL */
/* ============================================================ */
.booking-modal {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.booking-modal.active {
  pointer-events: all;
}
.booking-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.booking-modal.active .booking-modal-overlay {
  opacity: 1;
}
.booking-modal-content {
  position: relative;
  width: 90%;
  max-width: 600px;
  background: var(--cream);
  border-radius: 24px;
  padding: 48px;
  transform: translateY(40px) scale(0.95);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--gray-200);
}
.booking-modal.active .booking-modal-content {
  transform: translateY(0) scale(1);
  opacity: 1;
}
.booking-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: var(--gray-100);
  border: 1px solid var(--gray-200);
  color: var(--black);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.booking-close:hover {
  background: var(--black);
  color: #fff;
  transform: rotate(90deg);
}
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.booking-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.booking-input-group label {
  font-size: 13px;
  font-weight: 700;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.booking-input-group input,
.booking-input-group select,
.booking-input-group textarea {
  width: 100%;
  padding: 16px;
  background: transparent;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  color: var(--black);
  transition: border-color 0.3s ease;
}
.booking-input-group input:focus,
.booking-input-group select:focus,
.booking-input-group textarea:focus {
  outline: none;
  border-color: var(--purple);
}
.booking-submit {
  background: var(--black);
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  padding: 20px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  margin-top: 16px;
}
.booking-submit:hover {
  background: var(--purple);
  transform: translateY(-2px);
}
.booking-success {
  display: none;
  text-align: center;
  padding: 40px 0;
}
.booking-success.active {
  display: block;
}
.booking-success-icon {
  font-size: 64px;
  margin-bottom: 24px;
}
`;

if (!css.includes('.booking-modal')) {
  fs.writeFileSync(cssPath, css + '\n' + modalCss);
}

// 2. Add Modal HTML to footer in build-pages.js
const jsPath = 'build-pages.js';
let js = fs.readFileSync(jsPath, 'utf8');

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
</footer>\`;`;

if (!js.includes('id="booking-modal"')) {
  js = js.replace('</footer>`;', modalHtml);
}

// 3. Add Modal JS to scripts in build-pages.js
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

if (!js.includes("document.getElementById('booking-modal')")) {
  js = js.replace('const scripts = `  <script src="app.js"></script>`;', 'const scripts = `  <script src="app.js"></script>' + scriptHtml + '`;');
}

fs.writeFileSync(jsPath, js);
console.log('Injected modal code successfully!');
