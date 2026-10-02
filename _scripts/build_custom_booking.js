const fs = require('fs');

// 1. UPDATE CSS
const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `
/* ============================================================ */
/* CUSTOM BOOKING SYSTEM */
/* ============================================================ */
.booking-dates {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 12px;
  -webkit-overflow-scrolling: touch;
}
.booking-dates::-webkit-scrollbar {
  height: 6px;
}
.booking-dates::-webkit-scrollbar-thumb {
  background: var(--gray-200);
  border-radius: 999px;
}
.booking-date-card {
  flex: 0 0 calc(20% - 12px);
  min-width: 80px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}
.booking-date-card:hover {
  border-color: var(--purple);
  background: rgba(123,92,245,0.02);
}
.booking-date-card.active {
  background: var(--purple);
  border-color: var(--purple);
}
.booking-date-card .day {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--gray-500);
}
.booking-date-card.active .day {
  color: rgba(255,255,255,0.8);
}
.booking-date-card .date {
  font-size: 20px;
  font-weight: 900;
  color: var(--black);
}
.booking-date-card.active .date {
  color: #fff;
}

.booking-times-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}
.booking-time-pill {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--black);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}
.booking-time-pill:hover {
  border-color: var(--purple);
  color: var(--purple);
  background: rgba(123,92,245,0.02);
}
.booking-time-pill.active {
  background: var(--purple);
  border-color: var(--purple);
  color: #fff;
}
`;

if (!css.includes('.booking-date-card')) {
  fs.writeFileSync(cssPath, css + '\n' + newCss);
}

// 2. MODAL HTML
const newModalHtml = `
<div class="booking-modal" id="booking-modal">
  <div class="booking-modal-overlay" id="booking-modal-overlay"></div>
  <div class="booking-modal-content">
    <button class="booking-close" id="booking-close">×</button>
    
    <div id="booking-form-container">
      
      <form class="booking-form" id="booking-form" action="https://formspree.io/f/xbgrjzza" method="POST" enctype="multipart/form-data">
        
        <!-- HIDDEN FIELDS FOR DATE & TIME -->
        <input type="hidden" name="booking_date" id="booking_date_input">
        <input type="hidden" name="booking_time" id="booking_time_input">

        <!-- STEP 1: DETAILS -->
        <div id="booking-step-1">
          <h2 style="font-size: 32px; font-weight: 900; color: var(--black); margin-bottom: 8px; letter-spacing: -0.02em;">Start a Project</h2>
          <p style="font-size: 15px; color: var(--gray-500); margin-bottom: 32px;">Fill out the details below and we'll get back to you within 24 hours.</p>

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
            <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px;">
              <label class="custom-file-btn">
                <input type="file" name="attachment" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.fig" style="display: none;" onchange="this.parentElement.nextElementSibling.textContent = this.files.length > 0 ? this.files[0].name : 'No file chosen'">
                <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-width="2" stroke="#ffffff" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke-linejoin="round" stroke-linecap="round"></path>
                  <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M17 15V18M17 21V18M17 18H14M17 18H20"></path>
                </svg>
                ADD FILE
              </label>
              <span style="font-size: 13px; color: var(--gray-500); font-family: var(--mono);">No file chosen</span>
            </div>
          </div>
          
          <!-- Next button -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 32px; flex-wrap: wrap; gap: 16px;">
            <button type="button" class="booking-submit" id="btn-next-step" style="margin: 0; display: inline-flex; align-items: center; gap: 12px; padding: 16px 32px;">
              Next: Select Date & Time <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <div style="font-size: 13px; color: var(--gray-400); display: flex; align-items: center; gap: 8px;">
              <span>🔒</span> Your information is 100% secure
            </div>
          </div>
        </div>

        <!-- STEP 2: CUSTOM CALENDAR -->
        <div id="booking-step-2" style="display: none;">
          <div style="margin-bottom: 24px;">
            <button type="button" id="btn-prev-step" style="background: none; border: none; color: var(--gray-500); cursor: pointer; font-size: 14px; font-weight: 600; padding: 0; margin-bottom: 16px; display: inline-flex; align-items: center; gap: 6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back to Details</button>
            <h2 style="font-size: 28px; font-weight: 900; color: var(--black); margin-bottom: 8px; letter-spacing: -0.02em;">Select a Date & Time</h2>
            <p style="font-size: 15px; color: var(--gray-500);">All times shown in your local timezone.</p>
          </div>

          <!-- Date Carousel -->
          <div class="booking-dates" id="booking-dates">
            <!-- Populated by JS -->
          </div>

          <!-- Time Slots -->
          <div class="booking-times" id="booking-times" style="display: none; margin-top: 32px;">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--black); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
              <span>Available Times</span>
              <span id="selected-date-label" style="color: var(--purple); font-size: 14px;"></span>
            </h3>
            <div class="booking-times-grid" id="booking-times-grid">
              <!-- Populated by JS -->
            </div>
          </div>

          <div style="margin-top: 40px; border-top: 1px solid var(--gray-200); padding-top: 24px; display: flex; align-items: center; justify-content: space-between;">
            <div id="booking-selection" style="font-size: 15px; font-weight: 700; color: var(--gray-400);">No time selected</div>
            <button type="submit" class="booking-submit" id="btn-confirm-booking" style="margin: 0; padding: 16px 32px; opacity: 0.5; pointer-events: none; transition: all 0.3s ease;">
              Confirm Booking ✓
            </button>
          </div>
        </div>
      </form>
    </div>
    
    <!-- STEP 3: SUCCESS -->
    <div class="booking-success" id="booking-success" style="padding: 40px 0; display: none;">
      <div style="text-align: center;">
        <div class="booking-success-icon" style="font-size: 64px; margin-bottom: 16px;">🎉</div>
        <h2 style="font-size: 32px; font-weight: 900; color: var(--black); margin-bottom: 8px; letter-spacing: -0.02em;">Booking Confirmed!</h2>
        <p style="font-size: 16px; color: var(--gray-500); max-width: 400px; margin: 0 auto;">We've received your project details and locked in your time slot. Check your inbox for the calendar invite!</p>
      </div>
    </div>
    
  </div>
</div>
`;

