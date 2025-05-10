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

The all-in-one files are built from the separate JS and CSS files. To generate them:

1. Run the build script included in the project:
   ```bash
   node build.js
   ```
   
   This will:
   - Read the separate JS and CSS files
   - Minify the CSS
   - Create the all-in-one file with the CSS injected

2. **Important**: After generating the all-in-one file, you should use an external minification tool to convert it to a single line format. This prevents potential errors that can occur with multi-line JavaScript files. There are several excellent online tools available for this purpose, such as:
   - [UglifyJS](https://github.com/mishoo/UglifyJS)
   - [Terser](https://terser.org/docs/cli-usage)
   - [Online JavaScript/CSS Minifier](https://www.toptal.com/developers/javascript-minifier)

   This step is crucial as it ensures that the all-in-one file works correctly in all environments.

3.  Paste the generated one-line code to `scrollcue.all-in-one.min.js` and test if it is working.

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
