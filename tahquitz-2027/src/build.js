// Builds the planner: inlines ../model.js into the page source and writes ../budget.html, a standalone page.
// Usage: node src/build.js [fragment-path]
// The optional fragment is the same page without <html>/<head>/<body>, the form a claude.ai artifact expects.
const fs = require('fs');
const path = require('path');
const here = __dirname, root = path.join(here, '..');
const model = fs.readFileSync(path.join(root, 'model.js'), 'utf8').replace(/\nif \(typeof module[^\n]*\n?/, '\n');
const src = (fs.readFileSync(path.join(here, 'planner-head.html'), 'utf8') + '<!--page-->\n' + fs.readFileSync(path.join(here, 'planner-body.html'), 'utf8')).replace('/*MODEL*/', () => model);
const [head, body] = src.split('<!--page-->');
const standalone = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n'
  + '<style>body{margin:0}[hidden]{display:none!important}</style>\n' + head + '</head>\n<body>\n' + body + '</body>\n</html>\n';
fs.writeFileSync(path.join(root, 'budget.html'), standalone);
const fragment = process.argv[2];
if (fragment) { fs.mkdirSync(path.dirname(fragment), { recursive: true }); fs.writeFileSync(fragment, src); }
console.log('built budget.html', standalone.length, 'bytes');
