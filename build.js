// Build script to generate all-in-one files
const fs = require('fs');
const path = require('path');

// Read the source files
console.log('Reading source files...');
const jsPath = path.join(__dirname, 'scrollcue.js');
const cssPath = path.join(__dirname, 'scrollcue.css');

const js = fs.readFileSync(jsPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// Minify CSS (basic inline minification)
console.log('Minifying CSS...');
css = css
  .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
  .replace(/\s+/g, ' ')
  .replace(/\s*{\s*/g, '{')
  .replace(/\s*}\s*/g, '}')
  .replace(/\s*:\s*/g, ':')
  .replace(/\s*;\s*/g, ';')
  .replace(/\s*,\s*/g, ',')
  .trim();

// Create the all-in-one file with CSS injected
console.log('Generating all-in-one file...');
const allInOne = js.replace(
  "'use strict';", 
  `'use strict';
  
  const styleElement = document.createElement('style');
  styleElement.textContent = \`
  ${css}
  \`;  document.head.appendChild(styleElement);`
);

// Write the all-in-one file
fs.writeFileSync(
  path.join(__dirname, 'scrollcue.all-in-one.js'), 
  allInOne, 
  'utf8'
);

console.log('scrollcue.all-in-one.js generated successfully!');

// Note: For a proper production build, you would want to use proper minification tools
// This is just a basic implementation to demonstrate the process
console.log('Build completed successfully!');
