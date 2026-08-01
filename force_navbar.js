const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Nuke the old navbar entirely
$('.navbar').empty();

// Inject a completely new, clean B2B Navbar
$('.navbar').append(`
    <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 5vw; background: transparent;">
        
        <!-- Logo -->
        <a href="/" class="nav-logo" style="font-family: 'Space Grotesk', sans-serif, system-ui; font-size: 32px; font-weight: 900; letter-spacing: 4px; color: #ffffff; text-decoration: none;">
            NODEXI
        </a>

        <!-- Middle Links -->
        <div style="display: flex; gap: 30px; align-items: center;">
            <a href="#capabilities" class="nav-link-custom mono" style="color: #94a3b8; text-decoration: none; font-weight: 700; font-family: 'JetBrains Mono', monospace; font-size: 14px;">[ Capabilities ]</a>
            <a href="#work" class="nav-link-custom mono" style="color: #94a3b8; text-decoration: none; font-weight: 700; font-family: 'JetBrains Mono', monospace; font-size: 14px;">[ Selected Work ]</a>
        </div>

        <!-- Right CTA -->
        <div>
            <a href="#contact" class="button is-tech primary mono" style="background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; font-weight: 700; text-decoration: none; border: 1px solid #0ea5e9; font-family: 'JetBrains Mono', monospace; font-size: 14px; display: inline-block;">[ Book Tech Call ↗ ]</a>
        </div>
        
    </div>
`);

fs.writeFileSync('index.html', $.html());
console.log('Navbar successfully replaced from scratch.');
