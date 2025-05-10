# Contributing to ScrollCue.js

Thank you for your interest in contributing to ScrollCue.js! This document provides guidelines to help you contribute effectively.

## Project Structure

The project has the following structure:

```
ScrollCue.js/
├── scrollcue.js         # The main JavaScript file (edit this)
├── scrollcue.css        # The main CSS file (edit this)
├── scrollcue.all-in-one.js    # Generated file (don't edit directly)
├── scrollcue.all-in-one.min.js # Generated file (don't edit directly)
├── demo/
│   └── index.html       # Demo page for testing
└── README.md            # Project documentation
```

## How to Contribute

### Making Changes

**Important: Never edit the all-in-one files directly!**

1. Make changes to the separate files:
   - For JavaScript functionality: edit `scrollcue.js`
   - For animations and styling: edit `scrollcue.css`

2. Test your changes using the demo page in the `demo/` directory.

3. After testing, generate the all-in-one files as described below.

### Generating the All-in-One Files

The all-in-one files are built from the separate JS and CSS files. Here's how to generate them:

1. For the unminified version:
   ```javascript
   // Read the separate files
   const fs = require('fs');
   const js = fs.readFileSync('scrollcue.js', 'utf8');
   let css = fs.readFileSync('scrollcue.css', 'utf8');
   
   // Minify CSS (basic inline minification)
   css = css.replace(/\s+/g, ' ')
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            .replace(/\s*:\s*/g, ':')
            .replace(/\s*;\s*/g, ';')
            .replace(/\s*,\s*/g, ',');
   
   // Create the all-in-one file with CSS injected
   const allInOne = js.replace(
     "'use strict';", 
     `'use strict';
  
  const styleElement = document.createElement('style');
  styleElement.textContent = \`
  ${css}
  \`;  document.head.appendChild(styleElement);`
   );
   
   // Write the all-in-one file
   fs.writeFileSync('scrollcue.all-in-one.js', allInOne);
   ```

2. For the minified version, you can use tools like Terser (for JS) and a proper CSS minifier before combining.

### Working with the CSS

The `scrollcue.css` file contains all styles in a readable, well-formatted way with comments. This is where you should make all CSS changes.

The minified CSS in the all-in-one version is automatically generated and should never be edited directly. The process looks like this:

1. Edit the well-formatted `scrollcue.css` file
2. Run the build script to generate the all-in-one version with minified CSS
3. Commit both files

This way, you always work with clean, readable code while still providing an optimized distribution file.

### Testing

Always test your changes before submitting a pull request:

1. Open the demo page in multiple browsers.
2. Test with different screen sizes.
3. Ensure all animations work as expected.
4. Check for console errors.

### Submitting Changes

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes to the separate files.
4. Generate the all-in-one files.
5. Test thoroughly.
6. Submit a pull request with a clear description of the changes.

## Code Style Guidelines

- Use consistent indentation (2 spaces).
- Add comments for complex logic.
- Follow the existing code structure.
- Keep performance in mind - ScrollCue.js aims to be lightweight.

## Adding New Features

If you want to add new animations or features:

1. For new animations:
   - Add the CSS to `scrollcue.css` with clear comments.
   - Use consistent naming conventions: `.scrollcue.[animation-name]`
   - Test thoroughly across browsers.

2. For new functionality:
   - Make sure it's compatible with the existing API.
   - Document any new options or methods.

## Questions?

If you have questions about contributing, please open an issue in the repository.

Thank you for helping improve ScrollCue.js!
