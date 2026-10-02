const fs = require('fs');
const path = require('path');
const dir = '.';

// ============================================================
// SHARED HTML CHUNKS
// ============================================================
const preloader = `<!-- ======================== PRELOADER ======================== -->
<div id="preloader">
  <div class="preloader-logo">Nodexi</div>
  <div class="preloader-bar-wrap"><div class="preloader-bar" id="preloader-bar"></div></div>
</div>`;

const navbar = (activeTab) => `<!-- ======================== NAVBAR ======================== -->
<nav class="nav" id="navbar">
  <a href="index.html" class="nav-logo" style="text-decoration:none; text-transform: uppercase; letter-spacing: 4px; font-size: 28px; font-weight: 800;">NODEXI</a>
  <div class="nav-right" style="display: flex; gap: 16px; align-items: center;">
    <a href="#contact" class="btn btn-outline" style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 14px 28px; border-radius: 999px; text-decoration: none;" id="btn-book-call">BOOK A CALL ↗</a>
    <a href="#contact" class="btn btn-dark" style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 14px 28px; border-radius: 999px; text-decoration: none;" id="btn-contact">CONTACT ↗</a>
    <button class="nav-menu-btn" id="menu-btn" aria-label="Open Menu" style="margin-left: 8px; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-direction: column; gap: 5px;">
      <span style="width: 18px; height: 1.5px; display: block;"></span>
      <span style="width: 18px; height: 1.5px; display: block;"></span>
    </button>
  </div>
</nav>`;

const slidePanel = `<!-- ======================== FULLSCREEN MENU ======================== -->
<div class="panel-overlay" id="panel-overlay"></div>
<aside class="full-menu" id="side-panel">
  <button class="panel-close" id="panel-close" aria-label="Close Menu">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
  </button>
  <div class="full-menu-inner">
    <div class="menu-col">
      <div class="menu-label"><span class="dot"></span> MENU</div>
      <nav class="full-nav">
        <a href="projects.html" class="full-link">WORK <span class="arrow">↗</span></a>
        <a href="services.html" class="full-link">PROCESS <span class="arrow">↗</span></a>
        <a href="about.html" class="full-link">ABOUT <span class="arrow">↗</span></a>
        <a href="insights.html" class="full-link">INSIGHTS <span class="arrow">↗</span></a>
        <a href="seo.html" class="full-link">SEO <span class="arrow">↗</span></a>
        <a href="#contact" class="full-link">CONTACT <span class="arrow">↗</span></a>
      </nav>
    </div>
    <div class="menu-col">
      <div class="menu-label"><span class="dot"></span> WEBFLOW WEBSITE SOLUTIONS</div>
      <nav class="full-nav">
        <a href="startups.html" class="full-link">FOR STARTUPS <span class="arrow">↗</span></a>
        <a href="web3.html" class="full-link">FOR WEB3 <span class="arrow">↗</span></a>
      </nav>
      <div class="menu-label" style="margin-top: 60px;"><span class="dot"></span> DESIGN SERVICES</div>
      <nav class="full-nav">
        <a href="design.html" class="full-link">PRODUCT DESIGN <span class="arrow">↗</span></a>
      </nav>
    </div>
  </div>
</aside>`;

const footer = `<!-- ======================== FOOTER ======================== -->
<footer>
  <div class="footer" id="footer">
    <div class="footer-logo">Nodexi</div>
    <div class="footer-copy">© 2025 Nodexi. All rights reserved.</div>
    <div class="footer-socials">
      <a href="#" class="footer-social-btn" title="LinkedIn">in</a>
      <a href="#" class="footer-social-btn" title="GitHub">GH</a>
      <a href="mailto:hello@nodexi.com" class="footer-social-btn" title="Email">✉</a>
    </div>
  </div>

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

          <!-- Dark Calendar Widget -->
          <div class="dark-calendar" id="dark-calendar">
            <div class="dc-header">
              <div class="dc-nav" id="dc-prev">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </div>
              <div id="dc-month-year">Month Year</div>
              <div class="dc-nav" id="dc-next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
            <div class="dc-weekdays">
              <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
            </div>
            <div class="dc-grid" id="dc-grid">
              <!-- Populated by JS -->
            </div>
          </div>

          <!-- Time Slots -->
          <div class="booking-times" id="booking-times" style="display: none;">
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
</footer>`;

const scripts = `  <script src="app.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("booking-modal");
    const overlay = document.getElementById("booking-modal-overlay");
    const closeBtn = document.getElementById("booking-close");
    const form = document.getElementById("booking-form");
    const formContainer = document.getElementById("booking-form-container");
    const successMsg = document.getElementById("booking-success");
    
    const step1 = document.getElementById("booking-step-1");
    const step2 = document.getElementById("booking-step-2");
    const btnNext = document.getElementById("btn-next-step");
    const btnPrev = document.getElementById("btn-prev-step");
    const btnConfirm = document.getElementById("btn-confirm-booking");
    
    const dateInput = document.getElementById("booking_date_input");
    const timeInput = document.getElementById("booking_time_input");
    const selectionText = document.getElementById("booking-selection");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedFullDate = null;

    if (!modal) return;

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("a[href^='mailto:'], a[href='#contact'], #btn-book-call, #btn-cta-book");
      if (trigger) {
        e.preventDefault();
        modal.classList.add("active");
      }
    });

    const closeModal = () => {
      modal.classList.remove("active");
      setTimeout(() => {
        formContainer.style.display = "block";
        successMsg.style.display = "none";
        step1.style.display = "block";
        step2.style.display = "none";
        form.reset();
        document.getElementById("booking-times").style.display = "none";
        dateInput.value = "";
        timeInput.value = "";
        selectedFullDate = null;
        updateConfirmBtn();
      }, 500);
    };

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    btnNext.addEventListener("click", () => {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      step1.style.display = "none";
      step2.style.display = "block";
      generateCalendar();
    });
    
    btnPrev.addEventListener("click", () => {
      step2.style.display = "none";
      step1.style.display = "block";
    });

    document.getElementById("dc-prev").addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar();
    });

    document.getElementById("dc-next").addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar();
    });

    function generateCalendar() {
      const grid = document.getElementById("dc-grid");
      const title = document.getElementById("dc-month-year");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      title.textContent = months[currentMonth] + " " + currentYear;
      
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
      
      // Adjust to Monday start (0=Mon, ..., 6=Sun)
      let startDay = firstDay - 1;
      if (startDay === -1) startDay = 6;
      
      let html = "";
      
      // Prev month faded days
      for (let i = startDay - 1; i >= 0; i--) {
        html += "<div class=\"dc-day faded\">" + (daysInPrevMonth - i) + "</div>";
      }
      
      // Current month days
      const today = new Date();
      today.setHours(0,0,0,0);
      
      for (let i = 1; i <= daysInMonth; i++) {
        const cellDate = new Date(currentYear, currentMonth, i);
        const fullDateStr = cellDate.toDateString();
        
        let classes = "dc-day current-month";
        // Fade out past days
        if (cellDate < today) {
           classes += " faded";
        }
        if (selectedFullDate === fullDateStr) {
           classes += " active";
        }
        
        html += "<div class=\"" + classes + "\" data-date=\"" + fullDateStr + "\">" + i + "</div>";
      }
      
      // Next month faded days
      const totalCells = startDay + daysInMonth;
      const remainingCells = 42 - totalCells; // Fixed 6 rows
      for (let i = 1; i <= remainingCells; i++) {
        html += "<div class=\"dc-day faded\">" + i + "</div>";
      }
      
      grid.innerHTML = html;
      
      document.querySelectorAll(".dc-day.current-month:not(.faded)").forEach(day => {
        day.addEventListener("click", function() {
          document.querySelectorAll(".dc-day").forEach(d => d.classList.remove("active"));
          this.classList.add("active");
          selectedFullDate = this.getAttribute("data-date");
          dateInput.value = selectedFullDate;
          document.getElementById("selected-date-label").textContent = selectedFullDate;
          
          timeInput.value = "";
          updateConfirmBtn();
          generateTimes();
          document.getElementById("booking-times").style.display = "block";
        });
      });
    }

    function generateTimes() {
      const grid = document.getElementById("booking-times-grid");
      const times = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
      let html = "";
      times.forEach(t => {
        html += "<div class=\"booking-time-pill\" data-time=\"" + t + "\">" + t + "</div>";
      });
      grid.innerHTML = html;
      
      document.querySelectorAll(".booking-time-pill").forEach(pill => {
        pill.addEventListener("click", function() {
          document.querySelectorAll(".booking-time-pill").forEach(p => p.classList.remove("active"));
          this.classList.add("active");
          timeInput.value = this.getAttribute("data-time");
          updateConfirmBtn();
        });
      });
    }

    function updateConfirmBtn() {
      if (dateInput.value && timeInput.value) {
        selectionText.innerHTML = "<span style=\"color:var(--black);\">" + dateInput.value + "</span> at <span style=\"color:var(--black);\">" + timeInput.value + "</span>";
        btnConfirm.style.opacity = "1";
        btnConfirm.style.pointerEvents = "all";
        btnConfirm.style.background = "var(--purple)";
      } else {
        selectionText.innerHTML = "No time selected";
        btnConfirm.style.opacity = "0.5";
        btnConfirm.style.pointerEvents = "none";
        btnConfirm.style.background = "var(--black)";
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      btnConfirm.innerHTML = "Booking...";
      btnConfirm.style.opacity = "0.7";
      btnConfirm.style.pointerEvents = "none";
      
      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      }).then(response => {
        if (response.ok) {
          formContainer.style.display = "none";
          successMsg.style.display = "block";
        } else {
          alert("Oops! There was a problem submitting your request.");
          btnConfirm.innerHTML = "Confirm Booking ✓";
          btnConfirm.style.opacity = "1";
          btnConfirm.style.pointerEvents = "all";
        }
      }).catch(error => {
        alert("Oops! There was a problem submitting your request.");
        btnConfirm.innerHTML = "Confirm Booking ✓";
        btnConfirm.style.opacity = "1";
        btnConfirm.style.pointerEvents = "all";
      });
    });
  });
</script>
`;