// 3. JS SCRIPT
const scriptHtml = `
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('booking-modal');
    const overlay = document.getElementById('booking-modal-overlay');
    const closeBtn = document.getElementById('booking-close');
    const form = document.getElementById('booking-form');
    const formContainer = document.getElementById('booking-form-container');
    const successMsg = document.getElementById('booking-success');
    
    const step1 = document.getElementById('booking-step-1');
    const step2 = document.getElementById('booking-step-2');
    const btnNext = document.getElementById('btn-next-step');
    const btnPrev = document.getElementById('btn-prev-step');
    const btnConfirm = document.getElementById('btn-confirm-booking');
    
    const dateInput = document.getElementById('booking_date_input');
    const timeInput = document.getElementById('booking_time_input');
    const selectionText = document.getElementById('booking-selection');

    if (!modal) return;

    // Open modal
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('a[href^="mailto:"], a[href="#contact"], #btn-book-call, #btn-cta-book');
      if (trigger) {
        e.preventDefault();
        modal.classList.add('active');
      }
    });

    // Close modal
    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => {
        formContainer.style.display = 'block';
        successMsg.style.display = 'none';
        step1.style.display = 'block';
        step2.style.display = 'none';
        form.reset();
        
        // Reset selections
        document.querySelectorAll('.booking-date-card').forEach(c => c.classList.remove('active'));
        document.getElementById('booking-times').style.display = 'none';
        dateInput.value = '';
        timeInput.value = '';
        updateConfirmBtn();
      }, 500);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Navigation
    btnNext.addEventListener('click', () => {
      // Basic HTML5 validation trigger
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      step1.style.display = 'none';
      step2.style.display = 'block';
      generateDates();
    });
    
    btnPrev.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
    });

    // Generate Dates
    function generateDates() {
      const datesContainer = document.getElementById('booking-dates');
      if (datesContainer.innerHTML.trim() !== '') return; // Already generated
      
      const today = new Date();
      let html = '';
      
      // Generate next 14 days, skipping weekends
      let added = 0;
      let curr = new Date(today);
      curr.setDate(curr.getDate() + 1); // Start tomorrow
      
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      while (added < 10) {
        if (curr.getDay() !== 0 && curr.getDay() !== 6) {
          const dayName = days[curr.getDay()];
          const dateNum = curr.getDate();
          const monthName = months[curr.getMonth()];
          const fullDateStr = curr.toDateString();
          
          html += \`
            <div class="booking-date-card" data-date="\${fullDateStr}">
              <div class="day">\${dayName}</div>
              <div class="date">\${dateNum}</div>
              <div class="day" style="margin-top:2px;">\${monthName}</div>
            </div>
          \`;
          added++;
        }
        curr.setDate(curr.getDate() + 1);
      }
      datesContainer.innerHTML = html;
      
      // Add listeners
      document.querySelectorAll('.booking-date-card').forEach(card => {
        card.addEventListener('click', function() {
          document.querySelectorAll('.booking-date-card').forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          dateInput.value = this.getAttribute('data-date');
          document.getElementById('selected-date-label').textContent = dateInput.value;
          
          // Reset time
          timeInput.value = '';
          updateConfirmBtn();
          
          // Show times
          generateTimes();
          document.getElementById('booking-times').style.display = 'block';
        });
      });
    }

    // Generate Times
    function generateTimes() {
      const grid = document.getElementById('booking-times-grid');
      const times = ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'];
      
      let html = '';
      times.forEach(t => {
        html += \`<div class="booking-time-pill" data-time="\${t}">\${t}</div>\`;
      });
      grid.innerHTML = html;
      
      document.querySelectorAll('.booking-time-pill').forEach(pill => {
        pill.addEventListener('click', function() {
          document.querySelectorAll('.booking-time-pill').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          timeInput.value = this.getAttribute('data-time');
          updateConfirmBtn();
        });
      });
    }

    function updateConfirmBtn() {
      if (dateInput.value && timeInput.value) {
        selectionText.innerHTML = \`<span style="color:var(--black);">\${dateInput.value}</span> at <span style="color:var(--black);">\${timeInput.value}</span>\`;
        btnConfirm.style.opacity = '1';
        btnConfirm.style.pointerEvents = 'all';
        btnConfirm.style.background = 'var(--purple)';
      } else {
        selectionText.innerHTML = 'No time selected';
        btnConfirm.style.opacity = '0.5';
        btnConfirm.style.pointerEvents = 'none';
        btnConfirm.style.background = 'var(--black)';
      }
    }

    // AJAX Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      btnConfirm.innerHTML = 'Booking...';
      btnConfirm.style.opacity = '0.7';
      btnConfirm.style.pointerEvents = 'none';
      
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          formContainer.style.display = 'none';
          successMsg.style.display = 'block';
        } else {
          alert('Oops! There was a problem submitting your request.');
          btnConfirm.innerHTML = 'Confirm Booking ✓';
          btnConfirm.style.opacity = '1';
          btnConfirm.style.pointerEvents = 'all';
        }
      }).catch(error => {
        alert('Oops! There was a problem submitting your request.');
        btnConfirm.innerHTML = 'Confirm Booking ✓';
        btnConfirm.style.opacity = '1';
        btnConfirm.style.pointerEvents = 'all';
      });
    });
  });
</script>
`;

// REPLACE FUNCTION
function replaceModalAndScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace HTML modal
  const modalRegex = /<div class="booking-modal" id="booking-modal">[\s\S]*?<!-- STEP 3: SUCCESS -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  const modalRegexOld = /<div class="booking-modal" id="booking-modal">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  
  if (modalRegex.test(content)) {
      content = content.replace(modalRegex, newModalHtml + '</div>\n</div>\n</div>'); // adjust closing tags if needed
  } else if (modalRegexOld.test(content)) {
      content = content.replace(modalRegexOld, newModalHtml.trim());
  }
  
  // Replace script
  const scriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?const modal = document\.getElementById\('booking-modal'\);[\s\S]*?<\/script>/;
  if (scriptRegex.test(content)) {
      content = content.replace(scriptRegex, scriptHtml.trim());
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated Custom Booking System in', filePath);
}

replaceModalAndScript('index.html');
replaceModalAndScript('build-pages.js');
