const { execSync } = require('child_process');

console.log("CRITICAL RECOVERY: Restoring deleted body...");
execSync('node clean_restore.js');
execSync('node direct_shift.js');
execSync('node move_subtext_right.js');

// Now, correctly remove ONLY the specific badge container
const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Safely remove the badge by its exact class
$('.hero-badge-wrap').remove();

// 2. Just to be absolutely sure no other badge remains, find the exact SVG path that makes up the badge text
$('path[id="textPath-1"]').closest('svg').parent().remove();

fs.writeFileSync('index.html', $.html());
console.log("Recovery complete. Site restored and badge safely removed.");
