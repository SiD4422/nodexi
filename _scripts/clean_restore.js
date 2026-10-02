const { execSync } = require('child_process');

console.log("Restoring cleanly to prevent any DOM corruption...");
execSync('node undo_declone.js');
execSync('node swap_hero_text.js');
execSync('node swap_brands.js');
execSync('node targeted_fix.js');
execSync('node increase_heavy_duty.js');
execSync('node decrease_se.js');
execSync('node split_engineering.js');

console.log("Clean restore complete.");
