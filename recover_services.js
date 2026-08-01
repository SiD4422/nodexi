const { execSync } = require('child_process');

console.log("Restoring to state right before accidental massive deletion...");

// 1. Base restore
execSync('node clean_restore.js');

// 2. Direct Shift & Fixes
execSync('node direct_shift.js');
execSync('node move_subtext_right.js');

// 3. Final layout fix & exact DOM fixes (badge removal, absolute position)
execSync('node final_layout_fix.js');
execSync('node exact_dom_fix.js');
execSync('node move_absolute_left.js');
execSync('node move_absolute_more_left.js');

// 4. Clean up other sections
execSync('node remove_logo_grid.js');
execSync('node remove_reel_robust.js');

// 5. Apply the Nodexi services text overhaul
execSync('node update_services.js');

console.log("Recovery complete! Services are back.");
