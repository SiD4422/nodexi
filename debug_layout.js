const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const el = $('*:contains("Large Language Models (LLMs)")').last();
const parentHtml = el.parent().parent().parent().html();

fs.writeFileSync('debug_layout.txt', parentHtml ? parentHtml.substring(0, 2000) : 'Not found');
