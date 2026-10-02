// Batch script to reset and rebuild up to the state before the alignment changes
const { execSync } = require('child_process');

console.log("Undoing alignment changes by rebuilding state...");
execSync('node undo_declone.js');
execSync('node swap_hero_text.js');
execSync('node swap_brands.js');
execSync('node targeted_fix.js');
execSync('node increase_heavy_duty.js');
execSync('node decrease_se.js');
execSync('node split_engineering.js');

console.log("Restored successfully.");
