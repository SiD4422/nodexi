const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Regex obliterate ALL instances of the injected custom wrappers
html = html.replace(/<div class="custom-hero-subtext-wrapper"[\s\S]*?<\/div>/g, '');

// 2. Regex obliterate the original Webflow subtext paragraph
// It usually looks like: <p class="hero-paragraph">We design exceptional...</p>
html = html.replace(/<p[^>]*>We design exceptional[\s\S]*?<\/p>/g, '');
html = html.replace(/<p[^>]*>We build scalable[\s\S]*?<\/p>/g, '');

// 3. Find the exact string `Systems <span class="custom-engineering">Engineering</span></h1>`
// and inject the subtext right after the </h1> tag inside its wrapper.
const engineeredCopy = "We build scalable digital infrastructure, custom AI pipelines, and hardware-cloud architectures for founders and agency partners.";
const newSubtextHTML = \`
<div class="custom-hero-subtext-wrapper" style="flex-grow: 1; display: flex; justify-content: flex-end; padding-right: 5vw; min-width: 300px;">
    <p class="custom-hero-subtext" style="max-width: 400px; margin: 0; font-size: clamp(14px, 1.2vw, 18px); line-height: 1.5; color: #475569; font-family: 'Inter', sans-serif; text-align: left;">
        \${engineeredCopy}
    </p>
</div>
\`;

// We inject it right before the closing </div> of the .showcase_marquee_flex that holds Systems Engineering
// Wait, the HTML has `Systems <span class="custom-engineering">Engineering</span></h1>` followed by `<div class="marquee_chat is_yellow">`
html = html.replace(/(Systems <span class="custom-engineering">Engineering<\/span><\/h1>[\s\S]*?<div class="marquee_chat is_yellow"[^>]*>[\s\S]*?<\/div>)/, '$1' + newSubtextHTML);

fs.writeFileSync('index.html', html);
console.log('Overlapping text fixed via pure regex string replacement.');
