const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the preloader completely to prevent any black-screen hanging
$('.preloader, .page-loader, .loader, .nav-bg').remove();

// Let's also fix the Navbar issue! The screenshot showed "CONTACT" was still there.
// We will forcefully find the contact button and replace the whole nav-block right.
$('.nav-block.right').empty();
$('.nav-block.right').append(`<a href="#contact" class="button is-tech primary mono" style="background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; font-weight: 700; text-decoration: none; border: 1px solid #0ea5e9; font-family: 'JetBrains Mono', monospace; font-size: 14px;">[ Book Tech Call ↗ ]</a>`);

// The "Book A Call" button was completely blacked out because of its CSS. Let's make sure it's gone.
$('.button:contains("BOOK A CALL")').remove();

// Force the white text for NODEXI in the navbar just in case
$('.nav-logo, .logo').css('color', '#ffffff');
$('.nav-logo, .logo').css('-webkit-text-stroke', '0px');

fs.writeFileSync('index.html', $.html());
console.log('Preloader removed and navbar forced.');
