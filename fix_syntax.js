const fs = require('fs');

function fixScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix 1: Dates HTML
  const badDatesHtml = /html \+= \`[\s\S]*?<div class="booking-date-card" data-date="\$\{fullDateStr\}">[\s\S]*?<div class="day">\$\{dayName\}<\/div>[\s\S]*?<div class="date">\$\{dateNum\}<\/div>[\s\S]*?<div class="day" style="margin-top:2px;">\$\{monthName\}<\/div>[\s\S]*?<\/div>[\s\S]*?\`;/;
  const goodDatesHtml = "html += '<div class=\"booking-date-card\" data-date=\"' + fullDateStr + '\">' +" +
                        "'<div class=\"day\">' + dayName + '</div>' +" +
                        "'<div class=\"date\">' + dateNum + '</div>' +" +
                        "'<div class=\"day\" style=\"margin-top:2px;\">' + monthName + '</div>' +" +
                        "'</div>';";
                        
  if (badDatesHtml.test(content)) {
    content = content.replace(badDatesHtml, goodDatesHtml);
  }

  // Fix 2: Times HTML
  const badTimesHtml = /html \+= \`<div class="booking-time-pill" data-time="\$\{t\}">\$\{t\}<\/div>\`;/;
  const goodTimesHtml = "html += '<div class=\"booking-time-pill\" data-time=\"' + t + '\">' + t + '</div>';";
  
  if (badTimesHtml.test(content)) {
    content = content.replace(badTimesHtml, goodTimesHtml);
  }

  // Fix 3: Selection text HTML
  const badSelectionHtml = /selectionText\.innerHTML = \`<span style="color:var\(--black\);">\$\{dateInput\.value\}<\/span> at <span style="color:var\(--black\);">\$\{timeInput\.value\}<\/span>\`;/;
  const goodSelectionHtml = "selectionText.innerHTML = '<span style=\"color:var(--black);\">' + dateInput.value + '</span> at <span style=\"color:var(--black);\">' + timeInput.value + '</span>';";
  
  if (badSelectionHtml.test(content)) {
    content = content.replace(badSelectionHtml, goodSelectionHtml);
  }

  fs.writeFileSync(filePath, content);
  console.log('Fixed script literals in', filePath);
}

fixScript('index.html');
fixScript('build-pages.js');