// ============================================================
// PAGE BUILDER HELPER
// ============================================================
function buildPage(head, active, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
${head}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css?v=2.1" />
</head>
<body>

${preloader}

${navbar(active)}

${slidePanel}

${bodyContent}

${footer}

${scripts}
</body>
</html>`;
}

// ============================================================
// SERVICES PAGE
// ============================================================
const servicesBody = `
<div style="padding-top:120px;"></div>

<!-- PROCESS HERO -->
<section class="reveal" style="padding: 0 60px 80px; max-width: var(--max); margin: 0 auto;">
  <p class="section-eyebrow" style="text-align: left; margin-bottom: 24px;">Our Process</p>
  <h1 style="font-size: clamp(48px, 8vw, 110px); font-weight: 900; color: var(--black); line-height: 0.9; letter-spacing: -0.04em; text-transform: uppercase;">
    How We<br><span class="hover-stroke">Engineer</span>
  </h1>
</section>

<!-- SCROLLING PROCESS -->
<section class="process-container">
  
  <!-- STEP 01 -->
  <div class="process-step">
    <div class="process-left">
      <div class="process-number">01</div>
    </div>
    <div class="process-content">
      <h3 class="process-title">Discover & Architect</h3>
      <p class="process-desc">We don't start coding blindly. We dissect your business logic, audit your existing infrastructure, and design a bulletproof system architecture before a single commit is made.</p>
      
      <div class="process-features">
        <div class="process-feature">
          <div class="process-feature-icon">📐</div>
          <div class="process-feature-text">
            <h4>System Architecture</h4>
            <p>Database schema design, microservices/modulith mapping, and API contract definition.</p>
          </div>
        </div>
        <div class="process-feature">
          <div class="process-feature-icon">🛡️</div>
          <div class="process-feature-text">
            <h4>Threat Modeling</h4>
            <p>Identifying security boundaries and defining zero-trust network policies early.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- STEP 02 -->
  <div class="process-step">
    <div class="process-left">
      <div class="process-number">02</div>
    </div>
    <div class="process-content">
      <h3 class="process-title">Design & Prototype</h3>
      <p class="process-desc">High-fidelity UI systems built on scalable design tokens. We create interactive prototypes so you can click through your product before engineering begins.</p>
      
      <div class="process-features">
        <div class="process-feature">
          <div class="process-feature-icon">✨</div>
          <div class="process-feature-text">
            <h4>Figma Design Systems</h4>
            <p>Comprehensive component libraries, auto-layout variants, and dark/light modes.</p>
          </div>
        </div>
        <div class="process-feature">
          <div class="process-feature-icon">🎬</div>
          <div class="process-feature-text">
            <h4>Motion Design</h4>
            <p>Framer Motion and GSAP choreography to make the product feel incredibly premium.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- STEP 03 -->
  <div class="process-step">
    <div class="process-left">
      <div class="process-number">03</div>
    </div>
    <div class="process-content">
      <h3 class="process-title">Engineering & Build</h3>
      <p class="process-desc">Senior engineers writing clean, typed, and tested code. Two-week agile sprints with full transparency. If we build it, it scales.</p>
      
      <div class="process-features">
        <div class="process-feature">
          <div class="process-feature-icon">⚡</div>
          <div class="process-feature-text">
            <h4>Full-Stack Execution</h4>
            <p>React/Next.js frontends powered by Rust, Go, or Node.js backend services.</p>
          </div>
        </div>
        <div class="process-feature">
          <div class="process-feature-icon">🧪</div>
          <div class="process-feature-text">
            <h4>Test-Driven Development</h4>
            <p>Unit testing, integration testing, and automated E2E testing in CI/CD pipelines.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- STEP 04 -->
  <div class="process-step">
    <div class="process-left">
      <div class="process-number">04</div>
    </div>
    <div class="process-content">
      <h3 class="process-title">Launch & Scale</h3>
      <p class="process-desc">We deploy to production using infrastructure-as-code, set up real-time telemetry, and stay on as your embedded engineering team to scale the product.</p>
      
      <div class="process-features">
        <div class="process-feature">
          <div class="process-feature-icon">🚀</div>
          <div class="process-feature-text">
            <h4>Zero-Downtime Deployments</h4>
            <p>Kubernetes rolling updates and blue-green deployment strategies.</p>
          </div>
        </div>
        <div class="process-feature">
          <div class="process-feature-icon">📊</div>
          <div class="process-feature-text">
            <h4>Observability</h4>
            <p>Datadog/Grafana dashboards for real-time monitoring of every system metric.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>

<div class="divider"><hr /></div>

<!-- CTA -->
<section class="cta-section reveal" id="contact">
  <div class="cta-inner">
    <div class="cta-left">
      <div class="cta-star">✦</div>
      <div>
        <div class="cta-text-title">Ready to build something exceptional?</div>
        <div class="cta-text-sub">Let's turn your ideas into powerful digital products.</div>
      </div>
    </div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">
      Book a Call ↗
    </a>
  </div>
</section>`;

// ============================================================
// PROJECTS DATA
// ============================================================
const projectsData = [
  {
    theme: 'light',
    slug: 'kaash',
    title: 'Kaash',
    year: '2026',
    headline: 'A place to breathe. We are here to listen. No judgment. No pressure.',
    desc: `Kaash started with the quiet, suffocating weight of having something on your mind and no one safe to say it to. Built for the moments when thoughts feel too heavy to carry alone.<br><br><b>Our Mission:</b> To create a safe, judgment-free space where people can express themselves freely and remind them they are not alone.`,
    tags: ['Health & Wellness', 'Mental Health'],
    focus: ['Anonymous Space', 'Privacy First', 'UI/UX Design'],
    stylesDesc: `A soothing, light aesthetic featuring soft purples, clean whites, and gentle gradients to evoke calmness and safety. The design prioritizes mental wellness by reducing visual noise and creating a serene, judgment-free digital space. "Sometimes, all we need is to be heard."`,
    colors: ['#F8F5FF', '#8A63F7', '#FFFFFF'],
    bg: '#F8F5FF',
    img: 'assets/images/projects/kaash.png',
    link: 'https://kaash.life/index.html'
  },
  {
    slug: 'gateonix',
    title: 'Gateonix',
    year: '2026',
    headline: 'Reimagining digital logic education with an interactive lab environment.',
    desc: 'Advanced Digital Logic and Computing Lab. A browser-native environment for designing, simulating, and understanding digital logic circuits.',
    tags: ['EdTech', 'WebAssembly'],
    focus: ['Web App Design', 'Simulation Engine', 'Frontend Development'],
    stylesDesc: 'We embraced a highly technical, dark-mode-first aesthetic with glowing neon accents (green and cyan) to mimic the feel of actual electronic testing equipment and logic analyzers. The typography is monospaced and sharp, emphasizing precision and engineering.',
    colors: ['#0c0814', '#00ffaa', '#00e5ff'],
    bg: '#0c0814',
    img: 'assets/images/projects/gateonix.jpg',
    link: 'https://dld.srmist.edu.in/gateonix/login.html'
  },
  {
    slug: 'digital-lab',
    title: 'Digital Lab',
    year: '2026',
    headline: 'Next-generation electric circuit simulation built for students.',
    desc: "Next-Gen Electric Circuits Lab Simulator. A real-time, interactive simulation environment built specifically for students to design, visualize, and master complex circuits.",
    tags: ['EdTech', 'Simulation'],
    focus: ['UI/UX Design', 'Real-Time Rendering', 'Frontend Architecture'],
    stylesDesc: 'A sleek, minimalist dark interface that reduces cognitive load, allowing students to focus entirely on the complex circuit diagrams. We utilized subtle purple and deep blue gradients to differentiate it from standard, sterile educational tools.',
    colors: ['#0c0716', '#7b5cf5', '#3b28cc'],
    bg: '#0c0716',
    img: 'assets/images/projects/digital_lab.jpg',
    link: 'https://electric-circuits-lab-personal.netlify.app/'
  },
  {
    slug: 'multisym',
    title: 'MultiSym Live',
    year: '2026',
    headline: 'Building a logic simulator entirely from scratch without physics engines.',
    desc: 'Interactive digital-logic circuit simulator for building and testing gate-level designs in the browser. Engineered entirely from scratch without physics engines.',
    tags: ['EdTech', 'Simulation'],
    focus: ['Algorithm Design', 'Web App Design', 'Performance Optimization'],
    stylesDesc: 'We opted for a deep forest-green palette combined with high-contrast UI elements to give the simulator a distinct, almost military-grade tactical feel. The interface relies on crisp borders and functional spacing.',
    colors: ['#0a1a11', '#14cc60', '#ffffff'],
    bg: '#0a1a11',
    img: 'assets/images/projects/multisym_live.jpg',
    link: 'https://multisimlivee.netlify.app/'
  },
  {
    slug: 'vlab',
    title: 'V-Lab',
    year: '2026',
    headline: 'Premium, full-stack virtual laboratory for EEE students.',
    desc: 'V-Lab is a premium, full-stack virtual laboratory designed specifically for Electrical and Electronics Engineering (EEE) students. It provides an interactive, highly visual environment to explore physical sensors and bridge circuits without physical hardware.',
    tags: ['EdTech', 'Virtual Lab'],
    focus: ['Physics Engine', 'Interactive Sandbox', 'Automated Reports'],
    stylesDesc: 'Featuring a modern, responsive, glassmorphism design system with dark mode. The UI is crafted to prioritize the live physics engine and real-time nodal analysis while keeping the interactive circuit sandbox highly visual and engaging.',
    colors: ['#1a1025', '#4d9eff', '#0a0a0a'],
    bg: '#1a1025',
    img: 'assets/images/projects/vlab.jpg',
    link: '#'
  },
  {
    slug: 'dalalstreett',
    title: 'DalalStreett',
    year: '2026',
    headline: 'Live updates on global markets, economy, and cryptocurrency.',
    desc: 'Live updates on global markets, economy, and cryptocurrency. Fast • Reliable • Real-time',
    tags: ['FinTech', 'Real-Time'],
    focus: ['FinTech Dashboard', 'Real-Time Data', 'UI/UX Design'],
    stylesDesc: 'A sophisticated, institutional-grade dark blue palette. We used electric blue and bright red/green indicator colors to ensure market data stands out instantly. The design language screams reliability and high-speed finance.',
    colors: ['#020816', '#0052ff', '#ff3366'],
    bg: '#020816',
    img: 'assets/images/projects/dalalstreett.jpg',
    link: 'https://dalalstreett-77pt.vercel.app/news'
  },
  {
    slug: 'kriyadocs',
    title: 'KRIYADOCS',
    year: '2026',
    headline: 'Revitalizing a Document Publishing SaaS Website for Enhanced User Engagement.',
    desc: 'Revitalizing a Document Publishing SaaS Website for Enhanced User Engagement.',
    tags: ['Mobile App', 'Web App'],
    focus: ['SaaS Redesign', 'User Experience', 'Frontend Development'],
    stylesDesc: 'A bright, welcoming layout using a mix of pastel green gradients to communicate growth, efficiency, and ease-of-use. We introduced softer, rounded typography and human-centric illustrations to build trust.',
    colors: ['#ffffff', '#d4fc79', '#96e6a1'],
    bg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    link: '#'
  },
  {
    slug: 'woo-spaces',
    title: 'WOO Spaces',
    year: '2026',
    headline: 'Building a friendly neighborhood co-working space platform.',
    desc: 'Building a friendly neighborhood co-working space platform',
    tags: ['Mobile App', 'Web App'],
    focus: ['Mobile App Design', 'Platform Development', 'Branding'],
    stylesDesc: 'Warm, inviting, and community-focused. We chose soft pinks and warm gradient tones to reflect the physical warmth of a modern neighborhood cafe or premium co-working environment.',
    colors: ['#ff9a9e', '#fecfef', '#111111'],
    bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    link: '#'
  }
];

// ============================================================
// PROJECTS PAGE
// ============================================================
const projectsBody = `
<div style="padding-top:120px;"></div>

<!-- PROJECTS HERO -->
<section class="reveal" style="padding: 0 60px 40px; max-width: var(--max); margin: 0 auto;">
  <p class="section-eyebrow" style="text-align: left; margin-bottom: 24px;">Our Work</p>
  <h1 style="font-size: clamp(48px, 8vw, 120px); font-weight: 900; color: var(--black); line-height: 0.9; letter-spacing: -0.04em; text-transform: uppercase;">
    Selected<br><span class="hover-stroke">Works</span>
  </h1>
</section>

<!-- PROJECTS GRID -->
<section style="max-width: var(--max); margin: 0 auto; padding: 0 60px 100px;">
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px 32px;">
    
    ${projectsData.map(p => `
    <a href="work-${p.slug}.html" class="reveal" style="display: flex; flex-direction: column; cursor: pointer; text-decoration: none;">
      <div class="grid-img-wrap" style="background: ${p.bg};">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('${p.img}'); background-size: cover; background-position: center;"></div>

        <!-- Tags Overlay -->
        <div style="position: absolute; bottom: 20px; left: 20px; display: flex; gap: 8px; z-index: 10;">
          ${p.tags.map(t => `<span style="background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); color: #000; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 999px;">${t}</span>`).join('')}
        </div>
      </div>
      
      <h3 style="font-size: 22px; font-weight: 700; color: var(--black); margin-bottom: 8px;">${p.title}</h3>
      <p style="font-size: 15px; color: var(--gray-500); line-height: 1.6; max-width: 90%;">${p.desc}</p>
    </a>
    `).join('')}

  </div>
</section>

<div class="divider"><hr /></div>

<section class="cta-section reveal" id="contact">
  <div class="cta-inner">
    <div class="cta-left">
      <div class="cta-star">✦</div>
      <div>
        <div class="cta-text-title">Have a project in mind?</div>
        <div class="cta-text-sub">We'd love to hear about what you're building.</div>
      </div>
    </div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">
      Start a Project ↗
    </a>
  </div>
</section>`;

// ============================================================
// ABOUT PAGE
// ============================================================
const aboutBody = `
<div style="padding-top:120px;"></div>

<!-- ABOUT HERO: SPLIT SCREEN -->
<section class="reveal" style="max-width: var(--max); margin: 0 auto; padding: 0 60px 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end;">
  <div>
    <p class="section-eyebrow" style="text-align: left; margin-bottom: 24px;">Who We Are</p>
    <h1 style="font-size: clamp(52px, 7vw, 100px); font-weight: 900; color: var(--black); line-height: 0.92; letter-spacing: -0.04em; text-transform: uppercase;">
      We<br>Are<br><span class="hover-stroke-black">Nodexi.</span>
    </h1>
  </div>
  <div style="padding-bottom: 12px;">
    <p style="font-size: 20px; color: var(--gray-500); line-height: 1.8; margin-bottom: 40px; border-left: 3px solid var(--purple); padding-left: 24px;">
      A full-stack engineering studio founded by engineers frustrated with agencies that overpromised and underdelivered. So we built the studio we always wished existed.
    </p>
    <div style="display: flex; gap: 40px;">
      <div>
        <div style="font-size: 48px; font-weight: 900; color: var(--black); line-height: 1;">40<span class="hover-stroke">+</span></div>
        <div style="font-size: 13px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Projects Shipped</div>
      </div>
      <div>
        <div style="font-size: 48px; font-weight: 900; color: var(--black); line-height: 1;">12<span class="hover-stroke">+</span></div>
        <div style="font-size: 13px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Industries Served</div>
      </div>
      <div>
        <div style="font-size: 48px; font-weight: 900; color: var(--black); line-height: 1;">99<span class="hover-stroke">%</span></div>
        <div style="font-size: 13px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Client Retention</div>
      </div>
    </div>
  </div>
</section>

<!-- FULL-BLEED STATEMENT -->
<section class="reveal" style="background: var(--black); padding: 100px 60px; overflow: hidden; position: relative;">
  <div style="position: absolute; top: -60px; right: -80px; font-size: 300px; font-weight: 900; color: rgba(123,92,245,0.05); line-height: 1; pointer-events:none; user-select:none;">NX</div>
  <div style="max-width: var(--max); margin: 0 auto; position: relative; z-index: 1;">
    <p style="font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--purple); margin-bottom: 32px;">Our Mission</p>
    <p style="font-size: clamp(28px, 4vw, 54px); font-weight: 800; color: #fff; line-height: 1.3; letter-spacing: -0.02em; max-width: 900px;">
      "Engineering that creates unfair advantages. The best technology shouldn't be reserved for billion-dollar companies. A 5-person startup deserves the same rigour as a Fortune 500."
    </p>
    <div style="display: flex; align-items: center; gap: 16px; margin-top: 48px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1);">
      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--purple), #a78bfa); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; color: #fff;">👤</div>
      <div>
        <div style="font-size: 16px; font-weight: 800; color: #fff;">Siddharth Kumar</div>
        <div style="font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Founder & Lead Engineer</div>
      </div>
    </div>
  </div>
