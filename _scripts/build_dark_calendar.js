const fs = require('fs');

const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `
/* ============================================================ */
/* DARK GRID CALENDAR */
/* ============================================================ */
.dark-calendar {
  background: #1e1e1e;
  border-radius: 24px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  margin-bottom: 24px;
  border: 1px solid rgba(255,255,255,0.05);
}
.dark-calendar::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 60px;
  background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.dc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  z-index: 1;
}
.dc-nav {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.dc-nav:hover {
  background: rgba(255,255,255,0.15);
}
.dc-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #666;
  margin-bottom: 16px;
  letter-spacing: 1px;
}
.dc-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px 4px;
}
.dc-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}
.dc-day.faded {
  color: #444;
  cursor: default;
}
.dc-day:not(.faded):not(.active):hover {
  background: rgba(255,255,255,0.1);
}
.dc-day.active {
  background: #8b5cf6;
  color: #fff;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
}
`;

if (!css.includes('.dark-calendar')) {
  fs.writeFileSync(cssPath, css + '\n' + newCss);
}


// Replace Step 2 HTML and the script
const newStep2 = `
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
`;

// Script HTML (we use simple quotes to prevent syntax errors inside build-pages.js)
const scriptHtml = '<script>\n' +
'  document.addEventListener("DOMContentLoaded", () => {\n' +
'    const modal = document.getElementById("booking-modal");\n' +
'    const overlay = document.getElementById("booking-modal-overlay");\n' +
'    const closeBtn = document.getElementById("booking-close");\n' +
'    const form = document.getElementById("booking-form");\n' +
'    const formContainer = document.getElementById("booking-form-container");\n' +
'    const successMsg = document.getElementById("booking-success");\n' +
'    \n' +
'    const step1 = document.getElementById("booking-step-1");\n' +
'    const step2 = document.getElementById("booking-step-2");\n' +
'    const btnNext = document.getElementById("btn-next-step");\n' +
'    const btnPrev = document.getElementById("btn-prev-step");\n' +
'    const btnConfirm = document.getElementById("btn-confirm-booking");\n' +
'    \n' +
'    const dateInput = document.getElementById("booking_date_input");\n' +
'    const timeInput = document.getElementById("booking_time_input");\n' +
'    const selectionText = document.getElementById("booking-selection");\n' +
'\n' +
'    let currentMonth = new Date().getMonth();\n' +
'    let currentYear = new Date().getFullYear();\n' +
'    let selectedFullDate = null;\n' +
'\n' +
'    if (!modal) return;\n' +
'\n' +
'    document.addEventListener("click", (e) => {\n' +
'      const trigger = e.target.closest("a[href^=\'mailto:\'], a[href=\'#contact\'], #btn-book-call, #btn-cta-book");\n' +
'      if (trigger) {\n' +
'        e.preventDefault();\n' +
'        modal.classList.add("active");\n' +
'      }\n' +
'    });\n' +
'\n' +
'    const closeModal = () => {\n' +
'      modal.classList.remove("active");\n' +
'      setTimeout(() => {\n' +
'        formContainer.style.display = "block";\n' +
'        successMsg.style.display = "none";\n' +
'        step1.style.display = "block";\n' +
'        step2.style.display = "none";\n' +
'        form.reset();\n' +
'        document.getElementById("booking-times").style.display = "none";\n' +
'        dateInput.value = "";\n' +
'        timeInput.value = "";\n' +
'        selectedFullDate = null;\n' +
'        updateConfirmBtn();\n' +
'      }, 500);\n' +
'    };\n' +
'\n' +
'    closeBtn.addEventListener("click", closeModal);\n' +
'    overlay.addEventListener("click", closeModal);\n' +
'\n' +
'    btnNext.addEventListener("click", () => {\n' +
'      if (!form.checkValidity()) {\n' +
'        form.reportValidity();\n' +
'        return;\n' +
'      }\n' +
'      step1.style.display = "none";\n' +
'      step2.style.display = "block";\n' +
'      generateCalendar();\n' +
'    });\n' +
'    \n' +
'    btnPrev.addEventListener("click", () => {\n' +
'      step2.style.display = "none";\n' +
'      step1.style.display = "block";\n' +
'    });\n' +
'\n' +
'    document.getElementById("dc-prev").addEventListener("click", () => {\n' +
'      currentMonth--;\n' +
'      if (currentMonth < 0) {\n' +
'        currentMonth = 11;\n' +
'        currentYear--;\n' +
'      }\n' +
'      generateCalendar();\n' +
'    });\n' +
'\n' +
'    document.getElementById("dc-next").addEventListener("click", () => {\n' +
'      currentMonth++;\n' +
'      if (currentMonth > 11) {\n' +
'        currentMonth = 0;\n' +
'        currentYear++;\n' +
'      }\n' +
'      generateCalendar();\n' +
'    });\n' +
'\n' +
'    function generateCalendar() {\n' +
'      const grid = document.getElementById("dc-grid");\n' +
'      const title = document.getElementById("dc-month-year");\n' +
'      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];\n' +
'      \n' +
'      title.textContent = months[currentMonth] + " " + currentYear;\n' +
'      \n' +
'      const firstDay = new Date(currentYear, currentMonth, 1).getDay();\n' +
'      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();\n' +
'      const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();\n' +
'      \n' +
'      // Adjust to Monday start (0=Mon, ..., 6=Sun)\n' +
'      let startDay = firstDay - 1;\n' +
'      if (startDay === -1) startDay = 6;\n' +
'      \n' +
'      let html = "";\n' +
'      \n' +
'      // Prev month faded days\n' +
'      for (let i = startDay - 1; i >= 0; i--) {\n' +
'        html += "<div class=\\"dc-day faded\\">" + (daysInPrevMonth - i) + "</div>";\n' +
'      }\n' +
'      \n' +
'      // Current month days\n' +
'      const today = new Date();\n' +
'      today.setHours(0,0,0,0);\n' +
'      \n' +
'      for (let i = 1; i <= daysInMonth; i++) {\n' +
'        const cellDate = new Date(currentYear, currentMonth, i);\n' +
'        const fullDateStr = cellDate.toDateString();\n' +
'        \n' +
'        let classes = "dc-day current-month";\n' +
'        // Fade out past days\n' +
'        if (cellDate < today) {\n' +
'           classes += " faded";\n' +
'        }\n' +
'        if (selectedFullDate === fullDateStr) {\n' +
'           classes += " active";\n' +
'        }\n' +
'        \n' +
'        html += "<div class=\\"" + classes + "\\" data-date=\\"" + fullDateStr + "\\">" + i + "</div>";\n' +
'      }\n' +
'      \n' +
'      // Next month faded days\n' +
'      const totalCells = startDay + daysInMonth;\n' +
'      const remainingCells = 42 - totalCells; // Fixed 6 rows\n' +
'      for (let i = 1; i <= remainingCells; i++) {\n' +
'        html += "<div class=\\"dc-day faded\\">" + i + "</div>";\n' +
'      }\n' +
'      \n' +
'      grid.innerHTML = html;\n' +
'      \n' +
'      document.querySelectorAll(".dc-day.current-month:not(.faded)").forEach(day => {\n' +
'        day.addEventListener("click", function() {\n' +
'          document.querySelectorAll(".dc-day").forEach(d => d.classList.remove("active"));\n' +
'          this.classList.add("active");\n' +
'          selectedFullDate = this.getAttribute("data-date");\n' +
'          dateInput.value = selectedFullDate;\n' +
'          document.getElementById("selected-date-label").textContent = selectedFullDate;\n' +
'          \n' +
'          timeInput.value = "";\n' +
'          updateConfirmBtn();\n' +
'          generateTimes();\n' +
'          document.getElementById("booking-times").style.display = "block";\n' +
'        });\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function generateTimes() {\n' +
'      const grid = document.getElementById("booking-times-grid");\n' +
'      const times = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:30 PM", "04:00 PM"];\n' +
'      let html = "";\n' +
'      times.forEach(t => {\n' +
'        html += "<div class=\\"booking-time-pill\\" data-time=\\"" + t + "\\">" + t + "</div>";\n' +
'      });\n' +
'      grid.innerHTML = html;\n' +
'      \n' +
'      document.querySelectorAll(".booking-time-pill").forEach(pill => {\n' +
'        pill.addEventListener("click", function() {\n' +
'          document.querySelectorAll(".booking-time-pill").forEach(p => p.classList.remove("active"));\n' +
'          this.classList.add("active");\n' +
'          timeInput.value = this.getAttribute("data-time");\n' +
'          updateConfirmBtn();\n' +
'        });\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function updateConfirmBtn() {\n' +
'      if (dateInput.value && timeInput.value) {\n' +
'        selectionText.innerHTML = "<span style=\\"color:var(--black);\\">" + dateInput.value + "</span> at <span style=\\"color:var(--black);\\">" + timeInput.value + "</span>";\n' +
'        btnConfirm.style.opacity = "1";\n' +
'        btnConfirm.style.pointerEvents = "all";\n' +
'        btnConfirm.style.background = "var(--purple)";\n' +
'      } else {\n' +
'        selectionText.innerHTML = "No time selected";\n' +
'        btnConfirm.style.opacity = "0.5";\n' +
'        btnConfirm.style.pointerEvents = "none";\n' +
'        btnConfirm.style.background = "var(--black)";\n' +
'      }\n' +
'    }\n' +
'\n' +
'    form.addEventListener("submit", (e) => {\n' +
'      e.preventDefault();\n' +
'      btnConfirm.innerHTML = "Booking...";\n' +
'      btnConfirm.style.opacity = "0.7";\n' +
'      btnConfirm.style.pointerEvents = "none";\n' +
'      \n' +
'      const formData = new FormData(form);\n' +
'      fetch(form.action, {\n' +
'        method: "POST",\n' +
'        body: formData,\n' +
'        headers: { "Accept": "application/json" }\n' +
'      }).then(response => {\n' +
'        if (response.ok) {\n' +
'          formContainer.style.display = "none";\n' +
'          successMsg.style.display = "block";\n' +
'        } else {\n' +
'          alert("Oops! There was a problem submitting your request.");\n' +
'          btnConfirm.innerHTML = "Confirm Booking ✓";\n' +
'          btnConfirm.style.opacity = "1";\n' +
'          btnConfirm.style.pointerEvents = "all";\n' +
'        }\n' +
'      }).catch(error => {\n' +
'        alert("Oops! There was a problem submitting your request.");\n' +
'        btnConfirm.innerHTML = "Confirm Booking ✓";\n' +
'        btnConfirm.style.opacity = "1";\n' +
'        btnConfirm.style.pointerEvents = "all";\n' +
'      });\n' +
'    });\n' +
'  });\n' +
'</script>';

function applyChanges(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Step 2 HTML
  const step2Regex = /<!-- STEP 2: CUSTOM CALENDAR -->[\s\S]*?<\/form>\s*<\/div>/;
  if (step2Regex.test(content)) {
    content = content.replace(step2Regex, newStep2.trim() + '\n      </form>\n    </div>');
  }

  // Replace script
  const scriptRegex = /<script>\s*document\.addEventListener\("DOMContentLoaded"|DOMContentLoaded'[\s\S]*?<\/script>/;
  // Let's use a simpler, more robust regex for the script replacement:
  // Finds <script> followed by anything, ending with </script>, as long as it contains 'booking-modal'
  const altScriptRegex = /<script>[\s\S]*?const modal = document\.getElementById\(['"]booking-modal['"]\)[\s\S]*?<\/script>/;
  
  if (altScriptRegex.test(content)) {
    content = content.replace(altScriptRegex, scriptHtml);
  }

  fs.writeFileSync(filePath, content);
  console.log('Applied dark calendar to', filePath);
}

applyChanges('index.html');
applyChanges('build-pages.js');