</section>

<!-- TEAM: ASYMMETRIC BENTO -->
<section class="reveal" style="max-width: var(--max); margin: 0 auto; padding: 100px 60px 60px;">
  <p class="section-eyebrow" style="text-align: left; margin-bottom: 16px;">The Team</p>
  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; flex-wrap: wrap; gap: 24px;">
    <h2 style="font-size: clamp(36px, 5vw, 64px); font-weight: 900; color: var(--black); letter-spacing: -0.03em; line-height: 1.05;">Built by engineers,<br>for builders.</h2>
    <p style="max-width: 320px; font-size: 15px; color: var(--gray-500); line-height: 1.7;">A focused, senior-only team. No junior developers, no offshore outsourcing — just seasoned engineers who take ownership.</p>
  </div>

  <!-- Bento Team Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    
    <!-- FOUNDER (You) -->
    <div style="background: var(--black); border-radius: 32px; padding: 48px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 480px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #1a0533 0%, #2d0b5e 50%, #7B5CF5 100%); opacity: 0.9;"></div>
      <div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: rgba(123,92,245,0.3); border-radius: 50%; filter: blur(60px);"></div>
      <div style="position: relative; z-index: 2;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 24px;">👤</div>
        <div style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em;">Siddharth Kumar</div>
        <div style="font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Founder & Lead Engineer</div>
        <p style="font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.7;">Full-stack engineer and systems architect. Deep background in distributed systems, AI pipelines, and building scalable platforms.</p>
        <div style="display: flex; gap: 8px; margin-top: 24px; flex-wrap: wrap;">
          ${['React','Node.js','TypeScript','Next.js'].map(t => `<span style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15);">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- CO-FOUNDER (Friend) -->
    <div style="background: var(--black); border-radius: 32px; padding: 48px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 480px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #38bdf8 100%); opacity: 0.9;"></div>
      <div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: rgba(56,189,248,0.3); border-radius: 50%; filter: blur(60px);"></div>
      <div style="position: relative; z-index: 2;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 24px;">👤</div>
        <div style="font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em;">Aduat Chauhan</div>
        <div style="font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Co-Founder</div>
        <p style="font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.7;">Creative problem solver and operations lead. Focused on delivering perfect user experiences and scaling the business.</p>
        <div style="display: flex; gap: 8px; margin-top: 24px; flex-wrap: wrap;">
          ${['Design','UI/UX','Product','Operations'].map(t => `<span style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15);">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- BOTTOM WIDE: VALUES TEASER -->
    <div style="grid-column: span 2; background: linear-gradient(135deg, #f0ebff 0%, var(--purple-light) 100%); border: 1px solid rgba(123,92,245,0.2); border-radius: 32px; padding: 40px; display: flex; align-items: center; gap: 40px;">
      <div style="font-size: 64px;">🌍</div>
      <div>
        <div style="font-size: 22px; font-weight: 900; color: var(--black); margin-bottom: 8px;">Operating Globally</div>
        <p style="font-size: 15px; color: var(--gray-500); line-height: 1.7; max-width: 500px;">Clients across India, USA, Canada, UAE, and Southeast Asia. We work async, across timezones, with no drop in communication quality.</p>
      </div>
      <div style="margin-left: auto; display: flex; gap: 24px; flex-shrink: 0;">
        ${['🇮🇳','🇺🇸','🇨🇦','🇦🇪'].map(flag => `<div style="font-size: 36px;">${flag}</div>`).join('')}
      </div>
    </div>
    
  </div>
</section>

<!-- VALUES MANIFESTO STRIP -->
<section class="reveal" style="background: var(--cream); padding: 80px 60px;">
  <div style="max-width: var(--max); margin: 0 auto;">
    <p class="section-eyebrow" style="text-align: left; margin-bottom: 48px;">How We Think</p>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--gray-200); border-radius: 24px; overflow: hidden;">
      ${[['⚡','Speed Without Compromise','We move fast, but we never skip the test. Agile sprints deliver results in weeks, not months — without sacrificing code quality or architecture.'],['🎯','Radical Transparency','No hidden surprises. No vague status updates. You always know exactly where your project stands, down to the last commit and the last dollar.'],['🔬','Engineering Excellence','We write code like it matters, because it does. Clean architecture, comprehensive tests, and thoughtful documentation are non-negotiable.']].map(([icon, title, desc], i) => `<div style="padding: 48px 40px; ${i < 2 ? 'border-right: 1px solid var(--gray-200);' : ''}"><div style="font-size: 40px; margin-bottom: 20px;">${icon}</div><h3 style="font-size: 22px; font-weight: 900; color: var(--black); margin-bottom: 16px; letter-spacing: -0.01em;">${title}</h3><p style="font-size: 15px; color: var(--gray-500); line-height: 1.8;">${desc}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="cta-section reveal" id="contact" style="padding-top: 80px;">
  <div class="cta-inner">
    <div class="cta-left">
      <div class="cta-star">✦</div>
      <div>
        <div class="cta-text-title">Want to work with us?</div>
        <div class="cta-text-sub">We take on a small number of new projects each month.</div>
      </div>
    </div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">
      Let's Talk ↗
    </a>
  </div>
</section>`;

// ============================================================

// ============================================================
// INSIGHTS PAGE
// ============================================================
const insightsBody = `
<div style="padding-top:120px;"></div>

<!-- INSIGHTS HERO & FEATURED -->
<section class="reveal" style="max-width: var(--max); margin: 0 auto; padding: 0 60px 80px;">
  <p class="section-eyebrow" style="text-align: left; margin-bottom: 24px;">Intelligence & Perspectives</p>
  <h1 style="font-size: clamp(48px, 6vw, 84px); font-weight: 900; color: var(--black); line-height: 1; letter-spacing: -0.03em; margin-bottom: 60px; max-width: 900px;">
    Where engineering<br>meets <span class="hover-stroke">insight.</span>
  </h1>
  
  <div style="background: var(--black); border-radius: 24px; overflow: hidden; display: grid; grid-template-columns: 1.2fr 1fr; align-items: stretch;">
    <div style="padding: 60px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(123,92,245,0.2) 0%, transparent 70%); filter: blur(40px);"></div>
      <div style="position: relative; z-index: 2;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
          <span style="background: rgba(123,92,245,0.2); border: 1px solid rgba(123,92,245,0.4); color: #C4B5FD; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 6px 14px; border-radius: 999px;">Architecture</span>
          <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 6px 14px; border-radius: 999px;">8 min read</span>
        </div>
        <h3 style="font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: #fff; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 24px;">Why We Stopped Using Microservices (And What We Use Instead)</h3>
        <p style="color: rgba(255,255,255,0.65); font-size: 16px; line-height: 1.7; margin-bottom: 32px; max-width: 480px;">A deep-dive into why modulith architecture outperforms distributed microservices for most teams under 50 engineers. We ran microservices across 3 major platforms before reversing course.</p>
        <a href="#" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: #fff; text-decoration: none; border-bottom: 2px solid var(--purple); padding-bottom: 4px;">Read Full Article ↗</a>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #1a0533 0%, #2d0b5e 100%); position: relative; min-height: 400px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
      <!-- Abstract Art for Featured -->
      <div style="position: absolute; inset: 0; opacity: 0.2; background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>
      <div style="font-size: 120px; font-weight: 900; color: #fff; opacity: 0.05; user-select: none;">SYSTEMS</div>
    </div>
  </div>
</section>

<!-- ARTICLE GRID (CLEAN MINIMALIST) -->
<section class="reveal" style="background: var(--cream); padding: 80px 60px;">
  <div style="max-width: var(--max); margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid var(--gray-200); padding-bottom: 24px; margin-bottom: 48px;">
      <h2 style="font-size: 28px; font-weight: 800; color: var(--black);">Latest Articles</h2>
      <a href="#" style="font-size: 14px; font-weight: 700; color: var(--purple); text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">View All ↗</a>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 40px;">
      ${[
        {tag:'AI', read:'6 min', title:'Running LLMs on Edge Hardware: A Practical Guide', desc:'Deploying quantized GGUF models on ARM Cortex-M and Raspberry Pi. Real benchmarks and tradeoffs.'},
        {tag:'DevOps', read:'5 min', title:'Zero-Downtime Deploys at Scale: Our Playbook', desc:'The exact rolling deployment strategy, health check configs, and circuit breaker patterns we use in prod.'},
        {tag:'Security', read:'7 min', title:'The Zero-Trust Network We Built for Fintech', desc:'How we designed a network where no device is trusted by default — reducing attack surface by 97%.'},
        {tag:'Data', read:'4 min', title:'dbt vs. Airflow: Choosing the Right Orchestrator', desc:'We\'ve used both extensively. A non-biased breakdown of when each tool shines.'},
        {tag:'Frontend', read:'5 min', title:'Islands Architecture: The Future of Web Perf', desc:'Moving from Next.js App Router to Astro with selective hydration — and the Web Vitals results.'},
        {tag:'Hardware', read:'9 min', title:'Designing a Custom PCB for Industrial IoT', desc:'From KiCad schematics to FCC certification — the complete journey of designing a custom sensor board.'}
      ].map(a => `
      <div style="display: flex; flex-direction: column; cursor: pointer; group">
        <div style="width: 100%; aspect-ratio: 16/9; background: var(--gray-200); border-radius: 16px; margin-bottom: 24px; overflow: hidden; position: relative;">
          <div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--gray-50), var(--gray-200)); transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"></div>
        </div>
        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; font-weight: 800; color: var(--purple); text-transform: uppercase; letter-spacing: 1px;">${a.tag}</span>
          <span style="font-size: 12px; color: var(--gray-400); font-weight: 600;">${a.read} read</span>
        </div>
        <h3 style="font-size: 22px; font-weight: 800; color: var(--black); line-height: 1.3; margin-bottom: 12px; transition: color 0.2s;" onmouseover="this.style.color='var(--purple)'" onmouseout="this.style.color='var(--black)'">${a.title}</h3>
        <p style="font-size: 15px; color: var(--gray-500); line-height: 1.7; flex: 1;">${a.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="cta-section reveal" id="contact" style="padding-top: 80px;">
  <div class="cta-inner">
    <div class="cta-left">
      <div class="cta-star">✦</div>
      <div>
        <div class="cta-text-title">Have a technical challenge?</div>
        <div class="cta-text-sub">Let's think through it together — no commitment required.</div>
      </div>
    </div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">
      Start a Conversation ↗
    </a>
  </div>
</section>`;

// ============================================================
// SEO PAGE
// ============================================================
const seoBody = `
<div style="padding-top:80px;"></div>

<!-- SEO CINEMATIC HERO (lazyyseo-inspired) -->
<section class="reveal" style="background: linear-gradient(135deg, #0a0015 0%, #1a0040 40%, #6B2BD4 80%, #7B5CF5 100%); min-height: 88vh; display: flex; align-items: center; padding: 60px; position: relative; overflow: hidden;">
  <!-- Glowing orbs background -->
  <div style="position: absolute; top: -200px; right: -100px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(123,92,245,0.4) 0%, transparent 70%); pointer-events: none;"></div>
  <div style="position: absolute; bottom: -100px; left: 20%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(107,43,212,0.3) 0%, transparent 70%); pointer-events: none;"></div>
  
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 2; width: 100%;">
    <!-- LEFT: Headline -->
    <div>
      <h1 style="font-size: clamp(42px, 5vw, 76px); font-weight: 900; color: #fff; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 28px;">
        Buried on Page 4.<br>Let's Fix Your<br><span class="hover-stroke">Rankings.</span>
      </h1>
      <p style="font-size: 18px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 36px; max-width: 480px;">Every day your competitors rank higher and get cited by AI. We make sure that's you instead — on Google, ChatGPT, Perplexity, and Gemini.</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px;">
        ${['ROI Focused Technical SEO','85% Client Retention Rate','Dedicated SEO Experts','LLM Citation & Ranking'].map(t => `<div style="display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 600;"><span style="width: 22px; height: 22px; background: rgba(123,92,245,0.4); border: 1.5px solid var(--purple); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px;">✓</span>${t}</div>`).join('')}
      </div>
      
      <a href="mailto:hello@nodexi.com" style="display: inline-flex; align-items: center; gap: 10px; background: #fff; color: #000; font-size: 15px; font-weight: 700; padding: 16px 32px; border-radius: 999px; text-decoration: none; transition: all 0.3s;">Get a Free SEO Audit ↗</a>
    </div>
    
    <!-- RIGHT: Floating Dashboard Cards -->
    <div style="position: relative; height: 480px;">
      <!-- Card 1: Total Clicks -->
      <div style="position: absolute; top: 0; right: 0; width: 280px; background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
        <div style="font-size: 12px; font-weight: 700; color: var(--gray-400); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">Total Clicks — Google Search Console</div>
        <div style="font-size: 48px; font-weight: 900; color: #000; line-height: 1;">2,582<span style="font-size: 20px; color: #22c55e;">↑ 600</span></div>
        <div style="height: 60px; background: linear-gradient(to bottom, transparent, var(--gray-50)); border-radius: 8px; margin-top: 12px; display: flex; align-items: flex-end; gap: 2px; padding: 0 4px 4px;">
          ${[20,35,25,55,40,60,45,80,65,90,70,95].map(h => `<div style="flex:1; height:${h}%; background: linear-gradient(to top, #7B5CF5, #C4B5FD); border-radius: 3px 3px 0 0; opacity: 0.8;"></div>`).join('')}
        </div>
      </div>
      <!-- Card 2: Traffic -->
      <div style="position: absolute; bottom: 20px; left: 0; width: 260px; background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
        <div style="font-size: 12px; font-weight: 700; color: var(--gray-400); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">Site Traffic</div>
        <div style="font-size: 40px; font-weight: 900; color: #000; line-height: 1;">4,546<span style="font-size: 18px; color: #22c55e; margin-left: 6px;">+127%</span></div>
        <div style="height: 50px; margin-top: 12px; display: flex; align-items: flex-end; gap: 3px;">
          ${[10,20,15,40,30,55,45,70,60,85,75,95].map(h => `<div style="flex:1; height:${h}%; background: linear-gradient(to top, #22c55e, #86efac); border-radius: 3px 3px 0 0; opacity: 0.85;"></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SEO PILLARS — ALIEN INSPIRED CARD GRID (LIGHT) -->
<section class="reveal" style="background: var(--cream); padding: 100px 60px 60px;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <p class="section-eyebrow" style="text-align: left; margin-bottom: 16px;">Our SEO Services</p>
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; flex-wrap: wrap; gap: 24px;">
      <h2 style="font-size: clamp(36px, 5vw, 64px); font-weight: 900; color: var(--black); letter-spacing: -0.03em; line-height: 1.05;">Superior SEO that<br>transforms your rankings.</h2>
      <p style="max-width: 340px; font-size: 16px; color: var(--gray-500); line-height: 1.7;">Our versatile process is designed to launch new search strategies quickly and scale existing rankings to the next level.</p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      ${[['⚡','Core Web Vitals','Optimizing LCP, CLS, and INP to hit Google\'s "Good" threshold. CI performance budgets to prevent regression.'],['🔗','Crawlability & Indexing','Fixing crawl errors, canonical issues, JS rendering gaps so Googlebot indexes every page that matters.'],['🏗️','Structured Data','Schema.org JSON-LD for rich results — FAQs, products, reviews. We make your listings dominate the SERP.'],['📐','Technical Audits','Full audits: URL structure, internal links, duplicate content, hreflang correctness, and server log analysis.'],['🌍','International SEO','Multi-region strategy, hreflang maps, and geo-targeted content architectures for companies scaling globally.'],['📊','Analytics & Reporting','GA4 pipelines + Search Console dashboards. You always know which pages drive revenue — not just traffic.']].map(([icon,title,desc]) => `<div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 20px; padding: 36px; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.borderColor='var(--purple)'; this.style.boxShadow='0 8px 32px rgba(123,92,245,0.1)'" onmouseout="this.style.transform=''; this.style.borderColor='var(--gray-200)'; this.style.boxShadow=''"><div style="font-size: 32px; margin-bottom: 16px;">${icon}</div><h3 style="font-size: 20px; font-weight: 800; color: var(--black); margin-bottom: 12px;">${title}</h3><p style="font-size: 14px; color: var(--gray-500); line-height: 1.7;">${desc}</p></div>`).join('')}
    </div>
  </div>
</section>

<!-- NUMBERS STRIP -->
<section class="reveal" style="background: var(--black); padding: 80px 60px;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center;">
    <div><div style="font-size: 60px; font-weight: 900; color: #fff; line-height: 1;">312<span class="hover-stroke">%</span></div><div style="font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 600; margin-top: 8px; text-transform: uppercase; letter-spacing: 1.5px;">Avg. Organic Traffic Lift</div></div>
    <div><div style="font-size: 60px; font-weight: 900; color: #fff; line-height: 1;">&lt;1.2<span class="hover-stroke">s</span></div><div style="font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 600; margin-top: 8px; text-transform: uppercase; letter-spacing: 1.5px;">LCP After Optimization</div></div>
    <div><div style="font-size: 60px; font-weight: 900; color: #fff; line-height: 1;">98<span class="hover-stroke">/100</span></div><div style="font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 600; margin-top: 8px; text-transform: uppercase; letter-spacing: 1.5px;">Avg. Lighthouse Score</div></div>
    <div><div style="font-size: 60px; font-weight: 900; color: #fff; line-height: 1;">6<span class="hover-stroke">mo</span></div><div style="font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 600; margin-top: 8px; text-transform: uppercase; letter-spacing: 1.5px;">Avg. Time to Rank #1</div></div>
  </div>
</section>

<section class="cta-section reveal" id="contact" style="padding-top: 80px;">
  <div class="cta-inner">
    <div class="cta-left"><div class="cta-star">✦</div><div><div class="cta-text-title">Ready to rank?</div><div class="cta-text-sub">Get a free technical SEO audit of your site.</div></div></div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">Get Free Audit ↗</a>
  </div>
</section>`;

// ============================================================
// FOR STARTUPS PAGE
// ============================================================
const startupsBody = `
<div style="padding-top:120px;"></div>

<section class="reveal" style="max-width: var(--max); margin: 0 auto; padding: 0 60px 80px;">
  <p class="section-eyebrow" style="text-align: left; margin-bottom: 24px;">For Startups</p>
  <h1 style="font-size: clamp(48px, 6vw, 84px); font-weight: 900; color: var(--black); line-height: 1; letter-spacing: -0.03em; margin-bottom: 40px; max-width: 900px;">
    The engineering team<br>you can't <span class="hover-stroke">hire yet.</span>
  </h1>
  <p style="font-size: 20px; color: var(--gray-500); line-height: 1.8; max-width: 680px; border-left: 3px solid var(--purple); padding-left: 24px;">
    We work as an embedded engineering partner for early-stage startups. Senior talent, startup speed, enterprise standards — without the $400k salary overhead.
  </p>
</section>

<!-- WHY NODEXI FOR STARTUPS -->
<section class="reveal" style="background: var(--cream); padding: 100px 60px;">
  <div style="max-width: var(--max); margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;">
    <div style="position: sticky; top: 120px;">
      <p class="section-eyebrow" style="text-align: left;">Our Model</p>
      <h2 style="font-size: clamp(36px, 5vw, 64px); font-weight: 900; color: var(--black); line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 24px;">We plug in,<br>we ship.</h2>
      <p style="font-size: 17px; color: var(--gray-500); line-height: 1.9; margin-bottom: 20px;">Forget 6-month agency timelines. From kickoff to live MVP in 6-8 weeks. We've done it for fintech, healthtech, edtech, and e-commerce — and we move fast without breaking things.</p>
      <p style="font-size: 17px; color: var(--gray-500); line-height: 1.9; margin-bottom: 40px;">We integrate with your Slack, join your standups, and operate as a true extension of your founding team. When you raise your next round, you inherit clean code and full documentation — not a black box.</p>
      <a href="mailto:hello@nodexi.com" class="btn btn-purple" style="display: inline-flex; padding: 16px 32px; font-weight: 700; border-radius: 999px; text-decoration: none;">Book a Discovery Call ↗</a>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 24px; padding: 40px;">
        <div style="font-size: 40px; margin-bottom: 20px;">🚀</div>
        <div style="font-size: 20px; font-weight: 900; color: var(--black); margin-bottom: 12px; letter-spacing: -0.01em;">MVP in 6 Weeks</div>
        <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">From zero to live product. Battle-tested stack, zero bloat.</p>
      </div>
      <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 24px; padding: 40px;">
        <div style="font-size: 40px; margin-bottom: 20px;">🧠</div>
        <div style="font-size: 20px; font-weight: 900; color: var(--black); margin-bottom: 12px; letter-spacing: -0.01em;">Senior Only</div>
        <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">No juniors. No handoffs. Your code is written by the people presenting it.</p>
      </div>
      <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 24px; padding: 40px;">
        <div style="font-size: 40px; margin-bottom: 20px;">📦</div>
        <div style="font-size: 20px; font-weight: 900; color: var(--black); margin-bottom: 12px; letter-spacing: -0.01em;">You Own It All</div>
        <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">IP, repos, and docs. Transfer at any point, no strings attached.</p>
      </div>
      <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 24px; padding: 40px;">
        <div style="font-size: 40px; margin-bottom: 20px;">📈</div>
        <div style="font-size: 20px; font-weight: 900; color: var(--black); margin-bottom: 12px; letter-spacing: -0.01em;">Built to Scale</div>
        <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">Architecture ready for 1 user or 1M — designed for your Series A.</p>
      </div>
    </div>
  </div>
</section>

<!-- STARTUP TIERS -->
<section class="reveal" style="max-width: var(--max); margin: 0 auto; padding: 100px 60px;">
  <div style="text-align: center; margin-bottom: 60px;">
    <p class="section-eyebrow">Engagement Models</p>
    <h2 style="font-size: clamp(36px, 5vw, 64px); font-weight: 900; color: var(--black); line-height: 1.05; letter-spacing: -0.03em;">Simple pricing,<br>no surprises.</h2>
  </div>
  
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch;">
    <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 32px; padding: 48px; display: flex; flex-direction: column;">
      <div style="font-size: 13px; font-weight: 800; letter-spacing: 2px; color: var(--gray-400); text-transform: uppercase; margin-bottom: 16px;">Sprint</div>
      <div style="font-size: 48px; font-weight: 900; color: var(--black); margin-bottom: 16px; line-height: 1;">2 Weeks</div>
      <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7; margin-bottom: 40px; flex: 1;">Perfect for a specific feature, integration, or performance fix. Scoped, time-boxed, and delivered.</p>
      <a href="mailto:hello@nodexi.com" style="color: var(--purple); font-weight: 800; font-size: 15px; text-decoration: none;">Get Started ↗</a>
    </div>
    
    <div style="background: linear-gradient(135deg, #1a0a3e 0%, #7B5CF5 100%); border-radius: 32px; padding: 48px; display: flex; flex-direction: column; position: relative; box-shadow: 0 20px 40px rgba(123,92,245,0.2); transform: scale(1.02);">
      <div style="position: absolute; top: -16px; left: 50%; transform: translateX(-50%); background: #fff; color: var(--purple); font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 8px 16px; border-radius: 999px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">Most Popular</div>
      <div style="font-size: 13px; font-weight: 800; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; margin-bottom: 16px;">Build</div>
      <div style="font-size: 48px; font-weight: 900; color: #fff; margin-bottom: 16px; line-height: 1;">6–12 Weeks</div>
      <p style="color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.7; margin-bottom: 40px; flex: 1;">Full MVP or major product build. Discovery, design, engineering, and deployment — end to end.</p>
      <a href="mailto:hello@nodexi.com" style="color: #fff; font-weight: 800; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 4px; align-self: flex-start;">Get Started ↗</a>
    </div>
    
    <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 32px; padding: 48px; display: flex; flex-direction: column;">
      <div style="font-size: 13px; font-weight: 800; letter-spacing: 2px; color: var(--gray-400); text-transform: uppercase; margin-bottom: 16px;">Scale</div>
      <div style="font-size: 48px; font-weight: 900; color: var(--black); margin-bottom: 16px; line-height: 1;">Ongoing</div>
      <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7; margin-bottom: 40px; flex: 1;">Embedded monthly retainer. We act as your full-time CTO and engineering team, scaling up or down as needed.</p>
      <a href="mailto:hello@nodexi.com" style="color: var(--purple); font-weight: 800; font-size: 15px; text-decoration: none;">Let's Talk ↗</a>
    </div>
  </div>
</section>

<div class="divider"><hr /></div>

<section class="cta-section reveal" id="contact">
  <div class="cta-inner">
    <div class="cta-left"><div class="cta-star">✦</div><div><div class="cta-text-title">Idea in your head?</div><div class="cta-text-sub">Let's scope it out in a free 30-min call.</div></div></div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">Book a Call ↗</a>
  </div>
</section>`;

// ============================================================
// FOR WEB3 PAGE
// ============================================================
const web3Body = `
<div style="padding-top:100px;"></div>

<!-- WEB3 HERO -->
<section class="reveal" style="background: linear-gradient(to bottom, var(--black), #1a0a3e); min-height: 80vh; display: flex; align-items: center; padding: 60px; position: relative; overflow: hidden; margin: 20px; border-radius: 40px;">
  <!-- Abstract Nodes -->
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(rgba(123,92,245,0.1) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.5;"></div>
  <div style="position: absolute; right: -100px; top: 20%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(123,92,245,0.2) 0%, transparent 60%); filter: blur(40px);"></div>
  
  <div style="max-width: var(--max); margin: 0 auto; width: 100%; position: relative; z-index: 2;">
    <div style="display: flex; gap: 8px; margin-bottom: 32px;">
      <span style="background: rgba(123,92,245,0.2); border: 1px solid rgba(123,92,245,0.4); color: #C4B5FD; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 999px;">Web3 Engineering</span>
    </div>
    
    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center;">
      <div>
        <h1 style="font-size: clamp(48px, 6vw, 84px); font-weight: 900; color: #fff; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 32px;">
          Decentralized<br>infrastructure<br><span class="hover-stroke">built to last.</span>
        </h1>
        <p style="font-size: 18px; color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 40px; max-width: 480px;">
          Beyond the hype. We build audited smart contracts, performant dApps, and secure wallet integrations that handle real-world scale and real-world attacks.
        </p>
        <a href="mailto:hello@nodexi.com" class="btn btn-purple" style="display: inline-flex; padding: 16px 32px; font-weight: 700; border-radius: 999px; text-decoration: none; color: #fff;">Audit Your Protocol ↗</a>
      </div>
      
      <!-- Terminal Window -->
      <div style="background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; backdrop-filter: blur(20px);">
        <div style="display: flex; gap: 8px; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02);">
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></div>
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></div>
        </div>
        <div style="padding: 24px; font-family: var(--mono); font-size: 14px; color: #a5b4fc; line-height: 1.7; overflow-x: auto;">
          <div style="color: #6ee7b7;">> foundry test --match-path test/Vault.t.sol</div>
          <div style="color: #94a3b8; margin: 8px 0;">[PASS] test_deposit() (gas: 54321)</div>
          <div style="color: #94a3b8; margin: 8px 0;">[PASS] test_withdraw() (gas: 43210)</div>
          <div style="color: #94a3b8; margin: 8px 0;">[PASS] testFuzz_invariant_reserves(uint256) (runs: 1000)</div>
          <div style="color: #94a3b8; margin: 8px 0;">[PASS] test_revert_reentrancy() (gas: 12345)</div>
          <div style="color: #22c55e; margin-top: 16px; font-weight: bold;">Test result: ok. 4 passed; 0 failed; finished in 241ms</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WEB3 SERVICES -->
<section class="reveal" style="background: var(--cream); padding: 100px 60px;">
  <div style="max-width: var(--max); margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px;">
      <h2 style="font-size: clamp(36px, 5vw, 56px); font-weight: 900; color: var(--black); line-height: 1.1; letter-spacing: -0.02em; max-width: 600px;">Protocol-level engineering for the new web.</h2>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      ${[
        ['📜', 'Smart Contracts', 'Solidity, Vyper, and Rust (Anchor) contract development with full unit + fuzz testing. ERC-20, ERC-721, custom protocols. Built to be audited.'],
        ['🔐', 'Security Audits', 'Pre-deployment audits using Slither, Foundry invariant tests, and manual review. We find reentrancy and overflow before mainnet does.'],
        ['🌐', 'dApp Frontend', 'React + wagmi + viem frontends with multi-wallet support. Clean UX that hides the complexity of Web3 from your users.'],
        ['⛓️', 'Indexers & Data', 'The Graph Protocol subgraph development and custom indexing solutions. Query on-chain data at millisecond speed.'],
        ['🏦', 'DeFi Protocols', 'AMMs, lending protocols, yield aggregators, and staking mechanics. We understand concentrated liquidity and MEV.'],
        ['🌉', 'Cross-Chain', 'LayerZero and CCIP integrations for omnichain protocols. Move assets safely across EVM and non-EVM chains.']
      ].map(([icon, title, desc]) => `
      <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 24px; padding: 40px; display: flex; flex-direction: column; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--purple)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 40px rgba(123,92,245,0.1)'" onmouseout="this.style.borderColor='var(--gray-200)'; this.style.transform=''; this.style.boxShadow=''">
        <div style="font-size: 32px; margin-bottom: 24px;">${icon}</div>
        <h3 style="font-size: 20px; font-weight: 800; color: var(--black); margin-bottom: 16px;">${title}</h3>
        <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7; flex: 1;">${desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- TECH STACK -->
<section class="reveal" style="background: var(--black); padding: 80px 24px;">
  <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
    <p class="section-eyebrow" style="color: rgba(255,255,255,0.5);">Technology Stack</p>
    <h2 class="section-h2" style="margin-bottom: 50px; color: #fff;">Battle-tested,<br><span class="hover-stroke">chain-agnostic.</span></h2>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; max-width: 800px; margin: 0 auto;">
      ${['Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'Solidity', 'Anchor', 'Foundry', 'Hardhat', 'The Graph', 'wagmi', 'ethers.js', 'viem', 'IPFS', 'Chainlink', 'LayerZero', 'OpenZeppelin'].map(t => `<span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px; font-weight: 600; padding: 10px 24px; border-radius: 999px; letter-spacing: 0.5px;">${t}</span>`).join('')}
    </div>
  </div>
</section>

<section class="cta-section reveal" id="contact" style="padding-top: 80px;">
  <div class="cta-inner">
    <div class="cta-left"><div class="cta-star">✦</div><div><div class="cta-text-title">Building a Web3 product?</div><div class="cta-text-sub">Let's audit your architecture before you launch.</div></div></div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">Talk to Us ↗</a>
  </div>
</section>`;

// ============================================================
// PRODUCT DESIGN PAGE
// ============================================================
const designBody = `
<div style="padding-top:120px;"></div>

<!-- DESIGN HERO -->
<section class="reveal" style="max-width: var(--max); margin: 0 auto; padding: 0 60px 80px;">
  <p class="section-eyebrow" style="text-align: left; margin-bottom: 24px;">Product Design</p>
  <h1 style="font-size: clamp(48px, 6vw, 84px); font-weight: 900; color: var(--black); line-height: 1; letter-spacing: -0.03em; margin-bottom: 40px; max-width: 900px;">
    Design that ships<br>and <span class="hover-stroke">sells.</span>
  </h1>
  <p style="font-size: 20px; color: var(--gray-500); line-height: 1.8; max-width: 680px; border-left: 3px solid var(--purple); padding-left: 24px;">
    We believe great design is invisible. It doesn't demand attention — it just makes everything feel effortless. We obsess over the details so your users never have to think about them.
  </p>
</section>

<!-- DESIGN SERVICES (BENTO GRID) -->
<section class="reveal" style="background: var(--cream); padding: 100px 60px;">
  <div style="max-width: var(--max); margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px;">
      <h2 style="font-size: clamp(36px, 5vw, 56px); font-weight: 900; color: var(--black); line-height: 1.1; letter-spacing: -0.02em; max-width: 600px;">Every pixel,<br>perfectly placed.</h2>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
      <!-- Main large card -->
      <div style="grid-column: span 2; grid-row: span 2; background: var(--white); border: 1px solid var(--gray-200); border-radius: 32px; padding: 48px; display: flex; flex-direction: column;">
        <div style="font-size: 48px; margin-bottom: 32px;">✨</div>
        <h3 style="font-size: 28px; font-weight: 900; color: var(--black); margin-bottom: 16px;">UI Design Systems</h3>
        <p style="color: var(--gray-500); font-size: 16px; line-height: 1.8;">Token-based design systems in Figma with auto-layout, component variants, and full dark/light mode support. Handed off to engineering with zero ambiguity. We build foundations that your entire team can scale with.</p>
      </div>
      
      <!-- Small cards -->
      <div style="grid-column: span 2; background: var(--white); border: 1px solid var(--gray-200); border-radius: 32px; padding: 40px; display: flex; gap: 24px; align-items: center;">
        <div style="font-size: 40px;">🎯</div>
        <div>
          <h3 style="font-size: 20px; font-weight: 800; color: var(--black); margin-bottom: 8px;">Product Strategy</h3>
          <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">User research and Jobs-to-be-Done mapping to define exactly what to build.</p>
        </div>
      </div>
      
      <div style="grid-column: span 2; background: var(--white); border: 1px solid var(--gray-200); border-radius: 32px; padding: 40px; display: flex; gap: 24px; align-items: center;">
        <div style="font-size: 40px;">🗺️</div>
        <div>
          <h3 style="font-size: 20px; font-weight: 800; color: var(--black); margin-bottom: 8px;">UX & Architecture</h3>
          <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">Wireframes and user flows that reduce cognitive load before designing a single pixel.</p>
        </div>
      </div>
      
      <div style="grid-column: span 2; background: var(--white); border: 1px solid var(--gray-200); border-radius: 32px; padding: 40px; display: flex; gap: 24px; align-items: center;">
        <div style="font-size: 40px;">🎬</div>
        <div>
          <h3 style="font-size: 20px; font-weight: 800; color: var(--black); margin-bottom: 8px;">Motion Design</h3>
          <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">Micro-interactions that make your product feel alive using Framer Motion and GSAP.</p>
        </div>
      </div>
      
      <div style="grid-column: span 2; background: var(--white); border: 1px solid var(--gray-200); border-radius: 32px; padding: 40px; display: flex; gap: 24px; align-items: center;">
        <div style="font-size: 40px;">📱</div>
        <div>
          <h3 style="font-size: 20px; font-weight: 800; color: var(--black); margin-bottom: 8px;">Responsive & Accessible</h3>
          <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">Mobile-first layouts with full WCAG 2.1 compliance. Built for everyone.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DESIGN PROCESS -->
<section class="reveal" style="max-width: var(--max); margin: 0 auto; padding: 100px 60px;">
  <div style="text-align: center; margin-bottom: 60px;">
    <p class="section-eyebrow">How We Work</p>
    <h2 style="font-size: clamp(36px, 5vw, 64px); font-weight: 900; color: var(--black); line-height: 1.05; letter-spacing: -0.03em;">From fuzzy idea<br>to <span class="hover-stroke">polished product.</span></h2>
  </div>
  
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
    ${[['01','Discover','We interview users and stakeholders. We audit competitors. We understand the problem before touching Figma.'],['02','Define','User stories, acceptance criteria, and information architecture. A product brief every engineer can build from.'],['03','Design','High-fidelity Figma prototypes with interactive flows. You click through your product before a line of code is written.'],['04','Deliver','Design tokens, a full component library, and dev-mode specs handed off to engineering with zero ambiguity.']].map(([n,t,d]) => `
    <div style="padding: 40px; background: var(--gray-50); border-radius: 24px; border: 1px solid var(--gray-200);">
      <div style="font-family: var(--mono); font-size: 48px; font-weight: 900; color: var(--purple); opacity: 0.5; line-height: 1; margin-bottom: 24px;">${n}</div>
      <h3 style="font-size: 20px; font-weight: 900; color: var(--black); margin-bottom: 12px;">${t}</h3>
      <p style="color: var(--gray-500); font-size: 15px; line-height: 1.7;">${d}</p>
    </div>`).join('')}
  </div>
</section>

<div class="divider"><hr /></div>

<section class="cta-section reveal" id="contact">
  <div class="cta-inner">
    <div class="cta-left"><div class="cta-star">✦</div><div><div class="cta-text-title">Ready to redesign?</div><div class="cta-text-sub">Share your product and get a free 20-minute design critique.</div></div></div>
    <a href="mailto:hello@nodexi.com" class="btn btn-dark" style="background:#fff; color:#000; font-size:15px; padding:14px 28px;" id="btn-cta-book">Get a Critique ↗</a>
  </div>
</section>`;

// ============================================================
// WRITE ALL FILES
// ============================================================
fs.writeFileSync(path.join(dir, 'services.html'), buildPage(
  `  <title>Process | Nodexi</title>`, 'services', servicesBody));

fs.writeFileSync(path.join(dir, 'projects.html'), buildPage(
  `  <title>Work | Nodexi</title>`, 'projects', projectsBody));

fs.writeFileSync(path.join(dir, 'about.html'), buildPage(
  `  <title>About | Nodexi</title>`, 'about', aboutBody));

fs.writeFileSync(path.join(dir, 'insights.html'), buildPage(
  `  <title>Insights | Nodexi</title>`, 'insights', insightsBody));

fs.writeFileSync(path.join(dir, 'seo.html'), buildPage(
  `  <title>Technical SEO | Nodexi</title>`, 'seo', seoBody));

fs.writeFileSync(path.join(dir, 'startups.html'), buildPage(
  `  <title>For Startups | Nodexi</title>`, 'startups', startupsBody));

fs.writeFileSync(path.join(dir, 'web3.html'), buildPage(
  `  <title>For Web3 | Nodexi</title>`, 'web3', web3Body));

fs.writeFileSync(path.join(dir, 'design.html'), buildPage(
  `  <title>Product Design | Nodexi</title>`, 'design', designBody));

// Generate individual Case Study Pages
const buildCaseStudyBody = (p, nextProject) => {
  const isLight = p.theme === 'light';
  const bgColor = isLight ? '#f9f9fb' : '#050505';
  const textColor = isLight ? '#111111' : '#ffffff';
  const textMuted = isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)';
  const textSubtle = isLight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
  const borderSubtle = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
  const borderFaint = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  const glassBg = isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)';
  const navBg = isLight ? 'rgba(249,249,251,0.5)' : 'rgba(5,5,5,0.5)';
  
  return `
<!-- Custom CSS for Case Study -->
<style>
  body {
    background-color: ${bgColor} !important;
    color: ${textColor};
    overflow-x: hidden;
  }
  /* Navbar adjustments for page */
  #navbar {
    background: ${navBg} !important;
    backdrop-filter: blur(24px) !important;
    border-bottom: 1px solid ${borderFaint};
  }
  #navbar .nav-logo { color: ${textColor} !important; }
  #btn-book-call { color: ${textColor} !important; border-color: ${borderSubtle} !important; }
  #btn-contact { background: ${textColor} !important; color: ${bgColor} !important; border-color: ${textColor} !important; }
  #menu-btn { color: ${textColor} !important; }
  #menu-btn span { background: ${textColor} !important; }
  
  /* Initial load animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-up {
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  .delay-1 { animation-delay: 0.1s; }

  /* Animated Gradient Text */
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .text-gradient {
    background: linear-gradient(90deg, ${textColor} 0%, ${textSubtle} 25%, ${textColor} 50%, ${textSubtle} 75%, ${textColor} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 8s linear infinite;
  }
  
  /* Glass Card */
  .glass-card {
    background: ${glassBg};
    border: 1px solid ${borderFaint};
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 40px;
  }
</style>

<!-- Hero Section -->
<section style="position: relative; min-height: 100vh; display: flex; align-items: center; padding: 160px 5% 80px; overflow: hidden;">
  <div style="position: absolute; top: -10%; left: -10%; width: clamp(400px, 40vw, 800px); height: clamp(400px, 40vw, 800px); background: ${p.colors[1] || 'var(--purple)'}; filter: blur(120px); opacity: 0.08; border-radius: 50%; z-index: 0; pointer-events: none;"></div>
  <div style="position: absolute; bottom: 0%; right: -5%; width: clamp(300px, 30vw, 600px); height: clamp(300px, 30vw, 600px); background: ${p.colors[2] || 'var(--blue)'}; filter: blur(120px); opacity: 0.08; border-radius: 50%; z-index: 0; pointer-events: none;"></div>

  <div style="max-width: var(--max); margin: 0 auto; width: 100%; position: relative; z-index: 1;">
    
    <!-- Meta -->
    <div class="animate-fade-up" style="display: flex; gap: 16px; align-items: center; font-family: var(--mono); font-size: 14px; text-transform: uppercase; letter-spacing: 3px; color: ${textSubtle}; margin-bottom: 40px;">
      <span style="color: ${textColor}; font-weight: 600;">${p.title}</span> 
      <span style="width: 40px; height: 1px; background: ${borderSubtle};"></span>
      <span>${p.year}</span>
    </div>

    <!-- Massive Shimmering Headline -->
    <div class="animate-fade-up delay-1">
      <h1 class="text-gradient" style="font-size: clamp(48px, 8vw, 110px); font-weight: 900; line-height: 0.9; letter-spacing: -0.03em; max-width: 1100px; margin-bottom: 60px; text-wrap: balance;">
        ${p.headline}
      </h1>
    </div>

    <!-- 2 Column Layout (Description + Focus) -->
    <div class="reveal" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px; border-top: 1px solid ${borderSubtle}; padding-top: 60px; margin-bottom: 80px;">
      <!-- Left: Description -->
      <div>
        <p style="font-size: 20px; color: ${textMuted}; line-height: 1.6; font-weight: 300;">
          ${p.desc}
        </p>
      </div>
      
      <!-- Right: Project Focus -->
      <div>
        <h4 style="font-size: 12px; font-family: var(--mono); font-weight: 600; color: ${textSubtle}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px;">Project Focus</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${p.focus.map(tag => `<span style="font-size: 12px; font-weight: 600; color: ${textColor}; background: ${borderFaint}; border: 1px solid ${borderSubtle}; border-radius: 999px; padding: 10px 24px; text-transform: uppercase; letter-spacing: 1px; backdrop-filter: blur(10px); transition: all 0.3s ease;" onmouseover="this.style.background='${textColor}'; this.style.color='${bgColor}'" onmouseout="this.style.background='${borderFaint}'; this.style.color='${textColor}'">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Immersive Project Showcase -->
<section style="max-width: 1400px; margin: 0 auto 160px; padding: 0 5%; position: relative; z-index: 2;">
  <div class="reveal" style="width: 100%; border-radius: 32px; overflow: hidden; background: ${p.bg}; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.5); border: 1px solid ${borderFaint};">
     <!-- Subtle inner glow -->
     <div style="position: absolute; inset: 0; box-shadow: inset 0 0 100px ${borderFaint}; pointer-events: none; z-index: 2;"></div>
     
     <img src="${p.img}" alt="${p.title}" style="width: 100%; height: auto; display: block; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
  </div>
</section>

<!-- Deep Dive (Styles & Colors) -->
<section style="max-width: var(--max); margin: 0 auto 160px; padding: 0 5%;">
  <div class="glass-card reveal" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 80px;">
    
    <div>
      <h3 style="font-size: 28px; font-weight: 800; color: ${textColor}; margin-bottom: 24px; letter-spacing: -0.02em;">Design Language</h3>
      <p style="font-size: 16px; color: ${textMuted}; line-height: 1.8; font-weight: 300;">
        ${p.stylesDesc}
      </p>
    </div>

    <div>
      <h3 style="font-size: 28px; font-weight: 800; color: ${textColor}; margin-bottom: 32px; letter-spacing: -0.02em;">Color Palette</h3>
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        ${p.colors.map(color => `
          <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; cursor: pointer;" onclick="navigator.clipboard.writeText('${color}'); alert('Copied ${color} to clipboard!');">
            <div style="width: 80px; height: 80px; border-radius: 24px; background: ${color}; box-shadow: 0 10px 30px ${color}40, inset 0 0 0 1px ${borderSubtle}; transform: rotate(-5deg); transition: transform 0.4s ease;" onmouseover="this.style.transform='rotate(0deg) scale(1.1)'" onmouseout="this.style.transform='rotate(-5deg) scale(1)'"></div>
            <span style="font-size: 12px; font-family: var(--mono); color: ${textSubtle}; text-transform: uppercase; letter-spacing: 2px;">${color}</span>
          </div>
        `).join('')}
      </div>
    </div>

  </div>
</section>

${p.link !== '#' ? `
<section style="text-align: center; margin-bottom: 160px; position: relative; z-index: 2;">
  <a href="${p.link}" target="_blank" class="btn reveal" style="background: ${textColor}; color: ${bgColor}; font-size: 16px; font-weight: 800; padding: 24px 56px; border-radius: 999px; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; display: inline-flex; align-items: center; gap: 16px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 20px 40px ${borderSubtle};" onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 30px 60px ${borderSubtle}'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 20px 40px ${borderSubtle}'">
    Explore Live Platform 
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>
</section>
` : ''}

<!-- Next Project Footer -->
<a href="work-${nextProject.slug}.html" class="reveal" style="display: block; width: 100%; padding: 120px 5%; text-align: center; background: ${glassBg}; border-top: 1px solid ${borderFaint}; text-decoration: none; transition: background 0.4s ease;" onmouseover="this.style.background='${borderFaint}'" onmouseout="this.style.background='${glassBg}'">
  <p style="font-size: 14px; font-family: var(--mono); color: ${textSubtle}; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 24px;">Next Case Study</p>
  <h2 style="font-size: clamp(40px, 6vw, 80px); font-weight: 900; color: ${textColor}; letter-spacing: -0.02em; margin: 0;">${nextProject.title} &rarr;</h2>
</a>

`;
};

projectsData.forEach((p, index) => {
  const nextProject = projectsData[(index + 1) % projectsData.length];
  const caseStudyHead = `
  <title>${p.title} | Nodexi Case Study</title>
  `;
  fs.writeFileSync(path.join(dir, 'work-' + p.slug + '.html'), buildPage(caseStudyHead, 'projects', buildCaseStudyBody(p, nextProject)));
});

console.log('✅ All 8 pages written!');

// Also update index.html navbar to include panel + toggle
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
// Replace old navbar section if panel not already present
if (!indexHtml.includes('side-panel')) {
  // Inject panel html after the closing </nav>
  indexHtml = indexHtml.replace('<!-- ======================== HERO ======================== -->', slidePanel + '\n\n<!-- ======================== HERO ======================== -->');
  // Inject theme toggle if missing
  if (!indexHtml.includes('id="theme-toggle"')) {
    indexHtml = indexHtml.replace('<div class="nav-right">', `<div class="nav-right">\n    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">🌙</button>`);
  }
  // Change menu btn to button tag for accessibility  
  indexHtml = indexHtml.replace('<div class="nav-menu-btn" id="menu-btn">≡</div>', '<button class="nav-menu-btn" id="menu-btn" aria-label="Open Menu">≡</button>');
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
  console.log('✅ index.html updated!');
}

console.log('All done!');
